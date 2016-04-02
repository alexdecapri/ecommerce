var app = angular.module("ecommerce");

app.controller("productsCtrl", function($scope, productsService) {

  productsService.getProducts().then(function(response) {
    $scope.allProducts = response;
  });

  $scope.newProduct = function(data) {
    productsService.createProduct(data)
      .then(function(response) {
        $scope.allProducts.forEach(function(product) {
            product.name = response.name;
            product.description = response.description;
            product.price = response.price;
        })
      })
        // console.log(response);
  };



});
