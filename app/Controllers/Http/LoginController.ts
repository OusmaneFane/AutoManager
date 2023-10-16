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
       public async showRegisterForm({ view }) {
        return view.render('register.index')
      }
      public async register({ request, response, session }) {
        const userData = request.only(['name', 'email']);
        const { password, confirm_password } = request.all();
        console.log(userData);
        console.log(password, confirm_password);
        
        
        try {
          
          if (password !== confirm_password) {
            response.flash({ error: 'Les mots de passe ne correspondent pas' });
            return response.redirect().back(); // Redirige vers le formulaire d'inscription en cas d'erreur
          }else{
            
            // Hachez le mot de passe
            const hashedPassword = await Hash.make(password);

            // Créez un nouvel utilisateur avec le mot de passe haché
            const user = new User();
            user.name = userData.name;
            user.email = userData.email;
            user.password = hashedPassword;

            await user.save();
            session.flash({register: 'compte créer avec succès'})
            return response.redirect().toRoute('login'); // Redirige vers la page d'accueil après l'inscription

          }


        } catch (error) {
          // Gérer les erreurs d'inscription, par exemple, si l'email est déjà pris
          session.flash({ error: 'Erreur lors de l\'inscription' });
          return response.redirect().back(); // Redirige vers le formulaire d'inscription en cas d'erreur
        }

      }
       public async logout({ auth, response }: HttpContextContract) {
        await auth.logout()
        return response.redirect().toRoute('login')
      }

}
