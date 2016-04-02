var app = angular.module("ecommerce");

app.controller("productsCtrl", function($scope, productsService) {

  productsService.getProducts().then(function(response) {
    $scope.allProducts = response;
  });




});
