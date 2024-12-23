using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal.Forms;

[FormScript("PerformanceAppraisal.PerformanceAppraisalTemplateQuestion")]
[BasedOnRow(typeof(PerformanceAppraisalTemplateQuestionRow), CheckNames = true)]
public class PerformanceAppraisalTemplateQuestionForm
{
    [DisplayName("Template Question")]
    public int QuestionId { get; set; }
}