import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Paiement from 'App/Models/Paiement'
import User from 'App/Models/User'
export default class PaymentsController {

  public async index({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    const users = await User.all()

    const payments = await Paiement.all()
    return view.render('pages.payments.index', { payments, users })
  }

  public async create({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()
const paiements = await Paiement.all()
    return view.render('pages.payments.create', {paiements})
  }

  public async store({ request, response, session }: HttpContextContract) {

    try {
      const data = request.only(['user_id', 'payment_method', 'amount', 'payment_date', 'invoice_number', 'description'])
        console.log(data);
        
      await Paiement.create(data)

      session.flash('success', 'Paiement enregistré avec succès')
      return response.redirect().toRoute('payments.index')
    } catch (error) {
      console.error(error)
      session.flash('error', 'Une erreur s\'est produite lors de l\'enregistrement du paiement.')
      return response.redirect().back()
    }  }

}
