using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.AbsentRecord.Columns;

[ColumnsScript("AbsentRecord.AbsentRecord")]
[BasedOnRow(typeof(AbsentRecordRow), CheckNames = true)]
public class AbsentRecordColumns
{
    [EditLink]
    public string EmployeeName { get; set; }
    public string EmployeeId { get; set; }
    [ Width(100, Max = 300),    QuickFilter(CssClass = "hidden-xs")]
    public DateTime AbsentDate { get; set; }
    public int Processed { get; set; }


    [DisplayName("Job Grade"), Hidden]
    public string JobGradeName { get; set; }
    [DisplayName("Occupation"), Hidden]
    public string OccupationName { get; set; }
    [DisplayName("Department"), Hidden]
    public string DepartmentName { get; set; }
    [DisplayName("Division"), Hidden]
    public string DivisionName { get; set; }


}