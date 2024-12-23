using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.OTJobGradeTime.Columns;

[ColumnsScript("OTJobGradeTime.OTJobGradeTime")]
[BasedOnRow(typeof(OTJobGradeTimeRow), CheckNames = true)]
public class OTJobGradeTimeColumns
{
    [EditLink]
    public string JobGradeName { get; set; }

    public int OTMaximumMinutes { get; set; }
}