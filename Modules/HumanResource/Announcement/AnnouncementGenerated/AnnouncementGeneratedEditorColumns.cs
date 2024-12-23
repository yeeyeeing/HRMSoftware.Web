using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Announcement.Columns;

[ColumnsScript("Announcement.AnnouncementGeneratedEditorColumns")]
[BasedOnRow(typeof(AnnouncementGeneratedRow), CheckNames = true)]
public class AnnouncementGeneratedEditorColumns  
{
    // public string UploadDocument { get; set; }

    
    [EditLink]
    public string EmployeeID { get; set; }


    public string AnnouncementDateTime { get; set; }

    //    public DateTime ViewTime { get; set; }
    //    public int Viewed { get; set; }
}