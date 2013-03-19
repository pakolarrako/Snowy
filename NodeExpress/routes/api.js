var apimodels = require('../models/apimodels');
var models = apimodels.models;
exports.api = function(models)
{
	var root = function(req, res){
		res.send('root directory of my api');
	};

	var apps = function(req,res){
	return models.ApplicationModel.find(function (err, apps) {
		if (!err) {
			return res.send(apps);
		} else {
			return console.log(err);
		}
	});
	};

	var countries = function(req,res){
		return models.CountryModel.find(function (err, countries) {
		if (!err) {
			return res.send(countries);
		} else {
			console.log(err);
			res.statusCode = 500;
		}});
	};

	var continents = function(req,res){
		return models.ContinentModel.find(function (err, continents) {
		if (!err) {
			return res.send(continents);
		} else {
			console.log(err);
			res.statusCode = 500;
		}});
	};

	var updatetables = function(req,res){
		var idapp = req.params.idapp;
		return models.UpdatedTablesModel.find({idapp : idapp}, function (err, updatedtables) {
		if (!err) {
			return res.send(updatedtables);
		} else {
			console.log(err);
			res.statusCode = 500;
		}});
	};
	var resorts = function(req,res){
		var idapp = req.params.idapp;
		return models.ResortModel.find({idapp : idapp}, function (err, resorts) {
		if (!err) {
			return res.send(resorts);
		} else {
			console.log(err);
			res.statusCode = 500;
		}});
	};
	var resortshashtags = function(req,res){
		var idapp = req.params.idapp;
		return models.ResortHashtagModel.find({idapp : idapp}, function (err, resortHashtags) {
		if (!err) {
			return res.send(resortHashtags);
		} else {
			console.log(err);
			res.statusCode = 500;
		}});
	};
	var loginUser = function(req,res){
		console.log('login user');
		var name = req.params.name;
		var email = req.params.email;
		var query = models.UserModel.findOne({"name" : name, "email" : email });
		query.exec(function(err,user){
			if (err){
				console.log(err);
				res.statusCode = 500;
			}
			if (user){
				res.send(user);
			}else
			{
				res.statusCode = 404;
				res.send();
			}
		});

	};

	var registerUser = function(req,res){
		console.log('register user');
		var name = req.body.name;
		var email = req.body.email;
		var idapp = req.params.idapp;
		var query = models.UserModel.findOne({"name" : name });
		var user = null;
		query.select("_id");
		query.exec(function(err,user){
			if (err){
				console.log(err);
				res.statusCode = 500;
			}
			if (user){
				res.statusCode = 409;
				res.send();
			}else
			{
				user = new models.UserModel({
				idapp : idapp,
				name: name,
				email: email,
				lastlat: req.body.lastLat,
				lastlng: req.body.lastLng
				});

				user.save(function (err) {
				if (!err) {
					console.log("created user");
					res.send(user);
				} else {
					console.log(err);
					res.statusCode = 500;
					res.send();
				}
				});
			}
		});
	};
	var updateUser = function(req,res){
		console.log('update user');
		var name = req.body.name;
		var email = req.body.email;
		var idapp = req.params.idapp;
		var query = models.UserModel.findOne({"name" : name });
		var user = null;
		query.select("_id");
		query.exec(function(err,user){
			if (err){
				console.log(err);
				res.statusCode = 500;
			}
			if (user){
				models.UserModel.update({name:name}, { lastlat: req.body.lastlat, lastlng: req.body.lastlng }, {upsert: false}, function(err){
					if (err){
						console.log(err);
						res.statusCode = 500;
					}else
					{
						res.statusCode = 200;
					}
					res.send();
				});
			}else
			{
				res.statusCode = 404;
				res.send();
			}
		});
	};

	return {
		root : root,
		apps : apps,
		loginUser : loginUser,
		registerUser : registerUser,
		updateUser: updateUser,
		countries : countries,
		continents : continents,
		updatetables : updatetables,
		resorts : resorts,
		resortshashtags : resortshashtags
	};
}(models);