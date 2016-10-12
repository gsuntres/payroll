var express = require('express');
var app = express();
var hbs = require('express-hbs');
var favico = require('serve-favicon');
var path = require('path');
var join = path.join;

/**
 * Setup Template Engine
 */

var srvPath = join(__dirname, 'server');

app.engine('hbs', hbs.express4({
  partialsDir: path.join(srvPath, 'views', 'partials'),
  defaultLayout: path.join(srvPath, 'views', 'layouts', 'default.hbs')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(srvPath, 'views'));

/**
 * Setup Handlebars Helpers
 */

hbs.registerHelper('debug', function(val) {
  console.log('Context');
  console.log('-------------------------------');
  console.log(this);

  if(val) {
    console.log('Value');
    console.log('  +++++++++++++++++++++');
    console.log(val);
  }
});

/**
 * Setup static folder & favico
 */

app.use('/static', express.static(join(__dirname, 'public')));
app.use(favico(join(__dirname, 'public', 'favico.ico')));

/**
 * Routes
 */

var routesPath = join(srvPath, 'routes');
app.get('/*', require(join(routesPath, 'home')));
app.get('/*', require(join(routesPath, 'employees')));

app.get('/500', function(req, res) {
  throw new Error('Server Error!');
});

app.get('/*', function(req, res) {
  throw new NotFound;
});

function NotFound(text) {
  this.name = 'NotFound';
  Error.call(this, text);
  Error.captureStackTrace(this, arguments.callee);
}

/**
 * Spin up the server
 */

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Payrock is listening on %s:%s', host, port);
});
