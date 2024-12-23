using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.MoneyClaimApplication.Columns;

[ColumnsScript("MoneyClaimApplication.MoneyClaimReason")]
[BasedOnRow(typeof(MoneyClaimReasonRow), CheckNames = true)]
public class MoneyClaimReasonColumns
{
    [EditLink]
    public string ClaimReason { get; set; }
    public string Description { get; set; }
}