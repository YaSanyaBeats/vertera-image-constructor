const express       = require('express');
const app           = express();
const port          = 8000;

const https = require('https');
const fs = require('fs');

const isBuild = process.argv[2] === 'build';

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-control-Allow-Credentials', true);
    next();
})


require('./routes')(app);



if (!isBuild) {
    app.listen(port, () => {
        console.log(`work on ${port}`);
    })
}
else {
    const options = {
        cert: fs.readFileSync('/var/www/httpd-cert/smm.vertera.org_2024-02-28-21-19_56.crt'),
        key: fs.readFileSync('/var/www/httpd-cert/smm.vertera.org_2024-02-28-21-19_56.key')
    };
    //express.listen(port);
    https.createServer(options, app).listen(port);
    console.log('Server HTTPS started');
}