using Serenity.ComponentModel;
using System;

namespace HRMSoftware.Announcement.Forms;

[FormScript("Announcement.Announcement")]
[BasedOnRow(typeof(AnnouncementRow), CheckNames = true)]
public class AnnouncementForm
{
    [HalfWidth]
    public string AnnouncerID { get; set; }
    [HalfWidth]
    public string AnnouncerName { get; set; }

    public string AnnouncementContent { get; set; }
    public string UploadDocument { get; set; }

}