//application module which contains all of the controllers
var application = angular.module("application", ['ngRoute']);
var controllers = {};

controllers.UserController = function ($scope) {
  $scope.users = [
    {username: 'bop', password: 'bop'},
    {username: 'test', password: 'test'}
  ];

  $scope.userLogin = function () {
    var notification = "";
    for(i = 0; i < $scope.users.length; i++)
    {
      if($scope.users[i].username == $scope.userName && $scope.users[i].password == $scope.userPassword)
      {
        //redirect to upload
        window.location.href = '#/upload';
        break;
      }
      else
      {
        $scope.notification = "Username or password is incorrect"
        break;
      }
    }

  };
};


controllers.UserController = function ($scope) {

  $scope.uploadExcel = function () {
    var workbook = XLSX.readFile('test.xlsx');
  };

};






//attach all of the controllers to the application module
application.controller(controllers);
