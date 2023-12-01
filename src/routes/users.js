const Router = require('koa-router');
const SignUpController = require('../controladores/signup_controller.js');
const loginController = require('../controladores/login_controller.js');
const jwtMiddleware = require("koa-jwt");
const authUtils = require("../auth/jwt.js");

const router = new Router();

router.post('/registerUser', SignUpController.registerUser);
router.post('/loginUser', loginController.loginUser);

router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }));

router.get('/user', loginController.getAllUsers);
router.get('/user/:username', loginController.getUserByUsername);
router.put('/user/:username', loginController.updateUser); // Actualizar un usuario por nombre de usuario
router.delete('/user/:username', loginController.deleteUser); // Eliminar un usuario por nombre de usuario

module.exports = router;
