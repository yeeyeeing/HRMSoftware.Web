using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Columns;

[ColumnsScript("TrainingManagement.Report")]
[BasedOnRow(typeof(ReportRow), CheckNames = true)]
public class ReportColumns
{
    [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    public int Id { get; set; }
    [EditLink]
    public string ProgramName { get; set; }
    [Width(200), ProgramDepartmentListFormatter]
    public List<int> DepartmentList { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int Status { get; set; }
}