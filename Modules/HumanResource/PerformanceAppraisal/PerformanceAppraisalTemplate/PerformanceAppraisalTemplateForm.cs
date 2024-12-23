using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal.Forms;

[FormScript("PerformanceAppraisal.PerformanceAppraisalTemplate")]
[BasedOnRow(typeof(PerformanceAppraisalTemplateRow), CheckNames = true)]
public class PerformanceAppraisalTemplateForm
{
    // [DisplayName("Department")]
    // public int DepartmentId { get; set; }

    // [DisplayName("Questions"), PerformanceAppraisalTemplateQuestionEditor, IgnoreName]
    // public List<PerformanceAppraisalTemplateQuestionRow> QuestionList { get; set; }
    
}