using HRMSoftware.Administration;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;

[ConnectionKey("Default"), Module("EmployeeProfile"), TableName("HumanResourcesEmployeeDeduction")]
[DisplayName("Deductions"), InstanceName("Deductions")]
[ReadPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]
public sealed class FixedDeductionRow : LoggingRow<FixedDeductionRow.RowFields>, IIdRow, INameRow
{
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

    [DisplayName("Description"), QuickSearch, NameProperty, NotNull]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }


    [DisplayName("Amount"), NotNull]
    public double? Amount
    {
        get => fields.Amount[this];
        set => fields.Amount[this] = value;
    }

    [DisplayName("Effective From"), NotNull]
    public DateTime? EffectiveFrom
    {
        get => fields.EffectiveFrom[this];
        set => fields.EffectiveFrom[this] = value;
    }
    [DisplayName("Effective Until")]
    public DateTime? EffectiveUntil
    {
        get => fields.EffectiveUntil[this];
        set => fields.EffectiveUntil[this] = value;
    }
    [DisplayName("Recurring")]
    [BooleanEditor, StatusFormatter]
    public bool? Recurring
    {
        get => fields.Recurring[this];
        set => fields.Recurring[this] = value;
    }

    [DisplayName("One Time")]
    [BooleanEditor, StatusFormatter]
    public bool? OneTime
    {
        get => fields.OneTime[this];
        set => fields.OneTime[this] = value;
    }

    [DisplayName("Deducted One Time")]
    [BooleanEditor, StatusFormatter]
    public bool? DeductedOneTime
    {
        get => fields.DeductedOneTime[this];
        set => fields.DeductedOneTime[this] = value;
    }


    const string jRace = nameof(jRace);

    [DisplayName("Deduction Code"), Column("MasterDeductionId"), ForeignKey("HumanResourcesMasterDeduction", "ID"), LeftJoin(jRace), TextualField(nameof(Race)), NotNull]
    [LookupEditor("MasterDeduction.MasterDeduction")]
    public int? MasterDeductionId
    {
        get => fields.MasterDeductionId[this];
        set => fields.MasterDeductionId[this] = value;
    }
     [DisplayName("Deduction Code"), Expression($"{jRace}.[DeductionCode]")]
    public string DeductionCode
    {
        get => fields.DeductionCode[this];
        set => fields.DeductionCode[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field MasterDeductionId;
        public StringField DeductionCode;

        public Int32Field EmployeeRowId;
        public StringField Description;

        public DoubleField Amount;
        public DateTimeField EffectiveFrom;
        public DateTimeField EffectiveUntil;


        public BooleanField Recurring;
        public BooleanField DeductedOneTime;
        public BooleanField OneTime;


    }
}