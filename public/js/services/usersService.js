var app = angular.module("ecommerce");

app.service("usersService", function($http) {

  var user = {};

  this.isSignedIn = function() {

  };

  this.getCurrentUser = function() {

  };

  this.userSignIn = function(data) {
    return $http({
      method: "POST",
      url: "/api/user",
      data: data
    }).then(function(response) {
      // console.log(response.data);
      return response.data;
      user = response.data;
      // console.log(this.user);
    })
  }

})
