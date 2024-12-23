using Serenity.ComponentModel;
using System;

namespace HRMSoftware.OrganisationHierarchy.Forms;

[FormScript("OrganisationHierarchy.Occupation")]
[BasedOnRow(typeof(OccupationRow), CheckNames = true)]
public class OccupationForm
{
    public string Name { get; set; }

    public string Description { get; set; }
}