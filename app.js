
/**
 * Module dependencies.
 */
var sys = require('sys');
var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    locals: {
      title: 'Express'
    }
  });
});

app.post('/incoming', function(req, res) {
	var message = req.body.Body;
	var from = req.body.From;

	sys.log('From: ' + from + ', Message: ' + message);
	var twiml = '<?xml version="1.0" encoding="UTF-8" ?>\n<Response>\n<Sms>Thanks for your text, we\'ll be in touch.</Sms>\n</Response>';
	res.send(twiml, {'Content-Type':'text/xml'}, 200);
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3001);
  console.log("Express server listening on port %d", app.address().port)
}
