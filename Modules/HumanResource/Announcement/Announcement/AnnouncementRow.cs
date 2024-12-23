using HRMSoftware.EmployeeProfile;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.Announcement;

[ConnectionKey("Default"), Module("Announcement"), TableName("HumanResourcesAnnouncementGenerated")]
[DisplayName("Announcement"), InstanceName("Announcement")]
[ReadPermission("Administration:Employee")]
[ModifyPermission("Administration:Employee")]
public sealed class AnnouncementRow : LoggingRow<AnnouncementRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Announcement Content"), QuickSearch]
    public string AnnouncementContent
    {
        get => fields.AnnouncementContent[this];
        set => fields.AnnouncementContent[this] = value;
    }

    [DisplayName("Upload Document")]
    [MultipleFileUploadEditor(FilenameFormat = "Announcement/~")]
    public string UploadDocument
    {
        get => fields.UploadDocument[this];
        set => fields.UploadDocument[this] = value;
    }

    [DisplayName("Employee Row Id")]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    [  ForeignKey(typeof(EmployeeProfileRow)), LeftJoin("announcer")]
    [LookupEditor(typeof(EmployeeProfileRow), Async = true)]
    public int? AnnouncerEmployeeRowId
    {
        get => fields.AnnouncerEmployeeRowId[this];
        set => fields.AnnouncerEmployeeRowId[this] = value;
    }
    [DisplayName("Announcer Name"), Expression($"announcer.EmployeeName")]
    public string AnnouncerName
    {
        get => fields.AnnouncerName[this];
        set => fields.AnnouncerName[this] = value;
    }
    [DisplayName("Announcer ID"), Expression($"announcer.EmployeeID")]
    public string AnnouncerID
    {
        get => fields.AnnouncerID[this];
        set => fields.AnnouncerID[this] = value;
    }

    [DisplayName("View Time")]
    public DateTime? ViewTime
    {
        get => fields.ViewTime[this];
        set => fields.ViewTime[this] = value;
    }

    [DisplayName("Status"), AnnouncementGeneratedFormatter]
    public int? Viewed
    {
        get => fields.Viewed[this];
        set => fields.Viewed[this] = value;
    }

    public int? Hide
    {
        get => fields.Hide[this];
        set => fields.Hide[this] = value;
    }
    [DisplayName("Announcement Date")]
    public DateTime? AnnouncementDateTime
    {
        get => fields.AnnouncementDateTime[this];
        set => fields.AnnouncementDateTime[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field Hide;

        public Int32Field AnnouncerEmployeeRowId;
        public StringField AnnouncerName;
        public StringField AnnouncerID;


        public StringField AnnouncementContent;
        public StringField UploadDocument;
        public Int32Field EmployeeRowId;
        public DateTimeField ViewTime;
        public Int32Field Viewed;
        public DateTimeField AnnouncementDateTime;

    }
}