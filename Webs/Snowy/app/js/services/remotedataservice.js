angular.module('snowy.remotedataservice',['ngResource']).
factory('remotedata',
   function($resource,$http) {
    var defaultUrl = 'http://localhost\\:8888/api/';
    var idapp = '51332856f23804d02b000001';
    var urlTweetsUser = 'https://api.twitter.com/1/statuses/user_timeline.json?screen_name=';
    var urlTweetsSearch = 'http://search.twitter.com/search.json?q='; //%23 => #    
    var Login = $resource(defaultUrl + ':idapp/user/:name/:action/:email',{}, {
    'save': { method: 'POST', params: { idapp: idapp } },
    'query' : { method: 'GET', params: { idapp : idapp, action : 'login'} , isArray : false },
    'update' : { method: 'PUT', params: {idapp: idapp} }
    });

    var Continent = $resource(defaultUrl + 'continent',{}, {
    'query' : { method: 'GET', params: { } , isArray : true }
    });
    var Country = $resource(defaultUrl + 'country',{}, {
    'query' : { method: 'GET', params: { } , isArray : true }
    });
    var UpdateTable = $resource(defaultUrl + ':idapp/updatetable',{}, {
    'query' : { method: 'GET', params: { idapp : idapp } , isArray : true }
    });

    var Resort = $resource(defaultUrl + ':idapp/resort',{}, {
    'query' : { method: 'GET', params: { idapp : idapp } , isArray : true }
    });
    var ResortHashtag = $resource(defaultUrl + ':idapp/resorthashtag',{}, {
    'query' : { method: 'GET', params: { idapp : idapp } , isArray : true }
    });
    var RateCategory = $resource(defaultUrl + ':idapp/ratecategory',{}, {
    'query' : { method: 'GET', params: { idapp : idapp } , isArray : true }
    });

    var Rate = $resource(defaultUrl + ':idapp/rate/:name/:resname/:catname/:date',{}, {
    'query' : { method: 'GET', params: { idapp : idapp } , isArray : false },
    'save' : { method: 'POST', params: { idapp: idapp } },
    'update' : { method: 'PUT', params: {idapp: idapp} }
    });
    var UserTweetsHttp = {
      get : function(params, callback){
        var mycallback = callback;
        var twitter_api_url = "http://api.twitter.com/1/statuses/user_timeline.json";
        var config = {
                    params : {
                        screen_name: params.name,
                        callback : "JSON_CALLBACK",
                        include_rts : false,
                        count: params.count
                    }
                };
            $http.jsonp( twitter_api_url, config ).success(
                function(data, status, headers, config){
                    mycallback(data, status, headers, config);
                }
            );
        }
    };

    var WeatherForecast = {
        get : function(params, callback){
            var mycallback = callback;
            var apiKey = '3ae01f6670c928f7';
            var name = params.name;
            var apiurl = 'http://api.wunderground.com/api/'+ apiKey+'/forecast/q/'+name+'.json';
            var config = {
                params : {
                    callback : "JSON_CALLBACK"
                }
            };
            $http.jsonp( apiurl, config ).success(
                function(data, status, headers, config){
                    mycallback(data, status, headers, config);
                }
            );
        }
    };
    /*var UserTweets = $resource(urlTweetsUser + ':name',{},{
    'get' : { method: 'JSONP', params :{}, isArray:false }
    });*/
    var HashTagTweets = $resource(urlTweetsSearch + ':search&count=:number',{},{
    'get' : { method: 'JSONP', params : {callback: 'JSON_CALLBACK'}, isArray:false }
    });
    return  {
      Login : Login,
      Continent : Continent,
      Country : Country,
      UpdateTable : UpdateTable,
      Resort : Resort,
      ResortHashtag : ResortHashtag,
      UserTweetsHttp: UserTweetsHttp,
      HashTagTweets : HashTagTweets,
      WeatherForecast : WeatherForecast,
      RateCategory : RateCategory,
      Rate : Rate
    };
    }
);