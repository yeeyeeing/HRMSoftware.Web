using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Announcement.Columns;

[ColumnsScript("Announcement.AnnouncementDivisionBinded")]
[BasedOnRow(typeof(AnnouncementDivisionBindedRow), CheckNames = true)]
public class AnnouncementDivisionBindedColumns
{

    public int AnnouncementWizardId { get; set; }
    public int DivisionId { get; set; }
}