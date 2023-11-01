// routing main /
const fs = require('fs');

module.exports = function (app) {

    app.get('/getBG/', (request, response) => {
        let result = [];
        let path = 'assets/backgrounds';
        let files = fs.readdirSync(path);

        for(let i = 0; i < files.length; i++) {
            result.push(path + '/' + files[i]);
        }

        response.end(JSON.stringify(result));
    })
}