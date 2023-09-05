import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicule from 'App/Models/Vehicule'
import Driver from 'App/Models/Driver'

export default class ConducteursController {

  public async create({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()

    const vehicules = await Vehicule.all()
    return view.render('pages.conducteurs.create', {vehicules})
  }
  public async index({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()

    const drivers = await Driver.all()
    return view.render('pages.conducteurs.edit', {drivers})
  }

  public async store({ request, response, session }) {
    const data = request.only(['fname', 'lname', 'date_naissance', 'permi_number', 'date_permi', 'vehicule_id']);

    try {
      const driver = await Driver.create(data);
      session.flash('success', 'Conducteur enregistré avec succès');
      return response.redirect().toRoute('listDrivers');
    } catch (error) {
      session.flash('error', 'Impossible d\'enregistrer le conducteur');
      return response.redirect().back();
    }
  }
  public async edit({ params, view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()

    const driverId = params.id;

    // Récupérer les détails du véhicule par son ID
    const vehicules = await Vehicule.all()
    const driver = await Driver.findOrFail(driverId);
    console.log(driver);

    return view.render('pages.conducteurs.editer', { driver, vehicules });
  }
  public async update({ params, request, response, session }: HttpContextContract) {
    const driverId = params.id;
    const data = request.only(['fname', 'lname', 'date_naissance', 'permi_number', 'date_permi', 'vehicule_id']);

    try {
      // Récupérer le véhicule par son ID
      const driver = await Driver.findOrFail(driverId);

      // Appliquer les nouvelles données
      driver.merge(data);
      await driver.save();

      session.flash('success', 'Véhicule mis à jour avec succès');
      return response.redirect().toRoute('listDrivers');
    } catch (error) {
      session.flash('error', 'Impossible de mettre à jour le véhicule');
      return response.redirect().back();
    }
  }

  public async destroy({ params, response, session }: HttpContextContract) {
    const driverId = params.id;
    console.log(driverId);

    try {
      // Récupérer le véhicule par son ID et le supprimer
      const driver = await Driver.findOrFail(driverId);
      await driver.delete();

      session.flash('delete', 'Véhicule supprimé avec succès');
      return response.redirect().toRoute('veh.edit');
    } catch (error) {
      session.flash('error', 'Impossible de supprimer le véhicule');
      return response.redirect().back();
    }
  }


}
