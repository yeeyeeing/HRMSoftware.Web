using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings.Columns;

[ColumnsScript("PayrollSettings.PayrollWizard")]
[BasedOnRow(typeof(PayrollWizardRow), CheckNames = true)]
public class PayrollWizardColumns
{
    [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    public int Id { get; set; }
    public int EmployeeRowId { get; set; }
    [EditLink]
    public string EmployeeId { get; set; }
    public DateTime PayDate { get; set; }
    public double Deduction { get; set; }
    public double Earnings { get; set; }
    public double Nett { get; set; }
    public double EmployeeSocso { get; set; }
    public double EmployeeEpf { get; set; }
    public double EmployeeEis { get; set; }
    public string PayrollTable { get; set; }
    public string Remarks { get; set; }
    public double EmployeePcb { get; set; }
    public double EmployerHrdf { get; set; }
    public double EmployerEpf { get; set; }
    public double EmployerEis { get; set; }
    public double EmployerSocso { get; set; }
    public string EmployerTable { get; set; }
    public DateTime PayPeriodStart { get; set; }
    public DateTime PayPeriodEnd { get; set; }
}