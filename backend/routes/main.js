// routing main /

module.exports = function (app) {
    app.get('/', (request, response) => {
        response.end('main');
    })
}