using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal.Columns;

[ColumnsScript("PerformanceAppraisal.PerformanceAppraisalType")]
[BasedOnRow(typeof(PerformanceAppraisalTypeRow), CheckNames = true)]
public class PerformanceAppraisalTypeColumns
{
    [EditLink]
    [Width(300)]
    public string Type { get; set; }
}