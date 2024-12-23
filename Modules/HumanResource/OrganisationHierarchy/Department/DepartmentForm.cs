using Serenity.ComponentModel;
using System;

namespace HRMSoftware.OrganisationHierarchy.Forms;

[FormScript("OrganisationHierarchy.Department")]
[BasedOnRow(typeof(DepartmentRow), CheckNames = true)]
public class DepartmentForm
{
    public string Name { get; set; }
    public string Description { get; set; }
}