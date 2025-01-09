using HRMSoftware.Administration;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;

[ConnectionKey("Default"), Module("EmployeeProfile"), TableName("HumanResourcesMasterCareerPath")]
[DisplayName("Master Career Path"), InstanceName("Master Career Path")]
[ReadPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]
[LookupScript("MasterCareerPath.MasterCareerPath", Permission = "*")]
public sealed class MasterCareerPathRow : LoggingRow<MasterCareerPathRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Career Path Type"),NotNull]
    public MasterCareerPathType? CareerPathType
    {
        get => fields.CareerPathType[this];
        set => fields.CareerPathType[this] = value;
    }
    [DisplayName("Category")]
    public Category? CategoryId
    {
        get => fields.CategoryId[this];
        set => fields.CategoryId[this] = value;
    }
    [DisplayName("Description"), QuickSearch]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }

    [DisplayName("Career Path Code"), NameProperty, QuickSearch, NotNull]
    public string CareerPathCode
    {
        get => fields.CareerPathCode[this];
        set => fields.CareerPathCode[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public EnumField<MasterCareerPathType> CareerPathType;
        public StringField Description;
        public StringField CareerPathCode;
        public EnumField<Category> CategoryId;

    }
}