import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Vehicule extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public immatricul: string

  @column()
  public marque: string

  @column()
  public modele: string

  @column()
  public annee: number

  @column()
  public kilometre: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
