import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Document extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public file: string

  @column()
  public vehicule_id: number

  @column()
  public name: string

  @column()
  public path: string

  @column()
  public size: number

  @column()
  public type: string

  @column()
  public extension: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
