const Router = require('koa-router');
const CreateMatchController = require('../controladores/match_controller.js'); // Asegúrate de que la ruta sea correcta

const router = new Router();

router.post('/matches', CreateMatchController.CreateMatch);
router.post('/updateMatch', CreateMatchController.updateMatch);

module.exports = router;
