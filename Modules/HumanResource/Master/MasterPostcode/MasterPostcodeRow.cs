using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.Master;

[ConnectionKey("Default"), Module("Master"), TableName("MasterPostcode")]
[DisplayName("Master Postcode"), InstanceName("Master Postcode")]
[ReadPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]
[LookupScript("MasterPostcode.MasterPostcode", Permission = "*")]

public sealed class MasterPostcodeRow : LoggingRow<MasterPostcodeRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }
    const string jMasterCity = nameof(jMasterCity);

    [DisplayName("City"), ForeignKey("MasterCities", "ID"), LeftJoin(jMasterCity), TextualField(nameof(CityName)),NotNull]
    [LookupEditor(typeof(MasterCityRow))]
    public int? MasterCity
    {
        get => fields.MasterCity[this];
        set => fields.MasterCity[this] = value;
    }
    [DisplayName("City"), Expression($"{jMasterCity}.[Name]")]
    public string CityName
    {
        get => fields.CityName[this];
        set => fields.CityName[this] = value;
    }
    const string jMasterState = nameof(jMasterState);

    [DisplayName("State"), ForeignKey("MasterStates", "ID"), LeftJoin(jMasterState), TextualField(nameof(StateName)), NotNull]
    [LookupEditor(typeof(MasterStateRow))]
    public int? MasterState
    {
        get => fields.MasterState[this];
        set => fields.MasterState[this] = value;
    }

    [DisplayName("State"), Expression($"{jMasterState}.[Name]")]
    public string StateName
    {
        get => fields.StateName[this];
        set => fields.StateName[this] = value;
    }
    [DisplayName("Post Code"), QuickSearch, NameProperty, NotNull]
    public string PostCode
    {
        get => fields.PostCode[this];
        set => fields.PostCode[this] = value;
    }





    const string jMasterCountry = nameof(jMasterCountry);

    [DisplayName("Country"), ForeignKey("MasterCountries", "ID"), LeftJoin(jMasterCountry),  NotNull]
    [LookupEditor(typeof(MasterCountryRow))]
    public int? MasterCountry
    {
        get => fields.MasterCountry[this];
        set => fields.MasterCountry[this] = value;
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
        public Int32Field MasterCity;
        public Int32Field MasterState;
        public StringField PostCode;
        public StringField StateName;
        public StringField CityName;
        public Int32Field MasterCountry;
        public StringField CountryName;

    }
}