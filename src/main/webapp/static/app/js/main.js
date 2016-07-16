var wafepaApp = angular.module('wafepaApp', ['ngRoute']);

wafepaApp.controller('ActivityController', function($scope, $http, $location, $routeParams) {
	
	$scope.getAll = function() {
		$http.get('api/activities', {params: {'name':$scope.search,'page':$scope.page}})  // HTTP GET api/activities
				.success(function(data,status,headers) {
					$scope.activities = data;
					$scope.hideSpinner = true;
					$scope.totalPages = headers("total-pages");
				})
				.error(function() {
					$scope.showError = true;
					$scope.hideSpinner = true;
				});
	};
	
	$scope.remove = function(id) {
		$http.delete('api/activities/' + id)
				.success(function() {
					$scope.getAll();
				})
				.error(function() {
					
				});
	};
	
	$scope.init = function() {
		$scope.activity = {};
		
		if ($routeParams.id) { // edit stranica
			$http.get('api/activities/' + $routeParams.id)
					.success(function(data) {
						$scope.activity = data;
					})
					.error(function() {
						
					});
		}
	};
	
	$scope.save = function() {
		if ($scope.activity.id) {
			$http.put('api/activities/' + $scope.activity.id, $scope.activity)
					.success(function() {
						$location.path('/activities');
					})
					.error(function() {
						
					});
		} else {
			$http.post('api/activities', $scope.activity)
					.success(function() {
						$location.path('/activities');
					})
					.error(function() {
						
					});
		}
	};
});


wafepaApp.controller('UserController', function($scope,$http,$location,$routeParams){

    $scope.getAll = function(){
        $http.get('api/users',{params:{'first-name':$scope.search,'last-name':$scope.search,'page':$scope.page}})
            .success(function(data,status,headers){
                $scope.users = data;
                $scope.hideSpinner=true;
				$scope.totalPages = headers("total-pages");
            })
            .error(function(){
                $scope.showError = true;
                $scope.hideSpinner=true;
            });
    };

    $scope.remove = function(id){
        $http.delete('api/users/'+ id)
            .success(function(){
                $scope.getAll();
            })
            .error(function(){
                
            });
    };

    $scope.init = function(){
        
        $scope.user={};

        if($routeParams.id){
            $http.get('api/users/'+$routeParams.id)
                .success(function(data){
                   $scope.user=data; 
                }) 
                .error(function(){

                });
        }
    };

    $scope.save = function(){
        if($scope.user.id){
            $http.put('api/users/' + $routeParams.id,$scope.user)
                    .success(function () {
                        $location.path('/users');
                    })
                    .error(function () {
                        
                    });
        }else{
            $http.post('api/users',$scope.user)
                .success(function(){
                    $location.path('/users')
                })
                .error(function (data,status) {
                    if(status == 400){
                        alert('Morate uneti podjednaku sifru!'); 
                    }
                });
        }
    };
    
});

wafepaApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/static/app/html/partial/home.html'
        })
        .when('/activities', {
            templateUrl : '/static/app/html/partial/activities.html',
            controller : 'ActivityController'
        })
        .when('/activities/add', {
            templateUrl : '/static/app/html/partial/addEditActivity.html',
            controller : 'ActivityController'
        })
         .when('/activities/edit/:id', {
            templateUrl : '/static/app/html/partial/addEditActivity.html',
            controller : 'ActivityController'
        })
		.when('/users', {
            templateUrl : '/static/app/html/partial/users.html',
            controller : 'UserController'
        })
        .when('/users/registration', {
            templateUrl : '/static/app/html/partial/addUser.html',
            controller : 'UserController'
        })
         .when('/users/edit/:id', {
            templateUrl : '/static/app/html/partial/editUser.html',
            controller : 'UserController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);