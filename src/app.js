const Koa = require("koa");
const KoaLogger = require("koa-logger");
const { koaBody } = require("koa-body");
const cors = require('@koa/cors');
const router = require("./routes.js");
const orm = require("./models/index.js");

const app = new Koa();

app.context.orm = orm;

// Habilitar CORS para todas las rutas y métodos
app.use(cors());

// Middlewares proporcionados por Koa
app.use(KoaLogger());
app.use(koaBody());

// koa-router
app.use(router.routes());

// Middleware personalizado
app.use((ctx, next) => {
    ctx.body = "Hello World";
});



module.exports = app;
