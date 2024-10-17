import Policy, {
  DeleteSnapshotEnum,
  DeleteSnapshotRecurrenceEnum,
  ScheduleEnum,
} from '#models/policy'
import { test } from '@japa/runner'

test.group('PolicyController', (group) => {
  // this will run before each test
  group.each.setup(async () => {
    // clear the policy table
    await Policy.query().delete()
  })

  test('should return an empty object if no policy exists', async ({ client, assert }) => {
    const response = await client.get('/api/getPolicy').send()

    response.assertStatus(200)
    assert.deepEqual(response.body(), {})
  })

  test('should return first policy when it exists', async ({ client, assert }) => {
    await Policy.create({
      name: 'Test Policy',
      directory: 'test/directory',
      scheduleType: ScheduleEnum.daily,
      takeSnapshotAt: '10:00',
      runningDays: JSON.stringify({
        everyDay: true,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      }),
      deleteSnapshot: DeleteSnapshotEnum.auto,
      deleteSnapshotCount: 5,
      deleteSnapshotRecurrence: DeleteSnapshotRecurrenceEnum.days,
      enableLockedSnapshot: true,
      enablePolicy: true,
    })

    const response = await client.get('/api/getPolicy').send()

    response.assertStatus(200)
    assert.equal(response.body().name, 'Test Policy')
    assert.deepEqual(response.body().runningDays, {
      everyDay: true,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    })
  })

  test('should create a new policy if none exists', async ({ client, assert }) => {
    const newPolicyData = {
      name: 'New Policy',
      directory: 'test/directory',
      scheduleType: ScheduleEnum.daily,
      takeSnapshotAt: '10:00',
      runningDays: {
        everyDay: true,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      deleteSnapshot: DeleteSnapshotEnum.auto,
      deleteSnapshotCount: 5,
      deleteSnapshotRecurrence: DeleteSnapshotRecurrenceEnum.days,
      enableLockedSnapshot: true,
      enablePolicy: true,
    }

    const response = await client.put('/api/setPolicy').json(newPolicyData).send()

    response.assertStatus(201)
    assert.equal(response.body().name, 'New Policy')
    assert.deepEqual(
      response.body().runningDays,
      JSON.stringify({
        everyDay: true,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      })
    )
  })

  test('should update the existing policy', async ({ client, assert }) => {
    await Policy.create({
      name: 'Initial Policy',
      directory: 'test/directory',
      scheduleType: ScheduleEnum.daily,
      takeSnapshotAt: '10:00',
      runningDays: JSON.stringify({
        everyDay: true,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      }),
      deleteSnapshot: DeleteSnapshotEnum.auto,
      deleteSnapshotCount: 5,
      deleteSnapshotRecurrence: DeleteSnapshotRecurrenceEnum.days,
      enableLockedSnapshot: true,
      enablePolicy: true,
    })

    const updatedPolicy = {
      name: 'Updated Policy',
      directory: 'test/directory',
      scheduleType: ScheduleEnum.daily,
      takeSnapshotAt: '10:00',
      runningDays: {
        everyDay: true,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      deleteSnapshot: DeleteSnapshotEnum.auto,
      deleteSnapshotCount: 5,
      deleteSnapshotRecurrence: DeleteSnapshotRecurrenceEnum.days,
      enableLockedSnapshot: true,
      enablePolicy: true,
    }

    const response = await client.put('/api/setPolicy').json(updatedPolicy).send()

    response.assertStatus(200)
    assert.equal(response.body().name, 'Updated Policy')
    assert.deepEqual(
      response.body().runningDays,
      JSON.stringify({
        everyDay: true,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      })
    )
  })
})
