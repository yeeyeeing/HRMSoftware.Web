using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal.Columns;

[ColumnsScript("PerformanceAppraisal.PerformanceAppraisalEvaluation")]
[BasedOnRow(typeof(PerformanceAppraisalEvaluationRow), CheckNames = true)]
public class PerformanceAppraisalEvaluationColumns
{
    [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    public int Id { get; set; }
    [EditLink]
    public string Evaluation { get; set; }
    public string Goals { get; set; }
    public string Summary { get; set; }
    public decimal BonusRate { get; set; }
    public decimal OverallRate { get; set; }

}