import { DeleteSnapshotEnum, DeleteSnapshotRecurrenceEnum, ScheduleEnum } from '#models/policy'
import vine from '@vinejs/vine'

export const createPolicyValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    directory: vine.string().trim().minLength(1),
    scheduleType: vine.enum(Object.values(ScheduleEnum)),
    takeSnapshotAt: vine.string().trim().fixedLength(5),
    runningDays: vine.object({
      everyDay: vine.boolean(),
      monday: vine.boolean(),
      tuesday: vine.boolean(),
      wednesday: vine.boolean(),
      thursday: vine.boolean(),
      friday: vine.boolean(),
      saturday: vine.boolean(),
      sunday: vine.boolean(),
    }),
    deleteSnapshot: vine.enum(Object.values(DeleteSnapshotEnum)),
    deleteSnapshotCount: vine.number().min(0).max(100),
    deleteSnapshotRecurrence: vine.enum(Object.values(DeleteSnapshotRecurrenceEnum)),
    enableLockedSnapshot: vine.boolean(),
    enablePolicy: vine.boolean(),
  })
)
