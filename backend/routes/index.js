//  routes/index.js

const mainRoutes = require('./main');
const bgRoutes = require('./bg');
const loginRoutes = require('./login');

module.exports = function(app) {
    mainRoutes(app);
    bgRoutes(app);
    loginRoutes(app);
}