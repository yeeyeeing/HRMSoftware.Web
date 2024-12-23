using Serenity.ComponentModel;
using System;

namespace HRMSoftware.PerformanceAppraisal.Forms;

[FormScript("PerformanceAppraisal.PerformanceAppraisalType")]
[BasedOnRow(typeof(PerformanceAppraisalTypeRow), CheckNames = true)]
public class PerformanceAppraisalTypeForm
{
    public string Type { get; set; }
}