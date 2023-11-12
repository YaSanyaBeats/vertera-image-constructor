// routing main /
const fs = require('fs');
const path = require('path');

class FileHelpers {
    static base = 'assets';
    static getBackgrounds() {
        return getEntityes('backgrounds');
    }
    static getBackground(name) {

    }
    static getImages() {
        return getEntityes('images');
    }
    static getImage(name) {

    }
    static getEntityes(path) {
        let result = [];
        path = this.base + '/' + path + '/';
        console.log(path);
        let files = fs.readdirSync(path);

        for(let i = 0; i < files.length; i++) {
            let name = path + files[i];
            if (fs.statSync(name).isDirectory()){
                result.push(files[i]);
            }
        }
        return result;
    }
    static getEntity(path, name) {
        path = this.base + '/' + path + '/' + name;
        let files = fs.readdirSync(path);
        
        return path + '/' + files[0];
    }
}

module.exports = function (app) {
    app.get('/getEntity/', (request, response) => {
        let result = null;
        let isAll = request.query?.all === 'false' ? false : true;
        let entityTypeName = request.query?.entityTypeName || 'backgrounds';
        let entityName = request.query?.entityName;

        if(isAll) {
            try{
                result = FileHelpers.getEntityes(entityTypeName);
                response.end(JSON.stringify(result));
                return;
            }
            catch {
                response.status(400).send("Такой сущности не существует");
                return;
            }
        }
        else {
            if(!(entityTypeName && entityName)) {
                response.status(400).send("Для получения определённой сущности укажите тип и имя сущности (entityTypeName, entityName)");
                return;
            }
            try {
                let path = FileHelpers.getEntity(entityTypeName, entityName);
                response.sendFile(__dirname.replace('routes', '') + path);
                
                return;
            }
            catch {
                response.status(400).send("Такой сущности не существует");
                return;
            }
        }

        
    })
}