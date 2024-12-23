using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Master.Columns;

[ColumnsScript("Master.MasterCp8d")]
[BasedOnRow(typeof(MasterCp8dRow), CheckNames = true)]
public class MasterCp8dColumns
{
   
    [EditLink]
    public string Name { get; set; }
    public string Description { get; set; }
}