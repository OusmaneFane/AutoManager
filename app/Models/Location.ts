import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Location extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public vehicule_id: number

  @column()
  public loueur: string

  @column()
  public cout_mensuel: number

  @column()
  public duree_bail: number

  @column()
  public start_date: Date

  @column()
  public end_date: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
