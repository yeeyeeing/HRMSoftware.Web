using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal.Columns;

[ColumnsScript("PerformanceAppraisal.CompanyProfile")]
[BasedOnRow(typeof(CompanyProfileRow), CheckNames = true)]
public class CompanyProfileColumns
{
    [EditLink]
    public string Title { get; set; }
    public string Address { get; set; }
    public string Tel { get; set; }
    public string Website { get; set; }
}