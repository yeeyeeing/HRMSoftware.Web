using Serenity.ComponentModel;
using System;

namespace HRMSoftware.PayrollSettings.Forms;

[FormScript("PayrollSettings.PayslipPaidOneTimeAllowance")]
[BasedOnRow(typeof(PayslipPaidOneTimeAllowanceRow), CheckNames = true)]
public class PayslipPaidOneTimeAllowanceForm
{
    public int AllowanceId { get; set; }
    public int PayslipId { get; set; }
    public int IsActive { get; set; }
    public DateTime InsertDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public DateTime DeleteDate { get; set; }
    public int InsertUserId { get; set; }
    public int UpdateUserId { get; set; }
    public int DeleteUserId { get; set; }
}