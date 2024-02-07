//  routes/index.js

const mainRoutes = require('./main');
const bgRoutes = require('./bg');
const loginRoutes = require('./login');
const addEntityRoutes = require('./addEntity');

module.exports = function(app) {
    mainRoutes(app);
    bgRoutes(app);
    loginRoutes(app);
    addEntityRoutes(app);
}