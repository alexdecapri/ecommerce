var app = angular.module("ecommerce");

app.controller("adminCtrl", function($scope, productsService) {

  //retrieves all products as soon as server is connected
  productsService.getProducts().then(function(response) {
    $scope.allProducts = response;
  });

  $scope.delete = function(id) {
    productsService.removeProduct(id);
    productsService.getProducts().then(function(response) {
      $scope.allProducts = response;
    });
  }

  $scope.edit = function(id, data) { //the $scope.update variable is the data that's passed in
    productsService.editProduct(id, data)
      .then(function(response){
        $scope.allProducts.forEach(function(product) {
          if (product._id === response._id) { //immediately updates object
            product.name = response.name;
            product.description = response.description;
            product.price = response.price;
          }
        })
        // console.log(response);
      });
  }


  $scope.showForm = function(id) {
    $scope.allProducts.forEach(function(product) {
      product.showForm = false;
      if (product._id === id) {
        product.showForm = true;
      }

    });
  }
  // $scope.closeForm = function(id) {
  //   $scope.allProducts.forEach(function(product) {
  //     if (prodcut.showForm === true) {
  //       product.showForm = false;
  //     }
  //   })
  // }

  // $scope.showHide = function(index) {
  //   $scope.activeProductIndex;
  //   $scope.showForm = function(index) {
  //     $scope.activeProductIndex = index;
  //   }
  //
  //   $scope.isShowing = function(index) {
  //     return $scope.activeProductIndex === index;
  //   }
  // }



});
