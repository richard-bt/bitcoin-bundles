#!/usr/bin/env node
 
var express = require('express');
var h = require('handlebars');
 
var app = express();
 
app.get('/', function(req, res){
 
res.render('index.hbs');
	 
});

app.get('/success', function(req, res){
 
	res.render('success.hbs');
	 
});
app.get('/cancel', function(req, res){
 
	res.render('cancel.hbs');
	 
});
app.get('/info', function(req, res){
 
	res.render('info.hbs');
	 
});
app.get('/callback', function(req, res){
	
	var data = {};
	data.req = req;
	data.res = res;
	res.render('callback.hbs', data);
	 
});




 
app.listen(8080);

console.log('Server running at http://localhost:80/');
