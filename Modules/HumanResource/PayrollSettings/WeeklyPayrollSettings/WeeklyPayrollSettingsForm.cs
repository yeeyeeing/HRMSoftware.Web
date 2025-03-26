using Serenity.ComponentModel;
using System;
using System.Collections.Generic;

namespace HRMSoftware.PayrollSettings.Forms;

[FormScript("PayrollSettings.WeeklyPayrollSettings")]
[BasedOnRow(typeof(WeeklyPayrollSettingsRow), CheckNames = true)]
public class WeeklyPayrollSettingsForm
{
    public string Name { get; set; }
    [TextAreaEditor(Rows = 3)]
    public string Description { get; set; }

    [HalfWidth]
    public List<int> OccupationList { get; set; }
    [HalfWidth]
    public List<int> DepartmentList { get; set; }
    [HalfWidth]
    public List<int> DivisionList { get; set; }
    [HalfWidth]
    public List<int> JobGradeList { get; set; }
    [HalfWidth]
    public List<int> SectionList { get; set; }
    [HalfWidth]
    public List<int> CostCentreList { get; set; }
    // [HideOnInsert]
    //public List<int> NewAddedEmployee { get; set; }
    // public List<int> EmployeeList { get; set; }
    [HalfWidth]
    public int GenerateFirst { get; set; }
    [HalfWidth]
    public int GenerateSecond { get; set; }
    [HalfWidth]
    public int GenerateThird { get; set; }
    [HalfWidth]
    public int GenerateFourth { get; set; }
    [HideOnInsert]
    public List<int> NewAddedEmployee { get; set; }
    public List<int> EmployeeList { get; set; }
}