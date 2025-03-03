using HRMSoftware.EmployeeGroup;
using HRMSoftware.Shift;
using Serenity.ComponentModel;
using System;
using System.Collections.Generic;

namespace HRMSoftware.EmployeeGroup.Forms;

[FormScript("EmployeeGroup.EmployeeGroup")]
[BasedOnRow(typeof(EmployeeGroupRow), CheckNames = true)]
public class EmployeeGroupForm
{
    public string Name { get; set; }
    [OneThirdWidth]
    public string ShiftColor { get; set; }
    [TextAreaEditor(Rows = 3)]
    public string Description { get; set; }

    /*
    [OneThirdWidth]
    public DateTime StartDate { get; set; }
    [OneThirdWidth]
    public DateTime EndDate { get; set; }
    */
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
    [HideOnInsert]
    public List<int> NewAddedEmployee { get; set; }
    public List<int> EmployeeList { get; set; }

    
    [IgnoreName, LabelWidth("0"),EmployeeGroupShiftEditor]
    public List<EmployeeGroupShiftPatternRow> Shifts { get; set; }

    [IgnoreName, LabelWidth("0"), EmployeeGroupShiftEditor]
    public List<EmployeeGroupShiftPatternRow> ActualShifts { get; set; }

}