using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System.ComponentModel;

namespace HRMSoftware.OrganisationChart;

[ConnectionKey("Default"), Module("OrganisationChart"), TableName("HumanResourcesSplitOrganisationChart")]
[DisplayName("Split Organisation Chart"), InstanceName("Split Organisation Chart")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class SplitOrganisationChartRow : LoggingRow<SplitOrganisationChartRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Parent Id"), QuickSearch, NameProperty]
    public string ParentId
    {
        get => fields.ParentId[this];
        set => fields.ParentId[this] = value;
    }

    [DisplayName("Node Id")]
    public string NodeId
    {
        get => fields.NodeId[this];
        set => fields.NodeId[this] = value;
    }

    [DisplayName("Name"), Column("name")]
    public string Name
    {
        get => fields.Name[this];
        set => fields.Name[this] = value;
    }

    [DisplayName("Title"), Column("title")]
    public string Title
    {
        get => fields.Title[this];
        set => fields.Title[this] = value;
    }

    [DisplayName("Class Name"), Column("className")]
    public string ClassName
    {
        get => fields.ClassName[this];
        set => fields.ClassName[this] = value;
    }

    [DisplayName("Hierarchy Level"), Column("hierarchyLevel")]
    public int? HierarchyLevel
    {
        get => fields.HierarchyLevel[this];
        set => fields.HierarchyLevel[this] = value;
    }

    [DisplayName("Employee Row Id")]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField ParentId;
        public StringField NodeId;
        public StringField Name;
        public StringField Title;
        public StringField ClassName;
        public Int32Field HierarchyLevel;
        public Int32Field EmployeeRowId;

    }
}