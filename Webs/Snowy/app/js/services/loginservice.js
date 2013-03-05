angular.module('snowy.userservice', []).
  // Declare new object called time,
  // which will be available for injection
  factory('login', function(remotedata) {
    var user = null;
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
      login.lastLat = 0;
      login.lastLng = 0;
      login.$save(function(user){
        localStorage["user"] = JSON.stringify(user);
        callback(user);
      }, function (response){
        console.log(response.status);
        callback(response);
      });
    };

    return {
      user : user,
      existsUser : existsUser,
      loggUser : loggUser,
      registerUser : registerUser
    };
  });