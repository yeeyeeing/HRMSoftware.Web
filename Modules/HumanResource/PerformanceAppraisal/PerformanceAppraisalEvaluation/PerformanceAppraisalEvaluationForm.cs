using Serenity.ComponentModel;
using System;

namespace HRMSoftware.PerformanceAppraisal.Forms;

[FormScript("PerformanceAppraisal.PerformanceAppraisalEvaluation")]
[BasedOnRow(typeof(PerformanceAppraisalEvaluationRow), CheckNames = true)]
public class PerformanceAppraisalEvaluationForm
{
    [TextAreaEditor(Cols = 3, Rows = 4)]
    public string Evaluation { get; set; }
    
    [TextAreaEditor(Cols = 3, Rows = 4), HalfWidth]
    public string Goals { get; set; }
    
    [TextAreaEditor(Cols = 3, Rows = 4), HalfWidth]
    public string Summary { get; set; }
    
    [HalfWidth]
    public decimal BonusRate { get; set; }
    
    [HalfWidth]
    public decimal OverallRate { get; set; }
    
    [HalfWidth]
    public string EmployeeSignature { get; set; }
    [HalfWidth]
    public string HodSignature { get; set; }
    [HalfWidth, AlignCenter]
    public string GeneralManagerSignature { get; set; }
}