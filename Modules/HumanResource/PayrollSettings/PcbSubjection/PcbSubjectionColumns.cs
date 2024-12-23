using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings.Columns;

[ColumnsScript("PayrollSettings.PcbSubjection")]
[BasedOnRow(typeof(PcbSubjectionRow), CheckNames = true)]
public class PcbSubjectionColumns
{

    [EditLink, Width(150)]
    public DateTime EffectiveSince { get; set; }
    [Width(150)]
    public DateTime EffectiveUntil { get; set; }
}