using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeGroup.Forms;

[FormScript("EmployeeGroup.EmployeeGroupShiftPattern")]
[BasedOnRow(typeof(EmployeeGroupShiftPatternRow), CheckNames = true)]
public class EmployeeGroupShiftPatternForm
{
    public int EmployeeRowId { get; set; }
    public DateTime InsertDate { get; set; }
    public DateTime ShiftStartDate { get; set; }
    public DateTime ShiftEndDate { get; set; }
    public int ShiftId { get; set; }
    public DateTime UpdateDate { get; set; }
    public DateTime DeleteDate { get; set; }
    public int IsActive { get; set; }
    public int InsertUserId { get; set; }
    public int DeleteUserId { get; set; }
    public int UpdateUserId { get; set; }
    public int EmployeeGroupId { get; set; }
}