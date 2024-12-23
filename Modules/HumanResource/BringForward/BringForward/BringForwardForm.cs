using Serenity.ComponentModel;
using System;

namespace HRMSoftware.BringForward.Forms;

[FormScript("BringForward.BringForward")]
[BasedOnRow(typeof(BringForwardRow), CheckNames = true)]
public class BringForwardForm
{
    public int DeleteUserId { get; set; }
    public int UpdateUserId { get; set; }
    public int InsertUserId { get; set; }
    public int IsActive { get; set; }
    public DateTime InsertDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public DateTime DeleteDate { get; set; }
    public int EmployeeRowId { get; set; }
    public int BringForward { get; set; }
    public int BringForwardToYear { get; set; }
}