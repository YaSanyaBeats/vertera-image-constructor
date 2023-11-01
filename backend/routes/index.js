//  routes/index.js

const mainRoutes = require('./main');
const bgRoutes = require('./bg');

module.exports = function(app) {
    mainRoutes(app);
    bgRoutes(app);
}