using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.LeaveApplication;

[ConnectionKey("Default"), Module("LeaveApplication"), TableName("HumanResourcesLeaveReason")]
[DisplayName("Leave Reason"), InstanceName("Leave Reason")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
[LookupScript("LeaveReason.LeaveReason", Permission = "*")]
public sealed class LeaveReasonRow : LoggingRow<LeaveReasonRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), IdProperty,Identity]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Leave Reason"), QuickSearch, NameProperty]
    public string LeaveReason
    {
        get => fields.LeaveReason[this];
        set => fields.LeaveReason[this] = value;
    }

    [DisplayName("Description")]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField LeaveReason;
        public StringField Description;

    }
}