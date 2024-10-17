import Policy from '#models/policy'
import { createPolicyValidator } from '#validators/policy'
import type { HttpContext } from '@adonisjs/core/http'

export default class PoliciesController {
  async index() {
    // removing createdAt and updatedAt
    const policy = await Policy.query()
      .select([
        'name',
        'directory',
        'scheduleType',
        'takeSnapshotAt',
        'runningDays',
        'deleteSnapshot',
        'deleteSnapshotCount',
        'deleteSnapshotRecurrence',
        'enableLockedSnapshot',
        'enablePolicy',
      ])
      .first()

    if (policy) {
      // parse the running days json string
      const parsedPolicy = { ...policy.$attributes, runningDays: JSON.parse(policy.runningDays) }

      // returning parsed policy
      return parsedPolicy
    }

    // Incase there is no policy
    return []
  }

  async update({ request, response }: HttpContext) {
    const policyData = request.only([
      'name',
      'directory',
      'scheduleType',
      'takeSnapshotAt',
      'runningDays',
      'deleteSnapshot',
      'deleteSnapshotCount',
      'deleteSnapshotRecurrence',
      'enableLockedSnapshot',
      'enablePolicy',
    ])

    try {
      // validate request data
      const validatedData = await createPolicyValidator.validate(policyData)

      // check if table is empty
      const policies = await Policy.all()
      if (policies.length === 0) {
        // if table is empty, create new policy
        const newPolicy = await Policy.create({
          ...validatedData,
          runningDays: JSON.stringify(validatedData.runningDays),
        })

        // return response with the newly created policy
        return response.created(newPolicy)
      }

      // if policy exists but the name does not match
      const firstPolicy = await Policy.first()
      if (firstPolicy) {
        // update the first policy
        firstPolicy.merge({
          ...validatedData,
          runningDays: JSON.stringify(validatedData.runningDays),
        })

        // save the updated policy
        await firstPolicy.save()

        // return response with the newly updated policy
        return response.status(200).send(firstPolicy)
      }

      // in case no policy to update
      return response.status(404).send('No policy found to update')
    } catch (error) {
      return response.badRequest(error.message)
    }
  }
}
