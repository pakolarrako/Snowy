angular.module('snowy.remotedataservice',['ngResource']).
factory('remotedata',
   function($resource) {
    var defaultUrl = 'http://localhost\\:8888/api/';
    var idapp = '51332856f23804d02b000001';

    var Login = $resource(defaultUrl + ':idapp/user/:name/:action/:email',{}, {
    'save': { method: 'POST', params: { idapp: idapp } },
    'query' : { method: 'GET', params: { idapp : idapp, action : 'login'} , isArray : false }
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

    return  {
      Login : Login,
      Continent : Continent,
      Country : Country,
      UpdateTable : UpdateTable,
      Resort : Resort,
      ResortHashtag : ResortHashtag
    };
    }
);