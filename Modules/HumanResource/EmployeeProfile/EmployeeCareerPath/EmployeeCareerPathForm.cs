using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeProfile.Forms;

[FormScript("EmployeeProfile.EmployeeCareerPath")]
[BasedOnRow(typeof(EmployeeCareerPathRow), CheckNames = true)]
public class EmployeeCareerPathForm
{
    [HalfWidth]
    public int CareerPathId { get; set; }
    [HalfWidth]
    public int EmployeeRowId { get; set; }

    [HalfWidth]
    public double NewValue { get; set; }


    [HalfWidth]
    public DateTime EffectiveDate { get; set; }
   
   

    [TextAreaEditor(Rows = 3)]
    public string Description { get; set; }

}