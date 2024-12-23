using System;

namespace HRMSoftware.Web.Modules.PerformanceAppraisal;

public class FormPDF
{
    public int TemplateId { get; set; }
    public string Type { get; set; }
    public int TypeId { get; set; }
    public int HodId { get; set; }
    public string EmployeeName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}

public class EmployeePDF
{
    public string EmployeeName { get; set; }
    public string EmployeeId { get; set; }
    public string DepartmentName { get; set; }
    public int DepartmentId { get; set; }
    public string OccupationName { get; set; }
    public int OccupationId { get; set; }
}
