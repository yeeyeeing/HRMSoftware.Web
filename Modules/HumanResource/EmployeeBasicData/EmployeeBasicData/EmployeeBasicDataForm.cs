using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeBasicData.Forms;

[FormScript("EmployeeBasicData.EmployeeBasicData")]
[BasedOnRow(typeof(EmployeeBasicDataRow), CheckNames = true)]
public class EmployeeBasicDataForm
{
    public string EmployeeName { get; set; }
    public string EmployeeId { get; set; }
    public int Age { get; set; }
    public DateTime Birthday { get; set; }
    public string Address { get; set; }
    public string TelNumber1 { get; set; }
    public int RaceId { get; set; }
    public int EmployeeType { get; set; }
    public int Sex { get; set; }
    public int CityId { get; set; }
    public int StateId { get; set; }
    public int NationalityId { get; set; }
}