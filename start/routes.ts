

import Route from '@ioc:Adonis/Core/Route'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'

Route.get('/', 'LoginController.index').as('login');
Route.post('/login', 'LoginController.check').as('check');
Route.get('/logout', 'LoginController.logout').as('logout')

Route.get('/dashboard', 'DashboardController.index').as('dashboard');

Route.get('/add-vehicule', 'VehiculesController.create').as('veh.create');
Route.post('/store-vehicule', 'VehiculesController.store').as('store_veh');

Route.get('/modifier-vehicule', 'VehiculesController.edit').as('veh.edit');
Route.get('/edit-vehicle/:id', 'VehiculesController.editer').as('editVehicle');
Route.post('/update-vehicle/:id', 'VehiculesController.update').as('updateVehicle');
Route.get('/delete-vehicle/:id', 'VehiculesController.destroy').as('deleteVehicle');


// Route.get('/add-conducteur', 'ConducteursController.index').as('cond.create');
// Route.get('/edit-conducteur', 'ConducteursController.edit').as('cond.edit');
//
// Route pour afficher le formulaire de création d'un conducteur
Route.get('/create-driver', 'ConducteursController.create').as('createDriver');

// Route pour enregistrer un nouveau conducteur
Route.post('/store-driver', 'ConducteursController.store').as('storeDriver');

// Route pour afficher la liste des conducteurs
Route.get('/drivers', 'ConducteursController.index').as('listDrivers');

// Route pour afficher le formulaire de modification d'un conducteur
Route.get('/edit-driver/:id', 'ConducteursController.edit').as('editDriver');

// Route pour mettre à jour les informations d'un conducteur
Route.post('/update-driver/:id', 'ConducteursController.update').as('updateDriver');

// Route pour supprimer un conducteur
Route.get('/delete-driver/:id', 'ConducteursController.destroy').as('destroyDriver');



Route.get('/edit-document', 'DocumentsController.index').as('doc.list');

Route.get('/documents/create', 'DocumentsController.create').as('doc.create');
Route.post('/documents', 'DocumentsController.store').as('doc.store');
Route.get('/documents/:id', 'DocumentsController.show').as('doc.show');
Route.get('/documents/:id/edit', 'DocumentsController.edit').as('doc.edit');
Route.post('/documents/:id', 'DocumentsController.update').as('doc.update');
Route.get('/delete-documents/:id', 'DocumentsController.destroy').as('doc.destroy');

// Enregistrement d'achat
Route.get('/achats/create', 'AchatsController.create').as('achat.create')
Route.post('/achats', 'AchatsController.store').as('achat.store')

// Mise à jour d'achat
Route.get('/achats/:id/edit', 'AchatsController.edit').as('achat.edit')
Route.get('/achats/:id', 'AchatsController.update').as('achat.update')

// Suppression d'achat
Route.get('/delete-achats/:id', 'AchatsController.destroy').as('achat.destroy')

// Visualisation d'achat
Route.get('/achats', 'AchatsController.index').as('achat.list')
// Route.get('/achats/:id', 'AchatsController.show')

Route.get('/locations', 'LocationsController.index').as('locations.list')
Route.get('/locations/create', 'LocationsController.create').as('locations.create')
Route.post('/locations', 'LocationsController.store').as('locations.store')
Route.get('/locations/:id/edit', 'LocationsController.edit').as('locations.edit')
Route.get('/locations/:id', 'LocationsController.update').as('locations.update')
Route.get('/delete-locations/:id', 'LocationsController.destroy').as('locations.destroy')
