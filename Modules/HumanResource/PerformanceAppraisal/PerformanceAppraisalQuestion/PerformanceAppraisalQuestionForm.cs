using Serenity.ComponentModel;
using System;

namespace HRMSoftware.PerformanceAppraisal.Forms;

[FormScript("PerformanceAppraisal.PerformanceAppraisalQuestion")]
[BasedOnRow(typeof(PerformanceAppraisalQuestionRow), CheckNames = true)]
public class PerformanceAppraisalQuestionForm
{
    public string Questions { get; set; }
    public PerformanceAppraisalQuestionAnswerType AnswerType { get; set; }
}