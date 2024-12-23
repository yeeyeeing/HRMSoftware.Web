using Serenity.ComponentModel;
using System;

namespace HRMSoftware.MoneyClaimApplication.Forms;

[FormScript("MoneyClaimApplication.MoneyClaimReason")]
[BasedOnRow(typeof(MoneyClaimReasonRow), CheckNames = true)]
public class MoneyClaimReasonForm
{
    public string ClaimReason { get; set; }
    public string Description { get; set; }
}