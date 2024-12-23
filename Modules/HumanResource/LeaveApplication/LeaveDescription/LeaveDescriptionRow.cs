using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.LeaveApplication;

[ConnectionKey("Default"), Module("LeaveApplication"), TableName("HumanResourcesLeaveDescription")]
[DisplayName("Leave Description"), InstanceName("Leave Description")]
[ReadPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]
[LookupScript("LeaveDescription.LeaveDescription", Permission = "*")]

public sealed class LeaveDescriptionRow : LoggingRow<LeaveDescriptionRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Name"), NotNull, QuickSearch, NameProperty]
    public string Name
    {
        get => fields.Name[this];
        set => fields.Name[this] = value;
    }
    /*
    [DisplayName("Insert Date"), NotNull]
    public DateTime? InsertDate
    {
        get => fields.InsertDate[this];
        set => fields.InsertDate[this] = value;
    }

    [DisplayName("Insert User Id"), NotNull]
    public int? InsertUserId
    {
        get => fields.InsertUserId[this];
        set => fields.InsertUserId[this] = value;
    }

    [DisplayName("Update Date")]
    public DateTime? UpdateDate
    {
        get => fields.UpdateDate[this];
        set => fields.UpdateDate[this] = value;
    }

    [DisplayName("Update User Id")]
    public int? UpdateUserId
    {
        get => fields.UpdateUserId[this];
        set => fields.UpdateUserId[this] = value;
    }

    [DisplayName("Delete Date")]
    public DateTime? DeleteDate
    {
        get => fields.DeleteDate[this];
        set => fields.DeleteDate[this] = value;
    }

    [DisplayName("Delete User Id")]
    public int? DeleteUserId
    {
        get => fields.DeleteUserId[this];
        set => fields.DeleteUserId[this] = value;
    }

    [DisplayName("Is Active"), NotNull]
    public short? IsActive
    {
        get => fields.IsActive[this];
        set => fields.IsActive[this] = value;
    }
    */
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField Name;
        /*
        public DateTimeField InsertDate;
        public Int32Field InsertUserId;
        public DateTimeField UpdateDate;
        public Int32Field UpdateUserId;
        public DateTimeField DeleteDate;
        public Int32Field DeleteUserId;
        public Int16Field IsActive;
        */
    }
}