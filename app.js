(function() {
  var app = angular.module('bookSelling', []);
  app.controller('bookController', ['$http',
    function($http) {
      var books = this;
      books.cartVar = false;
      books.error = false;
      books.errmessage = '';
      books.cart = [];
      books.quant = 1;
      $http.get('product.json').success(function(data) {
        books.products = data;
      }).error(function(err) {
        books.error = true;
        books.errmessage = err.message;
      });
      books.addToCart = function(book) {
        var found = false;
        books.cart.forEach(function(item) {
          if (item.id === book.id) {
            item.quant++;
            item.fakePrice = (item.quant * item.price);
            found = true;
          }
        });
        if (!found) {
          books.cart.push(angular.extend({
            quant: 1,
            fakePrice: book.price
          }, book));
        }
      };
      books.totalGetPrice = function() {
        var total = 0;
        books.cart.forEach(function(item) {
          total += (item.price * item.quant);
        })
        return total;
      };
      books.placeOrder = function() {
        books.cart.forEach(function(item) {})
      };
      books.remove = function(task) {
        books.cart = books.cart.filter(function(data) {
          return data !== task;
        });
      }
    }
  ]);
})();