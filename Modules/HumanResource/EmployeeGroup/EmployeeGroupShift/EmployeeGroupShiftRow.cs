using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeGroup;

[ConnectionKey("Default"), Module("EmployeeGroup"), TableName("HumanResourcesEmployeeGroupShift")]
[DisplayName("Employee Group Shift"), InstanceName("Employee Group Shift")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class EmployeeGroupShiftRow : LoggingRow<EmployeeGroupShiftRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Employee Group Id")]
    public int? EmployeeGroupId
    {
        get => fields.EmployeeGroupId[this];
        set => fields.EmployeeGroupId[this] = value;
    }

    [DisplayName("Shift Start Date")]
    public DateTime? ShiftStartDate
    {
        get => fields.ShiftStartDate[this];
        set => fields.ShiftStartDate[this] = value;
    }

    [DisplayName("Shift End Date")]
    public DateTime? ShiftEndDate
    {
        get => fields.ShiftEndDate[this];
        set => fields.ShiftEndDate[this] = value;
    }

    const string jShift = nameof(jShift);

    [DisplayName("Shift"),  ForeignKey("HumanResourcesShiftPattern", "ID"), LeftJoin(jShift),  NotNull, Column("ShiftID")]
    [LookupEditor(typeof(Shift.ShiftRow))]
    public int? ShiftId
    {
        get => fields.ShiftId[this];
        set => fields.ShiftId[this] = value;
    }
    [DisplayName("Shift"), Expression($"{jShift}.[ShiftName]")]
    public string Shift
    {
        get => fields.Shift[this];
        set => fields.Shift[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field EmployeeGroupId;
        public DateTimeField ShiftStartDate;
        public DateTimeField ShiftEndDate;
        public Int32Field ShiftId;
        public StringField Shift;

    }
}