using System;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System.Collections.Generic;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.PerformanceAppraisal;

[ConnectionKey("Default"), Module("PerformanceAppraisal"), TableName("PerformanceAppraisalTemplate")]
[DisplayName("Performance Appraisal Template"), InstanceName("Performance Appraisal Template")]
[ReadPermission("*")]
[ModifyPermission(PermissionKeys.HumanResources)]
[LookupScript]
public sealed class PerformanceAppraisalTemplateRow : LoggingRow<PerformanceAppraisalTemplateRow.RowFields>, IIdRow, INameRow
{

    const string JDepartment = nameof(JDepartment);
    
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Template"), Column("TemplateName"), NameProperty]
    public string TemplateName
    {
        get => fields.TemplateName[this];
        set => fields.TemplateName[this] = value;
    }
    
    [DisplayName("Duration"), Column("Duration")]
    public int? Duration
    {
        get => fields.Duration[this];
        set => fields.Duration[this] = value;
    }
    
    [DisplayName("Rating Scale"), Column("RatingScale")]
    public int? RatingScale
    {
        get => fields.RatingScale[this];
        set => fields.RatingScale[this] = value;
    }
  
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField TemplateName;
        public Int32Field Duration;
        public Int32Field RatingScale;
    }
}