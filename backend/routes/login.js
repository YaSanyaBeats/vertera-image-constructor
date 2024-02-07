const bodyParser = require('body-parser');
const fs = require('fs');
const md5 = require('md5');

function generateToken() {
    return md5(new Date().getTime() + ')H%S@ODI$N');
}

function createTokenFile() {
    fs.writeFile('token.txt', generateToken(), (err) => {
        if(err) throw err;
        console.log("New token generated");
    });
}

async function getToken() {
    let token = fs.readFileSync('token.txt', { encoding: 'utf8', flag: 'r' })
    console.log(token);
    return token;
}

module.exports = function(app) {

    let jsonParser = bodyParser.json()
   
    app.post('/login/', jsonParser, (request, response) => {
        setTimeout(async () => {
            let user = request.body;
            if(user.login == 'admin' && user.password == 'qwerty') {
                createTokenFile();
                response.end(JSON.stringify({
                    'status': 'success',
                    'token': getToken()
                }));
            }
            else {
                response.end(JSON.stringify({
                    'status': 'error',
                }));
            }
        }, 2000)
    })

   
}