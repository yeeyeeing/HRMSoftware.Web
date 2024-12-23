using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings.Columns;

[ColumnsScript("PayrollSettings.EmployerContributions")]
[BasedOnRow(typeof(EmployerContributionsRow), CheckNames = true)]
public class EmployerContributionsColumns
{
    [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    public int Id { get; set; }
    public string Description { get; set; }
    public double Amount { get; set; }
}