import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'drivers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('fname')
      table.string('lname')
      table.string('date_naissance')
      table.string('permi_number')
      table.string('date_permi')
      table.integer('vehicule_id').unsigned().references('id').inTable('vehicules')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
