using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Master.Columns;

[ColumnsScript("Master.MasterState")]
[BasedOnRow(typeof(MasterStateRow), CheckNames = true)]
public class MasterStateColumns
{
  
    [EditLink]
    public string Name { get; set; }
}