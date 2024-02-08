//  routes/index.js

const mainRoutes = require('./main');
const getEntityRoutes = require('./getEntity');
const loginRoutes = require('./login');
const addEntityRoutes = require('./addEntity');

module.exports = function(app) {
    mainRoutes(app);
    getEntityRoutes(app);
    loginRoutes(app);
    addEntityRoutes(app);
}