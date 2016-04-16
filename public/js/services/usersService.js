var app = angular.module("ecommerce");

// app.service("usersService", function($http) {

  (function() {

      'use strict';

      var usersService = function($http, $q, $location) {

          this.register = function(body) {
              return $http.post('/api/user/register', body).
                then(function(response) {
                  //console.log(response);
                  return response.data;
                }, function(err) {
                  console.log('Error: ', err);
                });
          };

          this.login = function(body) {
              return $http.post('/api/user/login', body).
                then(function(response) {
                  console.log(response);
                  return response;
                }, function(err) {
                  console.log('Error: ', err);
                });
          };

          this.loggedin = function() {
              var deferred = $q.defer();
              $http.get('/api/user/loggedin').
                then(function(user) {
                  console.log('Loggedin: ', user);
                  if (user.data !== '0') {
                      deferred.resolve(); //Authenticated
                  } else {
                      deferred.reject(); //Not Authenticated
                      $location.path('/');
                  }
                }, function(err) {
                  console.log('Error: ', err);
                });
               return deferred.promise;
          };

      };

      usersService.$inject = ['$http', '$q', '$location'];

      app.service('usersService', usersService);

  }());



  // var user = {}; //don't use "this" so it is not accessible

  // this.isSignedIn = function(user) {
  //   if (user !== {}) {
  //     return true;
  //   }
  // };
  //
  // this.getCurrentUser = function(user) {
  //   return user;
  // };

//   this.register = function(data) {
//     return $http({
//       method: "POST",
//       url: "/api/user/register",
//       data: data
//     }).then(function(response) {
//       console.log(response.data);
//       return response.data;
//       // user = response.data;
//       console.log(this.user);
//     })
//   }
//
//   this.userSignIn = function(data) {
//     return $http({
//       method: "GET",
//       url: "/api/user/login",
//       data: data
//     }).then(function(response) {
//       console.log(response.data);
//       return response.data;
//       // user = "username will be displayed here";
//     })
//   }
//
//   this.getUserByEmail = function(email) {
//     return $http({
//       type: "GET",
//       url: "/api/user/" + email,
//       data: {email, email}
//     }).then(function(results) {
//       console.log(results.data);
//       return results.data;
//     });
//   }
//
// })
