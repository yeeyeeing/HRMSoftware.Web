using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.Master;

[ConnectionKey("Default"), Module("Master"), TableName("MasterStates")]
[DisplayName("Master State"), InstanceName("Master State")]
[ReadPermission(PermissionKeys.Employee)]
[ModifyPermission(PermissionKeys.HumanResources)]
[LookupScript("MasterState.MasterState", Permission = "*")]
public sealed class MasterStateRow : LoggingRow<MasterStateRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Name"), NotNull, QuickSearch, NameProperty]
    public string Name
    {
        get => fields.Name[this];
        set => fields.Name[this] = value;
    }
    [DisplayName("State Code"), NotNull]
    public string StateCode
    {
        get => fields.StateCode[this];
        set => fields.StateCode[this] = value;
    }

    
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField Name;
        public StringField StateCode;

    }
}