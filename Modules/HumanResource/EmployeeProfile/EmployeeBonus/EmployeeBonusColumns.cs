using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile.Columns;

[ColumnsScript("EmployeeProfile.EmployeeBonus")]
[BasedOnRow(typeof(EmployeeBonusRow), CheckNames = true)]
public class EmployeeBonusColumns
{
    [EditLink]

    public string EmployeeID { get; set; }
    public string EmployeeName { get; set; }
    [Width(200, Max = 250, Min = 200)]
    public double BonusAmount { get; set; }
    [Width(200, Max = 250, Min = 200)]
    public int PayMonth { get; set; }
    [Width(200, Max = 250, Min = 200)]
    public int PayYear { get; set; }
    public string BonusDescription { get; set; }
    [DisplayName("Job Grade"), Hidden]
    public string JobGradeName { get; set; }
    [DisplayName("Occupation"), Hidden]
    public string OccupationName { get; set; }
    [DisplayName("Department"), Hidden]
    public string DepartmentName { get; set; }
    [DisplayName("Division"), Hidden]
    public string DivisionName { get; set; }


}