using Serenity.ComponentModel;
using System;

namespace HRMSoftware.Announcement.Forms;

[FormScript("Announcement.AnnouncementJobGradeBinded")]
[BasedOnRow(typeof(AnnouncementJobGradeBindedRow), CheckNames = true)]
public class AnnouncementJobGradeBindedForm
{
    public int AnnouncementWizardId { get; set; }
    public int JobGradeId { get; set; }
    public DateTime InsertDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public DateTime DeleteDate { get; set; }
    public short IsActive { get; set; }
    public int InsertUserId { get; set; }
    public int UpdateUserId { get; set; }
    public int DeleteUserId { get; set; }
}