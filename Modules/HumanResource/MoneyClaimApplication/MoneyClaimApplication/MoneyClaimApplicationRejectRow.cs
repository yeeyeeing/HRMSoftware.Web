using HRMSoftware.EmployeeProfile;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.MoneyClaimApplication;

[ConnectionKey("Default"), Module("MoneyClaimApplicationReject"), TableName("HumanResourcesMoneyClaiming")]
[DisplayName("Money Claim Application Reject"), InstanceName("Money Claim Application Reject")]
[ReadPermission("*")]
[ModifyPermission("*")]

public sealed class MoneyClaimApplicationRejectRow : LoggingRow<MoneyClaimApplicationRejectRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }
  
    [DisplayName("Reject Reason"),NotNull,NotMapped]
    public string RejectReason
    {
        get => fields.RejectReason[this];
        set => fields.RejectReason[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public StringField RejectReason;
        public Int32Field Id;
    }
}