const express       = require('express');
const app           = express();
const port          = 8000;

import * as https from 'https';
import * as fs from 'fs';

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
        cert: fs.readFileSync('/var/www/httpd-cert/vertera-cons.yasanyabeats.ru_2024-02-08-23-23_58.crt'),
        key: fs.readFileSync('/var/www/httpd-cert/vertera-cons.yasanyabeats.ru_2024-02-08-23-23_58.key')
    };
    //express.listen(port);
    https.createServer(options, app).listen(port);
    console.log('Server HTTPS started');
}