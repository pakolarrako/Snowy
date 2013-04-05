function resortRateCtrl($scope, $location, $routeParams, login, localdata, remotedata)
{
	console.log($routeParams);
	login.redirectIfNotLogged();
	var resname = $routeParams.resortname;
	var resorts = localdata.getResorts();
	$scope.categories = localdata.getRateCategories();
	var name = login.user.name;
	var date = new Date();
	var day = date.getDate();
	console.log(day);
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	if( day < 10 ){
		day ='0' + day;
	}
	if( month < 10){
		month = '0' + month;
	}
	date = ''+ year + month + day;
	//for each category we search if there is a valoration...
	//if it exists we add it to the current object so we can access it
	var cat = null;
	var index = 0;
	$scope.currentResort = null;
	for(var r in resorts){
		if (resorts[r].name === resname){
			$scope.currentResort = resorts[r];
		}
	}
	for(var c = 0; c < $scope.categories.length; c++){
		cat = $scope.categories[c];
		cat.hasrate = false;
		cat.rate = null;
		remotedata.Rate.query({name : name, resname : resname, catname : cat.name, date: date},
			function (rate){
				for (var c in $scope.categories) {
					var ca = $scope.categories[c];
					if (rate.idratecategory === ca._id){
						ca.hasrate = true;
						ca.rate = rate;
					}
				}
			},
			function (response){
				console.log(response);
			});
	}

	$scope.rate = function(category,val){
		
		
		var userrate = null;
		if (category.hasrate === true){
			userrate = new remotedata.Rate(category.rate);
			userrate.rate = val;

			userrate.$update(function(rate){
				remotedata.Rate.query({name : name, resname : resname, catname : cat.name, date: date},function(rate){
					
					var ccs = $scope.categories;
					for (var c in ccs){
						var ca = ccs[c];
						if (rate.idratecategory === ca._id){
							ca.hasrate = true;
							ca.rate = rate;
							ccs[c] = ca;
							console.log(ca);
						}
					}
					$scope.categories = null;
					$scope.categories = ccs;
					if(!$scope.$$phase) {
  						//$digest or $apply
  						$scope.$apply();
					}
				});
			},
			function (response){
				console.log(response);
			});
		}
		else {
			userrate = new remotedata.Rate();
			userrate.iduser = login.user._id;
			userrate.idresort = $scope.currentResort._id;
			userrate.idratecategory = category._id;
			userrate.datetime = new Date();
			userrate.rate = val;
			userrate.lastlng = login.user.lastlng;
			userrate.lastlat = login.user.lastlat;
				userrate.$save(function(rate){
					remotedata.Rate.query({name : name, resname : resname, catname : cat.name, date: date},function(rate){
						var ccs = $scope.categories;
						for (var c in ccs){
							var ca = ccs[c];
							if (rate.idratecategory === ca._id){
								ca.hasrate = true;
								ca.rate = rate;
								ccs[c] = ca;
							}
						}
						$scope.categories = null;
						$scope.categories = ccs;

					});

			},
			function (response){
				console.log(response);
			});

		}
	};
}
resortRateCtrl.$inject = ['$scope','$location','$routeParams','login','localdata','remotedata'];