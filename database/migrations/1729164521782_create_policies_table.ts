import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'policies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('directory').notNullable()
      table.enum('schedule_type', ['daily', 'weekly']).notNullable()
      table.string('take_snapshot_at').notNullable()
      table.string('running_days').notNullable()
      table.enum('delete_snapshot', ['auto', 'never']).notNullable()
      table.integer('delete_snapshot_count').unsigned().notNullable()
      table.enum('delete_snapshot_recurrence', ['days', 'weeks', 'months', 'years']).notNullable()
      table.boolean('enable_locked_snapshot').defaultTo(false)
      table.boolean('enable_policy').defaultTo(false)

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
