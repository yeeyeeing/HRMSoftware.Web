using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.Announcement;

[ConnectionKey("Default"), Module("Announcement"), TableName("HumanResourcesAnnouncementDepartmentBinded")]
[DisplayName("Announcement Department Binded"), InstanceName("Announcement Department Binded")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class AnnouncementDepartmentBindedRow : LoggingRow<AnnouncementDepartmentBindedRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Column("ID"), IdProperty, Identity]
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

    [DisplayName("Department Id")]
    public int? DepartmentId
    {
        get => fields.DepartmentId[this];
        set => fields.DepartmentId[this] = value;
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
        public Int32Field DepartmentId;
        public Int32Field AnnouncementRecurringId;

    }

}