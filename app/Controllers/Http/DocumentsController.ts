 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicule from 'App/Models/Vehicule'
import Document from 'App/Models/Document'
export default class DocumentsController {

  public async create({ view }: HttpContextContract) {
    const vehicules = await Vehicule.all()
    return view.render('pages.documents.create', {vehicules})
  }
  public async index({ view }: HttpContextContract) {
    const vehicules = await Vehicule.all()
    const documents = await Document.all()
    return view.render('pages.documents.edit', {vehicules, documents})
  }
  public async show({ view, params }: HttpContextContract) {
    const vehicules = await Vehicule.all()
    const document = await Document.find(params.id);
    console.log(document);
    
    return view.render('pages.documents.editer', {vehicules, document})
  }

  public  async store({ request, response, session }) {
    const data = request.only(['vehicule_id']);
    const files = request.file('file')
    console.log(files?.size);
    
    if(files){
      const fileName = files.clientName
      const filePath = `/public/uploads/${fileName}`
      const document = new Document()
      document.vehicule_id = data
      document.name = files?.clientName as string
      document.path = filePath
      document.size = files?.size as number
      document.type = files?.subtype as string
      document.extension = files?.extname as string
      await Document.create(document);
      await files.move('./public/uploads', {
        name: fileName,
  
      })
      session.flash('success', 'Véhicule mis à jour avec succès');
      return response.redirect().toRoute('doc.list');
  
    }
    else{
      session.flash('error', 'Véhicule mis à jour avec succès');
      return response.redirect().back();

    }
  }

  public async update({ params, request, session, response }) {
    try {
      const document = await Document.find(params.id);
  
      if (!document) {
        session.flash({ error: "Document introuvable." });
        return response.redirect("back");
      }
      
      const data = request.only(['vehicule_id']);
      document.merge(data);
      await document.save();
  
      session.flash({ success: "Document mis à jour avec succès !" });
      return response.redirect().toRoute("doc.list");
    } catch (error) {
      console.error(error);
      session.flash({ error: "Une erreur s'est produite lors de la mise à jour du document." });
      return response.redirect("back");
    }
  }
  public async destroy({ params, response, session }: HttpContextContract) {
    const documentId = params.id;
    console.log(documentId);

    try {
      // Récupérer le véhicule par son ID et le supprimer
      const document = await Document.findOrFail(documentId);
      await document.delete();

      session.flash('delete', 'Véhicule supprimé avec succès');
      return response.redirect().toRoute('doc.list');
    } catch (error) {
      session.flash('error', 'Impossible de supprimer le véhicule');
      return response.redirect().back();
    }
  }
  
}
