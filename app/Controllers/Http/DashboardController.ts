import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboardController {

  public async index({ view, auth }: HttpContextContract) {
    //  await auth.use('web').authenticate()
    // ✅ Request authenticated
    // console.log(auth.user!)

    return view.render('pages.dashboard')
  }
}
