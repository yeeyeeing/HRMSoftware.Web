using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings;

[ConnectionKey("Default"), Module("PayrollSettings"), TableName("HumanResourcesPayrollDeductions")]
[DisplayName("Payroll Deductions"), InstanceName("Payroll Deductions")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class PayrollDeductionsRow : LoggingRow<PayrollDeductionsRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Payslip Id")]
    public int? PayslipId
    {
        get => fields.PayslipId[this];
        set => fields.PayslipId[this] = value;
    }
    [DisplayName("Government Payments"),NotMapped]
    public int? GovernmentPayments
    {
        get => fields.GovernmentPayments[this];
        set => fields.GovernmentPayments[this] = value;
    }

    [DisplayName("Amount"), NotNull]
    public double? Amount
    {
        get => fields.Amount[this];
        set => fields.Amount[this] = value;
    }

    [DisplayName("Description"), QuickSearch, NameProperty, NotNull]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }

    [BooleanEditor, StatusFormatter, NotMapped]
    public bool? External
    {
        get => fields.External[this];
        set => fields.External[this] = value;
    }


    [DisplayName("Deduction Code"), NotNull]
    public string DeductionCode
    {
        get => fields.DeductionCode[this];
        set => fields.DeductionCode[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public BooleanField External;

        public Int32Field GovernmentPayments;
        public Int32Field Id;
        public Int32Field PayslipId;
        public DoubleField Amount;
        public StringField Description;
        public StringField DeductionCode;
    }
}