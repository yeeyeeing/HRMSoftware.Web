using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Shift.Columns;

[ColumnsScript("Shift.Shift")]
[BasedOnRow(typeof(ShiftRow), CheckNames = true)]
public class ShiftColumns
{

    [EditLink,Width(200, Max = 500)]
    public string ShiftName { get; set; }
    [Width(200, Max = 500)]
    public string Description { get; set; }
    /*
    public string MondayStartingFrom { get; set; }
    public string MondayEndingAt { get; set; }
    public string TuesdayStartingFrom { get; set; }
    public string TuesdayEndingAt { get; set; }
    public string WednesdayStartingFrom { get; set; }
    public string WednesdayEndingAt { get; set; }
    public string ThursdayStartingFrom { get; set; }
    public string ThursdayEndingAt { get; set; }
    public string FridayStartingFrom { get; set; }
    public string FridayEndingAt { get; set; }
    public string SaturdayStartingFrom { get; set; }
    public string SaturdayEndingAt { get; set; }
    public string SundayStartingFrom { get; set; }
    public string SundayEndingAt { get; set; }


    public int MondayWorkingTime { get; set; }
    public int TuesdayWorkingTime { get; set; }
    public int WednesdayWorkingTime { get; set; }
    public int ThursdayWorkingTime { get; set; }
    public int FridayWorkingTime { get; set; }
    public int SaturdayWorkingTime { get; set; }
    public int SundayWorkingTime { get; set; }
    */
}