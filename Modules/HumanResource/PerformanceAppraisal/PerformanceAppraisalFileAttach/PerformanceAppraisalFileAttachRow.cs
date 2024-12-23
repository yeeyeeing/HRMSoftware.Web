using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal;

[ConnectionKey("Default"), Module("PerformanceAppraisal"), TableName("PerformanceAppraisalFileAttach")]
[DisplayName("Performance Appraisal File Attach"), InstanceName("Performance Appraisal File Attach")]
[ReadPermission("*")]
[ModifyPermission("*")]
public sealed class PerformanceAppraisalFileAttachRow : LoggingRow<PerformanceAppraisalFileAttachRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Files"), QuickSearch, NameProperty, NotNull,FileUploadEditor]
    public string Files
    {
        get => fields.Files[this];
        set => fields.Files[this] = value;
    }

    [DisplayName("Remark"), NotNull]
    public string Remark
    {
        get => fields.Remark[this];
        set => fields.Remark[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField Files;
        public StringField Remark;

    }
}