application.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'UserController',
      templateUrl: './views/login.html'
    })
    .when('/upload', {
      controller: 'UserController',
      templateUrl: './views/upload.html'
    })
    .otherwise({ redirectTo: '/'});

});
