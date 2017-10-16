(function () {
  'use strict';

  angular
    .module('hosts')
    .controller('MeetingViewController', MeetingViewController);

  MeetingViewController.$inject = ['$state', '$scope', '$http', 'Authentication', '$filter', '$window', 'meetingResolve'];

  function MeetingViewController($state, $scope, $http, Authentication, $filter, $window, meeting) {
    var vm = this;
    vm.authentication = Authentication;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    var meetingId = meeting._id;
    console.log(location.pathname)
    $http.get('/api/host/single/meeting/' + meetingId).success(function (response) {
      vm.meeting = response;
      console.log(vm.meeting.registeredUsersInfo);
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.meeting.registeredUsersInfo, {
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
