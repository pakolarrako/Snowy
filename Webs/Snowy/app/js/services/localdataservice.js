angular.module('snowy.localdataservice', []).
  // Declare new object called time,
  // which will be available for injection
  factory('localdata', function(remotedata){
    var Continents = [];
    var Countries = [];
    var Resorts = [];
    var ResortsHashTags = [];
    var UserTables = [];
    var sincroData = function(){
        remotedata.UpdateTable.query(function(data){
            if (!localStorage["updatetable"]){
              sincroDataTables(data);
            }else{
              UserTables = JSON.parse(localStorage["updatetable"]);
              var tablestoupdate = [];
              for  (var j=0; j<data.length; j++){
                  var remotet = data[j];
                  var finded = 0;
                  for(var i=0; i<UserTables.length; i++){
                  var localt = UserTables[i];
                  if (localt.tablename === remotet.tablename){
                    finded = 1;
                    if (remotet.datetime - localt.datetime > 0)
                    {
                      tablestoupdate[tablestoupdate.length] = remotet;
                    }else
                    {
                      switch(localt.tablename)
                      {
                        case 'Continent':
                          Continents = JSON.parse(localStorage["continent"]);
                          break;
                        case 'Country':
                          Countries = JSON.parse(localStorage["country"]);
                          break;
                        case 'Resort':
                          Resorts = JSON.parse(localStorage["resort"]);
                          break;
                        case 'ResortHashtag':
                          ResortsHashTags =  JSON.parse(localStorage["resorthashtag"]);
                          break;
                      }
                    }
                  }
                }
                if (finded === 0){
                  tablestoupdate[tablestoupdate.length] = remotet;
                }
              }
              sincroDataTables(tablestoupdate);

            }

        }, function(response){
            console.log(response.status);
        });
    };
    var setTableDatetime = function(table){
              if (localStorage["updatetable"]){
                UserTables = JSON.parse(localStorage["updatetable"]);
              }else{
                UserTables = [];
              }
              var finded = 0;
              for(var i=0; i<UserTables.length; i++){
                var localt = UserTables[i];
                if (localt.tablename === table.tablename)
                {
                  finded = 1;
                  localt.datetime = table.datetime;
                }
              }
              if (finded === 0){
                UserTables[UserTables.length] = table;
              }
              localStorage["updatetable"] = JSON.stringify(UserTables);
    };
    var sincroDataTables = function(datatosincro){
            for (var i = 0; i < datatosincro.length; i++){
              var table = datatosincro [i];
              switch(table.tablename)
              {
                case 'Continent':
                  remotedata.Continent.query(function(data){
                    localStorage["continent"] = JSON.stringify(data);
                    setTableDatetime(table);
                    Continents = data;
                  });
                  break;
                case 'Country':
                  remotedata.Country.query(function(data){
                    localStorage["country"] = JSON.stringify(data);
                    setTableDatetime(table);
                    Countries = data;
                  });
                  break;
                case 'Resort':
                  remotedata.Resort.query(function(data){
                    localStorage["resort"] = JSON.stringify(data);
                    setTableDatetime(table);
                    Resorts = data;
                  });
                  break;
                case 'ResortHashtag':
                  remotedata.ResortHashtag.query(function(data){
                    localStorage["resorthashtag"] = JSON.stringify(data);
                    setTableDatetime(table);
                    ResortsHashTags = data;
                  });
                  break;
              }
            }
    };

    return {
      Continents : Continents,
      Countries : Countries,
      Resorts : Resorts,
      ResortsHashTags : ResortsHashTags,
      sincroData : sincroData
    };
  });