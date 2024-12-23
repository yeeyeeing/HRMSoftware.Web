using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings.Columns;

[ColumnsScript("PayrollSettings.PayrollDeductions")]
[BasedOnRow(typeof(PayrollDeductionsRow), CheckNames = true)]
public class PayrollDeductionsColumns
{
    public int Id { get; set; }

    [EditLink]
    public string Description { get; set; }

    public double Amount { get; set; }
    public int GovernmentPayments { get; set; }
}