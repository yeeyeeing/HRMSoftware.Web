using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.OTApplication.Columns;

[ColumnsScript("OTApplication.OTApplication")]
[BasedOnRow(typeof(OTApplicationRow), CheckNames = true)]
public class OTApplicationColumns
{
   
    [EditLink]
    public string EmployeeName { get; set; }
    [EditLink]
    public string EmployeeID { get; set; }

    [DisplayName("Date"), Width(100)]
    [EditLink, QuickFilter(CssClass = "hidden-xs")]
    public DateTime OtDate { get; set; }
   // public string ApproveEmployeeName { get; set; }
    public string OtReason { get; set; }
    public string OTDescription { get; set; }

    // [DisplayName("Starting Time"), Width(100)]
    // public string StartingAt { get; set; }
    // [DisplayName("Ending Time"), Width(100)]
    //public string EndingAt{ get; set; }
    [QuickFilter(true,CssClass = "hidden-xs")]
    public int EmployeeStatus { get; set; }
    [QuickFilter(CssClass = "hidden-xs")]
    public int HrStatus    { get; set; }
    public int Status { get; set; }


}