Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client'
});

Router.route('flight');


Router.route('sleep', {
  name: 'sleep',
  controller: 'SleepController',
  where: 'client'
});