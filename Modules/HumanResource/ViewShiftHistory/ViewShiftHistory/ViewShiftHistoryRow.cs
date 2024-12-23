using HRMSoftware.Shift;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using Serenity.Extensions.Entities;
using HRMSoftware.Administration;

namespace HRMSoftware.ViewShiftHistory;

[ConnectionKey("Default"), Module("ViewShiftHistory"), TableName("HumanResourcesEmployeeShiftHistory")]
[DisplayName("View Shift History"), InstanceName("View Shift History")]

[ReadPermission("*")]
[ModifyPermission("*")]
public sealed class ViewShiftHistoryRow : LoggingRow<ViewShiftHistoryRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }
    public int? EmployeeRowID
    {
        get => fields.EmployeeRowID[this];
        set => fields.EmployeeRowID[this] = value;
    }
    [DisplayName("Employee Id"), QuickSearch,NotMapped ]
    public string EmployeeId
    {
        get => fields.EmployeeId[this];
        set => fields.EmployeeId[this] = value;
    }
    [DisplayName("Employee Name"), QuickSearch, NotMapped]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }


    [DisplayName("Shift Start Date"), NotNull]
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
    const string jShift = nameof(jShift);
    [DisplayName("Employee Shift"), ForeignKey(typeof(ShiftRow)), LeftJoin(jShift), NotNull, NameProperty]
    [LookupEditor(typeof(Shift.ShiftRow), InplaceAdd = true)]

    public int? ShiftId { get => fields.ShiftId[this]; set => fields.ShiftId[this] = value; }

    [DisplayName("Employee Shift"), Expression($"{jShift}.Shift")]
    public string ShiftName
    {
        get => fields.ShiftName[this];
        set => fields.ShiftName[this] = value;
    }


    [DisplayName("Employee Group"), Column("EmployeeGroupID")]
    public int? EmployeeGroupID
    {
        get => fields.EmployeeGroupID[this];
        set => fields.EmployeeGroupID[this] = value;
    }



    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field EmployeeRowID;

        public StringField EmployeeName;

        public StringField EmployeeId;
        public DateTimeField ShiftStartDate;
        public DateTimeField ShiftEndDate;

        public Int32Field ShiftId;
        public StringField ShiftName;
        public Int32Field EmployeeGroupID;

    }
}