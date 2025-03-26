using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Master.Columns;

[ColumnsScript("Master.MasterPostcode")]
[BasedOnRow(typeof(MasterPostcodeRow), CheckNames = true)]
public class MasterPostcodeColumns
{

    [EditLink]
    public string PostCode { get; set; }
    [QuickFilter(true)]
    public string MasterCity { get; set; }
    [QuickFilter(true)]
    public string MasterState { get; set; }
    [QuickFilter(true)]
    public string CountryName { get; set; }

}