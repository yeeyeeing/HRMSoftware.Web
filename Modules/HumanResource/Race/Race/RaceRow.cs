using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.Race;

[ConnectionKey("Default"), Module("Race"), TableName("HumanResourcesRace")]
[DisplayName("Race"), InstanceName("Race")]
[ReadPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]
[LookupScript("Race.Race", Permission = "*")]
public sealed class RaceRow : LoggingRow<RaceRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Race"),  QuickSearch, NameProperty,NotNull]
    public string Race
    {
        get => fields.Race[this];
        set => fields.Race[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField Race;
        
    }
}