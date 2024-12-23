using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Forms;

[FormScript("TrainingManagement.ProgramSessionApply")]
[BasedOnRow(typeof(ProgramSessionRow), CheckNames = true)]
public class ProgramSessionApplyForm
{
    [Tab("Basic Information")]
    [Category("Basic Information")]
    // public int MasterProgramId { get; set; }
    public string ProgramName { get; set; }
    public List<int> DepartmentList { get; set; }
    [HalfWidth]
    public Boolean DateTba { get; set; }
    [HalfWidth]
    public Boolean OneDay { get; set; }
    [HalfWidth]
    public DateTime StartDate { get; set; }
    [HalfWidth]
    public DateTime EndDate { get; set; }
    public int Status { get; set; }
    [TextAreaEditor(Rows = 3)]
    public string Comment { get; set; }
    [Category("Detail Information")]
    [TextAreaEditor(Rows = 10)]
    public string Detail { get; set; }
    public string ExtraDocument { get; set; }
    [Tab("Program Flow")]
    [IgnoreName, LabelWidth("0"), ProgramFlowEditor]
    public List<ProgramFlowRow> FlowList { get; set; }
    [Tab("Participant List")]
    [IgnoreName, LabelWidth("0"), ProgramParticipantEditor]
    public List<ProgramParticipantRow> ParticipantList { get; set; }
    // public int InsertUserId { get; set; }
    // public DateTime InsertDate { get; set; }
    // public int UpdateUserId { get; set; }
    // public DateTime UpdateDate { get; set; }
    // public int DeleteUserId { get; set; }
    // public DateTime DeleteDate { get; set; }
}