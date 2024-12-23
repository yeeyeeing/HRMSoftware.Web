using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Forms;

[FormScript("TrainingManagement.ProgramParticipant")]
[BasedOnRow(typeof(ProgramParticipantRow), CheckNames = true)]
public class ProgramParticipantForm
{
    [DisplayName("Employee Id")]
    public int EmployeeRowId { get; set; }
    [Visible(false)]
    public string EmployeeId { get; set; }
    public string EmployeeName { get; set; }
}