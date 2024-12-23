using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Columns;

[ColumnsScript("TrainingManagement.MasterProgram")]
[BasedOnRow(typeof(MasterProgramRow), CheckNames = true)]
public class MasterProgramColumns
{
    // [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    // public int Id { get; set; }
    [EditLink]
    public string ProgramName { get; set; }
    [Width(200), ProgramDepartmentListFormatter]
    public List<int> DepartmentList { get; set; }
    [Width(100)]
    public MasterProgramRoutineType Routine { get; set; }
    [Width(150), CssClass("TrainingManagementMasterProgramStatus" )]
    public string Status { get; set; }
    [Visible(false)]
    public int RoutineInterval { get; set; }
    [Visible(false)]
    public DateTime RoutineStartDate { get; set; }
    [Visible(false)]
    public DateTime RoutineEndDate { get; set; }
    // public int InsertUserId { get; set; }
    // public DateTime InsertDate { get; set; }
    // public int UpdateUserId { get; set; }
    // public DateTime UpdateDate { get; set; }
    // public int DeleteUserId { get; set; }
    // public DateTime DeleteDate { get; set; }
}