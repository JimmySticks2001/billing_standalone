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


    //split the file by row delimiters ~ and section delimiters * to build a 2d array that we can search through.
    var x837lines = data.split('~');
    x837array = [[]];
    for(var i = 0; i < x837lines.length; i++)
    {
      x837array.push(x837lines[i].split('*'));
    }
    x837array.splice(0,1); //take off the first empty element from initilizing.
    x837array.splice(x837array.length-1,1); //take off the last empty element.

    console.log(x837array);

    var now = new Date();

    //construct the ISA header from data found in the uploaded 837
    var isa = [
      "ISA",
      "00",
      x837array[0][2], //row 0 section 2 in the 837 file
      "00",
      x837array[0][4],
      "ZZ",
      x837array[0][8],
      "ZZ",
      x837array[0][6],
      now.format("yymmdd"),
      now.format("HHMM"),
      "!",
      "00501",
      x837array[0][13],
      "0",
      "T",
      ":"
    ];

    //construct GS header element from 837 info
    var gs = [
      "GS",
      "HP",
      x837array[1][3],
      x837array[1][2],
      now.format("yyyymmdd"),
      now.format("HHMM"),
      x837array[1][6],
      "X",
      "005010X221A1"
    ];


    //var st = [
    //  "ST",
    //  "835",
    //  "INCREMENT"
    //];

    //construct GE footer from 837 info
    var ge = [
      "GE",
      "ST_COUNT",
      x837array[1][6]
    ];

    var iea = [
      "IEA",
      "GS_COUNT",
      x837array[0][13]
    ];



    var x835lines = [];
    x835lines.push(
      isa.join('*'),
      gs.join('*'),

      ge.join('*'),
      iea.join('*')
    );

    x835lines.push("");


    $scope.fileContents = x835lines.join('~\n');

    $(".drop-box").hide();
    $(".uploadContents").show();
  };

};


//attach all of the controllers to the application module
application.controller(controllers);
