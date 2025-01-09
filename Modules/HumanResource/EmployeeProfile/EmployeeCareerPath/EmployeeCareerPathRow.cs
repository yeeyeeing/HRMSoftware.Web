using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;

[ConnectionKey("Default"), Module("EmployeeProfile"), TableName("HumanResourcesEmployeeCareerPath")]
[DisplayName("Employee Career Path"), InstanceName("Employee Career Path")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class EmployeeCareerPathRow : LoggingRow<EmployeeCareerPathRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }
    const string jEmployeeName = nameof(jEmployeeName);
    [DisplayName("Employee ID"), Column("EmployeeRowID"), ForeignKey(typeof(EmployeeProfileRow)), LeftJoin("c")]
    [LookupEditor(typeof(EmployeeProfileRow)),NotNull]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    [DisplayName("Employee Name"), Expression($"c.EmployeeName"), NameProperty, QuickSearch]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }
    [DisplayName("Description"), QuickSearch]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }


    [DisplayName("Path Code"), ForeignKey("HumanResourcesMasterCareerPath", "ID"), LeftJoin(jCareerPathId)]
    [LookupEditor(typeof(MasterCareerPathRow)),NotNull]
    public int? CareerPathId
    {
        get => fields.CareerPathId[this];
        set => fields.CareerPathId[this] = value;
    }
    const string jCareerPathId = nameof(jCareerPathId);

    [DisplayName("Path Code"), Expression($"{jCareerPathId}.[CareerPathCode]")]
    public string CareerPathCode
    {
        get => fields.CareerPathCode[this];
        set => fields.CareerPathCode[this] = value;
    }

    [DisplayName("Effective Date"),NotNull]
    public DateTime? EffectiveDate
    {
        get => fields.EffectiveDate[this];
        set => fields.EffectiveDate[this] = value;
    }


    [DisplayName("New Value"), NotNull]
    public double? NewValue
    {
        get => fields.NewValue[this];
        set => fields.NewValue[this] = value;
    }
    public string ValueString
    {
        get => fields.ValueString[this];
        set => fields.ValueString[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField Description;
        public StringField CareerPathCode;
        public StringField ValueString;
        public StringField EmployeeName;

        public Int32Field CareerPathId;
        public DateTimeField EffectiveDate;

        public DoubleField NewValue;
        public Int32Field EmployeeRowId;

    }
}