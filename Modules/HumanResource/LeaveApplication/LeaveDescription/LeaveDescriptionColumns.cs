using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.LeaveApplication.Columns;

[ColumnsScript("LeaveApplication.LeaveDescription")]
[BasedOnRow(typeof(LeaveDescriptionRow), CheckNames = true)]
public class LeaveDescriptionColumns
{
    [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    public int Id { get; set; }
    [EditLink]
    public string Name { get; set; }
    //public DateTime InsertDate { get; set; }
    //public int InsertUserId { get; set; }
   // public DateTime UpdateDate { get; set; }
   // public int UpdateUserId { get; set; }
   // public DateTime DeleteDate { get; set; }
   // public int DeleteUserId { get; set; }
   // public short IsActive { get; set; }
}