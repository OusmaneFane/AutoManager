import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Achat from 'App/Models/Achat';
import Paiement from 'App/Models/Paiement';
import Database from '@ioc:Adonis/Lucid/Database';
export default class RapportsController {

  public async cost({ view, auth }) {
    await auth.use('web').authenticate()

    const purchases = await Achat.all(); // Récupérez tous les achats
    const pendingPayments = await Database.query().from('achats').where('statut', 'en attente').count('* as total').first(); 
    console.log(pendingPayments);
    
    // Effectuez des calculs pour agréger les données
    const totalCost = purchases.reduce((total, purchase) => total + purchase.cout, 0);
    // const totalPendingPayments = pendingPayments.reduce((total, payment) => total + payment.statut, 0);
    
    return view.render('reports.cost', {
      purchases,
      totalCost,
      pendingPayments,
      
    });
    
  }
}
