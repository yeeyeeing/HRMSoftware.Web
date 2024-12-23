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
    [TextAreaEditor(Rows = 3)]
    public string Description { get; set; }
    [OneThirdWidth]
    public string ShiftColor { get; set; }
    /*
    [OneThirdWidth]
    public DateTime StartDate { get; set; }
    [OneThirdWidth]
    public DateTime EndDate { get; set; }
    */

    public List<int> EmployeeList { get; set; }
    [IgnoreName, LabelWidth("0"),EmployeeGroupShiftEditor]
    public List<EmployeeGroupShiftPatternRow> Shifts { get; set; }

    [IgnoreName, LabelWidth("0"), EmployeeGroupShiftEditor]
    public List<EmployeeGroupShiftPatternRow> ActualShifts { get; set; }

}