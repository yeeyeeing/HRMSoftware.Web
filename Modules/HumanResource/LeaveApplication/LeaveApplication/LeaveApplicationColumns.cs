using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.LeaveApplication.Columns;

[ColumnsScript("LeaveApplication.LeaveApplication")]
[BasedOnRow(typeof(LeaveApplicationRow), CheckNames = true)]
public class LeaveApplicationColumns
{
    // [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    //public int Id { get; set; }    [EditLink]
    [EditLink]
    [Width(100)]
    public string EmployeeID { get; set; }

    
    public string EmployeeName { get; set; }

    // public int EmployeeRowId { get; set; }
    [DisplayName("From"), Width(100)]
    [QuickFilter(CssClass = "hidden-xs")]
    public DateTime StartDate { get; set; }

    [DisplayName("Until"), Width(100)]
    public DateTime EndDate { get; set; }
    public string LeaveReason { get; set; }

    [Width(100,Min =100,Max = 300)]
    public string LeaveDesc { get; set; }

    //public string LeaveDescription { get; set; }
    // public string EmployeeName
    [Width(100)]
    public int HalfDay { get; set; }
  
    [QuickFilter(CssClass = "hidden-xs")]
    public int EmployeeStatus { get; set; }
    [QuickFilter(CssClass = "hidden-xs")]
    public int HrStatus { get; set; }
    public int Status { get; set; }



    [DisplayName("Job Grade"), Hidden]
    public string JobGradeName { get; set; }
    [DisplayName("Occupation"), Hidden]
    public string OccupationName { get; set; }
    [DisplayName("Department"), Hidden]
    public string DepartmentName { get; set; }
    [DisplayName("Division"), Hidden]
    public string DivisionName { get; set; }
    [DisplayName("Cost Centre"), Hidden]
    public string CostCentreName { get; set; }

}