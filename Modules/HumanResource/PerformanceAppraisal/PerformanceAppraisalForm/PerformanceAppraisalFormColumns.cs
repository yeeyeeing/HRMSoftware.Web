using Serenity.ComponentModel;
using System;
using System.ComponentModel;
using HRMSoftware.Web.Modules.PerformanceAppraisal.PerformanceAppraisalForm;
using Serenity.Data.Mapping;

namespace HRMSoftware.PerformanceAppraisal.Columns;

[ColumnsScript("PerformanceAppraisal.PerformanceAppraisalForm")]
[BasedOnRow(typeof(PerformanceAppraisalFormRow), CheckNames = true)]
public class PerformanceAppraisalFormColumns
{
    
    [DisplayName("Emp ID"), Width(50)]
    public string EmployeeId { get; set; }
    
    [DisplayName("Employee Name"), Width(250)]
    public string EmployeeName { get; set; }
    
    [Width(130), QuickFilter]
    [DisplayName("Appraisal Type")]
    public string TypeName { get; set; }
    
    [Width(130), QuickFilter]
    public PerformanceAppraisalFormStatus SubmissionStatus { get; set; }
    
    [Width(180), QuickFilter]
    public PerformanceAppraisalFormStatus ReviewStatus { get; set; }
    
    [QuickFilter]
    public DateTime StartDate { get; set; }
    [Width(130)]
    public DateTime EndDate { get; set; }
    
    [QuickFilter, Width(130)]
    public DateTime EvaluateStartDate { get; set; }
    [Width(130)]
    public DateTime EvaluateEndDate { get; set; }
    
    [QuickFilter, Width(130)]
    public DateTime ApprovalStartDate { get; set; }
    [Width(130)]
    public DateTime ApprovalEndDate { get; set; }
    
}