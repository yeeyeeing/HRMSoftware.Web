using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.Master;

[ConnectionKey("Default"), Module("Master"), TableName("MasterNationality")]
[DisplayName("Nationality"), InstanceName("Nationality")]
[ReadPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]

[LookupScript("MasterNationality.MasterNationality", Permission = "*")]
public sealed class NationalityRow : LoggingRow<NationalityRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Name"), QuickSearch, NameProperty,NotNull]
    public string Name
    {
        get => fields.Name[this];
        set => fields.Name[this] = value;
    }
    const string jMasterCountry = nameof(jMasterCountry);

    [DisplayName("Country"), ForeignKey("MasterCountries", "ID"), LeftJoin(jMasterCountry), TextualField(nameof(CountryName)), NotNull]
    [LookupEditor(typeof(MasterCountryRow))]
    public int? CountryId
    {
        get => fields.CountryId[this];
        set => fields.CountryId[this] = value;
    }

    [DisplayName("Country"), Expression($"{jMasterCountry}.[Name]")]
    public string CountryName
    {
        get => fields.CountryName[this];
        set => fields.CountryName[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField Name;
        public Int32Field CountryId;
        public StringField CountryName;

    }
}