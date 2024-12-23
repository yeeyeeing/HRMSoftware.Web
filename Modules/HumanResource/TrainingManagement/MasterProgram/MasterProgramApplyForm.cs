using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Forms;

[FormScript("TrainingManagement.MasterProgramApply")]
[BasedOnRow(typeof(MasterProgramRow), CheckNames = true)]
public class MasterProgramApplyForm
{
    [Tab("Basic Information")]
    [Category("Basic Information")]
    public string ProgramName { get; set; }
    public List<int> DepartmentList { get; set; }
    [HalfWidth]
    public string Routine { get; set; }
    [HalfWidth]
    public int RoutineInterval { get; set; }
    [HalfWidth]
    public DateTime RoutineStartDate { get; set; }
    [HalfWidth]
    public DateTime RoutineEndDate { get; set; }
    public string Status { get; set; }
    [TextAreaEditor(Rows = 3)]
    public string Comment { get; set; }
    [Category("Detail Information")]
    [TextAreaEditor(Rows = 10)]
    public string Detail { get; set; }
    public string ExtraDocument { get; set; }
    [Tab("Program Flow")]
    [IgnoreName, LabelWidth("0"), MasterProgramFlowEditor]
    public List<ProgramFlowRow> FlowList { get; set; }
}
    // public int InsertUserId { get; set; }
    // public DateTime InsertDate { get; set; }
    // public int UpdateUserId { get; set; }
    // public DateTime UpdateDate { get; set; }
    // public int DeleteUserId { get; set; }
    // public DateTime DeleteDate { get; set; }
