var app = angular.module("ecommerce", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state("products", {
      url:"/",
      templateUrl:"/templates/productsTmpl.html",
      controller:"productsCtrl"
    })

    .state("admin", {
      url:"/admin",
      templateUrl:"/templates/adminTmpl.html",
      controller:"adminCtrl"
    })

  $urlRouterProvider
    .otherwise("/");

});
