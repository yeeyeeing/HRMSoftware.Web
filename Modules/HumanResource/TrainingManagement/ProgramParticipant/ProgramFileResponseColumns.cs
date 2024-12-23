using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Columns;

[ColumnsScript("TrainingManagement.ProgramFileResponse")]
[BasedOnRow(typeof(ProgramParticipantRow))]
public class ProgramFileResponseColumns
{
    public string EmployeeId { get; set; }
    [CssClass("ParticipantName"), EditLink]
    public string EmployeeName { get; set; }
    public ProgramParticipantRoleType RoleId { get; set; }
    [DisplayName("File"), Width(100), ProgramFileResponsePlaceHolderFormatter, CssClass("ProgramFileResponseColumnPlaceHolder")]
    public string FilePlaceHolder { get; set; }
    [DisplayName("Approval"), Width(120), ProgramGradeResponsePlaceHolderFormatter, CssClass("ProgramGradeResponseColumnPlaceHolder")]
    public string PlaceHolder { get; set; }
    // public int InsertUserId { get; set; }
    // public DateTime InsertDate { get; set; }
    // public int UpdateUserId { get; set; }
    // public DateTime UpdateDate { get; set; }
    // public int DeleteUserId { get; set; }
    // public DateTime DeleteDate { get; set; }
}