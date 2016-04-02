var app = angular.module("ecommerce");

app.service("productsService", function($http) {

  this.getProducts = function() {
    return $http({
      method: "GET",
      url: "/api/products"
    }).then(function(response) {
      console.log(response);
      var data = response.data;
      var productsToDisplay = [];
      data.forEach(function(obj) {
        var newObj = {
          Type: obj.type,
          Color: obj.color,
          Size: obj.size,
          Available: obj.numAvail
        };
        productsToDisplay.push(newObj);
      })
      return productsToDisplay;

    })
  }


});
