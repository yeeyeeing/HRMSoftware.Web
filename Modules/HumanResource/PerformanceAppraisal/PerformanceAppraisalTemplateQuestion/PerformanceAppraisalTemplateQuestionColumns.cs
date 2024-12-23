using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal.Columns;

[ColumnsScript("PerformanceAppraisal.PerformanceAppraisalTemplateQuestion")]
[BasedOnRow(typeof(PerformanceAppraisalTemplateQuestionRow), CheckNames = true)]
public class PerformanceAppraisalTemplateQuestionColumns
{
    [EditLink, DisplayName("Question"), Width(650)]
    public string QuestionText { get; set; }
}