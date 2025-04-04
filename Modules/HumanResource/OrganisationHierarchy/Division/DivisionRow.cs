using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.OrganisationHierarchy;

[ConnectionKey("Default"), Module("OrganisationHierarchy"), TableName("HumanResourcesDivision")]
[DisplayName("Division"), InstanceName("Division")]
[ReadPermission("*")]
[ModifyPermission("Administration:HumanResources")]
[LookupScript("Division.Division", Permission = "*")]

public sealed class DivisionRow : LoggingRow<DivisionRow.RowFields>, IIdRow, INameRow
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