using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Columns;

[ColumnsScript("TrainingManagement.MasterProgramFlow")]
[BasedOnRow(typeof(ProgramFlowRow), CheckNames = true)]
public class MasterProgramFlowColumns
{
    [Width(200), EditLink]
    public ProgramFlowType FlowType { get; set; }
    [Width(200), EditLink]
    public ProgramGradeType GradeType { get; set; }
    [Width(200), EditLink]
    public string Remark { get; set; }
}