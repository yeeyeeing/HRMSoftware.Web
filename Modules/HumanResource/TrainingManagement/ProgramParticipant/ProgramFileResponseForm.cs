using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Forms;

[FormScript("TrainingManagement.ProgramFileResponse")]
[BasedOnRow(typeof(ProgramFlowResponseRow))]
public class ProgramFileResponseForm
{
    [Visible(false)]
    public int Id { get; set; }
    [Visible(false)]
    public int FlowId { get; set; }
    [Visible(false)]
    public int EmployeeId { get; set; }
    public string File { get; set; }
}