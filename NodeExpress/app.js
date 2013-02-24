var application_root = __dirname;
var express = require("express");
var path = require("path");
var routesapp = require('./routes/application');
var routesapi = require('./routes/api');

var app = express();

// Config
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  //app.use(express.static(path.join(application_root, "public")));
  app.use(express.static('../Webs'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));  
});




////////////////////////////////////////////////////////////////////

//rest service
console.log(routesapi);
app.get('/api', routesapi.api.root);
app.get('/api/apps', routesapi.api.apps);
//application index
app.get('/', routesapp.index);
////////////////////////////////////////////////////////////////////

// Launch server

app.listen(8888);
console.log('listening to port 8888');