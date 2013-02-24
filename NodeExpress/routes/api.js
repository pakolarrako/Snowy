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

	return {
		root : root,
		apps : apps
	};
}(models);