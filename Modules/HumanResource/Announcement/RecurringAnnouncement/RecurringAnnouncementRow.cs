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

[ConnectionKey("Default"), Module("Announcement"), TableName("HumanResourcesAnnouncementRecurring")]
[DisplayName("Recurring Announcement"), InstanceName("Recurring Announcement")]
[ReadPermission("Administration:Employee")]
[ModifyPermission("Administration:Employee")]
public sealed class RecurringAnnouncementRow : LoggingRow<RecurringAnnouncementRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Starting Date"), NotNull]
    public DateTime? StartingDateTime
    {
        get => fields.StartingDateTime[this];
        set => fields.StartingDateTime[this] = value;
    }

    [DisplayName("Announcement Content"), QuickSearch, NotNull]
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

    [DisplayName("Interval In Days")]
    public int? IntervalInDays
    {
        get => fields.IntervalInDays[this];
        set => fields.IntervalInDays[this] = value;
    }



    [DisplayName("Name"), QuickSearch, NameProperty,NotNull]
    public string Name
    {
        get => fields.Name[this];
        set => fields.Name[this] = value;
    }

    [DisplayName("Sunday")]
    [BooleanEditor]
    public bool? Sunday
    {
        get => fields.Sunday[this];
        set => fields.Sunday[this] = value;
    }

    [DisplayName("Monday")]
    [BooleanEditor]
    public bool? Monday
    {
        get => fields.Monday[this];
        set => fields.Monday[this] = value;
    }

    [DisplayName("Tuesday")]
    [BooleanEditor]
    public bool? Tuesday
    {
        get => fields.Tuesday[this];
        set => fields.Tuesday[this] = value;
    }

    [DisplayName("Wednesday")]
    [BooleanEditor]
    public bool? Wednesday
    {
        get => fields.Wednesday[this];
        set => fields.Wednesday[this] = value;
    }

    [DisplayName("Thursday")]
    [BooleanEditor]
    public bool? Thursday
    {
        get => fields.Thursday[this];
        set => fields.Thursday[this] = value;
    }

    [DisplayName("Friday")]
    [BooleanEditor]
    public bool? Friday
    {
        get => fields.Friday[this];
        set => fields.Friday[this] = value;
    }

    [DisplayName("Saturday")]
    [BooleanEditor]
    public bool? Saturday
    {
        get => fields.Saturday[this];
        set => fields.Saturday[this] = value;
    }
    /*
    [DisplayName("Employee List"), NotMapped,
        MasterDetailRelation(foreignKey: nameof(RecurringBindedEmployeeRow.RecurringId),
        ColumnsType = typeof(RecurringBindedEmployeeColumns))]
    public List<RecurringBindedEmployeeRow> EmployeeRowList
    {
        get => fields.EmployeeRowList[this];
        set => fields.EmployeeRowList[this] = value;
    }

    
    [DisplayName("Occupation List"), NotMapped,
        MasterDetailRelation(foreignKey: nameof(AnnouncementOccupationBindedRow.AnnouncementRecurringId),
        ColumnsType = typeof(AnnouncementGeneratedEditorColumns))]
    public List<AnnouncementOccupationBindedRow> OccupationList
    {
        get => fields.OccupationList[this];
        set => fields.OccupationList[this] = value;
    }

    [DisplayName("Department List"), NotMapped,
        MasterDetailRelation(foreignKey: nameof(AnnouncementDepartmentBindedRow.AnnouncementRecurringId),
        ColumnsType = typeof(AnnouncementGeneratedEditorColumns))]
    public List<AnnouncementDepartmentBindedRow> DepartmentList
    {
        get => fields.DepartmentList[this];
        set => fields.DepartmentList[this] = value;
    }

    [DisplayName("Department List"), NotMapped,
        MasterDetailRelation(foreignKey: nameof(AnnouncementDivisionBindedRow.AnnouncementRecurringId),
        ColumnsType = typeof(AnnouncementGeneratedEditorColumns))]
    public List<AnnouncementDivisionBindedRow> DivisionList
    {
        get => fields.DivisionList[this];
        set => fields.DivisionList[this] = value;
    }

    [DisplayName("Department List"), NotMapped,
        MasterDetailRelation(foreignKey: nameof(AnnouncementJobGradeBindedRow.AnnouncementRecurringId),
        ColumnsType = typeof(AnnouncementGeneratedEditorColumns))]
    public List<AnnouncementJobGradeBindedRow> JobGradeList
    {
        get => fields.JobGradeList[this];
        set => fields.JobGradeList[this] = value;
    }
    [DisplayName("Department List"), NotMapped,
        MasterDetailRelation(foreignKey: nameof(AnnouncementSectionBindedRow.AnnouncementRecurringId),
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

    [DisplayName("Occupation List"), LookupEditor(typeof(OccupationRow), Multiple = true, FilterField = "IsActive", FilterValue = 1), NotMapped]
    [LinkingSetRelation(typeof(AnnouncementOccupationBindedRow), nameof(AnnouncementOccupationBindedRow.AnnouncementRecurringId), nameof(AnnouncementOccupationBindedRow.OccupationId))]
    public List<int> OccupationListActual
    {
        get => fields.OccupationListActual[this];
        set => fields.OccupationListActual[this] = value;
    }

    [DisplayName("Department List"), LookupEditor(typeof(OrganisationHierarchy.DepartmentRow), Multiple = true, FilterField = "IsActive", FilterValue = 1), NotMapped]
    [LinkingSetRelation(typeof(AnnouncementDepartmentBindedRow),
        nameof(AnnouncementDepartmentBindedRow.AnnouncementRecurringId), nameof(AnnouncementDepartmentBindedRow.DepartmentId))]
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
    [LinkingSetRelation(typeof(AnnouncementDivisionBindedRow), nameof(AnnouncementDivisionBindedRow.AnnouncementRecurringId), nameof(AnnouncementDivisionBindedRow.DivisionId))]

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
    [LinkingSetRelation(typeof(AnnouncementJobGradeBindedRow), nameof(AnnouncementJobGradeBindedRow.AnnouncementRecurringId), nameof(AnnouncementJobGradeBindedRow.JobGradeId))]
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
    [LinkingSetRelation(typeof(AnnouncementSectionBindedRow), nameof(AnnouncementSectionBindedRow.AnnouncementRecurringId), nameof(AnnouncementSectionBindedRow.SectionId))]
    public List<int> SectionListActual
    {
        get => fields.SectionListActual[this];
        set => fields.SectionListActual[this] = value;
    }


    //[DisplayName("Employee List"),
    //    LookupEditor(typeof(EmployeeProfileRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    //[NotMapped] RecurringBindedEmployeeRow.RecurringId
    [DisplayName("Employee List"), LookupEditor(typeof(EmployeeProfileRow), Multiple = true, FilterField = "IsActive", FilterValue = 1), NotMapped]
    [LinkingSetRelation(typeof(RecurringBindedEmployeeRow), nameof(RecurringBindedEmployeeRow.RecurringId), nameof(RecurringBindedEmployeeRow.EmployeeRowId))]
    public List<int> EmployeeListActual
    {
        get => fields.EmployeeListActual[this];
        set => fields.EmployeeListActual[this] = value;
    }

    public string Remarks
    {
        get => fields.Remarks[this];
        set => fields.Remarks[this] = value;
    }
    [DisplayName("Recurring Time"), NotMapped, NotNull]
    public string RecurringTime
    {
        get => fields.RecurringTime[this];
        set => fields.RecurringTime[this] = value;
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
    [DisplayName("Recurring Per Days Of Week")]
    [BooleanEditor]
    public bool? DaysOfWeekRecurring
    {
        get => fields.DaysOfWeekRecurring[this];
        set => fields.DaysOfWeekRecurring[this] = value;
    }
    [DisplayName("Recurring Per Days")]
    [BooleanEditor]
    public bool? DaysPerRecurring
    {
        get => fields.DaysPerRecurring[this];
        set => fields.DaysPerRecurring[this] = value;
    }
    [MasterDetailRelation(foreignKey: nameof(AnnouncementGeneratedRow.GeneratedRecurringId), ColumnsType = typeof(AnnouncementGeneratedEditorColumns))]
    [NotMapped]
    public List<AnnouncementGeneratedRow> AnnouncementList
    {
        get => fields.AnnouncementList[this];
        set => fields.AnnouncementList[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public ListField<AnnouncementGeneratedRow> AnnouncementList;

        public BooleanField All;
        /*
        public ListField<RecurringBindedEmployeeRow> EmployeeRowList;
        public ListField<AnnouncementOccupationBindedRow> OccupationList;
        public ListField<AnnouncementDepartmentBindedRow> DepartmentList;
        public ListField<AnnouncementDivisionBindedRow> DivisionList;
        public ListField<AnnouncementJobGradeBindedRow> JobGradeList;
        public ListField<AnnouncementSectionBindedRow> SectionList;
        */
        




        public Int32Field Id;
        public DateTimeField StartingDateTime;
        public StringField AnnouncementContent;
        public StringField UploadDocument;
        public StringField RecurringTime;
        public StringField Remarks;

        public Int32Field IntervalInDays;
        public StringField Name;


        public BooleanField DaysOfWeekRecurring;
        public BooleanField DaysPerRecurring;



        public BooleanField Sunday;
        public BooleanField Monday;
        public BooleanField Tuesday;
        public BooleanField Wednesday;
        public BooleanField Thursday;
        public BooleanField Friday;
        public BooleanField Saturday;





        public ListField<int> OccupationListActual;
        public ListField<int> DepartmentListActual;
        public ListField<int> DivisionListActual;
        public ListField<int> JobGradeListActual;
        public ListField<int> SectionListActual;
        public ListField<int> EmployeeListActual;




        public BooleanField BindToOccupation;
        public BooleanField BindToDepartment;
        public BooleanField BindToDivision;
        public BooleanField BindToJobGrade;
        public BooleanField BindToSection;

    }
}