import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicule from 'App/Models/Vehicule'
export default class VehiculesController {

  public async create({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()

    return view.render('pages.vehicules.create')
  }
  public async edit({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()

    const vehicules = await Vehicule.all()
    return view.render('pages.vehicules.edit', {vehicules})
  }
  public async store({ request, response, session }) {
    const data = request.only(['immatricul', 'marque', 'modele', 'annee', 'kilometre'])
    const infos = await Vehicule.create(data)
    if(infos){
      session.flash({ success: 'Vehicle created successfully!' })
      return response.redirect().toRoute('veh.edit')
    } else{
      session.flash({ error: 'An error occurred. Please try again.' })
      return response.redirect().back()
    }
  }
  public async editer({ params, view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()

    const vehicleId = params.id;

    // Récupérer les détails du véhicule par son ID
    const vehicle = await Vehicule.findOrFail(vehicleId);
    console.log(vehicle);

    return view.render('pages.vehicules.editer', { vehicle });
  }
  public async update({ params, request, response, session }: HttpContextContract) {
    const vehicleId = params.id;
    const data = request.only(['immatricul', 'marque', 'modele', 'annee']);

    try {
      // Récupérer le véhicule par son ID
      const vehicle = await Vehicule.findOrFail(vehicleId);

      // Appliquer les nouvelles données
      vehicle.merge(data);
      await vehicle.save();

      session.flash('success', 'Véhicule mis à jour avec succès');
      return response.redirect().toRoute('veh.edit');
    } catch (error) {
      session.flash('error', 'Impossible de mettre à jour le véhicule');
      return response.redirect().back();
    }
  }

  public async destroy({ params, response, session }: HttpContextContract) {
    const vehicleId = params.id;
    console.log(vehicleId);

    try {
      // Récupérer le véhicule par son ID et le supprimer
      const vehicle = await Vehicule.findOrFail(vehicleId);
      await vehicle.delete();

      session.flash('delete', 'Véhicule supprimé avec succès');
      return response.redirect().toRoute('veh.edit');
    } catch (error) {
      session.flash('error', 'Impossible de supprimer le véhicule');
      return response.redirect().back();
    }
  }


}
