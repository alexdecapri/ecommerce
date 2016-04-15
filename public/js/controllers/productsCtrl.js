var app = angular.module("ecommerce");

app.controller("productsCtrl", function($scope, productsService, usersService) {

  productsService.getProducts().then(function(response) {
    $scope.allProducts = response;
  });

  $scope.newUser = function(data) {
    console.log(data);
    usersService.userSignUp(data).then(function(response) {
        // console.log(response);
      return response;
    }).catch(function(err) {
      // console.log(err);
      return err;
    })
  }

  $scope.userSignIn = function(data) {
    console.log(data);
    usersService.userSignIn(data).then(function(response) {
      // console.log(reponse);
    }).catch(function(err) {
      console.log(err);
    })
  }

  $scope.visibleSignIn = false;
  $scope.visibleSignUp = false;


  $scope.changeSignUp = function() {
    if ($scope.visibleSignUp === false) {
      $scope.visibleSignUp = true;
    }
    else $scope.visibleSignUp = false;
  };

  $scope.changeSignIn = function() {
    if ($scope.visibleSignIn === false) {
      $scope.visibleSignIn = true;
    }
    else $scope.visibleSignIn = false;
  };

  $scope.getUserByEmail = function(data) {
    usersService.getUserByEmail($scope.loginInfo.email).then(function(result) {
      console.log(result);
    }).catch(function(err) {
      console.log(err);
    })
  };

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
