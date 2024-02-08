const fs = require('fs');
const fileUpload = require('express-fileupload');
const md5 = require('md5');

module.exports = function(app) {
    app.use(fileUpload());
   
    app.post('/addEntity/', (request, response) => {

        let folderName = md5(new Date().getTime());
        
        if(request.files?.back) {
            let folderPath = 'assets/backgrounds/' + folderName + '/';
            fs.mkdir(folderPath, err => {
                if(err) throw err;
            });
            request.files.back.mv(folderPath + request.files.back.name);
            
        }
        else if(request.files?.image) {
            let folderPath = 'assets/images/' + folderName + '/';
            fs.mkdir(folderPath, err => {
                if(err) throw err;
            });
            request.files.image.mv(folderPath + request.files.image.name);
        }
        setTimeout(async () => {
            response.end(JSON.stringify({
                'status': 'success'
            }));
        }, 2000)
    })

}