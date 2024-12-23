using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeBasicData.Columns;

[ColumnsScript("EmployeeBasicData.EmployeeBasicData")]
[BasedOnRow(typeof(EmployeeBasicDataRow), CheckNames = true)]
public class EmployeeBasicDataColumns
{
    [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    public int Id { get; set; }
    [EditLink]
    public string EmployeeName { get; set; }
    public string EmployeeId { get; set; }
    public string Nric { get; set; }
    public int Age { get; set; }
    public DateTime Birthday { get; set; }
    public string Address { get; set; }
    public string TelNumber1 { get; set; }
    public string TelNumber2 { get; set; }
    public string Race { get; set; }
    public int EmployeeType { get; set; }
    public int Sex { get; set; }
  
    public string CityName { get; set; }
    public string StateName { get; set; }
    public string EmployeeImg { get; set; }
    public string NationalityName { get; set; }
    public int MaritalStatus { get; set; }
}