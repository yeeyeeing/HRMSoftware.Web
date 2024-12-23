using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;
using Serenity.Extensions.Entities;

namespace HRMSoftware.Master;

[ConnectionKey("Default"), Module("Master"), TableName("MasterCostCentre")]
[DisplayName("Master Cost Centre"), InstanceName("Master Cost Centre")]
[ReadPermission(PermissionKeys.Employee)]
[ModifyPermission(PermissionKeys.HumanResources)]
[LookupScript("MasterCostCentre.MasterCostCentre", Permission = "*")]

public sealed class MasterCostCentreRow : LoggingRow<MasterCostCentreRow.RowFields>, IIdRow, INameRow
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