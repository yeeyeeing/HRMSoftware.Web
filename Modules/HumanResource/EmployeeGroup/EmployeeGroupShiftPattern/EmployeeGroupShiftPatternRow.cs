using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeGroup;

[ConnectionKey("Default"), Module("EmployeeGroup"), TableName("HumanResourcesEmployeeShiftHistory")]
[DisplayName("Employee Group Shift Pattern"), InstanceName("Employee Group Shift Pattern")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class EmployeeGroupShiftPatternRow : LoggingRow<EmployeeGroupShiftPatternRow.RowFields>, IIdRow
{
    const string jShift = nameof(jShift);

    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Employee Row Id"), Column("EmployeeRowID")]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
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

    [DisplayName("Shift"), Column("ShiftID"), ForeignKey("HumanResourcesShiftPattern", "ID"), LeftJoin(jShift), TextualField(nameof(ShiftName))]
    public int? ShiftId
    {
        get => fields.ShiftId[this];
        set => fields.ShiftId[this] = value;
    }


    [DisplayName("Employee Group Id"), Column("EmployeeGroupID")]
    public int? EmployeeGroupId
    {
        get => fields.EmployeeGroupId[this];
        set => fields.EmployeeGroupId[this] = value;
    }

    [DisplayName("Shift Shift Name"), Expression($"{jShift}.[ShiftName]")]
    public string ShiftName
    {
        get => fields.ShiftName[this];
        set => fields.ShiftName[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field EmployeeRowId;
        public DateTimeField ShiftStartDate;
        public DateTimeField ShiftEndDate;
        public Int32Field ShiftId;
        public Int32Field EmployeeGroupId;
        public StringField ShiftName;
    }
}