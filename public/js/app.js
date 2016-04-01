var app = angular.module("ecommerce", ["ui-router"]);

app.config(function($stateProvider, @urlRouterProvider) {

  $stateProvider
    .state("main", {
      url:"/",
      templateUrl:"/templates/mainTmpl.html",
      controller:"homeCtrl"
    })

    .state("admin", {
      url:"/admin",
      templateUrl:"/templates/adminTmpl.html",
      controller:"adminCtrl"
    })

  $urlRouterProvider
    .otherwise("/");

});
