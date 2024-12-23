using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings.Forms;

[FormScript("PayrollSettings.PayrollEarnings")]
[BasedOnRow(typeof(PayrollEarningsRow), CheckNames = true)]
public class PayrollEarningsForm
{



    [HalfWidth]
    public double Amount { get; set; }
    [HalfWidth]
    public string EarningCode { get; set; }


    public string Description { get; set; }

    [Category("Subjections")]

    [QuarterWidth]
    public int SubjectionToEis { get; set; }

    [QuarterWidth]
    public int SubjectionToEpf { get; set; }

    [QuarterWidth]
    public int SubjectionToHrdf { get; set; }
    [QuarterWidth]
    public int SubjectionToPcb { get; set; }

    [QuarterWidth]
    public int SubjectionToSocso { get; set; }


}