using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile.Columns;

[ColumnsScript("EmployeeProfile.EmployeeCareerPath")]
[BasedOnRow(typeof(EmployeeCareerPathRow), CheckNames = true)]
public class EmployeeCareerPathColumns
{
    
    [Width(100, Max = 300),EditLink]
    public string CareerPathCode { get; set; }
 
    [Width(100, Max = 300)]
    public DateTime EffectiveDate { get; set; }
    [Width(1000, Max = 1000)]
    public string Description { get; set; }
}