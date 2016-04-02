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



  $scope.isTrue = false;

  $scope.showForm = function() {
    if ($scope.isTrue === false) {
      $scope.isTrue = true;
    }
    else $scope.isTrue = false;
  }

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
