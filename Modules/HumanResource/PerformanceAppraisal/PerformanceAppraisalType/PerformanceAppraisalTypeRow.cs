using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.PerformanceAppraisal;

[ConnectionKey("Default"), Module("PerformanceAppraisal"), TableName("PerformanceAppraisalType")]
[DisplayName("Performance Appraisal Type"), InstanceName("Performance Appraisal Type")]
[ReadPermission("*")]
[ModifyPermission(PermissionKeys.HumanResources)]
[LookupScript]

public sealed class PerformanceAppraisalTypeRow : LoggingRow<PerformanceAppraisalTypeRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Type"), Size(30), QuickSearch, NameProperty, NotNull]
    public string Type
    {
        get => fields.Type[this];
        set => fields.Type[this] = value;
    }
    
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField Type;
    }
}