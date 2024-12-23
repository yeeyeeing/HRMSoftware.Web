using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.Master;

[ConnectionKey("Default"), Module("Master"), TableName("MasterBanks")]
[DisplayName("Master Bank"), InstanceName("Master Bank")]
[ReadPermission(PermissionKeys.Employee)]
[ModifyPermission(PermissionKeys.HumanResources)]
[LookupScript("MasterBank.MasterBank", Permission = "*")]
public sealed class MasterBankRow : LoggingRow<MasterBankRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Name"), QuickSearch, NameProperty]
    public string Name
    {
        get => fields.Name[this];
        set => fields.Name[this] = value;
    }

    [DisplayName("Description")]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField Name;
        public StringField Description;
        
    }
}