using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal;

[ConnectionKey("Default"), Module("PerformanceAppraisal"), TableName("CompanyProfile")]
[DisplayName("Company Profile"), InstanceName("Company Profile")]
[ReadPermission("Administration:General")]
[ModifyPermission("Administration:General")]
public sealed class CompanyProfileRow : LoggingRow<CompanyProfileRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Title"), QuickSearch, NameProperty, NotNull]
    public string Title
    {
        get => fields.Title[this];
        set => fields.Title[this] = value;
    }

    [DisplayName("Address"), NotNull]
    public string Address
    {
        get => fields.Address[this];
        set => fields.Address[this] = value;
    }

    [DisplayName("Tel"), NotNull]
    public string Tel
    {
        get => fields.Tel[this];
        set => fields.Tel[this] = value;
    }

    [DisplayName("Website"), NotNull]
    public string Website
    {
        get => fields.Website[this];
        set => fields.Website[this] = value;
    }

    [DisplayName("Picture"),ImageUploadEditor, NotNull]
    public string Picture
    {
        get => fields.Picture[this];
        set => fields.Picture[this] = value;
    }
    
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField Title;
        public StringField Address;
        public StringField Tel;
        public StringField Website;
        public StringField Picture;
       
    }
}