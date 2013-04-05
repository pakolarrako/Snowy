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

	rateCategory = function(req,res){
		var idapp = req.params.idapp;
		return models.RateCategoryModel.find({idapp : idapp}, function (err, categories) {
		if (!err) {
			return res.send(categories);
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
	if (typeof(Number.prototype.toRad) === "undefined") {
		Number.prototype.toRad = function() {
		return this * Math.PI / 180;
		};
	}
	var distance = function(lat1,lon1,lat2,lon2){
		var R = 6371; // km
		var dLat = (lat2-lat1).toRad();
		var dLon = (lon2-lon1).toRad();
		var lat1 = lat1.toRad();
		var lat2 = lat2.toRad();
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		if (d<0)
		{
			d = d*(-1);
		}
		return d;
	};

	var insertRate = function(req,res){
		console.log('insert rate');
		var idapp = req.params.idapp;
		var userid = req.body.iduser;
		var catid = req.body.idratecategory;
		var date = new Date(req.body.datetime);
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		var rate = req.body.rate;
		var resid = req.body.idresort;
		var lat = req.body.lastlat;
		var lng = req.body.lastlng;
		var resquery = models.ResortModel.findOne({"_id": resid});
		resquery.exec(function(err, resort){
			if (err){
				console.log('querying resort:' + err);
				res.statusCode = 500;
				res.send();
			}else
			{
				var dist = distance(lat,lng,resort.lat,resort.lng);
				var ratequery = models.UserRateModel.findOne({
					"idapp": idapp,
					"iduser": userid,
					"idresort" : resid,
					"idratecategory" : catid,
					"datetime" : new Date(year, month, day, 0,0,0,0)
				});
				ratequery.select("_id");
				ratequery.exec(function(err,userrate){
					if (err) {
						console.log(err);
						res.statusCode = 500;
						res.send();
					} else {
						if (userrate){
							res.statusCode = 409;
							res.send();
						}else
						{
							var ratedb= new models.UserRateModel({
							idapp : idapp,
							iduser: userid,
							idresort: resid,
							idratecategory: catid,
							datetime : new Date(year, month, day, 0,0,0,0),
							rate:rate,
							lastlat: lat,
							lastlng: lng,
							distance :dist
							});

							ratedb.save(function (err) {
							if (!err) {
								console.log("created rate");
								res.send(ratedb);
							} else {
								console.log(err);
								res.statusCode = 500;
								res.send();
							}
							});
						}
					}
				});
			}
		});
	};
	var updateRate = function(req, res){
		console.log('update rate');
		var idapp = req.params.idapp;
		var userid = req.body.iduser;
		var catid = req.body.idratecategory;
		var date = new Date(req.body.datetime);
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		var rate = req.body.rate;
		var resid = req.body.idresort;
		var lat = req.body.lastlat;
		var lng = req.body.lastlng;
		var resquery = models.ResortModel.findOne({"_id": resid});
		resquery.exec(function(err, resort){
		if (err){
			console.log('querying resort:' + err);
			res.statusCode = 500;
			res.send();
		}else
		{
			var dist = distance(lat,lng,resort.lat,resort.lng);
			var ratequery = models.UserRateModel.findOne({
				"idapp": idapp,
				"iduser": userid,
				"idresort" : resid,
				"idratecategory" : catid,
				"datetime" : new Date(year, month, day, 0,0,0,0)
			});
			ratequery.exec(function(err,userrate){
				if (err) {
					console.log(err);
					res.statusCode = 500;
					res.send();
				} else {
					if (userrate){
						models.UserRateModel.update(
							{_id : userrate._id},
							{ rate : rate, lastlat : lat, lastlng : lng, distance : dist },
							{upsert: false},
							function(err){
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
				}
			});
		}
	});
	};
	var getRate = function(req, res){
		console.log('get rate');
		var idapp = req.params.idapp;
		var username = req.params.name;
		var catname = req.params.catname;
		var date = req.params.date;
		var year = parseInt(date.substring(0,4),10);
		var month = parseInt(date.substring(4,6),10);
		var day = parseInt(date.substring(6,8),10);
		var resortname = req.params.resname;
		var query = models.UserModel.findOne({"name" : username });
		var user = null;
		query.exec(function(err,user){
			if (err){
				console.log('querying user:' + err);
				res.statusCode = 500;
				res.send();
			}else
			{
				var userid = user._id;
				var catquery = models.RateCategoryModel.findOne({"name": catname});
				catquery.exec( function(err,cat){
					if (err){
						console.log('querying category:' + err);
						res.statusCode = 500;
						res.send();
					}else
					{
						var catid = cat._id;
						var resquery = models.ResortModel.findOne({"name": resortname});
							resquery.exec(function(err, resort){
							if (err){
								console.log('querying resort:' + err);
								res.statusCode = 500;
								res.send();
							}else
							{
								var resid = resort._id;
								var ratequery = models.UserRateModel.findOne({
									"idapp": idapp,
									"iduser": userid,
									"idresort" : resid,
									"idratecategory" : catid,
									"datetime" : new Date(year, month, day, 0,0,0,0)
								});
								ratequery.exec(function(err,userrate){
									if (err) {
										console.log('querying rate:' + err);
										res.statusCode = 500;
										res.send();
									} else {
										if (userrate){
											res.statusCode = 200;
											res.send(userrate);
										}else
										{
											res.statusCode = 404;
											res.send();
										}
									}
								});
							}
						});
					}
				});
			}
		});
	};

	var getResortRate = function(req, res)
	{
		console.log('get resort rate');
		var idapp = req.params.idapp;
		var resortname = req.params.resname;
		var date = req.params. date;
		var year = date.substring(0,4);
		var month = date.substring(4,2);
		var day = date.substring(6,2);
		var resquery = models.ResortModel.findOne({"name": resortname});
			resquery.select("_id");
			resquery.exec(function(err, resort){
			if (err){
				console.log(err);
				res.statusCode = 500;
				res.send();
			}else
			{
				var resid = resort._id;
				var ratequery = models.UserRateModel.findOne({
					"idapp": idapp,
					"idresort" : resid,
					"datetime" : new Date(day, month, year)
				});
				ratequery.exec(function(err,userrates){
					if (err) {
						console.log(err);
						res.statusCode = 500;
						res.send();
					} else {
						if (userrates){
							res.statusCode = 200;
							//here we have all the rates for the different users
							var maxDistance = 100; //in kilometers
							var maxVal = 5;
							var result = {};
							var total = {};
							var counter = {};
							var base = 0;
							var divisor = 0;
							for(var i in userrates){
								var r = userrates[i];
								if(!result[r._id]){
									result[r.id] = 0;
								}
								if (!total[r.id]){
									total[r.id] = 0;
								}
								if (!counter[r.id]){
									counter[r.id] = 0;
								}
								if (r.distance <= maxDistance){
									base = r.rate;
									total[r.id] = total[r.id] + maxVal;
									counter[r.id] = counter[r.id] + 1;
									
								}
							}
							res.send(userrate);
						}else
						{
							res.statusCode = 404;
							res.send();
						}
					}
				});
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
		resortshashtags : resortshashtags,
		insertRate : insertRate,
		updateRate : updateRate,
		getRate : getRate,
		rateCategory : rateCategory,
		getResortRate : getResortRate
	};
}(models);