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

        if(path === 'backgrounds') {
            path = this.base + '/' + path + '/';
            let files = fs.readdirSync(path);
            result = result.concat(files);
            
        }
        else {
            path = this.base + '/' + path + '/';
            let files = fs.readdirSync(path);
            for(let i = 0; i < files.length; i++) {
                let name = path + files[i];
                if (fs.statSync(name).isDirectory()){
                    result.push(files[i]);
                }
            }
        }
        console.log(result);
        return result;
    }
    static getCategoryEntityes(path, category) {
        let result = [];

        path = this.base + '/' +  path + '/' + category + '/';
        let files = fs.readdirSync(path);
        result = result.concat(files);

        return result;
    }
    static getEntity(path, name) {
        path = this.base + '/' + path + '/' + name;
        
        return path;
    }
    static getCategoryEntity(path, category, name) {
        path = this.base + '/' + path + '/' + category + '/' + name;
        
        return path;
    }
}

module.exports = function (app) {
    app.get('/getEntity/', (request, response) => {
        let result = null;
        let isAll = request.query?.all === 'false' ? false : true;
        let entityTypeName = request.query?.entityTypeName || 'backgrounds';
        let entityCategory = request.query?.entityCategory;
        let entityName = request.query?.entityName;

        if(isAll) {
            if(entityTypeName && entityCategory) {
                try {
                    result = FileHelpers.getCategoryEntityes(entityTypeName, entityCategory);
                    response.end(JSON.stringify(result));
                    return;
                }
                catch {
                    response.status(400).send("Такой категории не существует");
                    return;
                }
            }
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
            if(entityCategory) {
                try {
                    let path = FileHelpers.getCategoryEntity(entityTypeName, entityCategory, entityName);
                    response.sendFile(__dirname.replace('routes', '') + path);
                    
                    return;
                }
                catch {
                    response.status(400).send("Такой сущности не существует");
                    return;
                }
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