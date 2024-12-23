using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.OrganisationHierarchy.Columns;

[ColumnsScript("OrganisationHierarchy.Division")]
[BasedOnRow(typeof(DivisionRow), CheckNames = true)]
public class DivisionColumns
{
 
    [EditLink]
    public string Name { get; set; }
    public string Description { get; set; }
}