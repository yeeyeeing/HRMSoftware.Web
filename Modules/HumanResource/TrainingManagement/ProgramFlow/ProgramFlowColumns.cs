using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Columns;

[ColumnsScript("TrainingManagement.ProgramFlow")]
[BasedOnRow(typeof(ProgramFlowRow))]
public class ProgramFlowColumns
{
    [Visible(false)]
    public int Id  { get; set; }
    [Width(200), EditLink]
    public ProgramFlowType FlowType { get; set; }
    public DateTime Date { get; set; }
    [Width(200), EditLink]
    public string Remark { get; set; }
    [Width(200), ProgramFlowUserDisplayFormatter]
    public string Result { get; set; }
}