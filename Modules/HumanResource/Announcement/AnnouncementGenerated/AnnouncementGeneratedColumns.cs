using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Announcement.Columns;

[ColumnsScript("Announcement.AnnouncementGenerated")]
[BasedOnRow(typeof(AnnouncementGeneratedRow), CheckNames = true)]
public class AnnouncementGeneratedColumns
{
    [EditLink]
    public string EmployeeID { get; set; }
    [EditLink]
    public string EmployeeName { get; set; }
    [DisplayName("Sent Date")]
    public string InsertDate { get; set; }


    [AnnouncementGeneratedFormatter]
    public string Viewed { get; set; }
    public string ViewTime { get; set; }
}