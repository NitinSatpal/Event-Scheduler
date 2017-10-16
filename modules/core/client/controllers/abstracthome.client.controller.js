(function () {
  'use strict';

  angular
    .module('core')
    .controller('AbstractHomeController', AbstractHomeController);

  AbstractHomeController.$inject = ['$scope', '$rootScope', '$state', '$http', '$location', '$stateParams', '$window', 'Authentication'];

  function AbstractHomeController($scope, $rootScope, $state, $http, $location, $stateParams, $window, Authentication) {
    var vm = this;
    var url = $location.path();
    vm.authentication = Authentication;
  }
}());
