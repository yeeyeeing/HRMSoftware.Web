using HRMSoftware.Administration;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.OrganisationChart;

[ConnectionKey("Default"), Module("OrganisationChart"), TableName("HumanResourcesOrganisationStructure")]
[DisplayName("Organisation Chart"), InstanceName("Organisation Chart")]
[ReadPermission("*")]
[ModifyPermission("*")]
public sealed class OrganisationChartRow : LoggingRow<OrganisationChartRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Org Chart"), QuickSearch, NameProperty]
    public string OrgChart
    {
        get => fields.OrgChart[this];
        set => fields.OrgChart[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField OrgChart;
    }
}