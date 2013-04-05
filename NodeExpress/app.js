var application_root = __dirname;
var express = require("express");
var path = require("path");
var models = require('./models/apimodels').models;
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

var initBD = 0;
////////////////////////////////////////////////////////////////////
if (initBD === 1)
{
	console.log('inserting test data');
	console.log(models);
	//application
	var appdb = new models.ApplicationModel({
		name : 'snowy',
		version : '1.0.0.0'
	});

	appdb.save(function (err) {
		if (!err) {
			return console.log("created application");
		} else {
			return console.log(err);
		}
    });
    //user
    var userdb = new models.UserModel({
		idapp : appdb._id,
		name : 'xaarrie',
		email : 'xaarrie@gmail.com',
		lastlat : null,
		lastlng: null
    });
    userdb.save(function (err){
		if (!err) {
			return console.log("created user");
		} else {
			return console.log(err);
		}
    });
    //continents
    var europedb = new models.ContinentModel({
		name : 'Europa'
    });
    var asiadb = new models.ContinentModel({
		name : 'Asia'
    });
    var americadb = new models.ContinentModel({
		name : 'America'
    });
    var africadb = new models.ContinentModel({
		name : 'Africa'
    });
    var oceaniadb = new models.ContinentModel({
		name : 'Oceania'
    });
    europedb.save(function (err){
		if (!err) {
			return console.log("created continent europa");
		} else {
			return console.log(err);
		}
    });
    asiadb.save(function (err){
		if (!err) {
			return console.log("created continent asia");
		} else {
			return console.log(err);
		}
    });
    americadb.save(function (err){
		if (!err) {
			return console.log("created continent america");
		} else {
			return console.log(err);
		}
    });
    africadb.save(function (err){
		if (!err) {
			return console.log("created continent africa");
		} else {
			return console.log(err);
		}
    });
    oceaniadb.save(function (err){
		if (!err) {
			return console.log("created continent oceania");
		} else {
			return console.log(err);
		}
    });
    //countries
    var spaindb = new models.CountryModel({
		idcontinent : europedb._id,
		name : 'España'
    });
    var argentinadb = new models.CountryModel({
		idcontinent : americadb._id,
		name : 'Argentina'
    });
     spaindb.save(function (err){
		if (!err) {
			return console.log("created country spain");
		} else {
			return console.log(err);
		}
    });
    argentinadb.save(function (err){
		if (!err) {
			return console.log("created continent argentina");
		} else {
			return console.log(err);
		}
    });

    //resorts
    var astundb = new models.ResortModel({
		idcountry : spaindb._id,
		idapp : appdb._id,
		name : 'Astun',
		lat : 42.80995069999999,
		lng : -0.50717770,
		twitteraccount : 'Astunesqui'
    });
    var candanchudb = new models.ResortModel({
		idcountry : spaindb._id,
		idapp : appdb._id,
		name : 'Candanchu',
		lat : 42.78821050,
		lng : -0.5269638999999999,
		twitteraccount : 'InfoCandanchu'
    });
    var formigaldb = new models.ResortModel({
		idcountry : spaindb._id,
		idapp : appdb._id,
		name : 'Formigal',
		lat : 42.77411370,
		lng : -0.36491340,
		twitteraccount : 'AramonCom'
    });

    astundb.save(function (err){
		if (!err) {
			return console.log("created resort astun");
		} else {
			return console.log(err);
		}
    });
    candanchudb.save(function (err){
		if (!err) {
			return console.log("created resort candanchu");
		} else {
			return console.log(err);
		}
    });
    formigaldb.save(function (err){
		if (!err) {
			return console.log("created resort formigal");
		} else {
			return console.log(err);
		}
    });
    console.log('ended test data');
}

if (initBD === 2)
{
	var updateContinentdb = new models.UpdatedTablesModel({
		idapp : '51332856f23804d02b000001',
		tablename :'Continent',
		datetime : new Date()
	});
	var updateCountrydb = new models.UpdatedTablesModel({
		idapp : '51332856f23804d02b000001',
		tablename :'Country',
		datetime : new Date()
	});
	var updateResortdb = new models.UpdatedTablesModel({
		idapp : '51332856f23804d02b000001',
		tablename :'Resort',
		datetime :new Date()
	});
	var updateResortHashtagdb = new models.UpdatedTablesModel({
		idapp : '51332856f23804d02b000001',
		tablename :'ResortHashtag',
		datetime : new Date()
	});

	updateContinentdb.save(function (err){
		if (!err) {
			return console.log("created continent update");
		} else {
			return console.log(err);
		}
    });

    updateCountrydb.save(function (err){
		if (!err) {
			return console.log("created country update");
		} else {
			return console.log(err);
		}
    });

    updateResortdb.save(function (err){
		if (!err) {
			return console.log("created resort update");
		} else {
			return console.log(err);
		}
    });

    updateResortHashtagdb.save(function (err){
		if (!err) {
			return console.log("created reports hashtag update");
		} else {
			return console.log(err);
		}
    });



}
if (initBD === 3)
{
	var catNieve = new models.RateCategoryModel({
		idapp : '51332856f23804d02b000001',
		name : 'Nieve'
	});
	var catMeteo = new models.RateCategoryModel({
		idapp : '51332856f23804d02b000001',
		name : 'Meteorologia'
	});
	var catVisibilidad = new models.RateCategoryModel({
		idapp : '51332856f23804d02b000001',
		name : 'Visibilidad'
	});
	var catGente = new models.RateCategoryModel({
		idapp : '51332856f23804d02b000001',
		name : 'Gente'
	});

	var updateRateCategorygdb = new models.UpdatedTablesModel({
		idapp : '51332856f23804d02b000001',
		tablename :'RateCategory',
		datetime : new Date()
	});

	catNieve.save(function (err){
		if (!err) {
			return console.log("created rate update");
		} else {
			return console.log(err);
		}
    });

    catMeteo.save(function (err){
		if (!err) {
			return console.log("created rate update");
		} else {
			return console.log(err);
		}
    });

    catVisibilidad.save(function (err){
		if (!err) {
			return console.log("created rate update");
		} else {
			return console.log(err);
		}
    });

    catGente.save(function (err){
		if (!err) {
			return console.log("created rate update");
		} else {
			return console.log(err);
		}
    });

	updateRateCategorygdb.save(function (err){
		if (!err) {
			return console.log("created rate update");
		} else {
			return console.log(err);
		}
    });

}

////////////////////////////////////////////////////////////////////

//rest service
console.log(routesapi);
app.get('/api', routesapi.api.root);
app.get('/api/apps', routesapi.api.apps);
app.get('/api/:idapp/updatetable', routesapi.api.updatetables);
app.get('/api/:idapp/resort', routesapi.api.resorts);
app.get('/api/:idapp/resorthashtag', routesapi.api.resortshashtags);
app.get('/api/:idapp/ratecategory', routesapi.api.rateCategory);
app.post('/api/:idapp/rate',routesapi.api.insertRate);
app.put('/api/:idapp/rate',routesapi.api.updateRate);
app.get('/api/:idapp/rate/:name/:resname/:catname/:date',routesapi.api.getRate);
app.get('/api/continent', routesapi.api.continents);
app.get('/api/country', routesapi.api.countries);
app.get('/api/:idapp/user/:name/login/:email', routesapi.api.loginUser);
app.post('/api/:idapp/user', routesapi.api.registerUser);
app.put('/api/:idapp/user', routesapi.api.updateUser);

//app.get('api/:idapp/resort/:nresame/rate/:date', routesapi.api.getResortRate );
//application index
app.get('/', routesapp.index);
////////////////////////////////////////////////////////////////////

// Launch server

app.listen(8888);
console.log('listening to port 8888');