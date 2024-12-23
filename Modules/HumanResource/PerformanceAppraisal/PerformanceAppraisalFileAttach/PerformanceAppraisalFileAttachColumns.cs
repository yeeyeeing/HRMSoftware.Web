using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal.Columns;

[ColumnsScript("PerformanceAppraisal.PerformanceAppraisalFileAttach")]
[BasedOnRow(typeof(PerformanceAppraisalFileAttachRow), CheckNames = true)]
public class PerformanceAppraisalFileAttachColumns
{
    [Width(450)]
    public string Files { get; set; }
    
    [EditLink, Width(500)]
    public string Remark { get; set; }
}