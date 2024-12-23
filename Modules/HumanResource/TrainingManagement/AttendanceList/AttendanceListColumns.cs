using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Columns;

[ColumnsScript("TrainingManagement.AttendanceList")]
[BasedOnRow(typeof(AttendanceListRow), CheckNames = true)]
public class AttendanceListColumns
{
    [EditLink]
    public string ProgramName { get; set; }
    [EditLink]
    public string Remark { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    // public int InsertUserId { get; set; }
    // public DateTime InsertDate { get; set; }
    // public int UpdateUserId { get; set; }
    // public DateTime UpdateDate { get; set; }
    // public int DeleteUserId { get; set; }
    // public DateTime DeleteDate { get; set; }
}