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

    [HideOnUpdate, HideOnInsert]
    public string SuperiorRejectReason { get; set; }
    public string HrUpdatedName { get; set; }

    [HideOnUpdate, HideOnInsert]
    public string HrRejectReason { get; set; }
    public int EmployeeUpdated { get; set; }
    public int HrUpdated { get; set; }

    [HalfWidth]
    public int EmployeeRowId { get; set; }
    [HalfWidth]
    public string EmployeeName { get; set; }

    [HalfWidth]
    public int OtReasonId { get; set; }
    [HalfWidth]
    public DateTime OtDate { get; set; }

    [OneThirdWidth]
    public float OtRate { get; set; }
    [OneThirdWidth]
    public string StartingAt { get; set; }
    [OneThirdWidth]
    public string EndingAt { get; set; }
    [HalfWidth]
    public float OtHourBuffer { get; set; }
    [HalfWidth]
    public float OtPayBuffer { get; set; }

    [TextAreaEditor(Rows = 5)]
    public string OTDescription { get; set; }

    [OneThirdWidth]
    public bool WeekendOt { get; set; }
    [OneThirdWidth]
    public bool PublicHolidayOt { get; set; }
    [OneThirdWidth]
    public bool WeekdayOt { get; set; }

}