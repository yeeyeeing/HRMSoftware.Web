using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.OrganisationChart;

[ConnectionKey("Default"), Module("OrganisationChart"), TableName("HumanResourcesOrganisationChart")]
[DisplayName("Final Organisation Chart"), InstanceName("Final Organisation Chart")]
[ReadPermission("*")]
[ModifyPermission("*")]
public sealed class FinalOrganisationChartRow : LoggingRow<FinalOrganisationChartRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Final Org Chart"), QuickSearch, NameProperty]
    public string FinalOrgChart
    {
        get => fields.FinalOrgChart[this];
        set => fields.FinalOrgChart[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField FinalOrgChart;
     

    }
}