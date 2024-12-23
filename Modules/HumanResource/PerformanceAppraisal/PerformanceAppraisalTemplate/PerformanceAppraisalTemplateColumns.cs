using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal.Columns;

[ColumnsScript("PerformanceAppraisal.PerformanceAppraisalTemplate")]
[BasedOnRow(typeof(PerformanceAppraisalTemplateRow), CheckNames = true)]
public class PerformanceAppraisalTemplateColumns
{
    [Width(600)]
    public string TemplateName { get; set; }
    
    public int Duration { get; set; }
    
    [Width(100), DisplayName("Rating Scale")]
    public int RatingScale { get; set; }
}