import { ClusterModel, TimezoneEnum } from '#models/types'
import type { HttpContext } from '@adonisjs/core/http'
import fs from 'node:fs'
import path from 'node:path'

export default class ClustersController {
  public async show({ request }: HttpContext) {
    // load file
    const filePath = path.resolve(import.meta.dirname, '../..', 'data', 'dummy-data.json')
    const data = fs.readFileSync(filePath).toString()

    // parse string to json
    const parsedData: ClusterModel = JSON.parse(data)

    // get timezone parameter
    const timezone = request.input('timezone') as TimezoneEnum

    const now = new Date()
    let filteredDate = new Date()

    if (timezone === 'week') {
      // calculate current date - 7 days
      filteredDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    } else if (timezone === 'month') {
      // calculate current date - 1 month
      filteredDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    } else if (timezone === 'year') {
      // calculate current date - 1 year
      filteredDate = new Date(now)
      filteredDate.setFullYear(now.getFullYear() - 1)
    }

    // filter the date based on date
    const filteredData = parsedData.data.filter((entry) => {
      const entryDate = new Date(entry.date)
      return entryDate >= filteredDate
    })

    // return response with data
    return {
      id: parsedData.id,
      name: parsedData.name,
      data: filteredData,
    }
  }
}
