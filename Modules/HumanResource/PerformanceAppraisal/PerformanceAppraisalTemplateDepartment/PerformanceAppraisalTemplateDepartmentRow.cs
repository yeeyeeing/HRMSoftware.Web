using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal;

[ConnectionKey("Default"), Module("PerformanceAppraisal"), TableName("PerformanceAppraisalTemplateDepartment")]
[DisplayName("Performance Appraisal Template Department"), InstanceName("Performance Appraisal Template Department")]
[ReadPermission("Administration:General")]
[ModifyPermission("Administration:General")]
public sealed class PerformanceAppraisalTemplateDepartmentRow : LoggingRow<PerformanceAppraisalTemplateDepartmentRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Template Id"), Column("TemplateID")]
    public int? TemplateId
    {
        get => fields.TemplateId[this];
        set => fields.TemplateId[this] = value;
    }

    [DisplayName("Department Id"), Column("DepartmentID")]
    public int? DepartmentId
    {
        get => fields.DepartmentId[this];
        set => fields.DepartmentId[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field TemplateId;
        public Int32Field DepartmentId;
        
    }
}