using Serenity.ComponentModel;
using System;

namespace HRMSoftware.AbsentRecord.Forms;

[FormScript("AbsentRecord.AbsentRecord")]
[BasedOnRow(typeof(AbsentRecordRow), CheckNames = true)]
public class AbsentRecordForm
{
    public int EmployeeRowId { get; set; }
    public string EmployeeName { get; set; }

    public DateTime AbsentDate { get; set; }
}