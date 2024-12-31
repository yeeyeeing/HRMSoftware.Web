using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;

[ConnectionKey("Default"), Module("EmployeeProfile"), TableName("HumanResourcesMasterDeduction")]
[DisplayName("Master Deduction"), InstanceName("Master Deduction")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
[LookupScript("MasterDeduction.MasterDeduction", Permission = "*")]

public sealed class MasterDeductionRow : LoggingRow<MasterDeductionRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Deduction Code"), QuickSearch, NameProperty,NotNull]
    public string DeductionCode
    {
        get => fields.DeductionCode[this];
        set => fields.DeductionCode[this] = value;
    }

    [DisplayName("Amount"), NotNull]
    public double? Amount
    {
        get => fields.Amount[this];
        set => fields.Amount[this] = value;
    }


    [DisplayName("Description"), NotNull]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
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

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField DeductionCode;
        public DoubleField Amount;
        public StringField Description;
        public BooleanField Recurring;
        public BooleanField OneTime;
    }
}