using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.ShiftHistory;

[ConnectionKey("Default"), Module("ShiftHistory"), TableName("HumanResourcesEmployeeShiftHistory")]
[DisplayName("Shift History"), InstanceName("Shift History")]

[ReadPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]
public sealed class ShiftHistoryRow : LoggingRow<ShiftHistoryRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Employee Id"), Column("EmployeeID"), Size(30), QuickSearch, NameProperty]
    public string EmployeeId
    {
        get => fields.EmployeeId[this];
        set => fields.EmployeeId[this] = value;
    }

    [DisplayName("Shift"), Size(20)]
    public string Shift
    {
        get => fields.Shift[this];
        set => fields.Shift[this] = value;
    }

    [DisplayName("Shift End Date")]
    public DateTime? ShiftEndDate
    {
        get => fields.ShiftEndDate[this];
        set => fields.ShiftEndDate[this] = value;
    }


    [DisplayName("Shift Start Date")]
    public DateTime? ShiftStartDate
    {
        get => fields.ShiftStartDate[this];
        set => fields.ShiftStartDate[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public DateTimeField ShiftStartDate;
        public DateTimeField ShiftEndDate;

        public StringField EmployeeId;
        public StringField Shift;

    }
}