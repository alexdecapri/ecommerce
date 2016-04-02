var app = angular.module("ecommerce");

app.service("productsService", function($http) {

  this.getProducts = function() {
    return $http({
      method: "GET",
      url: "/api/products"
    }).then(function(response) {
      // console.log(response);
      var data = response.data;
      return data;
    })
  }

  this.removeProduct = function(id) {
    return $http({
      method: "DELETE",
      url: "/api/products/" + id
    }).then(function(response) {
      console.log(response.data);
    })
  }


  this.editProduct = function(id, data) {
    return $http({
      method:"PUT",
      url: "/api/products/" + id,
      data: data //what req.body is referenced as
    }).then(function(response) {
      return response.data;
    })
  }

  this.createProduct = function(data) {
    return $http({
      method: "POST",
      url:"/api/products",
      data: data //what req.body is referenced as
    }).then(function(response) {
      console.log(response.data);
    })
  }

});
