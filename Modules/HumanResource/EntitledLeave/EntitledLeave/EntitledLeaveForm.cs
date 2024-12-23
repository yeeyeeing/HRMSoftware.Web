using Microsoft.AspNetCore.Mvc;
using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EntitledLeave.Forms;

[FormScript("EntitledLeave.EntitledLeave")]
[BasedOnRow(typeof(EntitledLeaveRow), CheckNames = true)]
public class EntitledLeaveForm
{
    [HiddenInput]
    public int EmployeeRowId { get; set; }
    public string EmployeeName { get; set; }
   // public string EmployeeID { get; set; }

    public double EntitledAnnualLeave { get; set; }

    public int EntitledHospitalisationLeave { get; set; }
    public int EntitledMarriageLeave { get; set; }
    public int EntitledMaternityLeave { get; set; }
    public int EntitledPaternityLeave { get; set; }
    public int EntitledSickLeave { get; set; }
    public int BringForward { get; set; }
    public int EntitledCompassionateLeave { get; set; }

    
}