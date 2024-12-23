using Serenity.ComponentModel;
using System;

namespace HRMSoftware.LeaveApplication.Forms;

[FormScript("LeaveApplication.LeaveDescription")]
[BasedOnRow(typeof(LeaveDescriptionRow), CheckNames = true)]
public class LeaveDescriptionForm
{
    public string Name { get; set; }
  /*
    public DateTime InsertDate { get; set; }
    public int InsertUserId { get; set; }
    public DateTime UpdateDate { get; set; }
    public int UpdateUserId { get; set; }
    public DateTime DeleteDate { get; set; }
    public int DeleteUserId { get; set; }
    public short IsActive { get; set; }
*/
}