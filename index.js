const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 80;

// let api = require('./router/api')(app);

// app.listen(port, function(){
//     console.log('connected 80 prot!!!');
// });

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

let router = require('./router/main')(app); //Main 모듈 기본(경로설정)
let api = require('./router/api')(app); //api모듈

app.listen(port, function(){
    console.log('connected 80 port!!');
});