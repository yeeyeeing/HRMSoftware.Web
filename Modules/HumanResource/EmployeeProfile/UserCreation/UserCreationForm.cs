using Serenity.ComponentModel;
using System;
using System.Collections.Generic;

namespace HRMSoftware.EmployeeProfile.Forms;

[FormScript("EmployeeProfile.UserCreation")]
[BasedOnRow(typeof(UserCreationRow), CheckNames = true)]
public class UserCreationForm
{

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
    [ThreeQuarterWidth]
    public List<int> EmployeeRowList { get; set; }
    [QuarterWidth]
    public bool AllEmployee { get; set; }
    public List<int> EmployeeRowHrPriveledge { get; set; }

}