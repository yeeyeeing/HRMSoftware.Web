using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.OrganisationHierarchy.Columns;

[ColumnsScript("OrganisationHierarchy.Section")]
[BasedOnRow(typeof(SectionRow), CheckNames = true)]
public class SectionColumns
{
 
    [EditLink]
    public string Name { get; set; }
    public string Description { get; set; }
}