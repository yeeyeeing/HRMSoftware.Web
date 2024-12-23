using Serenity.ComponentModel;
using System;

namespace HRMSoftware.Announcement.Forms;

[FormScript("Announcement.AnnouncementOccupationBinded")]
[BasedOnRow(typeof(AnnouncementOccupationBindedRow), CheckNames = true)]
public class AnnouncementOccupationBindedForm
{
    public int AnnouncementWizardId { get; set; }
    public int OccupationId { get; set; }
    public DateTime InsertDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public DateTime DeleteDate { get; set; }
    public short IsActive { get; set; }
    public int InsertUserId { get; set; }
    public int UpdateUserId { get; set; }
    public int DeleteUserId { get; set; }
}