using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.OrganisationHierarchy.Columns;

[ColumnsScript("OrganisationHierarchy.Occupation")]
[BasedOnRow(typeof(OccupationRow), CheckNames = true)]
public class OccupationColumns
{
    [EditLink]
    public string Name { get; set; }

    public string Description { get; set; }
}