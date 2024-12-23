using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Master.Columns;

[ColumnsScript("Master.MasterCity")]
[BasedOnRow(typeof(MasterCityRow), CheckNames = true)]
public class MasterCityColumns
{
 
    [EditLink]
    public string Name { get; set; }
}