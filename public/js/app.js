var app = angular.module("ecommerce", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $stateProvider
    .state("products", {
      url:"/",
      templateUrl:"/templates/productsTmpl.html",
      controller:"productsCtrl"
    })

    .state("admin", {
      url:"/admin",
      templateUrl:"/templates/adminTmpl.html",
      controller:"adminCtrl",
      resolve: {
        loggedin: function(usersService) {
          usersService.loggedin();
        }
      }
    })

  $urlRouterProvider
    .otherwise("/");

    $httpProvider.interceptors.push(function($q, $location) {
      return {
          response: function(response) {
              //Do something on success
              return response;
          },
          responseError: function(response) {
              if (response.status === 401) {
                  $location.path('/');
              }
              return $q.reject(response);
          }
      };
  });

});
