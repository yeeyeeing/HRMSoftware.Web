using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile.Forms;

[FormScript("EmployeeProfile.EmployeeProfile")]
[BasedOnRow(typeof(EmployeeProfileRow), CheckNames = true)]
public class EmployeeProfileForm
{
    [Tab("Basic Employee Information")]
    [HideOnUpdate, HideOnInsert]
    public DateTime ResignationDate { get; set; }
    [HideOnUpdate, HideOnInsert]
    public DateTime ResignLeaveDate { get; set; }

    [HideOnUpdate, HideOnInsert]
    public DateTime TerminateDate { get; set; }
    [HideOnUpdate, HideOnInsert]
    public DateTime TerminateLeaveDate { get; set; }


    
    [Category("Basic Info")]
    public string EmployeeImg { get; set; }
  
    [HalfWidth]
    public string EmployeeName { get; set; }
  
    [HalfWidth]
    public string EmployeeID { get; set; }
    
    [HalfWidth]
    public int Sex { get; set; }
    

    //[HideOnInsert]
    //public DateTime LastPaymentDate { get; set; }
    [HalfWidth]
    public DateTime Birthday { get; set; }
    [HalfWidth]
    public string EmployeeEmail { get; set; }

    [HalfWidth]
    public int EmployeeType { get; set; }


    [HalfWidth]
    public DateTime RecruitmentDate { get; set; }

    [HalfWidth]
    public string TelNumber1 { get; set; }


    [HalfWidth]
    public string TelNumber2 { get; set; }




    [HalfWidth]
    public int MaritalStatus { get; set; }

    
    [HalfWidth]
    public string Nric { get; set; }
   

    [HalfWidth]
    public DateTime RetireDate { get; set; }

    //[HalfWidth]
    //public int ProbationPeriod { get; set; }

    //[HalfWidth]
    //public DateTime ProbationPeriodEnd { get; set; }


    //[HideOnInsert]
    //public int NoticePeriod { get; set; }


    [HalfWidth]
    public int RaceID { get; set; }
 
    [HalfWidth]
    public int NationalityID { get; set; }
    [HalfWidth]
    public int StateID { get; set; }

    [HalfWidth]
    public int CityID { get; set; }


    [Category("Probation")]


    [OneThirdWidth]
    public int PassedProbation { get; set; }


    [OneThirdWidth]
    public DateTime ProbationPeriodFrom { get; set; }

    [OneThirdWidth]
    public DateTime ProbationPeriodUntil { get; set; }

    
    [Category("Passport Details")]
    [HalfWidth]
    public string WorkingPermit { get; set; }

    [HalfWidth]
    public DateTime ArrivalDate { get; set; }


    [HalfWidth]
    public DateTime WorkingPermitIssueDate { get; set; }
    [HalfWidth]
    public DateTime WorkingPermitExpireDate { get; set; }
    [HalfWidth]
    public DateTime WorkingPermitValidFrom { get; set; }
    [HalfWidth]
    public DateTime WorkingPermitValidUntil { get; set; }


    
    [HalfWidth]
    public string PassportNumber { get; set; }
    [HalfWidth]
    public DateTime PassportIssueDate { get; set; }
    [HalfWidth]
    public int PassportValidPeriod { get; set; }
    [HalfWidth]
    public DateTime PassportExpiryDate { get; set; }



    [Category("Address")]
    public string Address { get; set; }
    [HalfWidth]
    public string PostalCode { get; set; }
    [HalfWidth]
    public int CountryID { get; set; }


    [Category("")]

    [Tab("Working Information")]
    [HalfWidth]
    public int Cp8dID { get; set; }
    [HalfWidth]
    public int DepartmentID { get; set; }
    [HalfWidth]
    public int DivisionID { get; set; }
    [HalfWidth]
    public int SectionID { get; set; }
    [HalfWidth]
    public int JobGradeID { get; set; }
    [HalfWidth]
    public int OccupationID { get; set; }
    [HalfWidth]
    public int CostCentreID { get; set; }

    public string JobDescription { get; set; }
    
    [Category("User Creation")]

    [OneThirdWidth]
    public int CreateUser { get; set; }

    [OneThirdWidth]
    public int GrantHRPrivilege { get; set; }

    [HalfWidth]
    public string UserName { get; set; }

    [HalfWidth]
    public string UserPassword { get; set; }




    [Tab("Payments Information")]
    [Category("")]

    [OneThirdWidth]
    public int WorkingSpouse { get; set; }
    [OneThirdWidth]
    public int ChildrenInUniversity { get; set; }
    [OneThirdWidth]
    public int ChildrenUnderEighteen { get; set; }

    [HalfWidth]
    public int DisabledChildInUniversity { get; set; }
    [HalfWidth]
    public int DisabledChild { get; set; }


    [OneThirdWidth]
    public double BasicSalary { get; set; }

    [OneThirdWidth]
    public int DailyWorkingMinute { get; set; }

    [OneThirdWidth]
    public double NightShiftAllowancePerDay { get; set; }


    [HalfWidth]
    public int BankID { get; set; }

    [HalfWidth]
    public string BankAccountNumber { get; set; }
    /*
    [HalfWidth]
    public int SocsoClass { get; set; }

    [HalfWidth]
    public string SocsoAccountNumber { get; set; }



    [HalfWidth]
    public string PcbRate { get; set; }



    [HalfWidth]
    public int EpfClass { get; set; }
    [HalfWidth]
    public string EpfAccountNumber { get; set; }


    [HalfWidth]
    public int EisClass { get; set; }
    //[HalfWidth]
    //public string EISnumber { get; set; }
    */

    [HalfWidth]
    public int EpfContribution { get; set; }

    [Category("Payment Mode")]

    public bool OtPayEntitlement { get; set; }
    public bool FixedOtRateOption { get; set; }
    public int PayByMonth { get; set; }
    public int PayByHour { get; set; }
    public int PayByDay { get; set; }




    [Category("Allowances")]
    [IgnoreName, LabelWidth("0"), EmployeeAllowanceEditor]
    public List<EmployeeAllowanceRow> AllowanceLists { get; set; }

    [Category("Deductions")]
    [IgnoreName, LabelWidth("0"), FixedDeductionEditor]
    public List<FixedDeductionRow> FixedDeductionList { get; set; }



    [Tab("Government Payments")]
    [Category("Epf")]

    [HalfWidth]
    public int EpfClass { get; set; }
    [HalfWidth]
    public string EpfAccountNumber { get; set; }


    [Category("Eis")]

    [MediumHalfLargeQuarterWidth]
    public int EisClass { get; set; }

    [Category("Socso")]


    [OneThirdWidth]
    public int SocsoClass { get; set; }

    
    [OneThirdWidth]
    public string SocsoAccountNumber { get; set; }
    [OneThirdWidth]
    public DateTime SsfwEffectiveDate { get; set; }


    

    [Category("Pcb")]


    [HalfWidth]
    public string PCBnumber { get; set; }
    [Tab("Rates")]

    [Category("Rates")]
    public DateTime CalculationDate { get; set; }
    public double WorkingHour { get; set; }
    public double WorkingDays { get; set; }
    public double DailyRateBase { get; set; }
    public double NplRateBase { get; set; }
    public double OtRateWeekday { get; set; }
    public double OtRateWeekend { get; set; }
    public double OtRatePublicHoliday { get; set; }

}