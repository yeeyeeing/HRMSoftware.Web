using Serenity.ComponentModel;
using System;

namespace HRMSoftware.PerformanceAppraisal.Forms;

[FormScript("PerformanceAppraisal.PerformanceAppraisalTemplateDepartment")]
[BasedOnRow(typeof(PerformanceAppraisalTemplateDepartmentRow), CheckNames = true)]
public class PerformanceAppraisalTemplateDepartmentForm
{
    public int TemplateId { get; set; }
    public int DepartmentId { get; set; }
}