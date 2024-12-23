using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EntitledLeave.Columns;

[ColumnsScript("EntitledLeave.EntitledLeave")]
[BasedOnRow(typeof(EntitledLeaveRow), CheckNames = true)]
public class EntitledLeaveColumns
{
    [EditLink]
    public string EmployeeName { get; set; }
    // public DateTime ProjectedRenewalDate { get; set; }
    [Width(100, Max = 300)]
    public double EntitledAnnualLeave { get; set; }

    [Width(120, Max = 400)]
    public int EntitledHospitalisationLeave { get; set; }
    [Width(100, Max = 300)]
    public int EntitledMarriageLeave { get; set; }
    [Width(100, Max = 300)]
    public int EntitledMaternityLeave { get; set; }
    [Width(100, Max = 300)]
    public int EntitledPaternityLeave { get; set; }
    [Width(100, Max = 300)]
    public int EntitledSickLeave { get; set; }
    

    [DisplayName("Job Grade"), Hidden]
    public string JobGradeName { get; set; }
    [DisplayName("Occupation"), Hidden]
    public string OccupationName { get; set; }
    [DisplayName("Department"), Hidden]
    public string DepartmentName { get; set; }
    [DisplayName("Division"), Hidden]
    public string DivisionName { get; set; }
}