import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Driver from 'App/Models/Driver'
import Vehicule from 'App/Models/Vehicule';
import Database from '@ioc:Adonis/Lucid/Database';
export default class DashboardController {

  public async index({ view, auth }: HttpContextContract) {
     await auth.use('web').authenticate()
    const vehicules = await Database.query().from('vehicules').count('* as total').first();
    const achats = await Database.query().from('achats').count('* as total').first()
    const documents = await Database.query().from('documents').count('* as total').first()
    const locations = await Database.query().from('locations').count('* as total').first()
    const drivers = await Database.query().from('drivers').count('* as total').first()

    console.log(vehicules);

    return view.render('pages.dashboard', {vehicules, achats, documents, locations, drivers})
  }
}
