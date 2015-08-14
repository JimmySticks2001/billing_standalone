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
      $scope.uploadExcel($scope.file);
    }
  });

  $scope.uploadExcel = function (file) {
    var workbook = XLSX.readFile($scope.file[0].path);

    var result = [];
  	workbook.SheetNames.forEach(function(sheetName) {
  		var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
  		if(csv.length > 0){
  			result.push("SHEET: " + sheetName);
  			result.push("");
  			result.push(csv);
  		}
  	});
  	$scope.fileContents = result.join("\n");
    $(".drop-box").hide();
  };

};


//attach all of the controllers to the application module
application.controller(controllers);
