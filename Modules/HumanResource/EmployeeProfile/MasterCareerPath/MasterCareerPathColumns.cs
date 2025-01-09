using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile.Columns;

[ColumnsScript("EmployeeProfile.MasterCareerPath")]
[BasedOnRow(typeof(MasterCareerPathRow), CheckNames = true)]
public class MasterCareerPathColumns
{
    [EditLink]

    public string CareerPathCode { get; set; }
    public int CareerPathType { get; set; }
    public string Description { get; set; }
}