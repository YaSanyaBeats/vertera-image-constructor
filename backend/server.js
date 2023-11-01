const express       = require('express');
const app           = express();
const port          = 8000;

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-control-Allow-Credentials', true);
    next();
})


require('./routes')(app);

app.listen(port, () => {
    console.log(`work on ${port}`);
})