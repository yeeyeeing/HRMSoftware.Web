using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Forms;

[FormScript("TrainingManagement.AttendanceList")]
[BasedOnRow(typeof(AttendanceListRow), CheckNames = true)]
public class AttendanceListForm
{
    [Category("Basic Info")]
    public string ProgramName { get; set; }
    [HalfWidth]
    public DateTime StartDate { get; set; }
    [HalfWidth]
    public DateTime EndDate { get; set; }
    public string Remark { get; set; }
    [Category("Participant List")]
    [IgnoreName, LabelWidth("0"), ProgramAttendanceResponseEditor, FormCssClass("AttendanceTable")]
    public List<int> ParticipantList { get; set; }
    // public int InsertUserId { get; set; }
    // public DateTime InsertDate { get; set; }
    // public int UpdateUserId { get; set; }
    // public DateTime UpdateDate { get; set; }
    // public int DeleteUserId { get; set; }
    // public DateTime DeleteDate { get; set; }
}