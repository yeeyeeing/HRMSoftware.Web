using HRMSoftware.EmployeeProfile;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.Announcement;

[ConnectionKey("Default"), Module("Announcement"), TableName("HumanResourcesAnnouncementGenerated")]
[DisplayName("Announcement Generated"), InstanceName("Announcement Generated")]
[ReadPermission("*")]
[ModifyPermission("*")]
public sealed class AnnouncementGeneratedRow : LoggingRow<AnnouncementGeneratedRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Column("ID"), IdProperty, Identity]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Announcement Content"),NotNull]
    public string AnnouncementContent
    {
        get => fields.AnnouncementContent[this];
        set => fields.AnnouncementContent[this] = value;
    }

    [DisplayName("Status"),AnnouncementGeneratedFormatter]
    public int? Viewed
    {
        get => fields.Viewed[this];
        set => fields.Viewed[this] = value;
    }
    const string jEmployeeName = nameof(jEmployeeName);
    [DisplayName("Employee ID"), Column("EmployeeRowID"), ForeignKey(typeof(EmployeeProfileRow)), LeftJoin("c"), TextualField(nameof(EmployeeName)), NotNull]
    [LookupEditor(typeof(EmployeeProfileRow), Async = true)]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    [DisplayName("Employee Name"), Expression($"c.EmployeeName")]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }
    [DisplayName("Employee ID"), Expression($"c.EmployeeID")]
    public string EmployeeID
    {
        get => fields.EmployeeID[this];
        set => fields.EmployeeID[this] = value;
    }
    [DisplayName("View Time")]
    public DateTime? ViewTime
    {
        get => fields.ViewTime[this];
        set => fields.ViewTime[this] = value;
    }

    [DisplayName("Upload Document")]
    [MultipleFileUploadEditor(FilenameFormat = "Announcement/~")]
    public string UploadDocument
    {
        get => fields.UploadDocument[this];
        set => fields.UploadDocument[this] = value;
    }


    public int? GeneratedWizardId
    {
        get => fields.GeneratedWizardId[this];
        set => fields.GeneratedWizardId[this] = value;
    }
    public int? GeneratedRecurringId
    {
        get => fields.GeneratedRecurringId[this];
        set => fields.GeneratedRecurringId[this] = value;
    }
    [DisplayName("Bind To Occupation")]
    [BooleanEditor]
    public bool? BindToOccupation
    {
        get => fields.BindToOccupation[this];
        set => fields.BindToOccupation[this] = value;
    }
    [DisplayName("Bind To Department")]
    [BooleanEditor]
    public bool? BindToDepartment
    {
        get => fields.BindToDepartment[this];
        set => fields.BindToDepartment[this] = value;
    }
    [DisplayName("Bind To Division")]
    [BooleanEditor]
    public bool? BindToDivision
    {
        get => fields.BindToDivision[this];
        set => fields.BindToDivision[this] = value;
    }
    [DisplayName("Bind To Job Grade")]
    [BooleanEditor]
    public bool? BindToJobGrade
    {
        get => fields.BindToJobGrade[this];
        set => fields.BindToJobGrade[this] = value;
    }
    [DisplayName("Bind To Section")]
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
    [DisplayName("Announcement Time"), NotMapped]
    public string AnnouncementTime
    {
        get => fields.AnnouncementTime[this];
        set => fields.AnnouncementTime[this] = value;
    }
    [DisplayName("Immediate")]
    [BooleanEditor,NotMapped]
    public bool? Immediate
    {
        get => fields.Immediate[this];
        set => fields.Immediate[this] = value;
    }
    [DisplayName("Announce Later")]
    [BooleanEditor, NotMapped]
    public bool? Delayed
    {
        get => fields.Delayed[this];
        set => fields.Delayed[this] = value;
    }
    [DisplayName("Remarks"), NotMapped]
    public string Remarks
    {
        get => fields.Remarks[this];
        set => fields.Remarks[this] = value;
    }

    const string jDepartment = nameof(jDepartment);
    const string jDivision = nameof(jDivision);
    const string jSection = nameof(jSection);
    const string jJobGrade = nameof(jJobGrade);
    const string jOccupation = nameof(jOccupation);
    [DisplayName("Occupation"), ForeignKey("HumanResourcesOccupation", "ID"), LeftJoin(jOccupation), TextualField(nameof(Occupation))]
    [LookupEditor(typeof(OrganisationHierarchy.OccupationRow))]
    public int? EmployeeOccupation
    {
        get => fields.EmployeeOccupation[this];
        set => fields.EmployeeOccupation[this] = value;
    }

    [DisplayName("Department"),ForeignKey("HumanResourcesDepartment", "ID"), LeftJoin(jDepartment), TextualField(nameof(DepartmentDept))]
    [LookupEditor(typeof(OrganisationHierarchy.DepartmentRow))]
    public int? EmployeeDepartment
    {
        get => fields.EmployeeDepartment[this];
        set => fields.EmployeeDepartment[this] = value;
    }

    [DisplayName("Division"), ForeignKey("HumanResourcesDivision", "ID"), LeftJoin(jDivision), TextualField(nameof(Division))]
    [LookupEditor(typeof(OrganisationHierarchy.DivisionRow))]
    public int? EmployeeDivision
    {
        get => fields.EmployeeDivision[this];
        set => fields.EmployeeDivision[this] = value;
    }

    [DisplayName("Job Grade"),  ForeignKey("HumanResourcesJobGrade", "ID"), LeftJoin(jJobGrade), TextualField(nameof(JobGrade))]
    [LookupEditor(typeof(OrganisationHierarchy.JobGradeRow))]
    public int? EmployeeJobGrade
    {
        get => fields.EmployeeJobGrade[this];
        set => fields.EmployeeJobGrade[this] = value;
    }

    [DisplayName("Section"),  ForeignKey("HumanResourcesSection", "ID"), LeftJoin(jSection), TextualField(nameof(Section))]
    [LookupEditor(typeof(OrganisationHierarchy.SectionRow))]
    public int? EmployeeSection
    {
        get => fields.EmployeeSection[this];
        set => fields.EmployeeSection[this] = value;
    }


    [DisplayName("Department"), Expression($"{jDepartment}.[Name]"), AsyncLookupEditor("Department.Department", AutoComplete = true), LookupInclude]
    public string DepartmentDept
    {
        get => fields.DepartmentDept[this];
        set => fields.DepartmentDept[this] = value;
    }


    [DisplayName("Division"), Expression($"{jDivision}.[Name]"), AsyncLookupEditor("Division.Division", AutoComplete = true), LookupInclude]
    public string Division
    {
        get => fields.Division[this];
        set => fields.Division[this] = value;
    }

    [DisplayName("Section"), Expression($"{jSection}.[Name]"), AsyncLookupEditor("Section.Section", AutoComplete = true), LookupInclude]
    public string Section
    {
        get => fields.Section[this];
        set => fields.Section[this] = value;
    }

    [DisplayName("Job Grade"), Expression($"{jJobGrade}.[Name]"), LookupInclude]
    public string JobGrade
    {
        get => fields.JobGrade[this];
        set => fields.JobGrade[this] = value;
    }

    [DisplayName("Occupation"), Expression($"{jOccupation}.[Name]"), LookupInclude]
    public string Occupation
    {
        get => fields.Occupation[this];
        set => fields.Occupation[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public BooleanField Immediate;
        public BooleanField Delayed;
        public StringField Remarks;


        public DateTimeField AnnouncementDateTime;
        public StringField AnnouncementTime;

        public StringField EmployeeID;

        public StringField UploadDocument;
        public Int32Field Id;
        public StringField AnnouncementContent;
        public Int32Field GeneratedWizardId;
        public Int32Field GeneratedRecurringId;



        public Int32Field Viewed;
        public Int32Field EmployeeRowId;
        public StringField EmployeeName;

        public DateTimeField ViewTime;


        public BooleanField BindToOccupation;
        public BooleanField BindToDepartment;
        public BooleanField BindToDivision;
        public BooleanField BindToJobGrade;
        public BooleanField BindToSection;


        public Int32Field EmployeeOccupation;
        public Int32Field EmployeeDepartment;
        public Int32Field EmployeeDivision;
        public Int32Field EmployeeJobGrade;
        public Int32Field EmployeeSection;


        public StringField DepartmentDept;
        public StringField Division;
        public StringField Section;
        public StringField JobGrade;
        public StringField Occupation;
    }
}