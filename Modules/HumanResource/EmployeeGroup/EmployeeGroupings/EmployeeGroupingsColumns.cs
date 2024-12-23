using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeGroup.Columns;

[ColumnsScript("EmployeeGroup.EmployeeGroupings")]
[BasedOnRow(typeof(EmployeeGroupingsRow), CheckNames = true)]
public class EmployeeGroupingsColumns
{

    public int EmployeeRowId { get; set; }
    public int EmployeeGroupId { get; set; }
}