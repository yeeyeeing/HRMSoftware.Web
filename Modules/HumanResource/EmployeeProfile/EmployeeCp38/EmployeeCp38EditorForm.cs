using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeProfile.Forms;

[FormScript("EmployeeProfile.EmployeeCp38")]
[BasedOnRow(typeof(EmployeeCp38Row), CheckNames = true)]
public class EmployeeCp38EditorForm
{
  

    [OneThirdWidth]
    public double Cp38Amount { get; set; }
    [OneThirdWidth]
    public DateTime EffectiveFrom { get; set; }
    [OneThirdWidth]
    public DateTime EffectiveUntil { get; set; }
}