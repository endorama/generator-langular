'use strict';

var app = angular.module('<%= opts.angularAppName %>', [
  'underscore',
  'ui.bootstrap',
  'ExampleModule'
]);

app.controller('AppCtrl', ['$scope', function ($scope) {
  $scope.laravel = {
    url   : 'http://laravel.com',
    title : 'Laravel PHP Framework'
  };

  $scope.message = 'You have arrived.';

}]);
