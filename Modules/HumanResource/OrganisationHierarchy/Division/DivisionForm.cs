using Serenity.ComponentModel;
using System;

namespace HRMSoftware.OrganisationHierarchy.Forms;

[FormScript("OrganisationHierarchy.Division")]
[BasedOnRow(typeof(DivisionRow), CheckNames = true)]
public class DivisionForm
{
    public string Name { get; set; }
    public string Description { get; set; }
}