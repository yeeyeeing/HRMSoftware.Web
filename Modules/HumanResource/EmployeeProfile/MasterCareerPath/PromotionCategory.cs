using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;
[Serenity.ComponentModel.EnumKey("HumanResource.EmployeeProfile.Category")]
public enum Category
{
    [Description("DIVISION")]
    DIVISION = 0,
    [Description("DEPARTMENT")]
    DEPARTMENT = 1,
    [Description("SECTION")]
    SECTION = 2,
    [Description("OCCUPATION")]
    OCCUPATION = 3,
    [Description("JOB GRADE")]
    JOBGRADE = 4,
    [Description("COST CENTRE")]
    COSTCENTRE = 5
}