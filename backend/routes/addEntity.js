const fs = require('fs');
const fileUpload = require('express-fileupload');
const md5 = require('md5');

module.exports = function(app) {
    app.use(fileUpload());
   
    app.post('/addEntity/', (request, response) => {

        let folderName = md5(new Date().getTime());
        
        if(request.files?.back) {
            let folderPath = 'assets/backgrounds/';
            request.files.back.mv(folderPath + md5(new Date()));
            
        }
        else if(request.files?.image) {
            let folderPath = 'assets/images/Прочее/';
            request.files.image.mv(folderPath + md5(new Date()));
        }
        setTimeout(async () => {
            response.end(JSON.stringify({
                'status': 'success'
            }));
        }, 2000)
    })

}