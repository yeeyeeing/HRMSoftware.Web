using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.OrganisationHierarchy.Columns;

[ColumnsScript("OrganisationHierarchy.JobGrade")]
[BasedOnRow(typeof(JobGradeRow), CheckNames = true)]
public class JobGradeColumns
{
  
    [EditLink]
    public string Name { get; set; }
    public string Description { get; set; }
}