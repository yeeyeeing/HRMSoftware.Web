using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.BringForward;

[ConnectionKey("Default"), Module("BringForward"), TableName("HumanResourcesBringForwardAnnualLeave")]
[DisplayName("Bring Forward"), InstanceName("Bring Forward")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class BringForwardRow : Row<BringForwardRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Delete User Id")]
    public int? DeleteUserId
    {
        get => fields.DeleteUserId[this];
        set => fields.DeleteUserId[this] = value;
    }

    [DisplayName("Update User Id")]
    public int? UpdateUserId
    {
        get => fields.UpdateUserId[this];
        set => fields.UpdateUserId[this] = value;
    }

    [DisplayName("Insert User Id")]
    public int? InsertUserId
    {
        get => fields.InsertUserId[this];
        set => fields.InsertUserId[this] = value;
    }

    [DisplayName("Is Active")]
    public int? IsActive
    {
        get => fields.IsActive[this];
        set => fields.IsActive[this] = value;
    }

    [DisplayName("Insert Date")]
    public DateTime? InsertDate
    {
        get => fields.InsertDate[this];
        set => fields.InsertDate[this] = value;
    }

    [DisplayName("Update Date")]
    public DateTime? UpdateDate
    {
        get => fields.UpdateDate[this];
        set => fields.UpdateDate[this] = value;
    }

    [DisplayName("Delete Date")]
    public DateTime? DeleteDate
    {
        get => fields.DeleteDate[this];
        set => fields.DeleteDate[this] = value;
    }

    [DisplayName("Employee Row Id"), Column("EmployeeRowID")]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    [DisplayName("Bring Forward")]
    public int? BringForward
    {
        get => fields.BringForward[this];
        set => fields.BringForward[this] = value;
    }

    [DisplayName("Bring Forward To Year")]
    public int? BringForwardToYear
    {
        get => fields.BringForwardToYear[this];
        set => fields.BringForwardToYear[this] = value;
    }

    public class RowFields : RowFieldsBase
    {
        public Int32Field Id;
        public Int32Field DeleteUserId;
        public Int32Field UpdateUserId;
        public Int32Field InsertUserId;
        public Int32Field IsActive;
        public DateTimeField InsertDate;
        public DateTimeField UpdateDate;
        public DateTimeField DeleteDate;
        public Int32Field EmployeeRowId;
        public Int32Field BringForward;
        public Int32Field BringForwardToYear;

    }
}