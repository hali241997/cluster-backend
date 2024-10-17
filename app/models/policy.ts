import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export enum ScheduleEnum {
  daily = 'daily',
  weekly = 'weekly',
}

export enum DeleteSnapshotEnum {
  auto = 'auto',
  never = 'never',
}

export enum DeleteSnapshotRecurrenceEnum {
  days = 'days',
  weeks = 'weeks',
  months = 'months',
  years = 'years',
}

export default class Policy extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // policy name
  @column()
  declare name: string

  // directory to run policy in
  @column()
  declare directory: string

  // daily or weekly schedule
  @column()
  declare scheduleType: ScheduleEnum

  // snapshot time
  @column()
  declare takeSnapshotAt: string

  // the day it will run on. object is stored as a json string
  @column()
  declare runningDays: string

  // should delete snapshot? if yes, how offen
  @column()
  declare deleteSnapshot: DeleteSnapshotEnum

  // delete snapshot recurrence count
  @column()
  declare deleteSnapshotCount: number

  // delete snapshot reccurrent period
  @column()
  declare deleteSnapshotRecurrence: DeleteSnapshotRecurrenceEnum

  // should enable locking snapshot so that they can not be deleted
  @column()
  declare enableLockedSnapshot: boolean

  // boolean to enable or disable policy
  @column()
  declare enablePolicy: boolean
}
