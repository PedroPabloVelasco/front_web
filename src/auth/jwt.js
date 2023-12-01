var jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

function getJWTScope(token) {
    const secret = process.env.JWT_SECRET;
    var payload = jwt.verify(token, secret);
    return payload.scope;
}

async function isUser(ctx, next){
    await next();
    var token = ctx.request.headers.authorization.split(' ')[1];
    var scope = getJWTScope(token);
    ctx.assert(scope.includes('user'), 401, 'Unauthorized, not a user');
}

async function isAdmin(ctx, next){
    await next();
    var token = ctx.request.headers.authorization.split(' ')[1];
    var scope = getJWTScope(token);
    ctx.assert(scope.includes('admin'), 401, 'Unauthorized, not an admin');
}

module.exports = {
    isUser,
    isAdmin
}