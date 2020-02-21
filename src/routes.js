const { Router } = require('express');
const ApartmentController = require('./app/controllers/ApartmentController');

const routes = Router();

routes.get('/apartment', ApartmentController.index);

routes.get('/apartment/:id', ApartmentController.show);

routes.post('/apartment', ApartmentController.store);

routes.put('/apartment/:id', ApartmentController.update);

routes.delete('/apartment/:id', ApartmentController.destroy);

module.exports = routes;
