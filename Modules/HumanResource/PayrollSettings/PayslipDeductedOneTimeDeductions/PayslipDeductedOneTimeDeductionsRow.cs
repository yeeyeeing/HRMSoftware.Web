using HRMSoftware.Administration;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings;

[ConnectionKey("Default"), Module("PayrollSettings"), TableName("HumanResourcesPayslipDeductedDeductions")]
[DisplayName("Payslip Deducted One Time Deductions"), InstanceName("Payslip Deducted One Time Deductions")]
[ReadPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]
public sealed class PayslipDeductedOneTimeDeductionsRow : LoggingRow<PayslipDeductedOneTimeDeductionsRow.RowFields>, IIdRow
{

    public double? DeductionAmount
    {
        get => fields.DeductionAmount[this];
        set => fields.DeductionAmount[this] = value;
    }

    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }
   
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Deduction Id")]
    public int? DeductionId
    {
        get => fields.DeductionId[this];
        set => fields.DeductionId[this] = value;
    }

    [DisplayName("Payslip Id"), Column("PayslipID")]
    public int? PayslipId
    {
        get => fields.PayslipId[this];
        set => fields.PayslipId[this] = value;
    }
    public string code
    {
        get => fields.code[this];
        set => fields.code[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public DoubleField DeductionAmount;
        public StringField Description;
        public StringField code;


        public Int32Field Id;
        public Int32Field DeductionId;
        public Int32Field PayslipId;
        
    }
}