
//################################################################################
//#                                 Header                                       #
//################################################################################






var BPR01_Remittance_Info_Only = "I";
var BPR02_Payment_Amount;
var BPR03_Check_or_Credit_Amt = "C";
var BPR04_Type_of_Check = "CHK";
var BPR16_Check_Issue_Date;

var TRN01_Check_EFT_Trace_Number_Qualifier = "1";
var TRN02_EFT_Trace_Number;
var TRN03_Payers_EIN = "1999999999";

var REF01_Receiver_ID_Qualifier = "EV";           //# Not required info only
var REF02_Receiver_ID = "3PN";

var DTM01_Process_Date_Qualifier = "405";
var DTM02_Process_Date;

var REF01_Payee_ID_Qualifier = "TJ";           //# Not required info only
var REF02_Payee_EIN;

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

var 101_Payee_Identifier_Code = "PE";
var 102_Payee_Name;
var 103_Payee_ID_Code_Qualifier;
var 104_Payee_ID_Code;

var 301_Payee_Address = "550 Vermont Ave";

var 401_Payee_City = "Los Angeles";
var 402_Payee_State = "CA";
var 403_Payee_Zip_Code = "90010";

//################################################################################
//#              Claim Payment Information -- Loop 2100
//################################################################################

var LP01_Submitter_ID;          //# Stored in CLM01 on the 837
var LP02_Claims_Status_Code;    //# 1 = Processed as Primary, 2 = Processed as Secondary, 4 = Denied
var LP03_Amount;                //# Can be negative for Claim Reversals
var LP04_Amount2;
var LP05_Amount3 = "";          //#
var LP06_Claim_Filing_Status;   //# HM = Health Maintenance Organization
var LP07_Reference_ID;          //# Counter
var LP08_Facility_Type_Code;
var LP09_Claim_Frequency_Code;

var M101_QC_Entity_Identifier_Code;
var M102_QC_Entity_Type_Qualifier;
var M103_QC_Last_or_Organization_Name;
var M104_QC_First_Name;
var M105_QC_Middle_Name;
var N106_QC_Name_Prefix;
var N107_QC_Name_Suffix;
var M108_QC_Identification_Code_Qualifier;
var M109_QC_Client_ID;

//# REF*F8
var EF01_F8_Qualifier = "F8";
var EF02_F8_Data = "";

//# REF*1W
var EF01_1W_Qualifier = "1W";
var EF02_1W_Data;

var TM01_232_Date_Time_Qualifier = 232;
var TM02_232_Service_Date;

var TM01_233_Date_Time_Qualifier = 233;
var TM02_233_Service_Date;

//################################################################################
//#              Claim Payment Information -- Loop 2110
//################################################################################

var VC01_Procedure_Code;
var VC02_Line_Item_Charge_Amount;
var VC03_Line_Item_Provider_Payment_Amount;
var VC04_NUBC_Revenue_Code;
var VC05_Units_Of_Service_Paid_Count;

var TM01_472_Date_Time_Qualifier = 472;
var TM02_472_Service_Date;

//# CAS     -- Adjustment
var AS01_Claims_Adj_Group_Code;
var AS02_Claims_Adj_Reason_Code;
var AS03_Amount;

//# REF*6R --
var EF01_6R_Qualifier = "6R";
var EF02_6R_Data;

//# REF*6R --
var EF01_6R_Qualifier = "6R";
var EF02_6R_Data;

var MT01_Amount_Qualifier_Code = "B6";
var MT02_Service_Supplemental_Amount;


//################################################################################
//#  Claim Accepted / Rejected
//################################################################################

//################################################################################
//#                                 Trailer                                      #
//################################################################################

var E01_Transaction_Segment_Count;
var E02_Transaction_Set_Control_Number;

var E01_Number_of_Transaction_Sets_Included;
var E02_Group_Control_Number;

var EA01_Number_of_Included_Function_Group;
var EA02_Interchange_Control_Number;

//################################################################################
//#                       Service Arrays Variables                               #
//################################################################################

var M1_QC_Entity_Identifier_Code;
var M1_QC_Entity_Type_Qualifier;
var M1_QC_Last_Name;
var M1_QC_First_Name;
var M1_QC_Middle_Name;
var N1_QC_Name_Prefix;
var N1_QC_Name_Suffix;
var M1_QC_ID_Code_Qualifier;
var M1_QC_Client_ID;

var LM_Service_Amt;
var LM_Claim_ID;

var LP_Client;
var LP_Submitter_ID;
var LP_Claims_Status_Code;
var LP_Amount;
var LP_Amount2;
var LP_Claim_Filing_Status;
var LP_Reference_ID;
var LP_Facility_Type_Code;
var LP_Claim_Frequency_Code;

var N1_QC_ID_Code_qualifier;

var EF02_F8_Information;
var EF02_1W_Information;

var TM02_232_Beg_Date;
var TM02_233_End_Date;

var VC01_Service_Code;
var VC02_Amount;
var VC03_Amount_Paid;
var VC05_Units;

var TM02_472_Service_Date;

var AS01_Adjustment_Code;
var AS02_Admustment_Amount;
var AS03_Quantity;

var EF02_6R_Information;
var REF02_6R_Information;

//################################################################################
var tkx_reject_claim;
var tkx_client_id;
var tkx_last_name;
var tkx_first_name;
var tkx_service_date;
var tkx_service;
var tkx_amount;
var tkx_accepted_amount;
var tkx_accepted_count;
var tkx_rejected_amount;
var tkx_rejected_count;

var label_text;
var chkbutton;

var mw;
var check_frame;

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

var SE_835_Count = 0;
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



sub process_ISA_segment
{
	my @segment_field = @_;
}

sub process_GS_segment
{
	my @segment_field = @_;
}

sub process_ST_segment
{
	my @segment_field = @_;
}

sub process_payee_segment
{
	my @segment_field = @_;
}

sub process_REF_EI_segment
{
	# REF*EI
	my @segment_field = @_;
	$REF02_Payee_EIN = $segment_field[2];
}

sub process_client_segment
{
	# NM1*IL
	my @segment_field = @_;
	$client_cnt++;

	$NM1_QC_Entity_Type_Qualifier[$client_cnt] = $segment_field[2];
	$NM1_QC_Last_Name[$client_cnt] = $segment_field[3];
	$NM1_QC_First_Name[$client_cnt] = $segment_field[4];
	$NM1_QC_Middle_Name[$client_cnt] = $segment_field[5];
	$MN1_QC_Name_Prefix[$client_cnt] = $segment_field[6];
	$MN1_QC_Name_Suffix[$client_cnt] = $segment_field[7];
	$NM1_QC_ID_Code_Qualifier[$client_cnt] = $segment_field[8];
	my $field_length = length($segment_field[9]);
	my $client_ID = substr($segment_field[9], 3, $field_length);
	$NM1_QC_Client_ID[$client_cnt] = $client_ID;
}

sub process_payer_segment
{
	# NM1*PR

}

sub process_claim_segment
{
	# CLM
	$claim_cnt ++;
	my @segment_field = @_;
	$CLP_Client[$claim_cnt] = $client_cnt;
	$CLM_Service_Amt[$claim_cnt] = $segment_field[2];
	$CLM_Claim_ID[$claim_cnt] = $segment_field[1];
	$CLP_Submitter_ID[$claim_cnt] = $segment_field[1];
	$CLP_Claims_Status_Code[$claim_cnt] = "1";
	$CLP_Amount[$claim_cnt] = $segment_field[2];
	$CLP_Amount2[$claim_cnt] = $segment_field[2];
	$tkx_accepted_count++;
	$tkx_accepted_amount += $segment_field[2];
	$CLP_Claim_Filing_Status[$claim_cnt] = "HM";
	$CLP_Reference_ID[$claim_cnt] = $claim_cnt + $random_number;
	my @values = split(':',$segment_field[5]);
	$CLP_Facility_Type_Code[$claim_cnt] = $values[0];
	$CLP_Claim_Frequency_Code[$claim_cnt] = $values[2];
	$tkx_amount[$claim_cnt]= $segment_field[2];
	$tkx_first_name[$claim_cnt] = $NM1_QC_Last_Name[$client_cnt];
	$tkx_last_name[$claim_cnt] = $NM1_QC_First_Name[$client_cnt];
}

sub process_client_id
{
	# REF*EA
	my @segment_field = @_;
	$tkx_client_id[$claim_cnt] = $segment_field[2];
}

sub process_service_date_segment
{
	my @segment_field = @_;
	$DTM02_232_Beg_Date[$claim_cnt] = $segment_field[3];
	$DTM02_233_End_Date[$claim_cnt] = $segment_field[3];
	$DTM02_472_Service_Date[$claim_cnt] = $segment_field[3];
	$tkx_service_date[$claim_cnt] = $segment_field[3];
}

sub process_service_segment
{
	my @segment_field = @_;
	$SVC01_Service_Code[$claim_cnt] = $segment_field[1];
	$SVC02_Amount[$claim_cnt] = $segment_field[2];
	$SVC03_Amount_Paid[$claim_cnt] = $segment_field[2];
	$SVC05_Units[$claim_cnt] = $segment_field[4];
	$tkx_service[$claim_cnt] = $segment_field[1];
}

sub process_claim_reference_number
{
	my @segment_field = @_;
	$REF02_6R_Information[$claim_cnt] = $segment_field[2];
}

sub print_segments
{
	&print_ISA_segment;
	&print_GS_segment;
	&print_ST_segment;
	&print_BPR_segment;
	&print_1000A_segments;
	&print_1000B_segments;
	&print_2000_segments;
	&print_2100B_segments;
	&print_SE_segment;
	&print_trailer;
}

sub print_ISA_segment
{
	$IEA_835_Count = 0;
	$ISA09_Interchange_Date = ($year - 2000) . $mon . $mday;
	$ISA10_Interchange_Time = $hour . $min;
	$ISA13_Interchange_Control_Number = $mday . $hour . $min . "0" . $sec;
	print EDI835FILE "ISA*$ISA01_Authorization_Information_Qualifier*$ISA02_Authorization_Information*$ISA03_Security_Information_Qualifier*$ISA04_Security_Information*$ISA05_Interchange_ID_Qualifier*$ISA06_Interchange_Sender_ID*$ISA07_Interchange_ID_Qualifier*$ISA08_Interchange_Receiver_ID*$ISA09_Interchange_Date*$ISA10_Interchange_Time*$ISA11_Interchange_Repetition_Separator*$ISA12_Interchange_Control_Version_Number*$ISA13_Interchange_Control_Number*$ISA14_Acknowledgement_Requested*$ISA15_Usage_Indicator*$ISA16_Component_Element_Separator~";
}

sub print_GS_segment
{
	print EDI835FILE "GS*$GS01_Functional_Identifier_Code*$GS02_Application_Senders_Code*$GS03_Applications_Receiver_Code*$GS04_Date*$GS05_Time*$GS06_Group_Control_Number*$GS07_Responsible_Agency_Code*$GS08_Version_Release_Industry_Identifier_Code~";
	$IEA_835_Count++;
	$GE_835_Count = 0;
}

sub print_ST_segment
{
	print EDI835FILE "ST*$ST01_Transaction_Set_Identifier_Code*$ST02_Transaction_Set_Control_Number~";
	$GE_835_Count++;
	$SE_835_Count++;
}

sub print_BPR_segment
{
	&Calc_Payment_Amount();
	$BPR01_Remittance_Info_Only = "I";
	$BPR02_Payment_Amount = $total_claim_amount;
	$BPR03_Check_or_Credit_Amt = "C";
	$BPR04_Type_of_Check = "CHK";
	$BPR16_Check_Issue_Date = $GS04_Date;

	$TRN01_Check_EFT_Trace_Number_Qualifier = "1";
	$TRN02_EFT_Trace_Number = "3" . $yday . $random_number;
	$REF01_Receiver_ID_Qualifier = "EV";           # Not required info only
	$REF02_Receiver_ID = "3PN";

	$DTM01_Process_Date_Qualifier = "405";
	$DTM02_Process_Date = $GS04_Date;

	print EDI835FILE "BPR*$BPR01_Remittance_Info_Only*$BPR02_Payment_Amount*$BPR03_Check_or_Credit_Amt*$BPR04_Type_of_Check************$BPR16_Check_Issue_Date~";
	print EDI835FILE "TRN*$TRN01_Check_EFT_Trace_Number_Qualifier*$TRN02_EFT_Trace_Number*$TRN03_Payers_EIN~";
	print EDI835FILE "REF*$REF01_Receiver_ID_Qualifier*$REF02_Receiver_ID~";
	print EDI835FILE "DTM*$DTM01_Process_Date_Qualifier*$DTM02_Process_Date~";
	$SE_835_Count += 4;
}

sub Calc_Payment_Amount
{
	my $indx = 0;
	$total_claim_amount = 0;
	foreach (@tkx_reject_claim)
	{
		if ($tkx_reject_claim[$indx] ne "D")
		{
			$total_claim_amount += $SVC02_Amount[$indx];
		}
		$indx++;
	}
}

sub print_1000A_segments
{
	print EDI835FILE "N1*$N101_Payer_Identifier_Code*$N102_Payer_Name~";
	print EDI835FILE "N3*$N301_Payer_Address~";
	print EDI835FILE "N4*$N401_Payer_City*$N402_Payer_State*$N403_Payer_Zip_Code~";
	print EDI835FILE "PER*$PER_Contact_Info_Function_Code*$PER_Contact_Name*$PER_Contact_Qualifier*$PER_Contact_Phone_Number*$PER_Contact_Qualifier2*$PER_Contact_Email~";
	print EDI835FILE "PER*$PER_Technical_Info_Function_Code*$PER_Technical_Name*$PER_Technical_Qualifier*$PER_Technical_Phone_Number~";

	$SE_835_Count += 5;
}

sub print_1000B_segments
{
	$N301_Payee_Address = "550 Vermont";
	$N401_Payee_City = "Los Angeles";
	$N402_Payee_State = "CA";
	$N403_Payee_Zip_Code = "90010";
	print EDI835FILE "N1*$N101_Payee_Identifier_Code*$N102_Payee_Name*$N103_Payee_ID_Code_Qualifier*$N104_Payee_ID_Code~";
	print EDI835FILE "N3*$N301_Payee_Address~";
	print EDI835FILE "N4*$N401_Payee_City*$N402_Payee_State*$N403_Payee_Zip_Code~";
	$SE_835_Count+= 3;
}

sub print_2000_segments
{
	$Services_Count++;
	print EDI835FILE "REF*$REF01_Payee_ID_Qualifier*$REF02_Payee_EIN~";
	print EDI835FILE "LX*$Services_Count~";
	$SE_835_Count += 2;
}

sub print_2100B_segments
{
	$cnt = 0;
	foreach (@CLP_Submitter_ID)
	{
		$CLP01_Submitter_ID = $CLP_Submitter_ID[$cnt];
		$CLP02_Claims_Status_Code = "1";
		$CLP03_Amount = $CLP_Amount[$cnt];
		if ($tkx_reject_claim[$cnt] eq "D")
		{
			$CLP04_Amount2 = 0;
		} else {
			$CLP04_Amount2 = $CLP_Amount2[$cnt];
		}
		$CLP06_Claim_Filing_Status = "MC";
		$CLP07_Reference_ID = $CLP_Reference_ID[$cnt];
		$CLP08_Facility_Type_Code = $CLP_Facility_Type_Code[$cnt];
		$CLP09_Claim_Frequency_Code = $CLP_Claim_Frequency_Code[$cnt];
		print EDI835FILE "CLP*$CLP01_Submitter_ID*$CLP02_Claims_Status_Code*$CLP03_Amount*$CLP04_Amount2*$CLP05_Amount3*$CLP06_Claim_Filing_Status*$CLP07_Reference_ID~";

		$NM101_QC_Entity_Identifier_Code = "QC";
		$NM102_QC_Entity_Type_Qualifier = $NM1_QC_Entity_Type_Qualifier[$CLP_Client[$cnt]];
		$NM103_QC_Last_or_Organization_Name = $NM1_QC_Last_Name[$CLP_Client[$cnt]];
		$NM104_QC_First_Name = $NM1_QC_First_Name[$CLP_Client[$cnt]];
		$NM105_QC_Middle_Name = $NM1_QC_Middle_Name[$CLP_Client[$cnt]];
		$MN106_QC_Name_Prefix = $MN1_QC_Name_Prefix[$CLP_Client[$cnt]];
		$MN107_QC_Name_Suffix = $MN1_QC_Name_Suffix[$CLP_Client[$cnt]];
		$NM108_QC_Identification_Code_Qualifier = "MI";
		$NM109_QC_Client_ID = $NM1_QC_Client_ID[$CLP_Client[$cnt]];

		print EDI835FILE "NM1*$NM101_QC_Entity_Identifier_Code*$NM102_QC_Entity_Type_Qualifier*$NM103_QC_Last_or_Organization_Name*$NM104_QC_First_Name*$NM105_QC_Middle_Name*$MN106_QC_Name_Prefix*$MN107_QC_Name_Suffix*$NM108_QC_Identification_Code_Qualifier*$NM109_QC_Client_ID~";

		$REF01_F8_Qualifier = "F8";
		$REF02_F8_Data = $CLP_Reference_ID[$cnt];;
		print EDI835FILE "REF*$REF01_F8_Qualifier*$REF02_F8_Data~";

		$DTM01_232_Date_Time_Qualifier = 232;
		$DTM02_232_Service_Date = $DTM02_232_Beg_Date[$cnt];
		print EDI835FILE "DTM*$DTM01_232_Date_Time_Qualifier*$DTM02_232_Service_Date~";

		$DTM01_233_Date_Time_Qualifier = 233;
		$DTM02_233_Service_Date = $DTM02_233_End_Date[$cnt];
		print EDI835FILE "DTM*$DTM01_233_Date_Time_Qualifier*$DTM02_233_Service_Date~";

		if ($tkx_reject_claim[$cnt] ne "D")
		{
			print EDI835FILE "AMT*AU*$CLP_Amount2[$cnt]~";
			$SE_835_Count ++
		}

		$SVC01_Procedure_Code = $SVC01_Service_Code[$cnt];
		$SVC02_Line_Item_Charge_Amount = $SVC02_Amount[$cnt];
		if ($tkx_reject_claim[$cnt] eq "D")
		{
			$SVC03_Line_Item_Provider_Payment_Amount = "0";
		} else {
			$SVC03_Line_Item_Provider_Payment_Amount = $SVC03_Amount_Paid[$cnt];
		}
		$SVC04_NUBC_Revenue_Code = "";
		$SVC05_Units_Of_Service_Paid_Count = sprintf("%d", $SVC05_Units[$cnt]);
		print EDI835FILE "SVC*$SVC01_Procedure_Code*$SVC02_Line_Item_Charge_Amount*$SVC03_Line_Item_Provider_Payment_Amount*$SVC04_NUBC_Revenue_Code*$SVC05_Units_Of_Service_Paid_Count~";

		$DTM01_472_Date_Time_Qualifier = 472;
		$DTM02_472_Service_Date = $DTM02_472_Service_Date[$cnt];
		print EDI835FILE "DTM*$DTM01_472_Date_Time_Qualifier*$DTM02_472_Service_Date~";

		if ($tkx_reject_claim[$cnt] eq "D")
		{
			$CAS01_Claims_Adj_Group_Code = "CO";
			$CAS02_Claims_Adj_Reason_Code = 177;
			$CAS03_Amount = $CLP_Amount[$cnt];
			print EDI835FILE "CAS*$CAS01_Claims_Adj_Group_Code*$CAS02_Claims_Adj_Reason_Code*$CAS03_Amount~";
			$SE_835_Count++;
		}

		$REF01_6R_Qualifier = "6R";
		$REF02_6R_Data = $REF02_6R_Information[$cnt];
		print EDI835FILE "REF*$REF01_6R_Qualifier*$REF02_6R_Data~";

		if ($tkx_reject_claim[$cnt] eq "D")
		{
			$AMT02_Service_Supplemental_Amount = 0;
		} else {
			$AMT01_Amount_Qualifier_Code = "B6";
			$AMT02_Service_Supplemental_Amount = $CLP_Amount[$cnt];
			print EDI835FILE "AMT*$AMT01_Amount_Qualifier_Code*$AMT02_Service_Supplemental_Amount~";
			$SE_835_Count++;

		}

		$cnt++;
		$SE_835_Count += 8;
	}
}
sub print_SE_segment
{
	$SE_835_Count++;
	$SE01_Transaction_Segment_Count = $SE_835_Count;
	$SE02_Transaction_Set_Control_Number = $ST02_Transaction_Set_Control_Number;
	print EDI835FILE "SE*$SE01_Transaction_Segment_Count*$SE02_Transaction_Set_Control_Number~";
	$SE_835_Count = 0;
}

sub print_trailer
{
	$GE02_Group_Control_Number = $GS06_Group_Control_Number;
	$GE01_Number_of_Transaction_Sets_Included = $GE_835_Count;

	print EDI835FILE "GE*$GE01_Number_of_Transaction_Sets_Included*$GE02_Group_Control_Number~";

	$IEA02_Interchange_Control_Number = $ISA13_Interchange_Control_Number;
	$IEA01_Number_of_Included_Function_Group = $IEA_835_Count;
	print EDI835FILE "IEA*$IEA01_Number_of_Included_Function_Group*$IEA02_Interchange_Control_Number~";
}

sub get_random_number
{
	my $range = 99999;
	my $minimum = 100000;

	$random_number = int(rand($range)) + $minimum;
}
