import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Location from 'App/Models/Location'
import Vehicule from 'App/Models/Vehicule'
export default class AchatsController {

  // Enregistrement d'achat
  public async create({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()

    const vehicules = await Vehicule.all()
    return view.render('pages.locations.create', {vehicules})
  }

  public async store({ request, response, session }: HttpContextContract) {
    const data = request.only(['vehicule_id', 'loueur', 'cout_mensuel', 'duree_bail', 'start_date', 'end_date'])
    console.log(data);

    const data2 = await Location.create(data)
    if(data2){
      session.flash('success', 'Véhicule mis à jour avec succès');
      return response.redirect().toRoute('locations.list');

    }else{
      session.flash('error', 'Erreur lors du traitement');
      return response.redirect().back();

    }
  }

  // Mise à jour d'achat
  public async edit({ view, params, auth }: HttpContextContract) {
    await auth.use('web').authenticate()

    const location = await Location.findOrFail(params.id)
    const vehicules = await Vehicule.all()
    return view.render('pages.locations.editer', { location, vehicules   })
  }

  public async update({ request, response, params, session }: HttpContextContract) {
    const data = request.only(['vehicule_id', 'loueur', 'cout_mensuel', 'duree_bail', 'start_date', 'end_date'])
    const location = await Location.findOrFail(params.id)
     location.merge(data)
     const datas = await location.save()
     if(datas){
      session.flash('success', 'Véhicule mis à jour avec succès');
      return response.redirect().toRoute('locations.list');

     }else{
      session.flash('error', 'Véhicule mis à jour avec succès');
      return response.redirect().back();

     }

  }

  // Suppression d'achat
  public async destroy({ params, response, session }: HttpContextContract) {
    const locationId = params.id;
    console.log(locationId);

    try {
      // Récupérer le véhicule par son ID et le supprimer
      const location = await Location.findOrFail(locationId);
      await location.delete();

      session.flash('delete', 'Véhicule supprimé avec succès');
      return response.redirect().toRoute('location.list');
    } catch (error) {
      session.flash('error', 'Impossible de supprimer le véhicule');
      return response.redirect().back();
    }
  }

  // Visualisation d'achat
  public async index({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()

    const locations = await Location.all()
    const vehicules = await Vehicule.all()

    return view.render('pages.locations.edit', { locations, vehicules })
  }

  public async show({ params, view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()

    const location = await Location.findOrFail(params.id)
    return view.render('locations.show', { location })
  }

  }
