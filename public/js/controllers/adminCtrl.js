var app = angular.module("ecommerce");

app.controller("adminCtrl", function($scope, productsService) {

  productsService.getProducts().then(function(response) {
    $scope.allProducts = response;
  });

});
