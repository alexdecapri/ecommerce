var app = angular.module("ecommerce");

app.controller("productsCtrl", function($scope, productsService) {

  productsService.getProducts().then(function(response) {
    $scope.allProducts = response;
  });

  $scope.userSignIn = function(data) {
    console.log(data);
    productsService.userSignIn(data).then(function(response) {
      console.log(response);
      // return response;
    }).catch(function(err) {
      console.log(err);
      // return err;
    })
  }

  // $scope.newProduct = function(data) {
  //   productsService.createProduct(data)
  //     .then(function(response) {
  //       console.log(response);
  //       productsService.getProducts().then(function(response) {
  //         $scope.allProducts = response;
  //       }); //makes it display automatically
  //     })
  // };

  //test user
  var userId = "5704631812d30dee43d5cb69";

  $scope.addToCart = function(product) {
    productsService.addToCart(product, userId).then(function(response) {
      console.log(response);
    }).catch(function(err){
      console.log(err);

    })
  }





});
