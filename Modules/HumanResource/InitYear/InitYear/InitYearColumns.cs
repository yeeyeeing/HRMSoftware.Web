using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.InitYear.Columns;

[ColumnsScript("InitYear.InitYear")]
[BasedOnRow(typeof(InitYearRow), CheckNames = true)]
public class InitYearColumns
{
    //[EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    //public int Id { get; set; }
    [EditLink]
    public int Year { get; set; }
    /*
    [Width(300)]
    public int LeaveBringForwardMethod { get; set; }
    [Width(300)]
    public string Country { get; set; }
    [Width(300)]
    public int HospitalisationLeave { get; set; }
    [Width(300)]
    public int PaternityLeave { get; set; }
    [Width(300)]
    public int MaternityLeave { get; set; }
    [Width(300)]
    public int CompassionateLeave { get; set; }
    [Width(300)]
    public int MarriageLeave { get; set; }
    [Width(300)]
    public int MonthOfServiceToEligibleForMaternityLeave { get; set; }
    [Width(300)]
    public int MonthOfServiceToEligibleForPaternityLeave { get; set; }
    [Width(300)]
    public int BringForwardPercentage { get; set; }
    [Width(300)]
    public int BringForwardDays { get; set; }
    */
}