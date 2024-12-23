using Serenity.ComponentModel;
using System;

namespace HRMSoftware.Announcement.Forms;

[FormScript("Announcement.AnnouncementDepartmentBinded")]
[BasedOnRow(typeof(AnnouncementDepartmentBindedRow), CheckNames = true)]
public class AnnouncementDepartmentBindedForm
{
    public int AnnouncementWizardId { get; set; }
    public int DepartmentId { get; set; }
}