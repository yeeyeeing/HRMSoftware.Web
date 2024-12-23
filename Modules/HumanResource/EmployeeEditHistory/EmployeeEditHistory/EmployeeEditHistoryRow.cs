using HRMSoftware.Administration;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeEditHistory;

[ConnectionKey("Default"), Module("EmployeeEditHistory"), TableName("HumanResourcesEmployeeHistory")]
[DisplayName("Employee Edit History"), InstanceName("Employee Edit History")]
[ReadPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]
public sealed class EmployeeEditHistoryRow : LoggingRow<EmployeeEditHistoryRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Employee Row Id"), Column("EmployeeRowID")]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }


    [DisplayName("Old Value"), Size(50), QuickSearch, NameProperty]
    public string OldValue
    {
        get => fields.OldValue[this];
        set => fields.OldValue[this] = value;
    }

    [DisplayName("New Value"), Size(50)]
    public string NewValue
    {
        get => fields.NewValue[this];
        set => fields.NewValue[this] = value;
    }

    [DisplayName("Field Name"), Size(50)]
    public string FieldName
    {
        get => fields.FieldName[this];
        set => fields.FieldName[this] = value;
    }

    [DisplayName("Description"), Size(500)]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field EmployeeRowId;
        
        public StringField OldValue;
        public StringField NewValue;
        public StringField FieldName;
        public StringField Description;

    }

}