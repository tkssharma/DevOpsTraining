// Application routes
const UsersServiceRoutes = require( './services/training/routes/common');
const AuthServiceRoutes = require( './services/auth/routes');
const ValidAuthTokenMiddleware = require( './global/middlewares/ValidAuthToken');
const DefaultServiceRoutes = require( './services/default/routes');
let routes = function(app) {
    app.use('/auth', AuthServiceRoutes);
    app.use('/users', UsersServiceRoutes);
    app.use('/', DefaultServiceRoutes);
}

module.exports = routes;
