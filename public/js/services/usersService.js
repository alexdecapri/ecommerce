var app = angular.module("ecommerce");

app.service("usersService", function($http) {

  var user = {}; //don't use "this" so it is not accessible

  // this.isSignedIn = function(user) {
  //   if (user !== {}) {
  //     return true;
  //   }
  // };
  //
  // this.getCurrentUser = function(user) {
  //   return user;
  // };

  this.userSignUp = function(data) {
    return $http({
      method: "POST",
      url: "/api/user",
      data: data
    }).then(function(response) {
      console.log(response.data);
      return response.data;
      // user = response.data;
      console.log(this.user);
    })
  }

  this.userSignIn = function(data) {
    return $http({
      method: "GET",
      url: "/api/user/:user_id",
      data: data
    }).then(function(response) {
      console.log(response.data);
      return response.data;
      user = "username will be displayed here";
    })
  }

})
