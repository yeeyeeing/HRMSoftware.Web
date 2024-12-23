using Serenity.ComponentModel;
using System;

namespace HRMSoftware.PayrollSettings.Forms;

[FormScript("PayrollSettings.PayrollDeductions")]
[BasedOnRow(typeof(PayrollDeductionsRow), CheckNames = true)]
public class PayrollDeductionsForm
{
    [HalfWidth]
    public double Amount { get; set; }

    [HalfWidth]
    public string DeductionCode { get; set; }

    public string Description { get; set; }

}