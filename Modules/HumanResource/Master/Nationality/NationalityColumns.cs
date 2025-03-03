using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Master.Columns;

[ColumnsScript("Master.Nationality")]
[BasedOnRow(typeof(NationalityRow), CheckNames = true)]
public class NationalityColumns
{
    
    [EditLink]
    public string Name { get; set; }
}