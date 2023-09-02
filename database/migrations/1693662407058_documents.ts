import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'documents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('vehicule_id').unsigned().references('id').inTable('vehicules')
      table.string('name').notNullable()
      table.string('path').notNullable()
      table.string('size').notNullable()
      table.string('type').notNullable()
      table.string('extension').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
