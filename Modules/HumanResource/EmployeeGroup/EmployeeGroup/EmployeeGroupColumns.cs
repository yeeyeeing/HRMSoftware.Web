using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeGroup.Columns;

[ColumnsScript("EmployeeGroup.EmployeeGroup")]
[BasedOnRow(typeof(EmployeeGroupRow), CheckNames = true)]
public class EmployeeGroupColumns
{
    [EditLink]
    public string Name { get; set; }
    [Width(100, Max = 300)]
    public string Description { get; set; }
    //[Width(100, Max = 300)]
   // public DateTime StartDate { get; set; }
   // [Width(100, Max = 300)]
   // public DateTime EndDate { get; set; }
}