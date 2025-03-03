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
    public int MasterCity { get; set; }
    public int MasterState { get; set; }
}