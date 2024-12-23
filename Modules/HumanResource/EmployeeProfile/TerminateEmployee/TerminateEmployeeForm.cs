using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeProfile.Forms;

[FormScript("EmployeeProfile.TerminateEmployee")]
[BasedOnRow(typeof(TerminateEmployeeRow), CheckNames = true)]
public class TerminateEmployeeForm
{

    [HalfWidth]
    public int NoticePeriod { get; set; }

    [HalfWidth]
    public DateTime TerminateDate { get; set; }

    public DateTime TerminateLeaveDate { get; set; }
   
}