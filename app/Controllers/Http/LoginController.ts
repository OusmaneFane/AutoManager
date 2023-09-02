import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class LoginController {

    public async index({ view }: HttpContextContract) {
        return view.render('login.index')
      }

      public async check({ request, response, session, auth }: HttpContextContract) {
        try {


        // verifier si les donnees sont correctes (email et mot de passe)
        const { email, password } = request.all();
         console.log(email, password);

        await auth.use('web').attempt(email, password)

         // verifier si email existe dans la base de donnees
         const user = await User.findBy('email', email)
         console.log('user', await Hash.make('admin'));

         if (user) {

           // verifier si le mot de passe correspond
           const isSame = await Hash.verify(user.password, password)
           console.log('isame', isSame);

           if (isSame) {
             // connecter l'utilisateur
             await auth.login(user)
             // rediriger vers la page d'accueil
             return response.redirect().toRoute('dashboard')
           }
         } else {
           session.flash('error', 'Email ou mot de passe incorrect')
           return response.redirect().back()
         }
        } catch (error) {
          console.log(error);

        }
         // commande pour installer le package de authentification
         // adonis install @adonisjs/auth

       }
}
