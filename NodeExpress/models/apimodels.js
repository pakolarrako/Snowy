//BDConfiguration
var mongoose = require('mongoose');
exports.models = function(mongoose){
	var dbname = 'test_datbase';
	mongoose.connect('mongodb://localhost/' + dbname);

	var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () {
  		console.log('server connected to ' + dbname);
	});

	var Schema = mongoose.Schema;  
	var Application = new Schema({  
	    title : { type: String, required: true },  
	    description : { type: String, required: true }
	});
	
	var ApplicationModel = mongoose.model('Application', Application); 

	return  {		
		ApplicationModel : ApplicationModel
	};
}(mongoose);