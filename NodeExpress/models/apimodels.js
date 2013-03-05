//BDConfiguration 
//-------SNOWYDB----------------------------------------------------------
var mongoose = require('mongoose');
exports.models = function(mongoose){
	var dbname = 'snowydb';
	mongoose.connect('mongodb://localhost/' + dbname);

	var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () {
			console.log('server connected to ' + dbname);
		});

	//MODELS DEFINITIONS
	//Declare the Schema and the ObjectId type for ids in the database
	var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

	//Application properties
	var Application = new Schema({
		name : { type : String, required : true }, //It specifies the application name which must be unique
		version : { type : String, required : true } //It specifies the application version
	});

	//Updated tables, using this table the client will know which static information tables must donwload when starting the app
	var UpdatedTables = new Schema({
		idapp : { type : ObjectId, required : true }, //Id of the application which tables have changed
		tablename : { type : String, required : true }, //Name of the changed table
		datetime : { type : Date, required : true} //The last date the table changed
	});

	//Continent table to group resorts
	var Continent = new Schema({
		name : { type : String, required : true } //The name of the continent, just 5 continents with unique name
	});

	//Countries table to group resorts
	var Country = new Schema({
		idcontinent : { type : ObjectId, required : true }, //The Id of the continent this country belongs too
		name : { type : String, required : true} //We asume that a country name is unique.
	});

	//Resorts table, ir represents a location where an activity (depending on the application) will take place
	var Resort = new Schema({
		idapp : { type : ObjectId, required : true }, //aplication this resort belongs to
		name : { type : String, required : true }, //the name of the location, ideally it should be unique by application
		lat : { type : Number, required : false }, //the coordinates to positionate this location in googlemaps
		lng : { type : Number, required : false }, //the coordinates to positionate this location in googlemaps
		idcountry : { type : ObjectId, required : true }, //the country this resort belongs to
		twitteraccount : { type : String, required : false } //the twiter account
	});

	//Hashtags table, it represents the hashtags searched in twitter, they can be showed to the user, they can be for an entyre application,
	//and they can be used to do an auto-rate
	var ResortHashtag = new Schema({
		idapp : { type : ObjectId, required : true }, //the app that will use this hashtag
		idresort : { type : ObjectId, required : false}, //the resort that will search this hastag, if it's setted to null the hashtag will be searched on all the resorts of an application ej: snow
		hashtag : { type : String, required : true}, //the hastag we will search
		foruser : { type: Boolean, required : true}, //it represents if the hastag will be used to show twitters to the user
		rate : { type : Number, required : false} //it represents a value when the hashtag is used to automatically rate a resort.
	});

	//Resort statistics, this table will be used to sum all automatically generated rates for the different resorts
	var ResortStatistics = new Schema({
		idapp : { type : ObjectId, required : true }, // the app the automatically rate has been generated for
		idresort : { type : ObjectId, required : true}, //the resort the automatically rate has been generated fo
		datetime : { type : Date, required : true},//when the rate was generated
		positiverate : { type : Number, required : true},//the value of positive rating
		negativerate : { type : Number, required : true}//the value of negative rating
	});

	//User table, to store the user info
	var User = new Schema({
		idapp : { type : ObjectId, required : true }, //application where the user exists
		name : { type : String, required : true}, //the nickname of the user, it should be unique in an applications.
		email : { type : String, required : true}, //the email of the uer, it should be unique in an application
		lastlat : { type : Number, required : false}, //the last location of the user, the user could be showed in google maps
		lastlng : { type : Number, required : false} //the last location of the user, the user could be showed in google maps
	});

	//User comments table
	var UserComments = new Schema({
		idapp : { type : ObjectId, required : true }, //app where the comment was placed
		iduser : { type : ObjectId, required : true}, //user that placed the comment
		idresort : { type : ObjectId, required : true}, //resort where the comment was placed
		comment : { type : String, required : true} //comment placed by the user
	});

	//UserRates table where an user can rate an station for one day
	var UserRate = new Schema({
		idapp : { type : ObjectId, required : true },
		iduser : { type : ObjectId, required : true},
		idresort : { type : ObjectId, required : true},
		datetime : { type : Date, required : true},
		rate : { type : Number, required : true}
	});

	//MODELS INSTANTIATION
	var ApplicationModel = mongoose.model('Application', Application);
	var UpdatedTablesModel = mongoose.model('UpdatedTables',UpdatedTables);
	var ContinentModel = mongoose.model('Continent',Continent);
	var CountryModel = mongoose.model('Country',Country);
	var ResortModel = mongoose.model('Resort',Resort);
	var ResortHashtagModel = mongoose.model('ResortHashtag', ResortHashtag);
	var ResortStatisticsModel = mongoose.model('ResortStatistics', ResortStatistics);
	var UserModel = mongoose.model('User', User);
	var UserCommentsModel = mongoose.model('UserComments', UserComments);
	var UserRateModel  = mongoose.model('UserRate', UserRate);
	//EXPORTING MODELS
	return  {
		ApplicationModel : ApplicationModel,
		UpdatedTablesModel : UpdatedTablesModel,
		ContinentModel : ContinentModel,
		CountryModel : CountryModel,
		ResortModel : ResortModel,
		ResortHashtagModel : ResortHashtagModel,
		ResortStatisticsModel: ResortStatisticsModel,
		UserModel : UserModel,
		UserCommentsModel : UserCommentsModel,
		UserRateModel : UserRateModel
	};
}(mongoose);