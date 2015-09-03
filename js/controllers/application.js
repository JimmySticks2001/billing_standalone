//(function() {
  //application module which contains all of the controllers
  var application = angular.module("application", ['ngRoute', 'ngFileUpload']);
  //var application = angular.module("application", ['ngRoute', 'ngFileUpload']);

  //var controllers = {};

  /*
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
  */

  //Handles file upload and excel parsing
  application.controller('UploadController', ['$scope', function($scope) {

    $scope.print835 = ":D";

    //when a file is dropped into the window...
    $scope.$watch('file', function (file) {
      if(file && file.length){
        data = fs.readFileSync($scope.file[0].path, 'utf8');
        $scope.fileName = $scope.file[0].name;

        //split the file by row delimiters ~ and section delimiters * to build a 2d array that we can search through.
        var x837lines = data.split('~');
        $scope.fileContents = x837lines.join('~\n');
        x837array = [[]];
        for(var i = 0; i < x837lines.length; i++)
        {
          x837array.push(x837lines[i].split('*'));
        }
        x837array.splice(0,1); //take off the first empty element from initilizing.
        x837array.splice(x837array.length-1,1); //take off the last empty element.

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

        //combine all of the individual lines with *, and combine all lines with ~
        var x835lines = [];
        x835lines.push(
          isa.join('*'),
          gs.join('*'),

          ge.join('*'),
          iea.join('*')
        );
        x835lines.push("");

        //display the 835 with linebreaks
        $scope.x835FileContents = x835lines.join('~\n');
        //printed text file will have no linebreaks
        $scope.print835 = x835lines.join('~');
        //enable the option to export the 835 file in the File menu.
        $("#export835").removeClass("disabled");

        $(".drop-box").hide();
        $(".filePanels").show();
      }
    });

    //exports a text file containing all of the generated 835 data
    $scope.export835 = function () {
      console.log($scope.print835);

      var chooser = $('#fileDialog');
      chooser.unbind('change');
      chooser.change(function(evt)
      {
        fs.writeFile($(this).val(), $scope.print835, function(err) {
          if(err) {return console.log(err);}
        });
      });

      chooser.trigger('click');
    };

    //Resets all of the fields in preparation for uploading a new 837
    $scope.newUpload = function() {
      $(".drop-box").show();
      $(".filePanels").hide();
      $("#export835").addClass("disabled");
    };


  }]); //end UploadController

  //attach all of the controllers to the application module
  //application.controller(controllers);
//})();
