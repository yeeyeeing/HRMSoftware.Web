using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeProfile.Forms;

[FormScript("EmployeeProfile.EmployeeResign")]
[BasedOnRow(typeof(EmployeeResignRow), CheckNames = true)]
public class EmployeeResignForm
{



    [HalfWidth]
    public int NoticePeriod { get; set; }
    [HalfWidth]
    public DateTime ResignationDate { get; set; }
    public DateTime ResignLeaveDate { get; set; }
}