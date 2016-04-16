var app = angular.module("ecommerce");

app.controller("productsCtrl", function($scope, productsService, usersService) {

  productsService.getProducts().then(function(response) {
    $scope.allProducts = response;
  });

  // $scope.register = function(data) {
  //   console.log(data);
  //   usersService.register(data).then(function(response) {
  //       // console.log(response);
  //     return response;
  //   }).catch(function(err) {
  //     // console.log(err);
  //     return err;
  //   })
  // }

  $scope.register = function() {
      if ($scope.user.password !== $scope.password) {
          $scope.error = 'Please make sure your passwords match!';
      } else {
          authService.register($scope.user).then(function(newUser) {
              console.log('New User: ', newUser);
              authService.login($scope.user).then(function() {
                  $scope.user = {};
                  $scope.password = '';
                  $location.path('/dashboard');
              }, function(err) {
                  $scope.error = err.message;
              });
          }, function(err) {
              $scope.error = err.message;
          });
      }
  };

  $scope.userSignIn = function(data) {
    console.log(data);
    usersService.login(data).then(function(response) {
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
