using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeGroup.Forms;

[FormScript("EmployeeGroup.EmployeeGroupings")]
[BasedOnRow(typeof(EmployeeGroupingsRow), CheckNames = true)]
public class EmployeeGroupingsForm
{
    public int IsActive { get; set; }
    public int InsertUserId { get; set; }
    public int UpdateUserId { get; set; }
    public int DeleteUserId { get; set; }
    public DateTime InsertDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public DateTime DeleteDate { get; set; }
    public int EmployeeRowId { get; set; }
    public int EmployeeGroupId { get; set; }
}