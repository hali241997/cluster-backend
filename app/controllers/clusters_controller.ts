import { ClusterModel, TimezoneEnum } from '#models/types'
import { timezoneValidator } from '#validators/cluster'
import type { HttpContext } from '@adonisjs/core/http'
import fs from 'node:fs'
import path from 'node:path'

export default class ClustersController {
  public async show({ request, response }: HttpContext) {
    try {
      // load the JSON file asynchronously
      const filePath = path.resolve(import.meta.dirname, '../..', 'data', 'dummy-data.json')
      const data = fs.readFileSync(filePath).toString()

      // parse string to json
      const parsedData: ClusterModel = JSON.parse(data)

      // validate timezone parameter
      const { timezone } = await timezoneValidator.validate({ timezone: request.input('timezone') })

      // Calculate the filtered date based on the timezone
      const filteredDate = this.getFilteredDate(timezone)

      // filter the data based on date
      const filteredData = parsedData.data.filter((entry) => {
        const entryDate = new Date(entry.date)
        return entryDate >= filteredDate
      })

      // return response with data
      return response.json({
        id: parsedData.id,
        name: parsedData.name,
        data: filteredData,
      })
    } catch (error) {
      // Handle validation or internal errors
      if (error.message) {
        return response.status(400).json({ error: error.message })
      }

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  private getFilteredDate(timezone: TimezoneEnum): Date {
    const now = new Date()
    let filteredDate = new Date()

    switch (timezone) {
      case 'week':
        // calculate current date - 7 days
        filteredDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'month':
        // calculate current date - 1 month
        filteredDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case 'year':
        // calculate current date - 1 year
        filteredDate = new Date(now)
        filteredDate.setFullYear(now.getFullYear() - 1)
        break
    }

    return filteredDate
  }
}
