

import Route from '@ioc:Adonis/Core/Route'



Route.get('/', 'LoginController.index').as('login');
Route.post('/login', 'LoginController.check').as('check');

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