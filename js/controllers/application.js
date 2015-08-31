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

  //hide the upload contents when navigating to the page
  $(".uploadContents").hide();

  //when a file is dropped into the window, uploadExcel.
  $scope.$watch('file', function (file) {
    if(file && file.length){
      $scope.uploadExcel($scope.file[0].path);
    }
  });

  $scope.uploadExcel = function (filePath) {
    data = fs.readFileSync(filePath, 'utf8');
  	//$scope.fileContents = data;
    //console.log(data);


    //parse the stupid edi x12 837 shitfile here
    var x837lines = data.split('~');
    var x835lines = [];
    console.log(x837lines);

    var now = new Date();

    //for(i = 0; i < x837lines.length; i++)
    //{
      var x837ISAlineItems = x837lines[0].split('*');
      var x837GAlineItems = x837lines[1].split('*');
      var x837STlineItems = x837lines[2].split('*');

      var isa = [
        "ISA",
        "00",
        x837ISAlineItems[2],
        "00",
        x837ISAlineItems[4],
        "ZZ",
        x837ISAlineItems[8],
        "ZZ",
        x837ISAlineItems[6],
        now.format("yymmdd"),
        now.format("HM"),
        "!",
        "00501",
        x837ISAlineItems[13],
        "0",
        "T",
        ":"
      ];

      var gs = [
        "GS",
        "HP",
        x837GAlineItems[3],
        x837GAlineItems[2],
        now.format("yyyymmdd"),
        now.format("HMs"),
        x837GAlineItems[6],
        "X",
        "005010X221A1"
      ];


      x835lines.push(
        isa.join('*'),
        gs.join('*')
      );

      x835lines.push("");
    //}

    $scope.fileContents = x835lines.join('~\n');

    $(".drop-box").hide();
    $(".uploadContents").show();
  };

};


//attach all of the controllers to the application module
application.controller(controllers);
