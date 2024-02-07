const fs = require('fs');
const fileUpload = require('express-fileupload');

module.exports = function(app) {
    app.use(fileUpload());
   
    app.post('/addEntity/', (request, response) => {
        request.files.foo.mv('files/' + request.files.foo.name);
        console.log(request.files);
        //setTimeout(async () => {
            response.end(JSON.stringify({
                'status': 'success'
            }));
        //}, 2000)
    })

}