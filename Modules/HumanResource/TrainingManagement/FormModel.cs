using System;
using HRMSoftware.TrainingManagement;

namespace HRMSoftware.Web.Modules.TrainingManagement;

public class ParticipantPDF
{
    public int EmployeeRowId { get; set; }
    public string EmployeeName { get; set; }
    public string EmployeeId { get; set; }
    public int RoleId { get; set; }
    public string DepartmentName { get; set; }
    public string OccupationName { get; set; }
}

public class FlowResponsePDF
{
    public ProgramFlowType FlowType { get; set; }
    public ProgramGradeType GradeType { get; set; }
    public DateTime Date { get; set; }
    public string Remark { get; set; }
    public int FlowId { get; set; }
    public int? Attendance { get; set; }
    public int GradeValue { get; set; }
    public int EmployeeId { get; set; }
}