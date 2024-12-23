using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Columns;

[ColumnsScript("TrainingManagement.ProgramParticipantResponse")]
[BasedOnRow(typeof(ProgramParticipantRow))]
public class ProgramParticipantResponseColumns
{
    public string EmployeeId { get; set; }
    [CssClass("ParticipantName")]
    public string EmployeeName { get; set; }
}