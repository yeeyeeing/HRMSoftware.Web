using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.OrganisationHierarchy.Columns;

[ColumnsScript("OrganisationHierarchy.Department")]
[BasedOnRow(typeof(DepartmentRow), CheckNames = true)]
public class DepartmentColumns
{
   
    [EditLink]
    public string Name { get; set; }
    public string Description { get; set; }
}