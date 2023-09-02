import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Achat from 'App/Models/Achat'
export default class AchatsController {

// Enregistrement d'achat
public async create({ view }: HttpContextContract) {
  return view.render('pages.achats.create')
}

public async store({ request, response, session }: HttpContextContract) {
  const data = request.only(['fournisseur', 'cout', 'date_achat', 'statut', 'mode'])
  const data2 = await Achat.create(data)
  if(data2){
    session.flash('success', 'Véhicule mis à jour avec succès');
    return response.redirect().toRoute('achat.list');

  }else{
    session.flash('error', 'Erreur lors du traitement');
    return response.redirect().back();

  }
}

// Mise à jour d'achat
public async edit({ view, params }: HttpContextContract) {
  const achat = await Achat.findOrFail(params.id)
  return view.render('pages.achats.editer', { achat })
}

public async update({ request, response, params, session }: HttpContextContract) {
  const data = request.only(['fournisseur', 'cout', 'date_achat', 'statut', 'mode'])
  const achat = await Achat.findOrFail(params.id)
   achat.merge(data)
   const datas = await achat.save()
   if(datas){
    session.flash('success', 'Véhicule mis à jour avec succès');
    return response.redirect().toRoute('achat.list');

   }else{
    session.flash('error', 'Véhicule mis à jour avec succès');
    return response.redirect().back();

   }
  
}

// Suppression d'achat
public async destroy({ params, response, session }: HttpContextContract) {
  const achatId = params.id;
  console.log(achatId);

  try {
    // Récupérer le véhicule par son ID et le supprimer
    const achat = await Achat.findOrFail(achatId);
    await achat.delete();

    session.flash('delete', 'Véhicule supprimé avec succès');
    return response.redirect().toRoute('achat.list');
  } catch (error) {
    session.flash('error', 'Impossible de supprimer le véhicule');
    return response.redirect().back();
  }
}

// Visualisation d'achat
public async index({ view }: HttpContextContract) {
  const achats = await Achat.all()
  return view.render('pages.achats.edit', { achats })
}

public async show({ params, view }: HttpContextContract) {
  const achat = await Achat.findOrFail(params.id)
  return view.render('achats.show', { achat })
}

}
