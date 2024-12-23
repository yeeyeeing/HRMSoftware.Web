using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Master.Columns;

[ColumnsScript("Master.MasterBank")]
[BasedOnRow(typeof(MasterBankRow), CheckNames = true)]
public class MasterBankColumns
{
   
    [EditLink]
    public string Name { get; set; }
    public string Description { get; set; }
}