using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PublicHoliday.Columns;

[ColumnsScript("PublicHoliday.PublicHoliday")]
[BasedOnRow(typeof(PublicHolidayRow), CheckNames = true)]
public class PublicHolidayColumns
{
   // [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
   // public int Id { get; set; }
    [EditLink]
    public string Name { get; set; }
    public DateTime Date { get; set; }
    public string  CountryCode { get; set; }
}