using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal.Columns;

[ColumnsScript("PerformanceAppraisal.PerformanceAppraisalTemplateDepartment")]
[BasedOnRow(typeof(PerformanceAppraisalTemplateDepartmentRow), CheckNames = true)]
public class PerformanceAppraisalTemplateDepartmentColumns
{
    [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    public int Id { get; set; }
    public int TemplateId { get; set; }
    public int DepartmentId { get; set; }

}