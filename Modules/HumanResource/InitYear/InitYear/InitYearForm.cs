using HRMSoftware.AnnualLeaveJobGradePolicy;
using HRMSoftware.AnnualLeavePolicy;
using HRMSoftware.SickLeavePolicy;
using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.InitYear.Forms;

[FormScript("HumanResource.InitYear.InitYear")]
[BasedOnRow(typeof(InitYearRow), CheckNames = true)]
public class InitYearForm
{
    [Tab("Basic Company Information")]
    [FullWidth]
    public int Year { get; set; }
    

    // public string BasedCountry { get; set; }
    [FullWidth]
    public int LeaveBringForwardMethod { get; set; }



    [HalfWidth]
    public int HospitalisationLeave { get; set; }
    [HalfWidth]
    public int PaternityLeave { get; set; }
    [HalfWidth]
    public int MaternityLeave { get; set; }
    [HalfWidth]
    public int CompassionateLeave { get; set; }
    [FullWidth]
    public int MarriageLeave { get; set; }
    [Category("Month Of Service To Eligible For")]
    [HalfWidth]
    public int MonthOfServiceToEligibleForMaternityLeave { get; set; }
    [HalfWidth]
    public int MonthOfServiceToEligibleForPaternityLeave { get; set; }

    [OneThirdWidth]
    public int BringForwardDays { get; set; }
    [OneThirdWidth]
    public int BringForwardPercentage { get; set; }
    [OneThirdWidth]
    public int LeaveRoundUp { get; set; }


    [Category("")]
    [Tab("Annual Leave(Year of Service)"), IgnoreName, LabelWidth("0"), AnnualLeavePolicyEditor]
    public List<AnnualLeavePolicyRow> PolicyList { get; set; }

    [Category("")]
    [Tab("Annual Leave(Job Grade)"), IgnoreName, LabelWidth("0"), AnnualLeaveJobGradePolicyEditor]
    public List<AnnualLeaveJobGradePolicyRow> AnnulLeaveBasedOnJobGrade { get; set; }

    [Category("")]
    [Tab("Sick Leave Policy"), IgnoreName, LabelWidth("0"), SickLeavePolicyEditor]
    public List<SickLeavePolicyRow> SickLeavePolicyList { get; set; }


}