var app = angular.module("ecommerce");

app.controller("productsCtrl", function($scope, productsService) {

  productsService.getProducts().then(function(response) {
    $scope.allProducts = response;
  });

  $scope.newProduct = function(data) {
    productsService.createProduct(data)
      .then(function(response) {
        console.log(response);
        productsService.getProducts().then(function(response) {
          $scope.allProducts = response;
        }); //makes it display automatically
      })
  };



});
