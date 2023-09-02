import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class extends BaseSeeder {
  public async run () {

    await User.createMany([
      {
        email: 'admin@admin.com',
        password: await Hash.make('admin'),

      },
      {
        email: 'user1@user.com',
        password: await Hash.make('user'),
      },
      {
        email: 'user2@user.com',
        password: await Hash.make('user'),
      },
      {
        email: 'user3@user.com',
        password: await Hash.make('user'),
      },

    ])
  }
}
