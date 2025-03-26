using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings.Columns;

[ColumnsScript("PayrollSettings.WeeklyPayrollEmployee")]
[BasedOnRow(typeof(WeeklyPayrollEmployeeRow), CheckNames = true)]
public class WeeklyPayrollEmployeeColumns
{
    [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    public int Id { get; set; }
    public int WeeklyPayrollSettingId { get; set; }
    public int EmployeeRowId { get; set; }
    public DateTime InsertDate { get; set; }
    public int InsertUserId { get; set; }
    public DateTime UpdateDate { get; set; }
    public int UpdateUserId { get; set; }
    public DateTime DeleteDate { get; set; }
    public int DeleteUserId { get; set; }
    public short IsActive { get; set; }
}