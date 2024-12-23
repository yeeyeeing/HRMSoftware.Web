using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Announcement.Columns;

[ColumnsScript("Announcement.AnnouncementWizard")]
[BasedOnRow(typeof(AnnouncementWizardRow), CheckNames = true)]
public class AnnouncementWizardColumns
{
    
    [EditLink,DisplayName("Sent Date")]
    public string InsertDate { get; set; }
    [Width(180, Max = 200)]
    public int BindToOccupation { get; set; }
    [Width(180, Max = 200)]
    public int BindToDepartment { get; set; }
    [Width(180, Max = 200)]
    public int BindToDivision { get; set; }
    [Width(180, Max = 200)]
    public int BindToJobGrade { get; set; }
    [Width(180, Max = 200)]
    public int BindToSection { get; set; }

}