using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Shift.Forms;

[FormScript("Shift.Shift")]
[BasedOnRow(typeof(ShiftRow), CheckNames = true)]
public class ShiftForm
{
    public int TypeOfShift { get; set; }


    public string ShiftColor { get; set; }

    public string ShiftName { get; set; }
    [TextAreaEditor(Rows = 5)]
    public string Description { get; set; }

    [Category("Night Shift Categorisation")]
    public string NightShiftBetweenStart { get; set; }
    public string NightShiftBetweenEnd { get; set; }


    [Category("Sunday")]
    [HalfWidth]
    public string SundayStartingFrom { get; set; }
    [HalfWidth]
    public string SundayEndingAt { get; set; }
    [HalfWidth]
    public int SundayWorkingTime { get; set; }

    [HalfWidth]
    public string SundayLunchTimeStartingFrom { get; set; }
    [HalfWidth]
    public string SundayLunchTimeEndingAt { get; set; }

    [Category("Monday")]
    [HalfWidth]
    public string MondayStartingFrom { get; set; }
    [HalfWidth]
    public string MondayEndingAt { get; set; }

    [HalfWidth]
    public int MondayWorkingTime { get; set; }

    [HalfWidth]
    public string MondayLunchTimeStartingFrom { get; set; }
    [HalfWidth]
    public string MondayLunchTimeEndingAt { get; set; }


    [Category("Tuesday")]
    [HalfWidth]
    public string TuesdayStartingFrom { get; set; }
    [HalfWidth]
    public string TuesdayEndingAt { get; set; }
    [HalfWidth]
    public int TuesdayWorkingTime { get; set; }

    [HalfWidth]
    public string TuesdayLunchTimeStartingFrom { get; set; }
    [HalfWidth]
    public string TuesdayLunchTimeEndingAt { get; set; }


    [Category("Wednessday")]
    [HalfWidth]
    public string WednesdayStartingFrom { get; set; }
    [HalfWidth]
    public string WednesdayEndingAt { get; set; }
    [HalfWidth]
    public int WednesdayWorkingTime { get; set; }

    [HalfWidth]
    public string WednesdayLunchTimeStartingFrom { get; set; }
    [HalfWidth]
    public string WednesdayLunchTimeEndingAt { get; set; }


    [Category("Thursday")]
    [HalfWidth]
    public string ThursdayStartingFrom { get; set; }
    [HalfWidth]
    public string ThursdayEndingAt { get; set; }
    [HalfWidth]
    public int ThursdayWorkingTime { get; set; }

    [HalfWidth]
    public string ThursdayLunchTimeStartingFrom { get; set; }
    [HalfWidth]
    public string ThursdayLunchTimeEndingAt { get; set; }


    [Category("Friday")]
    [HalfWidth]
    public string FridayStartingFrom { get; set; }
    [HalfWidth]
    public string FridayEndingAt { get; set; }
    [HalfWidth]
    public int FridayWorkingTime { get; set; }

    [HalfWidth]
    public string FridayLunchTimeStartingFrom { get; set; }
    [HalfWidth]
    public string FridayLunchTimeEndingAt { get; set; }


    [Category("Saturday")]
    [HalfWidth]
    public string SaturdayStartingFrom { get; set; }
    [HalfWidth]
    public string SaturdayEndingAt { get; set; }
    [HalfWidth]
    public int SaturdayWorkingTime { get; set; }

    [HalfWidth]
    public string SaturdayLunchTimeStartingFrom { get; set; }
    [HalfWidth]
    public string SaturdayLunchTimeEndingAt { get; set; }






}