const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const tokenAuth = require('./middleware/tokenAuth');
const errorHandler = require('./middleware/errorHandler');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

//setup api middleware
app.use(logger());
app.use(bodyParser());
app.use(errorHandler);
app.use(tokenAuth);
 
//setup routes
const bookingsRouter = new Router({
    prefix: '/bookings'
});
require('./bookings/routes')({ bookingsRouter })

const healthRouter = new Router({
    prefix: '/health'
});
require('./health/routes')({ healthRouter });

const venuesRouter = new Router({
    prefix: '/venues'
});
require('./venues/routes')({ venuesRouter });

const spacesRouter = new Router({
    prefix: '/spaces'
});
require('./spaces/routes')({ spacesRouter })

app.use(healthRouter.routes());
app.use(healthRouter.allowedMethods());
app.use(venuesRouter.routes());
app.use(venuesRouter.allowedMethods());
app.use(bookingsRouter.routes());
app.use(bookingsRouter.allowedMethods());
app.use(spacesRouter.routes());
app.use(spacesRouter.allowedMethods());

const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Server listening on port: ${port}`);

module.exports = server;