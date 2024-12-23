using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.MoneyClaimApplication;

[ConnectionKey("Default"), Module("MoneyClaimApplication"), TableName("HumanResourcesClaimReason")]
[DisplayName("Money Claim Reason"), InstanceName("Money Claim Reason")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
[LookupScript("MoneyClaimReason.MoneyClaimReason", Permission = "*")]
public sealed class MoneyClaimReasonRow : LoggingRow<MoneyClaimReasonRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Claim Reason"), Size(50), QuickSearch, NameProperty]
    public string ClaimReason
    {
        get => fields.ClaimReason[this];
        set => fields.ClaimReason[this] = value;
    }

    [DisplayName("Description"), Size(50)]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField ClaimReason;
        public StringField Description;

    }
}