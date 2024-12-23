using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Columns;

[ColumnsScript("TrainingManagement.ProgramGradeResponse")]
[BasedOnRow(typeof(ProgramParticipantRow))]
public class ProgramGradeResponseColumns
{
    public string EmployeeId { get; set; }
    [CssClass("ParticipantName")]
    public string EmployeeName { get; set; }
    public ProgramParticipantRoleType RoleId { get; set; }
    [DisplayName("Grade"), Width(100), ProgramGradeResponsePlaceHolderFormatter, CssClass("ProgramGradeResponseColumnPlaceHolder")]
    public string PlaceHolder { get; set; }
    // public int InsertUserId { get; set; }
    // public DateTime InsertDate { get; set; }
    // public int UpdateUserId { get; set; }
    // public DateTime UpdateDate { get; set; }
    // public int DeleteUserId { get; set; }
    // public DateTime DeleteDate { get; set; }
}