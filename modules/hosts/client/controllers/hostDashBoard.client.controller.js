(function () {
  'use strict';

  angular
    .module('hosts')
    .controller('HostDashBoardController', HostDashBoardController);

  HostDashBoardController.$inject = ['$state', '$scope', 'Authentication', '$filter', '$window', 'MeetingService'];

  function HostDashBoardController($state, $scope, Authentication, $filter, $window,  MeetingService) {
    var vm = this;
    vm.authentication = Authentication;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    MeetingService.query(function (data) {
      vm.meetings = data;
      vm.buildPager();
    });
    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.meetings, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
 
    // OAuth provider request
    vm.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    }

 }
}());
