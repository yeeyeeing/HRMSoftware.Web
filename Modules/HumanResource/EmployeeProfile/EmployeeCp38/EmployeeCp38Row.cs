using HRMSoftware.Administration;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;

[ConnectionKey("Default"), Module("EmployeeProfile"), TableName("HumanResourcesEmployeeCp38")]
[DisplayName("Employee Cp38"), InstanceName("Employee Cp38")]
[ReadPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]
public sealed class EmployeeCp38Row : LoggingRow<EmployeeCp38Row.RowFields>, IIdRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Employee Name"), ForeignKey(typeof(EmployeeProfileRow)), LeftJoin("c")]
    [LookupEditor(typeof(EmployeeProfileRow)), NotNull]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    [DisplayName("Employee Name"), Expression($"c.EmployeeName"), NameProperty, QuickSearch]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }
    [DisplayName("Cp38 Amount"), NotNull]
    public double? Cp38Amount
    {
        get => fields.Cp38Amount[this];
        set => fields.Cp38Amount[this] = value;
    }

    [DisplayName("Effective From"), NotNull]
    public DateTime? EffectiveFrom
    {
        get => fields.EffectiveFrom[this];
        set => fields.EffectiveFrom[this] = value;
    }

    [DisplayName("Effective Until"), NotNull]
    public DateTime? EffectiveUntil
    {
        get => fields.EffectiveUntil[this];
        set => fields.EffectiveUntil[this] = value;
    }
    [DisplayName("EmployeeID"), Expression($"c.EmployeeID"), QuickSearch]
    public string EmployeeID
    {
        get => fields.EmployeeID[this];
        set => fields.EmployeeID[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field EmployeeRowId;
        public StringField EmployeeName;

        public DoubleField Cp38Amount;
        public DateTimeField EffectiveFrom;
        public DateTimeField EffectiveUntil;
        public StringField EmployeeID;

    }
}