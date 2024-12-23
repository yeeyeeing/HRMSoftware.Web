using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.CompanySettings.Columns;

[ColumnsScript("CompanySettings.CompanySettings")]
[BasedOnRow(typeof(CompanySettingsRow), CheckNames = true)]
public class CompanySettingsColumns
{
    [EditLink,Width(150)]
    public DateTime EffectiveSince { get; set; }
    [Width(150)]
    public DateTime EffectiveUntil { get; set; }

}