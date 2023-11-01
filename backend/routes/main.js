// routing main /
const fs = require('fs');

module.exports = function (app) {
    function givMeFiles (dir, files){
        files = files || [];
          var allFiles = fs.readdirSync(dir);
          for (var i =0; i<allFiles.length; i++){
              var name = dir + '/' + allFiles[i];
              if (fs.statSync(name).isDirectory()){
                  givMeFiles (name, files);
              } else {
                  files.push(name);
              }
          }
          return files;
    };

    app.get('/', (request, response) => {
        response.end(JSON.stringify(givMeFiles("assets")));
    })
}