using Serenity.ComponentModel;
using System;

namespace HRMSoftware.PublicHoliday.Forms;

[FormScript("PublicHoliday.PublicHoliday")]
[BasedOnRow(typeof(PublicHolidayRow), CheckNames = true)]
public class PublicHolidayForm
{
    public string Name { get; set; }
    public string CountryCode { get; set; }

    public DateTime Date { get; set; }
}