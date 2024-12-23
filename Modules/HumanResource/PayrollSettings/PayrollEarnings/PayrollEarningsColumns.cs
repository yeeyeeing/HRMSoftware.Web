using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings.Columns;

[ColumnsScript("PayrollSettings.PayrollEarnings")]
[BasedOnRow(typeof(PayrollEarningsRow), CheckNames = true)]
public class PayrollEarningsColumns
{
    [EditLink,  AlignRight]
    public string Description { get; set; }

    public int Id { get; set; }
    public int PayslipId { get; set; }
    public int External { get; set; }

    public int SubjectionToEis { get; set; }
    public int SubjectionToEpf { get; set; }
    public int SubjectionToHrdf { get; set; }
    public int SubjectionToPcb { get; set; }
    public int SubjectionToSocso { get; set; }
    public double Amount { get; set; }
    public DateTime InsertDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public DateTime DeleteDate { get; set; }
    public int IsActive { get; set; }
    public int InsertUserId { get; set; }
    public int DeleteUserId { get; set; }
    public int UpdateUserId { get; set; }
}