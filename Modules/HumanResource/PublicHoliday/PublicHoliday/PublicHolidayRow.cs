using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;
using HRMSoftware.Common;
namespace HRMSoftware.PublicHoliday;

[ConnectionKey("Default"), Module("PublicHoliday"), TableName("HumanResourcesPublicHoliday")]
[DisplayName("Public Holiday"), InstanceName("Public Holiday")]

[ReadPermission("*")]
[InsertPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]
[LookupScript("PublicHoliday.PublicHoliday", Permission = "*")]
[DataAuditLog]



public sealed class PublicHolidayRow : Row<PublicHolidayRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }
    [PublicHolidayStatusFormatter]
    public int? IsActive
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Name"),  QuickSearch, NameProperty]
    public string Name
    {
        get => fields.Name[this];
        set => fields.Name[this] = value;
    }
    [DisplayName("Country Code"), Size(200)]
    public string CountryCode
    {
        get => fields.CountryCode[this];
        set => fields.CountryCode[this] = value;
    }
    [DisplayName("Date"), Column("date")]
    public DateTime? Date
    {
        get => fields.Date[this];
        set => fields.Date[this] = value;
    }

    public class RowFields : RowFieldsBase
    {
        public Int32Field Id;
        public Int32Field IsActive;

        public StringField Name;
        public DateTimeField Date;
        public StringField CountryCode;

    }
}