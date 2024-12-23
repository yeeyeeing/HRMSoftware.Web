using HRMSoftware.Announcement;
using Serenity.ComponentModel;
using System;

namespace HRMSoftware.Announcement.Forms;

[FormScript("Announcement.AnnouncementGeneratedEditor")]
[BasedOnRow(typeof(AnnouncementGeneratedRow), CheckNames = true)]
public class AnnouncementGeneratedEditorForm   
{
    [HalfWidth]
    public int EmployeeRowId { get; set; }
    [HalfWidth]
    public string EmployeeName { get; set; }


    public string AnnouncementContent { get; set; }
    public string UploadDocument { get; set; }
}