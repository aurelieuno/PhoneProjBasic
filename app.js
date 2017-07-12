var path = require('path')
var express = require('express')
var app = express()

app.set('views', path.join(__dirname, 'templates'))

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

//app.use(express.static(path.join(__dirname, 'public')));
//without this have to express all the below routes

app.get('/products.js',function(req,res){
  res.sendFile(path.join(__dirname+'/products.js'));
});

app.get('/products.json',function(req,res){
  res.sendFile(path.join(__dirname+'/products.json'));
});

app.get('/css.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css.css'));
});

app.get('/galaxy6-gold.jpg',function(req,res){
  res.sendFile(path.join(__dirname+'/galaxy6-gold.jpg'));
});

app.get('/galaxy6-black.jpg',function(req,res){
  res.sendFile(path.join(__dirname+'/galaxy6-black.jpg'));
});

app.get('/galaxy6-case-clear.jpg',function(req,res){
  res.sendFile(path.join(__dirname+'/galaxy6-case-clear.jpg'));
});


app.listen(5000)
console.log("5000")