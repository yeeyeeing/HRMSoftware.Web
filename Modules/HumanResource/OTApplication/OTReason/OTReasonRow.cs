using HRMSoftware.Administration;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.OTApplication;

[ConnectionKey("Default"), Module("OTApplication"), TableName("HumanResourcesOTReason")]
[DisplayName("Ot Reason"), InstanceName("Ot Reason")]
[ReadPermission(PermissionKeys.Employee)]
[ModifyPermission(PermissionKeys.HumanResources)]
[LookupScript("OTReason.OTReason", Permission = "*")]
public sealed class OTReasonRow : LoggingRow<OTReasonRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

   
    [DisplayName("Ot Reason"), Column("OTReason"), Size(50), QuickSearch, NameProperty]
    public string OtReason
    {
        get => fields.OtReason[this];
        set => fields.OtReason[this] = value;
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
        
        public StringField OtReason;
        public StringField Description;

    }
}