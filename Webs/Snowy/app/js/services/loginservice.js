angular.module('snowy.userservice', []).
  // Declare new object called time,
  // which will be available for injection
  factory('login', function($location,remotedata) {
    var user = null;
    var logged = false;
    if (localStorage["user"])
    {
      user = JSON.parse(localStorage["user"]);
    }

    var existsUser = function(){
      if (user)
      {
        return true;
      }else
      {
        return false;
      }
    };

    var loggUser = function(name, email, callback){
        remotedata.Login.query({name : name, email : email},function(user){
          localStorage["user"] = JSON.stringify(user);
          logged = true;
          callback(user);
        }, function(response){
          console.log(response);
          callback(response);
        });
    };

    var registerUser = function(name, email, callback){
      var login = new remotedata.Login();
      login.name = name;
      login.email = email;
      login.lastlat = 0;
      login.lastlng = 0;
      login.$save(function(user){
        localStorage["user"] = JSON.stringify(user);
        callback(user);
      }, function (response){
        console.log(response.status);
        callback(response);
      });
    };
    var geolocateUser = function(callback){
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var login = new remotedata.Login();
        var o = JSON.parse(localStorage["user"]);
        o.lastlat = lat;
        o.lastlng = lon;
        for (var p in o){
          login[p] = o[p];
        }
        localStorage["user"] = JSON.stringify(o);
        login.$update();
        callback(position);
      },function(err){
        console.log(err);
        callback(err);
      });
    };

    var redirectIfNotLogged = function(){
      if (logged === false){
        $location.path('/');
      }
    };

    return {
      user : user,
      existsUser : existsUser,
      loggUser : loggUser,
      registerUser : registerUser,
      geolocateUser : geolocateUser,
      redirectIfNotLogged : redirectIfNotLogged
    };
  });