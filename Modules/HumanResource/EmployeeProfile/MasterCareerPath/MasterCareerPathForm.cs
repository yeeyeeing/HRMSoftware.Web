using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeProfile.Forms;

[FormScript("EmployeeProfile.MasterCareerPath")]
[BasedOnRow(typeof(MasterCareerPathRow), CheckNames = true)]
public class MasterCareerPathForm
{
    [HalfWidth]
    public int CareerPathType { get; set; }
    [HalfWidth]
    public string CareerPathCode { get; set; }
    public int CategoryId { get; set; }
    [TextAreaEditor(Rows = 3)]
    public string Description { get; set; }

}