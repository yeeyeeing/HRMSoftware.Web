using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.LeaveApplication.Columns;

[ColumnsScript("LeaveApplication.LeaveReason")]
[BasedOnRow(typeof(LeaveReasonRow), CheckNames = true)]
public class LeaveReasonColumns
{
  
    [EditLink]
    public string LeaveReason { get; set; }
    public string Description { get; set; }
   
}