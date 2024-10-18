import { TimezoneEnum } from '#models/types'
import vine from '@vinejs/vine'

export const timezoneValidator = vine.compile(
  vine.object({
    timezone: vine.enum(Object.values(TimezoneEnum)),
  })
)
