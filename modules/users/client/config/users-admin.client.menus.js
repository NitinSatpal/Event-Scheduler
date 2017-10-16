(function () {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Users',
      state: 'admin.users'
    });
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Departments',
      state: 'adminUser.departments'
    });
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Metadata',
      state: 'adminUser.metadata'
    });
    /* menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Articles',
      state: 'admin.articles.list'
    });
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Multimedia',
      state: 'admin.multimedia.operations'
    }); */
  }
}());
