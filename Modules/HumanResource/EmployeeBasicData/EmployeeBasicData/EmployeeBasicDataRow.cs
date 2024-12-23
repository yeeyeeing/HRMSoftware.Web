using HRMSoftware.EmployeeProfile;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeBasicData;

[ConnectionKey("Default"), Module("EmployeeBasicData"), TableName("HumanResourcesEmployee")]
[DisplayName("Employee Basic Data"), InstanceName("Employee Basic Data")]
[ReadPermission("Administration:Employee")]
[ModifyPermission("Administration:Employee")]
public sealed class EmployeeBasicDataRow : LoggingRow<EmployeeBasicDataRow.RowFields>, IIdRow, INameRow
{
    const string jRace = nameof(jRace);
    const string jBank = nameof(jBank);
    const string jCity = nameof(jCity);
    const string jState = nameof(jState);
    const string jNationality = nameof(jNationality);

    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Employee Name"), Size(1000), QuickSearch, NameProperty]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }

    [DisplayName("Employee Id"), Column("EmployeeID"), Size(1000)]
    public string EmployeeId
    {
        get => fields.EmployeeId[this];
        set => fields.EmployeeId[this] = value;
    }

    [DisplayName("Nric"), Column("NRIC"), Size(1000)]
    public string Nric
    {
        get => fields.Nric[this];
        set => fields.Nric[this] = value;
    }

    [DisplayName("Age")]
    public int? Age
    {
        get => fields.Age[this];
        set => fields.Age[this] = value;
    }

    [DisplayName("Birthday")]
    public DateTime? Birthday
    {
        get => fields.Birthday[this];
        set => fields.Birthday[this] = value;
    }

   
 


    [DisplayName("Address"), Size(1000)]
    public string Address
    {
        get => fields.Address[this];
        set => fields.Address[this] = value;
    }

    [DisplayName("Tel Number1"), Size(1000)]
    public string TelNumber1
    {
        get => fields.TelNumber1[this];
        set => fields.TelNumber1[this] = value;
    }

    [DisplayName("Tel Number2"), Size(1000)]
    public string TelNumber2
    {
        get => fields.TelNumber2[this];
        set => fields.TelNumber2[this] = value;
    }


    [DisplayName("Employee Type")]
    public EmployeeType? EmployeeType
    {
        get => fields.EmployeeType[this];
        set => fields.EmployeeType[this] = value;
    }

    [DisplayName("Sex")]
    public SexType? Sex
    {
        get => fields.Sex[this];
        set => fields.Sex[this] = value;
    }

    [DisplayName("City"), Column("CityID"), ForeignKey("MasterCities", "ID"), LeftJoin(jCity), TextualField(nameof(CityName))]
    [LookupEditor(typeof(Master.MasterCityRow))]
    public int? CityId
    {
        get => fields.CityId[this];
        set => fields.CityId[this] = value;
    }

    [DisplayName("State"), Column("StateID"), ForeignKey("MasterStates", "ID"), LeftJoin(jState), TextualField(nameof(StateName))]
    [LookupEditor(typeof(Master.MasterStateRow))]
    public int? StateId
    {
        get => fields.StateId[this];
        set => fields.StateId[this] = value;
    }

    [DisplayName("Employee Img"), Size(1000)]
    [ImageUploadEditor]
    public string EmployeeImg
    {
        get => fields.EmployeeImg[this];
        set => fields.EmployeeImg[this] = value;
    }

    [DisplayName("Nationality"), Column("NationalityID"), ForeignKey("MasterCountries", "ID"), LeftJoin(jNationality), TextualField(nameof(NationalityName))]
    [LookupEditor(typeof(Master.MasterCountryRow))]
    public int? NationalityId
    {
        get => fields.NationalityId[this];
        set => fields.NationalityId[this] = value;
    }

    [DisplayName("Marital Status")]
    public MaritalStatus? MaritalStatus
    {
        get => fields.MaritalStatus[this];
        set => fields.MaritalStatus[this] = value;
    }


    [DisplayName("Race"), Expression($"{jRace}.[Race]")]
    public string Race
    {
        get => fields.Race[this];
        set => fields.Race[this] = value;
    }


    [DisplayName("City Name"), Expression($"{jCity}.[Name]")]
    public string CityName
    {
        get => fields.CityName[this];
        set => fields.CityName[this] = value;
    }

    [DisplayName("State Name"), Expression($"{jState}.[Name]")]
    public string StateName
    {
        get => fields.StateName[this];
        set => fields.StateName[this] = value;
    }

    [DisplayName("Nationality Name"), Expression($"{jNationality}.[Name]")]
    public string NationalityName
    {
        get => fields.NationalityName[this];
        set => fields.NationalityName[this] = value;
    }

    [DisplayName("Race"), Column("RaceID"), ForeignKey("HumanResourcesRace", "ID"), LeftJoin(jRace), TextualField(nameof(Race))]
    [LookupEditor(typeof(Race.RaceRow))]
    public int? RaceId
    {
        get => fields.RaceId[this];
        set => fields.RaceId[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField EmployeeName;
        public StringField EmployeeId;
        public StringField Nric;
        public Int32Field Age;
     
        public DateTimeField Birthday;
        public StringField Address;
        public StringField TelNumber1;
        public StringField TelNumber2;

        public Int32Field RaceId;
        public EnumField<EmployeeType> EmployeeType;
        public EnumField<SexType> Sex;



        public Int32Field CityId;
        public Int32Field StateId;
        public StringField EmployeeImg;
        public Int32Field NationalityId;
        public EnumField<MaritalStatus> MaritalStatus;


        public StringField Race;
        public StringField CityName;
        public StringField StateName;
        public StringField NationalityName;
    }

}