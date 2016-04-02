var app = angular.module("ecommerce");

app.controller("productsCtrl", function($scope, productsService) {

   productsService.getProducts().then(function(response) {
     $scope.allProducts = response;
   });

   $scope.getSomeProducts = function($scope.search) {
     productsService.getSomeProducts
   };

   $scope.makeTrue = function() {
     $scope.isTrue = true;
   }

   $scope.isTrue = false;




});
