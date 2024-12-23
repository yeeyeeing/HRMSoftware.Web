using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.OTApplication.Columns;

[ColumnsScript("OTApplication.OTReason")]
[BasedOnRow(typeof(OTReasonRow), CheckNames = true)]
public class OTReasonColumns
{
    [EditLink]
    public string OtReason { get; set; }
    public string Description { get; set; }
}