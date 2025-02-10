using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeProfile.Forms;

[FormScript("EmployeeProfile.EmployeeCp38")]
[BasedOnRow(typeof(EmployeeCp38Row), CheckNames = true)]
public class EmployeeCp38Form
{
    [HalfWidth]
    public int EmployeeRowId { get; set; }
    [HalfWidth]
    public double Cp38Amount { get; set; }
    [HalfWidth]
    public DateTime EffectiveFrom { get; set; }
    [HalfWidth]
    public DateTime EffectiveUntil { get; set; }
}