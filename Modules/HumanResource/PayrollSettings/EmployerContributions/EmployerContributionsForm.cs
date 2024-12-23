using Serenity.ComponentModel;
using System;

namespace HRMSoftware.PayrollSettings.Forms;

[FormScript("PayrollSettings.EmployerContributions")]
[BasedOnRow(typeof(EmployerContributionsRow), CheckNames = true)]
public class EmployerContributionsForm
{
    public string Description { get; set; }
    public double Amount { get; set; }
}