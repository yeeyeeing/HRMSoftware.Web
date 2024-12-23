using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;
using HRMSoftware.EmployeeProfile;

namespace HRMSoftware.SetEmployeeShift;

[ConnectionKey("Default"), Module("SetEmployeeShift"), TableName("HumanResourcesEmployeeShiftHistory")]
[DisplayName("Set Employee Shift"), InstanceName("Set Employee Shift")]

[ReadPermission("*")]
[ModifyPermission(PermissionKeys.HumanResources)]
[InsertPermission(PermissionKeys.HumanResources)]

public sealed class SetEmployeeShiftRow : LoggingRow<SetEmployeeShiftRow.RowFields>, IIdRow, INameRow
{
    const string jShift = nameof(jShift);

    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }


    const string jEmployeeName = nameof(jEmployeeName);
    [DisplayName("Employee Name"), Column("EmployeeRowID"), ForeignKey(typeof(EmployeeProfileRow)), LeftJoin(jEmployeeName)]
   [LookupEditor(typeof(EmployeeProfileRow))]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    [DisplayName("Employee Name"), Expression($"{jEmployeeName}.EmployeeName"), NameProperty]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }




    [DisplayName("Shift Start Date")]
    public DateTime? ShiftStartDate
    {
        get => fields.ShiftStartDate[this];
        set => fields.ShiftStartDate[this] = value;
    }

    [DisplayName("Shift End Date"), NotNull]
    public DateTime? ShiftEndDate
    {
        get => fields.ShiftEndDate[this];
        set => fields.ShiftEndDate[this] = value;
    }

    [DisplayName("Shift"), Column("ShiftID"), ForeignKey("HumanResourcesShiftPattern", "ID"), LeftJoin(jShift), TextualField(nameof(ShiftName)), NotNull]
    [LookupEditor(typeof(Shift.ShiftRow), DialogType = "Shift.Shift")]
    public int? ShiftId
    {
        get => fields.ShiftId[this];
        set => fields.ShiftId[this] = value;
    }
    [DisplayName("Employee Group"), ForeignKey("HumanResourcesEmployeeGroup", "ID"), LeftJoin("c")]
    [LookupEditor(typeof(EmployeeGroup.EmployeeGroupRow))]
    public int? EmployeeGroupId
    {
        get => fields.EmployeeGroupId[this];
        set => fields.EmployeeGroupId[this] = value;
    }
    [DisplayName("Employee Group"), Expression($"c.Name")]
    public string EmployeeGroupName
    {
        get => fields.EmployeeGroupName[this];
        set => fields.EmployeeGroupName[this] = value;
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
        public DateTimeField ShiftStartDate;
        public DateTimeField ShiftEndDate;
        public Int32Field ShiftId;

        public Int32Field EmployeeRowId;
        public StringField EmployeeName;
        public StringField ShiftName;
        public Int32Field EmployeeGroupId;
        public StringField EmployeeGroupName;


    }
}