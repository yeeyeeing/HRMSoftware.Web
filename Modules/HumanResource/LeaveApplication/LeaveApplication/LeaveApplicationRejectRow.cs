using HRMSoftware.EmployeeProfile;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.LeaveApplication;

[ConnectionKey("Default"), Module("LeaveApplicationReject"), TableName("HumanResourcesLeaveApplication")]
[DisplayName("Leave Application Reject"), InstanceName("Leave Application Reject")]
[ReadPermission("*")]
[ModifyPermission("*")]

public sealed class LeaveApplicationRejectRow : LoggingRow<LeaveApplicationRejectRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }
    [DisplayName("Start Date"), Column("StartDate"), QuickSearch, NameProperty]
    public DateTime? StartDate
    {
        get => fields.StartDate[this];
        set => fields.StartDate[this] = value;
    }
    [DisplayName("Reject Reason"),NotNull,NotMapped]
    public string RejectReason
    {
        get => fields.RejectReason[this];
        set => fields.RejectReason[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public StringField RejectReason;
        public DateTimeField StartDate;
        public Int32Field Id;
    }
}