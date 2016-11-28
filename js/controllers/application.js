//(function() {
  //application module which contains all of the controllers
  var application = angular.module("application", ['ngRoute', 'ngFileUpload', 'ngAnimate']);
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
  application.controller('UploadController', ['$scope', '$timeout', '$interval', function($scope, $timeout, $interval) {

    $scope.print835 = ":D";
    //$scope.alert = false;

    //when a file is dropped into the window...
    $scope.$watch('file', function (file) {
      if(file && file.length){
        data = fs.readFileSync($scope.file[0].path, 'utf8');
        $scope.fileName = $scope.file[0].name;

        //split the file by row delimiters ~ and section delimiters * to build a 2d array that we can search through.
        var x837lines = data.split('~');
        $scope.fileContents = x837lines.join('~\n');

        //create 2D array to store
        var x837array = [[]];

        for(var i = 0; i < x837lines.length; i++)
        {
          x837array.push(x837lines[i].split('*'));
        }
        x837array.splice(0,1); //take off the first empty element from initilizing.
        x837array.splice(x837array.length-1,1); //take off the last empty element.

        //check to see if this file is indeed an 837 file by checking the field which describes what type of edi file it is.
        if(x837array[2][1] !== "837") {
          //$scope.alert = true;
          $scope.newAlert("danger","Unable to process file. Make sure it is a valid EDI, X12, 837, file in .txt format. ");
          return false;
        } else {
          $scope.closeAlert(); //close any open alerts if there are any.
        }

        var now = new Date();

        var ISA01_Authorization_Information_Qualifier;
        var ISA02_Authorization_Information;
        var ISA03_Security_Information_Qualifier;
        var ISA04_Security_Information;
        var ISA05_Interchange_ID_Qualifier;
        var ISA06_Interchange_Sender_ID;
        var ISA07_Interchange_ID_Qualifier;
        var ISA08_Interchange_Receiver_ID;
        var ISA09_Interchange_Date;
        var ISA10_Interchange_Time;
        var ISA11_Interchange_Repetition_Separator;
        var ISA12_Interchange_Control_Version_Number;
        var ISA13_Interchange_Control_Number;
        var ISA14_Acknowledgement_Requested;
        var ISA15_Usage_Indicator;
        var ISA16_Component_Element_Separator;

        var GS01_Functional_Identifier_Code;
        var GS02_Application_Senders_Code;
        var GS03_Applications_Receiver_Code;
        var GS04_Date;
        var GS05_Time;
        var GS06_Group_Control_Number;
        var GS07_Responsible_Agency_Code;
        var GS08_Version_Release_Industry_Identifier_Code;

        var ST01_Transaction_Set_Identifier_Code;
        var ST02_Transaction_Set_Control_Number = 0;
        var ST03_Version_Release_Industry_Identifier_Code;


        //################################################################################
        //#             Payer Information - 1000A
        //################################################################################

        var N101_Payer_Identifier_Code = "PR";
        var N102_Payer_Name = "01 DMH MENTAL HEALTH SERVICES";

        var N301_Payer_Address = "1901 16TH STREET";

        var N401_Payer_City = "SACRAMENTO";
        var N402_Payer_State = "CA";
        var N403_Payer_Zip_Code = "95814";

        var PER_Contact_Info_Function_Code = "CX";
        var PER_Contact_Name = "Remittance Department";
        var PER_Contact_Qualifier = "TE";
        var PER_Contact_Phone_Number = "3015551234";
        var PER_Contact_Qualifier2 = "EM";
        var PER_Contact_Email = 'mpinson@dmh.xxx.gov';

        var PER_Technical_Info_Function_Code = "BL";
        var PER_Technical_Name = "Avatar Support";
        var PER_Technical_Qualifier = "TE";
        var PER_Technical_Phone_Number = "8665551234";

        //################################################################################
        //#              Payee Information 1000B
        //################################################################################

        var N101_Payee_Identifier_Code = "PE";
        var N102_Payee_Name;
        var N103_Payee_ID_Code_Qualifier;
        var N104_Payee_ID_Code;

        var N301_Payee_Address = "550 Vermont Ave";

        var N401_Payee_City = "Los Angeles";
        var N402_Payee_State = "CA";
        var N403_Payee_Zip_Code = "90010";

        //################################################################################
        //#              Claim Payment Information -- Loop 2100
        //################################################################################

        var CLP01_Submitter_ID;          //# Stored in CLM01 on the 837
        var CLP02_Claims_Status_Code;    //# 1 = Processed as Primary, 2 = Processed as Secondary, 4 = Denied
        var CLP03_Amount;                //# Can be negative for Claim Reversals
        var CLP04_Amount2;
        var CLP05_Amount3 = "";          //#
        var CLP06_Claim_Filing_Status;   //# HM = Health Maintenance Organization
        var CLP07_Reference_ID;          //# Counter
        var CLP08_Facility_Type_Code;
        var CLP09_Claim_Frequency_Code;

        var NM101_QC_Entity_Identifier_Code;
        var NM102_QC_Entity_Type_Qualifier;
        var NM103_QC_Last_or_Organization_Name;
        var NM104_QC_First_Name;
        var NM105_QC_Middle_Name;
        var NN106_QC_Name_Prefix;
        var NN107_QC_Name_Suffix;
        var NM108_QC_Identification_Code_Qualifier;
        var NM109_QC_Client_ID;

        //# REF*F8
        var REF01_F8_Qualifier = "F8";
        var REF02_F8_Data = "";

        //# REF*1W
        var REF01_1W_Qualifier = "1W";
        var REF02_1W_Data;

        var DTM01_232_Date_Time_Qualifier = 232;
        var DTM02_232_Service_Date;

        var DTM01_233_Date_Time_Qualifier = 233;
        var DTM02_233_Service_Date;

        //################################################################################
        //#              Claim Payment Information -- Loop 2110
        //################################################################################

        var SVC01_Procedure_Code;
        var SVC02_Line_Item_Charge_Amount;
        var SVC03_Line_Item_Provider_Payment_Amount;
        var SVC04_NUBC_Revenue_Code;
        var SVC05_Units_Of_Service_Paid_Count;

        var DTM01_472_Date_Time_Qualifier = 472;
        var DTM02_472_Service_Date;

        var CAS01_Claims_Adj_Group_Code;
        var CAS02_Claims_Adj_Reason_Code;
        var CAS03_Amount;

        var REF01_6R_Qualifier = "6R";
        var REF02_6R_Data;

        var REF01_6R_Qualifier = "6R";
        var REF02_6R_Data;

        var AMT01_Amount_Qualifier_Code = "B6";
        var AMT02_Service_Supplemental_Amount;


        //################################################################################
        //#  Claim Accepted / Rejected
        //################################################################################

        //################################################################################
        //#                                 Trailer                                      #
        //################################################################################

        var SE01_Transaction_Segment_Count;
        var SE02_Transaction_Set_Control_Number;

        var GE01_Number_of_Transaction_Sets_Included;
        var GE02_Group_Control_Number;

        var IEA01_Number_of_Included_Function_Group;
        var IEA02_Interchange_Control_Number;

        //################################################################################
        //#                       Service Arrays Variables                               #
        //################################################################################

        var NM1_QC_Entity_Identifier_Code;
        var NM1_QC_Entity_Type_Qualifier = [];
        var NM1_QC_Last_Name = [];
        var NM1_QC_First_Name = [];
        var NM1_QC_Middle_Name = [];
        var NM1_QC_Name_Prefix = [];
        var NM1_QC_Name_Suffix = [];
        var NM1_QC_ID_Code_Qualifier = [];
        var NM1_QC_Client_ID = [];

        var CLM_Service_Amt = [];
        var CLM_Claim_ID = [];

        var CLP_Client = [];
        var CLP_Submitter_ID = [];
        var CLP_Claims_Status_Code = [];
        var CLP_Amount = [];
        var CLP_Amount2 = [];
        var CLP_Claim_Filing_Status = [];
        var CLP_Reference_ID = [];
        var CLP_Facility_Type_Code = [];
        var CLP_Claim_Frequency_Code = [];

        var NM1_QC_ID_Code_qualifier;

        var REF02_F8_Information;
        var REF02_1W_Information;

        var DTM02_232_Beg_Date = [];
        var DTM02_233_End_Date = [];

        var SVC01_Service_Code = [];
        var SVC02_Amount = [];
        var SVC03_Amount_Paid = [];
        var SVC05_Units = [];

        var DTM02_472_Service_Date = [];

        var CAS01_Adjustment_Code;
        var CAS02_Admustment_Amount;
        var CAS03_Quantity;

        var REF02_6R_Information = [];


        //################################################################################
        //#                              Other Variables                                 #
        //################################################################################
        var service_date_cnt = 0;
        var claim_cnt = -1;
        var client_cnt = -1;

        var total_claim_count;
        var total_claim_amount;

        var cnt  = 0;
        var cnt2 = 0;
        var cnt3 = 0;
        var cnt4 = 0;
        var cntX = 0;
        var HL_cnt = 0;
        var HL_subscr_cnt = 0;

        var claim_lines;

        var Submitter_Number = 0;
        var Claim_ID = 0;
        var Client_ID = 0;
        var Services_Count = 0;

        var SE_835_Count = 15;
        var GE_835_Count = 0;
        var IEA_835_Count = 0;

        var current_date_time;
        var sec;
        var min;
        var hour;
        var mday;
        var mon;
        var year;
        var wday;
        var yday;
        var isdst;

        var random_number = 0;

      	for(var i = 0; i < x837array.length; i++)
        {
          if(x837array[i][0] == "ISA"){
      			console.log("ISA \n");
            ISA01_Authorization_Information_Qualifier = "00";
          	ISA02_Authorization_Information = x837array[i][2];
          	ISA03_Security_Information_Qualifier = "00";
          	ISA04_Security_Information = x837array[i][4];
          	ISA05_Interchange_ID_Qualifier = "ZZ";
          	ISA06_Interchange_Sender_ID = x837array[i][8];
          	ISA07_Interchange_ID_Qualifier = "ZZ";
          	ISA08_Interchange_Receiver_ID = x837array[i][6];
          	ISA11_Interchange_Repetition_Separator = "!";
          	ISA12_Interchange_Control_Version_Number = "00501";
          	ISA13_Interchange_Control_Number = x837array[i][13];
          	ISA14_Acknowledgement_Requested = "0";
          	ISA15_Usage_Indicator = "T";
          	ISA16_Component_Element_Separator = ":";
      		}
      		if(x837array[i][0] == "GS"){
      			console.log("GS \n");
            GS01_Functional_Identifier_Code = "HP";
          	GS08_Version_Release_Industry_Identifier_Code = "005010X221A1";
          	GS02_Application_Senders_Code = x837array[i][3];
          	GS03_Applications_Receiver_Code = x837array[i][2];
          	GS04_Date = now.format("yymmdd");
          	GS05_Time = now.format("HHMM");
          	GS06_Group_Control_Number = x837array[i][6];
          	GS07_Responsible_Agency_Code = "X";
      		}
      		if(x837array[i][0] == "ST"){
      			console.log("ST \n");
            ST01_Transaction_Set_Identifier_Code = "835";
          	//ST02_Transaction_Set_Control_Number++;
          	ST02_Transaction_Set_Control_Number = pad(++ST02_Transaction_Set_Control_Number, 4);
          	ST03_Version_Release_Industry_Identifier_Code = GS08_Version_Release_Industry_Identifier_Code;
      		}
      		if(x837array[i][0] == "NM1" && x837array[i][1] == "85"){
      			console.log("NM1 85 \n");
            N102_Payee_Name = x837array[i][3];
          	N103_Payee_ID_Code_Qualifier = x837array[i][8];
          	N104_Payee_ID_Code = x837array[i][9];
      		}
      		if(x837array[i][0] == "REF" && x837array[i][1] == "EI"){
      			console.log("REF EI \n");
            REF02_Payee_EIN = x837array[i][2];
      		}
      		if(x837array[i][0] == "NM1" && x837array[i][1] == "IL"){
      			console.log("NM1 IL \n");
            client_cnt++;
          	NM1_QC_Entity_Type_Qualifier[client_cnt] = x837array[i][2];
          	NM1_QC_Last_Name[client_cnt] = x837array[i][3];
          	NM1_QC_First_Name[client_cnt] = x837array[i][4];
          	NM1_QC_Middle_Name[client_cnt] = x837array[i][5];
          	NM1_QC_Name_Prefix[client_cnt] = x837array[i][6];
          	NM1_QC_Name_Suffix[client_cnt] = x837array[i][7];
          	NM1_QC_ID_Code_Qualifier[client_cnt] = x837array[i][8];
          	field_length = (x837array[i][9]).length;
          	client_ID = (x837array[i][9]).substr(3, field_length);
          	NM1_QC_Client_ID[client_cnt] = client_ID;
      		}
      		if(x837array[i][0] == "NM1" && x837array[i][1] == "PR"){
      			console.log("NM1 PR \n");
            N102_Payer_Name = x837array[i][3];
      		}
      		if(x837array[i][0] == "CLM"){
      			console.log("CLM \n");
            claim_cnt++;
          	CLP_Client[claim_cnt] = client_cnt;
          	CLM_Service_Amt[claim_cnt] = x837array[i][2];
          	CLM_Claim_ID[claim_cnt] = x837array[i][1];
          	CLP_Submitter_ID[claim_cnt] = x837array[i][1];
          	CLP_Claims_Status_Code[claim_cnt] = "1";
          	CLP_Amount[claim_cnt] = x837array[i][2];
          	CLP_Amount2[claim_cnt] = x837array[i][2];
          	CLP_Claim_Filing_Status[claim_cnt] = "HM";
          	CLP_Reference_ID[claim_cnt] = claim_cnt + random_number;
          	var values = (x837array[i][5]).split(':');
          	CLP_Facility_Type_Code[claim_cnt] = values[0];
          	CLP_Claim_Frequency_Code[claim_cnt] = values[2];
      		}
      		//if(x837array[i][0] == "REF" && x837array[i][1] == "EA"){
      		//	console.log("REF EA \n");
          //  tkx_client_id[claim_cnt] = x837array[i][2];
      		//}
      		if(x837array[i][0] == "SV1"){
      			console.log("SV1 \n");
            SVC01_Service_Code[claim_cnt] = x837array[i][1];
          	SVC02_Amount[claim_cnt] = x837array[i][2];
          	SVC03_Amount_Paid[claim_cnt] = x837array[i][2];
          	SVC05_Units[claim_cnt] = x837array[i][4];
      		}
      		if(x837array[i][0] == "DTP" && x837array[i][1] == "472"){
      			console.log("DTP 472 \n");
            DTM02_232_Beg_Date[claim_cnt] = x837array[i][3];
          	DTM02_233_End_Date[claim_cnt] = x837array[i][3];
          	DTM02_472_Service_Date[claim_cnt] = x837array[i][3];
      		}
      		if(x837array[i][0] == "REF" && x837array[i][1] == "6R"){
      			console.log("REF 6R \n");
            REF02_6R_Information[claim_cnt] = x837array[i][2];
      		}
        }

        var x835lines = [];

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
        x835lines.push(isa.join('*'));

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
        x835lines.push(gs.join('*'));

        var st = [
          "ST",
          "835",
          pad(ST02_Transaction_Set_Control_Number++, 4)
        ];
        x835lines.push(st.join('*'));
        SE_835_Count++;

        var bpr = [
          "BPR",
          "I",
          "TOTAL_CLAIM_AMOUNT",
          "C",
          "CHK",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          now.format("yyyymmdd")
        ];
        x835lines.push(bpr.join('*'));
        SE_835_Count++;

        var trn = [
          "TRN",
          "1",
          "1234567890"
        ];
        x835lines.push(trn.join('*'));
        SE_835_Count++;

        var ref = [
          "REF",
          "EV",
          "3PN"
        ];
        x835lines.push(ref.join('*'));
        SE_835_Count++;

        var dtm = [
          "DTM",
          "405",
          now.format("yyyymmdd")
        ];
        x835lines.push(dtm.join('*'));
        SE_835_Count++;

        //1000A segments
        var n1pr_1000A = [
          "N1",
          N101_Payer_Identifier_Code,
          N102_Payer_Name
        ];
        x835lines.push(n1pr_1000A.join('*'));
        SE_835_Count++;

        var n3pr_1000A = [
          "N3",
          N301_Payer_Address
        ];
        x835lines.push(n3pr_1000A.join('*'));
        SE_835_Count++;

        var n4pr_1000A = [
          "N4",
          N401_Payer_City,
          N402_Payer_State,
          N403_Payer_Zip_Code
        ];
        x835lines.push(n4pr_1000A.join('*'));
        SE_835_Count++;

        var per1_1000A = [
          "PER",
          PER_Contact_Info_Function_Code,
          PER_Contact_Name,
          PER_Contact_Qualifier,
          PER_Contact_Phone_Number,
          PER_Contact_Qualifier2,
          PER_Contact_Email
        ];
        x835lines.push(per1_1000A.join('*'));
        SE_835_Count++;

        var per2_1000A = [
          "PER",
          PER_Technical_Info_Function_Code,
          PER_Technical_Name,
          PER_Technical_Qualifier,
          PER_Technical_Phone_Number
        ];
        x835lines.push(per2_1000A.join('*'));
        SE_835_Count++;


        //1000B segments
        var n1pe_1000B = [
          "N1",
          N101_Payee_Identifier_Code,
          N102_Payee_Name,
          N103_Payee_ID_Code_Qualifier,
          N104_Payee_ID_Code
        ];
        x835lines.push(n1pe_1000B.join('*'));
        SE_835_Count++;

        var n3pe_1000B = [
          "N3",
          N301_Payee_Address
        ];
        x835lines.push(n3pe_1000B.join('*'));
        SE_835_Count++;

        var n4pe_1000B = [
          "N4",
          N401_Payee_City,
          N402_Payee_State,
          N403_Payee_Zip_Code
        ];
        x835lines.push(n4pe_1000B.join('*'));
        SE_835_Count++;


        //2000 segments
        var ref_2000 = [
          "REF",
          "TJ",
          REF02_Payee_EIN
        ];
        x835lines.push(ref_2000.join('*'));
        SE_835_Count++;

        var lx_2000 = [
          "LX",
          "1"
        ];
        x835lines.push(lx_2000.join('*'));
        SE_835_Count++;


        //2100B segments
        for(var i = 0; i < CLP_Submitter_ID.length; i++){
          console.log(CLP_Submitter_ID.length);
          var clp_2100B = [
            "CLP",
            CLP_Submitter_ID[i],
            "1",
            CLP_Amount[i],
            CLP_Amount2[i],
            CLP05_Amount3,
            "MC",
            CLP_Reference_ID[i]
          ];
          x835lines.push(clp_2100B.join('*'));

          var nm1_2100B = [
            "NM1",
            "QC",
            NM1_QC_Entity_Type_Qualifier[CLP_Client[i]],
            NM1_QC_Last_Name[CLP_Client[i]],
            NM1_QC_First_Name[CLP_Client[i]],
            NM1_QC_Middle_Name[CLP_Client[i]],
            NM1_QC_Name_Prefix[CLP_Client[i]],
            NM1_QC_Name_Suffix[CLP_Client[i]],
            "MI",
            NM1_QC_Client_ID[CLP_Client[i]]
          ];
          x835lines.push(nm1_2100B.join('*'));

          var ref_2100B = [
            "REF",
            "F8",
            CLP_Reference_ID[i]
          ];
          x835lines.push(ref_2100B.join('*'));

          var dtm_2100B = [
            "DTM",
            "232",
            DTM02_232_Beg_Date[i]
          ];
          x835lines.push(dtm_2100B.join('*'));

          var dtm2_2100B = [
            "DTM",
            "233",
            DTM02_233_End_Date[i]
          ];
          x835lines.push(dtm2_2100B.join('*'));

          var amt_2100B = [
            "AMT",
            "AU",
            CLP_Amount2[i]
          ];
          x835lines.push(amt_2100B.join('*'));

          var svc_2100B = [
            "SVC",
            SVC01_Service_Code[i],
            SVC02_Amount[i],
            SVC03_Amount_Paid[i],
            "",
            SVC05_Units[i]
          ];
          x835lines.push(svc_2100B.join('*'));

          var dtm3_2100B = [
            "DTM",
            "472",
            DTM02_472_Service_Date[i]
          ];
          x835lines.push(dtm3_2100B.join('*'));

          var ref2_2100B = [
            "REF",
            "6R",
            REF02_6R_Information[i]
          ];
          x835lines.push(ref2_2100B.join('*'));

          var amt2_2100B = [
            "AMT",
            "B6",
            CLP_Amount[i]
          ];
          x835lines.push(amt2_2100B.join('*'));

      		SE_835_Count += 10;
        }//end 2100B for




        var se = [
          "SE",
          SE_835_Count,
          ST02_Transaction_Set_Control_Number
        ];
        x835lines.push(se.join('*'));

        var ge = [
          "GE",
          "1",
          x837array[1][6]
        ];
        x835lines.push(ge.join('*'));

        var iea = [
          "IEA",
          "1",
          x837array[0][13]
        ];
        x835lines.push(iea.join('*'));

        x835lines.push("");

        //combine all of the individual lines with *, and combine all lines with ~
        /*
        var x835lines = [];
        x835lines.push(
          isa.join('*'),
          gs.join('*'),
          st.join('*'),
          bpr.join('*'),
          trn.join('*'),
          ref.join('*'),
          dtm.join('*'),
          n1pr_1000A.join('*'),
          n3pr_1000A.join('*'),
          n4pr_1000A.join('*'),
          per1_1000A.join('*'),
          per2_1000A.join('*'),
          n1pe_1000B.join('*'),
          n3pe_1000B.join('*'),
          n4pe_1000B.join('*'),
          ref_2000.join('*'),
          lx_2000.join('*'),
          se.join('*'),
          ge.join('*'),
          iea.join('*')
        );
        x835lines.push("");
        */


        //display the 835 with linebreaks
        $scope.x835FileContents = x835lines.join('~\n');
        //printed text file will have no linebreaks
        $scope.print835 = x835lines.join('~');
        //enable the option to export the 835 file in the File menu.
        $("#export835").removeClass("disabled");

        $(".drop-box").hide();
        $(".filePanels").show();
        $.material.init()
      }
    });

    //exports a text file containing all of the generated 835 data
    $scope.export835 = function () {
      //validate the filename here.

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
      //$timeout(function() {
      //  $scope.alert = false;
      //});
      //$scope.$apply();
    };

    //Method for controlling alert messages. type is string of 'warning','danger','success', or 'info'.
    //Message is the text to be displayed.
    var removeMessge;
    $scope.newAlert = function(type, message) {
      // Dont create a new alert if one already exists
      if( angular.isDefined(removeMessge) ) return;

      removeMessge = $interval(function(){
        $scope.closeAlert();
      },6000);

      $scope.alert = true;
      $scope.alertType = type;
      $scope.alertMessage = message;
    };
    //assigned to the 'x' on the alert box. Closes the alert and cancels the interval.
    $scope.closeAlert = function(){
      $scope.alert = false;
      $interval.cancel(removeMessge);
      removeMessge = undefined;
    };


  }]); //end UploadController

  //attach all of the controllers to the application module
  //application.controller(controllers);
//})();
