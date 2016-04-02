var app = angular.module("ecommerce");

app.controller("adminCtrl", function($scope, productsService) {

  productsService.getProducts().then(function(response) {
    $scope.allProducts = response;
  });

  $scope.delete = function(id) {
    productsService.removeProduct(id);
  }

  $scope.edit = function(id) {
    productsService.editProduct(id);
  }

  $scope.isTrue = false;

  $scope.showForm = function() {
    if ($scope.isTrue === false) {
      $scope.isTrue = true;
    }
    else $scope.isTrue = false;
  }


});
