using Serenity.ComponentModel;
using System;

namespace HRMSoftware.PerformanceAppraisal.Forms;

[FormScript("PerformanceAppraisal.PerformanceAppraisalFileAttach")]
[BasedOnRow(typeof(PerformanceAppraisalFileAttachRow), CheckNames = true)]
public class PerformanceAppraisalFileAttachForm
{
    public string Files { get; set; }
    public string Remark { get; set; }
}