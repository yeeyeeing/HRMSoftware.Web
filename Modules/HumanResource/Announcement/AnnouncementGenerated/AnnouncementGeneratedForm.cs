using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Announcement.Forms;

[FormScript("Announcement.AnnouncementGenerated")]
[BasedOnRow(typeof(AnnouncementGeneratedRow), CheckNames = true)]
public class AnnouncementGeneratedForm
{
    [OneThirdWidth]
    public bool Immediate { get; set; }
    [OneThirdWidth]
    public bool Delayed { get; set; }
    [HalfWidth]
    public DateTime AnnouncementDateTime { get; set; }
    [HalfWidth]
    public string AnnouncementTime { get; set; }
    public int EmployeeRowId { get; set; }
    [TextAreaEditor(Rows = 5)]
    public string AnnouncementContent { get; set; }
    public string UploadDocument { get; set; }

    [Category("Binds")]
    [QuarterWidth]
    public bool BindToOccupation { get; set; }
    [QuarterWidth]
    public bool BindToDepartment { get; set; }
    [QuarterWidth]
    public bool BindToDivision { get; set; }
    [QuarterWidth]
    public bool BindToJobGrade { get; set; }
    [QuarterWidth]
    public bool BindToSection { get; set; }
    [Category("Remarks")]
    public string Remarks { get; set; }


}