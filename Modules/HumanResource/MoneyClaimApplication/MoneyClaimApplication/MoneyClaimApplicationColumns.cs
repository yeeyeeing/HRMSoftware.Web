using Serenity.ComponentModel;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.MoneyClaimApplication.Columns;

[ColumnsScript("MoneyClaimApplication.MoneyClaimApplication")]
[BasedOnRow(typeof(MoneyClaimApplicationRow), CheckNames = true)]
public class MoneyClaimApplicationColumns
{
    //  [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    //public int Id { get; set; }
    [EditLink]
    public string EmployeeName { get; set; }
    [EditLink]
    public string EmployeeID { get; set; }

    [DisplayName("Date"), Width(100)]
    [ QuickFilter(CssClass = "hidden-xs")]
    public DateTime ClaimingDate { get; set; }
    [QuickFilter(CssClass = "hidden-xs")]
    [Width(100, Min = 100, Max = 200)]
    public string ClaimReason { get; set; }

    public double ClaimAmount { get; set; }
    [Width(100, Min = 100, Max = 200)]
    public string Description { get; set; }
    //[QuickFilter(CssClass = "hidden-xs")]
    //public int Status { get; set; }

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

}