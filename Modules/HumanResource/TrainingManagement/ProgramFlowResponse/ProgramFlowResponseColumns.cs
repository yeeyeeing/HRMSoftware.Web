using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Columns;

[ColumnsScript("TrainingManagement.ProgramFlowResponse")]
[BasedOnRow(typeof(ProgramFlowResponseRow), CheckNames = true)]
public class ProgramFlowResponseColumns
{
    [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    public int Id { get; set; }
    public int FlowId { get; set; }
    public int EmployeeId { get; set; }
    public bool Attendance { get; set; }
    public int GradeValue { get; set; }
    public string File { get; set; }
    public string Remark { get; set; }
    // public int InsertUserId { get; set; }
    // public DateTime InsertDate { get; set; }
    // public int UpdateUserId { get; set; }
    // public DateTime UpdateDate { get; set; }
    // public int DeleteUserId { get; set; }
    // public DateTime DeleteDate { get; set; }
}