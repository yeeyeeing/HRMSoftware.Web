using HRMSoftware.Master;
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

    const string jRace = nameof(jRace);
    const string jDepartment = nameof(jDepartment);
    const string jDivision = nameof(jDivision);
    const string jSection = nameof(jSection);
    const string jJobGrade = nameof(jJobGrade);
    const string jOccupation = nameof(jOccupation);
    const string jBank = nameof(jBank);
    const string jShift = nameof(jShift);
    const string jCity = nameof(jCity);
    const string jState = nameof(jState);
    const string jNationality = nameof(jNationality);
    const string jCostCentre = nameof(jCostCentre);
    const string jCp8d = nameof(jCp8d);
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
    [DisplayName("Action Description"), QuickSearch]
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


    [DisplayName("New Value")]
    public double? NewValue
    {
        get => fields.NewValue[this];
        set => fields.NewValue[this] = value;
    }
    public double? oldValue
    {
        get => fields.oldValue[this];
        set => fields.oldValue[this] = value;
    }
    public string ValueString
    {
        get => fields.ValueString[this];
        set => fields.ValueString[this] = value;
    }

    [DisplayName("Description"), QuickSearch]
    public string ManDesc
    {
        get => fields.ManDesc[this];
        set => fields.ManDesc[this] = value;
    }
    [DisplayName("New Division"), ForeignKey("HumanResourcesDivision", "ID"), LeftJoin(jDivision), TextualField(nameof(Division))]
    [LookupEditor(typeof(OrganisationHierarchy.DivisionRow))]
    public int? newDivision
    {
        get => fields.newDivision[this];
        set => fields.newDivision[this] = value;
    }


    [DisplayName("New Division"), Expression($"{jDivision}.[Name]"), AsyncLookupEditor("Division.Division", AutoComplete = true), LookupInclude]
    public string Division
    {
        get => fields.Division[this];
        set => fields.Division[this] = value;
    }
    [DisplayName("New Department"),  ForeignKey("HumanResourcesDepartment", "ID"), LeftJoin(jDepartment), TextualField(nameof(DepartmentDept))]
    [LookupEditor(typeof(OrganisationHierarchy.DepartmentRow))]
    public int? newDepartment
    {
        get => fields.newDepartment[this];
        set => fields.newDepartment[this] = value;
    }

    [DisplayName("New Department"), Expression($"{jDepartment}.[Name]"), AsyncLookupEditor("Department.Department", AutoComplete = true), LookupInclude]
    public string DepartmentDept
    {
        get => fields.DepartmentDept[this];
        set => fields.DepartmentDept[this] = value;
    }
    [DisplayName("New Section"), ForeignKey("HumanResourcesSection", "ID"), LeftJoin(jSection), TextualField(nameof(Section))]
    [LookupEditor(typeof(OrganisationHierarchy.SectionRow))]
    public int? newSection
    {
        get => fields.newSection[this];
        set => fields.newSection[this] = value;
    }
    [DisplayName("New Section"), Expression($"{jSection}.[Name]"), AsyncLookupEditor("Section.Section", AutoComplete = true), LookupInclude]
    public string Section
    {
        get => fields.Section[this];
        set => fields.Section[this] = value;
    }
    [DisplayName("New Occupation"), ForeignKey("HumanResourcesOccupation", "ID"), LeftJoin(jOccupation), TextualField(nameof(Occupation))]
    [LookupEditor(typeof(OrganisationHierarchy.OccupationRow))]
    public int? newOccupation
    {
        get => fields.newOccupation[this];
        set => fields.newOccupation[this] = value;
    }
    [DisplayName("New Occupation"), Expression($"{jOccupation}.[Name]"), LookupInclude]
    public string Occupation
    {
        get => fields.Occupation[this];
        set => fields.Occupation[this] = value;
    }
    [DisplayName("New Job Grade"), ForeignKey("HumanResourcesJobGrade", "ID"), LeftJoin(jJobGrade), TextualField(nameof(JobGrade))]
    [LookupEditor(typeof(OrganisationHierarchy.JobGradeRow))]
    public int? newJobGrade
    {
        get => fields.newJobGrade[this];
        set => fields.newJobGrade[this] = value;
    }
    [DisplayName("New Job Grade"), Expression($"{jJobGrade}.[Name]"), LookupInclude]
    public string JobGrade
    {
        get => fields.JobGrade[this];
        set => fields.JobGrade[this] = value;
    }
    [DisplayName("New Cost Centre"), ForeignKey("MasterCostCentre", "ID"), LeftJoin(jCostCentre), TextualField(nameof(CostCentreName))]
    [LookupEditor(typeof(MasterCostCentreRow))]
    public int? newCostCentre
    {
        get => fields.newCostCentre[this];
        set => fields.newCostCentre[this] = value;
    }

    [DisplayName("New Cost Centre"), Expression($"{jCostCentre}.[Name]")]
    public string CostCentreName
    {
        get => fields.CostCentreName[this];
        set => fields.CostCentreName[this] = value;
    }
    public int? oldDivision
    {
        get => fields.oldDivision[this];
        set => fields.oldDivision[this] = value;
    }
    public int? oldDepartment
    {
        get => fields.oldDepartment[this];
        set => fields.oldDepartment[this] = value;
    }
    public int? oldSection
    {
        get => fields.oldSection[this];
        set => fields.oldSection[this] = value;
    }
    public int? oldOccupation
    {
        get => fields.oldOccupation[this];
        set => fields.oldOccupation[this] = value;
    }
    public int? oldJobGrade
    {
        get => fields.oldJobGrade[this];
        set => fields.oldJobGrade[this] = value;
    }
    public int? oldCostCentre
    {
        get => fields.oldCostCentre[this];
        set => fields.oldCostCentre[this] = value;
    }
    public int? Executed
    {
        get => fields.Executed[this];
        set => fields.Executed[this] = value;
    }
    public int? CategoryId
    {
        get => fields.CategoryId[this];
        set => fields.CategoryId[this] = value;
    }
    public int? careerPaathType
    {
        get => fields.careerPaathType[this];
        set => fields.careerPaathType[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public StringField ManDesc;
        public Int32Field Id;
        public Int32Field Executed;
        public Int32Field CategoryId;
        public Int32Field careerPaathType;

        

        public StringField Description;
        public StringField CareerPathCode;
        public StringField ValueString;
        public StringField EmployeeName;

        public Int32Field CareerPathId;
        public DateTimeField EffectiveDate;

        public DoubleField oldValue;
        public DoubleField NewValue;
        public Int32Field EmployeeRowId;




        public Int32Field oldDivision;
        public Int32Field oldDepartment;
        public Int32Field oldSection;
        public Int32Field oldOccupation;
        public Int32Field oldJobGrade;
        public Int32Field oldCostCentre;


        public Int32Field newDivision;
        public Int32Field newDepartment;
        public Int32Field newSection;
        public Int32Field newOccupation;
        public Int32Field newJobGrade;
        public Int32Field newCostCentre;
        public StringField Division;
        public StringField DepartmentDept;
        public StringField Section;
        public StringField Occupation;
        public StringField JobGrade;
        public StringField CostCentreName;

    }
}