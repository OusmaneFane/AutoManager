import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fname: string

  @column()
  public lname: string

  @column()
  public date_naissance: string

  @column()
  public vehicule_id: number

  @column()
  public permi_number: string

  @column()
  public date_permi: string
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
