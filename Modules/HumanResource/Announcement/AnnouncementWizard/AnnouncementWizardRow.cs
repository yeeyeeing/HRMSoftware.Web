using HRMSoftware.Announcement.Columns;
using HRMSoftware.EmployeeProfile;
using HRMSoftware.OrganisationHierarchy;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.Announcement;

[ConnectionKey("Default"), Module("Announcement"), TableName("HumanResourcesAnnouncementWizard")]
[DisplayName("Announcement Wizard"), InstanceName("Announcement Wizard")]
[ReadPermission("Administration:Employee")]
[ModifyPermission("Administration:Employee")]
public sealed class AnnouncementWizardRow : LoggingRow<AnnouncementWizardRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Announcement Content"), QuickSearch, NameProperty,NotNull]
    public string AnnouncementContent
    {
        get => fields.AnnouncementContent[this];
        set => fields.AnnouncementContent[this] = value;
    }

    [DisplayName("Upload Document")]
    [MultipleFileUploadEditor(FilenameFormat = "Announcement/~")]
    public string UploadDocument
    {
        get => fields.UploadDocument[this];
        set => fields.UploadDocument[this] = value;
    }

    [DisplayName("Issued By")]
    public int? IssuedBy
    {
        get => fields.IssuedBy[this];
        set => fields.IssuedBy[this] = value;
    }

    [DisplayName("Employee List"), NotMapped,
        LookupEditor(typeof(EmployeeProfileRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]

    public List<int> EmployeeRowList
    {
        get => fields.EmployeeRowList[this];
        set => fields.EmployeeRowList[this] = value;
    }

    /*
    [DisplayName("Occupation List"), NotMapped,
        MasterDetailRelation(foreignKey: nameof(AnnouncementOccupationBindedRow.AnnouncementWizardId),
        ColumnsType = typeof(AnnouncementGeneratedEditorColumns))]
    
    [LookupEditor(typeof(OccupationRow), Multiple = true, FilterField = "IsActive", FilterValue = 1), NotMapped]
    [LinkingSetRelation(typeof(AnnouncementOccupationBindedRow), nameof(AnnouncementOccupationBindedRow.AnnouncementWizardId), nameof(AnnouncementOccupationBindedRow.OccupationId))]
    public List<int> OccupationList
    {
        get => fields.OccupationList[this];
        set => fields.OccupationList[this] = value;
    }
    
    [DisplayName("Department List"), NotMapped,
        MasterDetailRelation(foreignKey: nameof(AnnouncementDepartmentBindedRow.AnnouncementWizardId),
        ColumnsType = typeof(AnnouncementGeneratedEditorColumns))]
    public List<AnnouncementDepartmentBindedRow> DepartmentList
    {
        get => fields.DepartmentList[this];
        set => fields.DepartmentList[this] = value;
    }

    [DisplayName("Department List"), NotMapped,
        MasterDetailRelation(foreignKey: nameof(AnnouncementDivisionBindedRow.AnnouncementWizardId),
        ColumnsType = typeof(AnnouncementGeneratedEditorColumns))]
    public List<AnnouncementDivisionBindedRow> DivisionList
    {
        get => fields.DivisionList[this];
        set => fields.DivisionList[this] = value;
    }

    [DisplayName("Department List"), NotMapped,
        MasterDetailRelation(foreignKey: nameof(AnnouncementJobGradeBindedRow.AnnouncementWizardId),
        ColumnsType = typeof(AnnouncementGeneratedEditorColumns))]
    public List<AnnouncementJobGradeBindedRow> JobGradeList
    {
        get => fields.JobGradeList[this];
        set => fields.JobGradeList[this] = value;
    }
    [DisplayName("Department List"), NotMapped,
        MasterDetailRelation(foreignKey: nameof(AnnouncementSectionBindedRow.AnnouncementWizardId),
        ColumnsType = typeof(AnnouncementGeneratedEditorColumns))]
    public List<AnnouncementSectionBindedRow> SectionList
    {
        get => fields.SectionList[this];
        set => fields.SectionList[this] = value;
    }
    */
    [DisplayName("All Employee"), NotMapped]
    [BooleanEditor]
    public bool? All
    {
        get => fields.All[this];
        set => fields.All[this] = value;
    }

    [MasterDetailRelation(foreignKey: nameof(AnnouncementGeneratedRow.GeneratedWizardId), 
        ColumnsType = typeof(AnnouncementGeneratedEditorColumns )),NotMapped]
    public List<AnnouncementGeneratedRow> AnnouncementList
    {
        get => fields.AnnouncementList[this];
        set => fields.AnnouncementList[this] = value;
    }

   // [DisplayName("Occupation List"),
     //   LookupEditor(typeof(OccupationRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
   // [NotMapped]
   
    [DisplayName("Occupation List"), LookupEditor(typeof(OccupationRow), Multiple = true, FilterField = "IsActive", FilterValue = 1), NotMapped]
    [LinkingSetRelation(typeof(AnnouncementOccupationBindedRow), nameof(AnnouncementOccupationBindedRow.AnnouncementWizardId), nameof(AnnouncementOccupationBindedRow.OccupationId))]
    public List<int> OccupationListActual
    {
        get => fields.OccupationListActual[this];
        set => fields.OccupationListActual[this] = value;
    }

    [DisplayName("Department List"), LookupEditor(typeof(DepartmentRow), Multiple = true, FilterField = "IsActive", FilterValue = 1), NotMapped]
    [LinkingSetRelation(typeof(AnnouncementDepartmentBindedRow), nameof(AnnouncementDepartmentBindedRow.AnnouncementWizardId), nameof(AnnouncementDepartmentBindedRow.DepartmentId))]

    public List<int> DepartmentListActual
    {
        get => fields.DepartmentListActual[this];
        set => fields.DepartmentListActual[this] = value;
    }
    /*
    [DisplayName("Division List"),
        LookupEditor(typeof(DivisionRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    [NotMapped]
*/
    [DisplayName("Division List"), LookupEditor(typeof(DivisionRow), Multiple = true, FilterField = "IsActive", FilterValue = 1), NotMapped]
    [LinkingSetRelation(typeof(AnnouncementDivisionBindedRow), nameof(AnnouncementDivisionBindedRow.AnnouncementWizardId), nameof(AnnouncementDivisionBindedRow.DivisionId))]

    public List<int> DivisionListActual
    {
        get => fields.DivisionListActual[this];
        set => fields.DivisionListActual[this] = value;
    }
    /*
    [DisplayName("Job Grade List"),
        LookupEditor(typeof(JobGradeRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    [NotMapped]
    */
    [DisplayName("Job Grade List"), LookupEditor(typeof(OrganisationHierarchy.JobGradeRow), Multiple = true, FilterField = "IsActive", FilterValue = 1), NotMapped]
    [LinkingSetRelation(typeof(AnnouncementJobGradeBindedRow), nameof(AnnouncementJobGradeBindedRow.AnnouncementWizardId), nameof(AnnouncementJobGradeBindedRow.JobGradeId))]
    public List<int> JobGradeListActual
    {
        get => fields.JobGradeListActual[this];
        set => fields.JobGradeListActual[this] = value;
    }
    /*
    [DisplayName("Section List"),
        LookupEditor(typeof(SectionRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    [NotMapped]
    */

    [DisplayName("Section List"), LookupEditor(typeof(SectionRow), Multiple = true, FilterField = "IsActive", FilterValue = 1), NotMapped]
    [LinkingSetRelation(typeof(AnnouncementSectionBindedRow), nameof(AnnouncementSectionBindedRow.AnnouncementWizardId), nameof(AnnouncementSectionBindedRow.SectionId))]
    public List<int> SectionListActual
    {
        get => fields.SectionListActual[this];
        set => fields.SectionListActual[this] = value;
    }
    [DisplayName("Bind To Occupation"), StatusFormatter]
    [BooleanEditor]
    public bool? BindToOccupation
    {
        get => fields.BindToOccupation[this];
        set => fields.BindToOccupation[this] = value;
    }
    [DisplayName("Bind To Department"), StatusFormatter]
    [BooleanEditor]
    public bool? BindToDepartment
    {
        get => fields.BindToDepartment[this];
        set => fields.BindToDepartment[this] = value;
    }
    [DisplayName("Bind To Division"), StatusFormatter]
    [BooleanEditor]
    public bool? BindToDivision
    {
        get => fields.BindToDivision[this];
        set => fields.BindToDivision[this] = value;
    }
    [DisplayName("Bind To Job Grade"), StatusFormatter]
    [BooleanEditor]
    public bool? BindToJobGrade
    {
        get => fields.BindToJobGrade[this];
        set => fields.BindToJobGrade[this] = value;
    }
    [DisplayName("Bind To Section"), StatusFormatter]
    [BooleanEditor]
    public bool? BindToSection
    {
        get => fields.BindToSection[this];
        set => fields.BindToSection[this] = value;
    }


    [DisplayName("Announcement Date")]
    public DateTime? AnnouncementDateTime
    {
        get => fields.AnnouncementDateTime[this];
        set => fields.AnnouncementDateTime[this] = value;
    }
    [NotMapped]
    public DateTime? Today
    {
        get => fields.Today[this];
        set => fields.Today[this] = value;
    }
    [DisplayName("Announcement Time"), NotMapped]
    public string AnnouncementTime
    {
        get => fields.AnnouncementTime[this];
        set => fields.AnnouncementTime[this] = value;
    }
    [DisplayName("Immediate")]
    [BooleanEditor]
    public bool? Immediate
    {
        get => fields.Immediate[this];
        set => fields.Immediate[this] = value;
    }

    [DisplayName("Announce Later")]
    [BooleanEditor]
    public bool? Delayed
    {
        get => fields.Delayed[this];
        set => fields.Delayed[this] = value;
    }
    [DisplayName("Remarks")]
    public string Remarks
    {
        get => fields.Remarks[this];
        set => fields.Remarks[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public BooleanField Immediate;
        public BooleanField Delayed;
        public StringField Remarks;

        public DateTimeField Today;

        public DateTimeField AnnouncementDateTime;
        public StringField AnnouncementTime;

        public BooleanField All;

        public ListField<int> EmployeeRowList;


        
        //public ListField<int> OccupationList;
        // public ListField<AnnouncementDepartmentBindedRow> DepartmentList;
        // public ListField<AnnouncementDivisionBindedRow> DivisionList;
        //  public ListField<AnnouncementJobGradeBindedRow> JobGradeList;
        // public ListField<AnnouncementSectionBindedRow> SectionList;

        public ListField<AnnouncementGeneratedRow> AnnouncementList;

        public Int32Field Id;
        public StringField AnnouncementContent;
        public StringField UploadDocument;
        public Int32Field IssuedBy;




        public ListField<int> OccupationListActual;
        public ListField<int> DepartmentListActual;
        public ListField<int> DivisionListActual;
        public ListField<int> JobGradeListActual;
        public ListField<int> SectionListActual;


        public BooleanField BindToOccupation;
        public BooleanField BindToDepartment;
        public BooleanField BindToDivision;
        public BooleanField BindToJobGrade;
        public BooleanField BindToSection;
    }
}