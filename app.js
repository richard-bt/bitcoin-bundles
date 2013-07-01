#!/usr/bin/env node
 
var express = require('express');
var h = require('handlebars');
 
var app = express();
 
app.get('/', function(req, res){
 
res.render('index.hbs');
 
});
 
app.listen(8080);

console.log('Server running at http://localhost:80/');
