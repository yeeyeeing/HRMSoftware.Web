using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal.Columns;

[ColumnsScript("PerformanceAppraisal.PerformanceAppraisalQuestion")]
[BasedOnRow(typeof(PerformanceAppraisalQuestionRow), CheckNames = true)]
public class PerformanceAppraisalQuestionColumns
{
    [EditLink]
    [Width(700)]
    public string Questions { get; set; }
  
    [DisplayName("Answer Type"), QuickFilter]
    [Width(150)]
    public PerformanceAppraisalQuestionAnswerType AnswerType { get; set; }
   
}