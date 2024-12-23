using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;
[Serenity.ComponentModel.EnumKey("HumanResource.EmployeeProfile.EPFClass")]
public enum EPFClass
{
    [Description("NONE")]
    None = 0,

    [Description("Class A(CLASS1)")]
    Class_1 = 1,

    [Description("Class E(CLASS5)")]
    Class_2 = 5,

    [Description("Class B(CLASS2)")]
    Class_3 = 2,

    [Description("Class D(CLASS4)")]
    Class_4 = 4,

    [Description("Class C(CLASS3)")]
    Class_5 = 3
}