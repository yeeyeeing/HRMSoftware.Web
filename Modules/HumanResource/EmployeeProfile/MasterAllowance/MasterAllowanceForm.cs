using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile.Forms;

[FormScript("EmployeeProfile.MasterAllowance")]
[BasedOnRow(typeof(MasterAllowanceRow), CheckNames = true)]
public class MasterAllowanceForm
{
    [HalfWidth]
    public string AllowanceCode { get; set; }

    [HalfWidth]
    public double Amount { get; set; }
   
    [TextAreaEditor(Rows = 3)]
    public string Description { get; set; }




    [Category("Allowance Frequency")]
    [QuarterWidth]
    public int Recurring { get; set; }
    [QuarterWidth]
    public int OneTime { get; set; }

    [Category("Allowance Conditions")]
    public int AllowanceSubjections { get; set; }
    [QuarterWidth, HideOnInsert, HideOnUpdate]
    public int FullAttendance { get; set; }
    [QuarterWidth, HideOnInsert, HideOnUpdate]
    public int NoLate { get; set; }
    [QuarterWidth, HideOnInsert, HideOnUpdate]
    public int NoAbsence { get; set; }
    [QuarterWidth, HideOnInsert, HideOnUpdate]
    public int NoEarlyLeaving { get; set; }

    [Category("Exempted Leaves")]
    [QuarterWidth]
    public int ExemptUnpaidLeave { get; set; }
    [QuarterWidth]
    public int ExemptHospitalisationLeave { get; set; }
    [QuarterWidth]
    public int ExemptSickLeave { get; set; }
    [QuarterWidth]
    public int ExemptAnnualLeave { get; set; }
    [QuarterWidth]
    public int ExemptMaternityLeave { get; set; }
    [QuarterWidth]
    public int ExemptPaternityLeave { get; set; }
    [QuarterWidth]
    public int ExemptMarriageLeave { get; set; }
    [QuarterWidth]
    public int ExemptCompassionateLeave { get; set; }
    [QuarterWidth]
    public int ExemptEmergencyLeave { get; set; }
    [QuarterWidth]
    public int ExemptGatepassLeave { get; set; }




    [Category("Allowance Subjections")]

    public int SubjectionEis { get; set; }
    public int SubjectionEpf { get; set; }
    public int SubjectionSocso { get; set; }
    public int SubjectionPcb { get; set; }
    public int SubjectionHrdf { get; set; }
    public int SubjectionOt { get; set; }
}