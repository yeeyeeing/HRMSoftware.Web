using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Columns;

[ColumnsScript("TrainingManagement.ProgramParticipant")]
[BasedOnRow(typeof(ProgramParticipantRow))]
public class ProgramParticipantColumns
{
    [CssClass("ParticipantName")]
    public string EmployeeName { get; set; }
    public string EmployeeId { get; set; }
    public bool Trainee { get; set; }
    public bool Staff  { get; set; }
}