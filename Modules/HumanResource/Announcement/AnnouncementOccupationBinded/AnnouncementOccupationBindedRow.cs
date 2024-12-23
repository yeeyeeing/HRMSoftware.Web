using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.Announcement;

[ConnectionKey("Default"), Module("Announcement"), TableName("HumanResourcesAnnouncementOccupationBinded")]
[DisplayName("Announcement Occupation Binded"), InstanceName("Announcement Occupation Binded")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class AnnouncementOccupationBindedRow : LoggingRow<AnnouncementOccupationBindedRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Announcement Wizard Id")]
    public int? AnnouncementWizardId
    {
        get => fields.AnnouncementWizardId[this];
        set => fields.AnnouncementWizardId[this] = value;
    }

    [DisplayName("Occupation Id")]
    public int? OccupationId
    {
        get => fields.OccupationId[this];
        set => fields.OccupationId[this] = value;
    }
    public int? AnnouncementRecurringId
    {
        get => fields.AnnouncementRecurringId[this];
        set => fields.AnnouncementRecurringId[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field AnnouncementWizardId;
        public Int32Field OccupationId;
        public Int32Field AnnouncementRecurringId;

    }
}