const Router = require('koa-router');
const jobOfferController = require('../controladores/ofertas_controller.js');

const router = new Router();

// Rutas para ofertas de empleo
router.post('/jobOffers', jobOfferController.createJobOffer);
router.get('/jobOffers', jobOfferController.getAllJobOffers);
router.get('/jobOffers/:id', jobOfferController.getJobOfferById);
router.put('/jobOffers/:id', jobOfferController.updateJobOffer);
router.delete('/jobOffers/:id', jobOfferController.deleteJobOffer);
router.post('/employeeProfiles', jobOfferController.getEmployeeProfiles);

module.exports = router;

