using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Master.Columns;

[ColumnsScript("Master.MasterCostCentre")]
[BasedOnRow(typeof(MasterCostCentreRow), CheckNames = true)]
public class MasterCostCentreColumns
{
    [EditLink]
    public string Name { get; set; }
    public string Description { get; set; }
  
}