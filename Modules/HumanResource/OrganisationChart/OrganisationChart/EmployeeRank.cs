using System.ComponentModel;

namespace HRMSoftware.OrganisationChart;
[Serenity.ComponentModel.EnumKey("OrganisationChart.EmployeeRank")]
public enum EmployeeRank
{
    [Description("HR")]
    Rejected = 1,
    [Description("Superior")]
    Pending = 2,
    [Description("Superior and HR")]
    Approved = 3
}