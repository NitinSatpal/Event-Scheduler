(function (app) {
  'use strict';
  app.registerModule('hosts', ['core']);
  app.registerModule('hosts.services');
  app.registerModule('hosts.routes', ['ui.router', 'core.routes', 'hosts.services']);
}(ApplicationConfiguration));
