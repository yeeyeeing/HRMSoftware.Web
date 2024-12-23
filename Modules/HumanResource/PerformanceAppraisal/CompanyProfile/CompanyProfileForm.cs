using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal.Forms;

[FormScript("PerformanceAppraisal.CompanyProfile")]
[BasedOnRow(typeof(CompanyProfileRow), CheckNames = true)]
public class CompanyProfileForm
{
    [DisplayName("Logo")]
    public string Picture { get; set; }
    public string Title { get; set; }
    public string Address { get; set; }
    public string Tel { get; set; }
    public string Website { get; set; }
    
}