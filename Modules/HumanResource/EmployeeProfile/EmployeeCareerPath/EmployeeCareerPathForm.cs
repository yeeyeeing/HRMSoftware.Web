using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeProfile.Forms;

[FormScript("EmployeeProfile.EmployeeCareerPath")]
[BasedOnRow(typeof(EmployeeCareerPathRow), CheckNames = true)]
public class EmployeeCareerPathForm
{
    [HideOnInsert,HideOnUpdate]
    public int Id { get; set; }


    [HalfWidth]
    public int CareerPathId { get; set; }
    [HalfWidth]
    public int EmployeeRowId { get; set; }

    public double NewValue { get; set; }

    public int newDivision { get; set; }
    public int newDepartment { get; set; }
    public int newSection { get; set; }
    public int newOccupation { get; set; }
    public int newJobGrade { get; set; }
    public int newCostCentre { get; set; }
    [HideOnInsert, HideOnUpdate]
    public int CategoryId { get; set; }
    [HideOnInsert, HideOnUpdate]
    public int careerPaathType    { get; set; }

    public DateTime EffectiveDate { get; set; }
   
   

    [TextAreaEditor(Rows = 4)]
    public string Description { get; set; }

    [TextAreaEditor(Rows = 4)]
    public string ManDesc { get; set; }





    public double oldValue { get; set; }

    public int oldDivision { get; set; }
    public int oldDepartment { get; set; }
    public int oldSection { get; set; }
    public int oldOccupation { get; set; }
    public int oldJobGrade { get; set; }
    public int oldCostCentre { get; set; }

}