using Serenity.ComponentModel;
using System;

namespace HRMSoftware.TrainingManagement.Forms;

[FormScript("TrainingManagement.MasterProgramFlow")]
[BasedOnRow(typeof(ProgramFlowRow), CheckNames = true)]
public class MasterProgramFlowForm
{
    [HalfWidth]
    public string FlowType { get; set; }
    [HalfWidth]
    public string GradeType { get; set; }
    public string Remark { get; set; }
}