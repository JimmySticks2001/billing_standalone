//application module which contains all of the controllers
var application = angular.module("application", ['ngRoute', 'ngFileUpload']);
var controllers = {};

//Handles user login and whatnot
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


//Handles file upload and excel parsing
controllers.UploadController = function ($scope, Upload) {

  $scope.$watch('file', function (file) {
    if(file && file.length){
      $scope.uploadExcel($scope.file[0].path);
    }
  });

  $scope.uploadExcel = function (filePath) {
    data = fs.readFileSync(filePath, 'utf8');
  	$scope.fileContents = data;
    console.log(data);
    $(".drop-box").hide();
  };

};


//attach all of the controllers to the application module
application.controller(controllers);
