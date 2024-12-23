using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Master.Columns;

[ColumnsScript("Master.MasterCountry")]
[BasedOnRow(typeof(MasterCountryRow), CheckNames = true)]
public class MasterCountryColumns
{

    [EditLink]
    public string Name { get; set; }
}