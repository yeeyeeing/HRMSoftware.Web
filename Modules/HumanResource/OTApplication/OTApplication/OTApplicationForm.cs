using Serenity.ComponentModel;
using System;

namespace HRMSoftware.OTApplication.Forms;

[FormScript("OTApplication.OTApplication")]
[BasedOnRow(typeof(OTApplicationRow), CheckNames = true)]
public class OTApplicationForm
{

    //public string RejectedEmployeeName { get; set; }
    //public string ApproveEmployeeName { get; set; }
    public string EmployeeUpdatedName { get; set; }
    public string HrUpdatedName { get; set; }
    public int EmployeeUpdated { get; set; }
    public int HrUpdated { get; set; }

    [HalfWidth]
    public int EmployeeRowId { get; set; }
    [HalfWidth]
    public string EmployeeName { get; set; }

    [OneThirdWidth]
    public float OtRate { get; set; }
    [OneThirdWidth]
    public int OtReasonId { get; set; }
    [OneThirdWidth]
    public DateTime OtDate { get; set; }
    [HalfWidth]
    public string StartingAt { get; set; }
    [HalfWidth]
    public string EndingAt { get; set; }
    [TextAreaEditor(Rows = 5)]
    public string OTDescription { get; set; }

    [OneThirdWidth]
    public bool WeekendOt { get; set; }
    [OneThirdWidth]
    public bool PublicHolidayOt { get; set; }
    [OneThirdWidth]
    public bool WeekdayOt { get; set; }

}