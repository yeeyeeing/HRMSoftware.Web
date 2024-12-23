using Serenity.ComponentModel;
using System;

namespace HRMSoftware.OrganisationHierarchy.Forms;

[FormScript("OrganisationHierarchy.JobGrade")]
[BasedOnRow(typeof(JobGradeRow), CheckNames = true)]
public class JobGradeForm
{
    public string Name { get; set; }
    public string Description { get; set; }
}