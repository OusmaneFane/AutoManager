import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Achat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public fournisseur: string

  @column()
  public cout: number

  @column()
  public date_achat: string

  @column()
  public statut: string

  @column()
  public mode: string

  

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
