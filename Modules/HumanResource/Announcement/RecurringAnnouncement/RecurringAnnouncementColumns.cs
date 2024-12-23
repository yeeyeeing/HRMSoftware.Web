using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Announcement.Columns;

[ColumnsScript("Announcement.RecurringAnnouncement")]
[BasedOnRow(typeof(RecurringAnnouncementRow), CheckNames = true)]
public class RecurringAnnouncementColumns
{

    [EditLink]
    public string Name { get; set; }
    [Width(180, Max = 200)]
    public DateTime StartingDateTime { get; set; }
    [Width(180, Max = 200)]
    public int BindToOccupation { get; set; }
    [Width(180, Max = 200)]
    public int BindToDepartment { get; set; }
    [Width(180, Max = 200)]
    public int BindToDivision { get; set; }
    [Width(180, Max = 200)]
    public int BindToJobGrade { get; set; }
    [Width(180, Max = 200)]
    public int BindToSection {get; set;}
    }