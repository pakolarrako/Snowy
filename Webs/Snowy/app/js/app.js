//'use strict';


// Declare app level module which depends on filters, and services
angular.module( 'snowy', [ 'snowy.filters', 'snowy.services', 'snowy.directives','snowy.remotedataservice', 'snowy.localdataservice', 'snowy.userservice','snowy.twitterservice', 'snowy.weatherservice' ] ).
	config( ['$routeProvider', function($routeProvider) {
		/*$routeProvider.when( '/view1', { templateUrl : 'partials/partial1.html', controller : MyCtrl1 } );
		$routeProvider.when( '/view2', { templateUrl: 'partials/partial2.html', controller: MyCtrl2 } );*/
		//My app routes
		$routeProvider.when( '/', { templateUrl : 'partials/start.html', controller : startCtrl } );
		$routeProvider.when( '/loading', { templateUrl : 'partials/loading.html', controller : loadingCtrl } );
		$routeProvider.when( '/login', { templateUrl : 'partials/login.html', controller : loginCtrl } );
		$routeProvider.when( '/register', { templateUrl : 'partials/register.html', controller: registerCtrl } );
		$routeProvider.when( '/resorts/:resortname', { templateUrl : 'partials/resortDetails.html', controller : resortDetailsCtrl } );
		$routeProvider.when( '/resorts', { templateUrl : 'partials/resortsList.html', controller : resortListCtrl } );
		$routeProvider.otherwise({redirectTo: '/'});
  }]);
