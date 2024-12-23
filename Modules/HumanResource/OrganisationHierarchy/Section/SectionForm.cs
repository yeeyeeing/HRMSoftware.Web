using Serenity.ComponentModel;
using System;

namespace HRMSoftware.OrganisationHierarchy.Forms;

[FormScript("OrganisationHierarchy.Section")]
[BasedOnRow(typeof(SectionRow), CheckNames = true)]
public class SectionForm
{
    public string Name { get; set; }
    public string Description { get; set; }
}