using Serenity.ComponentModel;
using System;
using System.Collections.Generic;

namespace HRMSoftware.TrainingManagement.Forms;

[FormScript("TrainingManagement.Report")]
[BasedOnRow(typeof(ReportRow), CheckNames = true)]
public class ReportForm
{
    [Tab("Basic Information")]
    public int MasterProgramId { get; set; }
    public string ProgramName { get; set; }
    public List<int> DepartmentList { get; set; }
    public string Detail { get; set; }
    public string ExtraDocument { get; set; }
    public bool DateTba { get; set; }
    public DateTime StartDate { get; set; }
    public bool OneDay { get; set; }
    public DateTime EndDate { get; set; }
    public int Status { get; set; }
    public string Comment { get; set; }
    [Tab("Program Flow")]
    [IgnoreName, LabelWidth("0"), ProgramFlowEditor]
    public List<ProgramFlowRow> FlowList { get; set; }
    [Tab("Participant List")]
    [IgnoreName, LabelWidth("0"), ProgramParticipantEditor]
    public List<ProgramParticipantRow> ParticipantList { get; set; }
}