const Router = require("koa-router");
const users = require("./routes/users.js");
const ofertas = require("./routes/ofertas.js");
const dotenv = require("dotenv");
const match = require("./routes/match.js");


dotenv.config();

const router = new Router();


router.use("/ofertas", ofertas.routes());
router.use("/users", users.routes());
router.use("/match", match.routes());




module.exports = router;