using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal.Columns;

[ColumnsScript("PerformanceAppraisal.PerformanceAppraisalResponse")]
[BasedOnRow(typeof(PerformanceAppraisalResponseRow), CheckNames = true)]
public class PerformanceAppraisalResponseColumns
{
    public int FormId { get; set; }
    public int QuestionId { get; set; }
    public string Answer { get; set; }
}