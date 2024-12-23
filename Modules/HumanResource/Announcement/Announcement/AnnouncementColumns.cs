using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Announcement.Columns;

[ColumnsScript("Announcement.Announcement")]
[BasedOnRow(typeof(AnnouncementRow), CheckNames = true)]
public class AnnouncementColumns
{
    [EditLink]
    public string AnnouncementDateTime { get; set; }

    [EditLink]
    public string AnnouncerID { get; set; }

    [EditLink]
    public string AnnouncerName { get; set; }
    public DateTime ViewTime { get; set; }
    public int Viewed { get; set; }
}