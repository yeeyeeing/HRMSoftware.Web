using Serenity.ComponentModel;
using System;

namespace HRMSoftware.Announcement.Forms;

[FormScript("Announcement.AnnouncementDivisionBinded")]
[BasedOnRow(typeof(AnnouncementDivisionBindedRow), CheckNames = true)]
public class AnnouncementDivisionBindedForm
{
    public int AnnouncementWizardId { get; set; }
    public int DivisionId { get; set; }
    public DateTime InsertDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public DateTime DeleteDate { get; set; }
    public short IsActive { get; set; }
    public int InsertUserId { get; set; }
    public int UpdateUserId { get; set; }
    public int DeleteUserId { get; set; }
}