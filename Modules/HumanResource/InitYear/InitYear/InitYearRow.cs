using HRMSoftware.AnnualLeaveJobGradePolicy;
using HRMSoftware.AnnualLeaveJobGradePolicy.Columns;
using HRMSoftware.AnnualLeavePolicy;
using HRMSoftware.AnnualLeavePolicy.Columns;
using HRMSoftware.SickLeavePolicy;
using HRMSoftware.SickLeavePolicy.Columns;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using Serenity.Extensions.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.InitYear;

[ConnectionKey("Default"), Module("InitYear"), TableName("HumanResourcesPolicy")]
[DisplayName("Yearly Policy"), InstanceName("Yearly Policy")]
[ReadPermission("*")]
[ModifyPermission("*")]
public sealed class InitYearRow : LoggingRow<InitYearRow.RowFields>, IIdRow, INameRow
{


    
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }
    

    

    [DisplayName("Year"),NameProperty,QuickSearch]
    public int? Year
    {
        get => fields.Year[this];
        set => fields.Year[this] = value;
    }



    [DisplayName("Leave Carry Forward Method")]
    public LeaveCarryForward? LeaveBringForwardMethod
    {
        get => fields.LeaveBringForwardMethod[this];
        set => fields.LeaveBringForwardMethod[this] = value;
    }

    [DisplayName("Hospitalisation Leave")]
    public int? HospitalisationLeave
    {
        get => fields.HospitalisationLeave[this];
        set => fields.HospitalisationLeave[this] = value;
    }

    [DisplayName("Paternity Leave")]
    public int? PaternityLeave
    {
        get => fields.PaternityLeave[this];
        set => fields.PaternityLeave[this] = value;
    }

    [DisplayName("Maternity Leave")]
    public int? MaternityLeave
    {
        get => fields.MaternityLeave[this];
        set => fields.MaternityLeave[this] = value;
    }

    [DisplayName("Compassionate Leave")]
    public int? CompassionateLeave
    {
        get => fields.CompassionateLeave[this];
        set => fields.CompassionateLeave[this] = value;
    }

    [DisplayName("Marriage Leave")]
    public int? MarriageLeave
    {
        get => fields.MarriageLeave[this];
        set => fields.MarriageLeave[this] = value;
    }

    [DisplayName("Paternity Leave")]
    public int? MonthOfServiceToEligibleForPaternityLeave
    {
        get => fields.MonthOfServiceToEligibleForPaternityLeave[this];
        set => fields.MonthOfServiceToEligibleForPaternityLeave[this] = value;
    }

    [DisplayName("Maternity Leave")]
    public int? MonthOfServiceToEligibleForMaternityLeave
    {
        get => fields.MonthOfServiceToEligibleForMaternityLeave[this];
        set => fields.MonthOfServiceToEligibleForMaternityLeave[this] = value;
    }

    [DisplayName("Bring Forward Percentage")]
    public int? BringForwardPercentage
    {
        get => fields.BringForwardPercentage[this];
        set => fields.BringForwardPercentage[this] = value;
    }

    [DisplayName("Bring Forward Days")]
    public int? BringForwardDays
    {
        get => fields.BringForwardDays[this];
        set => fields.BringForwardDays[this] = value;
    }

    [DisplayName("Round Up"), Column("LeaveRoundUp")]
    [BooleanEditor]
    public bool? LeaveRoundUp
    {
        get => fields.LeaveRoundUp[this];
        set => fields.LeaveRoundUp[this] = value;
    }

    [ MasterDetailRelation(foreignKey: nameof(AnnualLeavePolicyRow.PolicyRow), ColumnsType = typeof(AnnualLeavePolicyColumns))]
    [DisplayName("Annual Leave(Year of Service)"), NotMapped]
    public List<AnnualLeavePolicyRow> PolicyList 
    { 
        get => fields.PolicyList[this]; 
        set => fields.PolicyList[this] = value; 
    }

    [MasterDetailRelation(foreignKey: nameof(AnnualLeaveJobGradePolicyRow.CompanySettingID), ColumnsType = typeof(AnnualLeaveJobGradePolicyColumns))]
    [DisplayName("Annual Leave(Job Grade)"), NotMapped]
    public List<AnnualLeaveJobGradePolicyRow> AnnulLeaveBasedOnJobGrade 
    { 
        get => fields.AnnulLeaveBasedOnJobGrade[this];
        set => fields.AnnulLeaveBasedOnJobGrade[this] = value; 
    }

    [MasterDetailRelation(foreignKey: nameof(SickLeavePolicyRow.PolicyRow), ColumnsType = typeof(SickLeavePolicyColumns))]
    [DisplayName("Sick Leave Policy"), NotMapped]
    public List<SickLeavePolicyRow> SickLeavePolicyList 
    { 
        get => fields.SickLeavePolicyList[this];
        set => fields.SickLeavePolicyList[this] = value; 
    }

    [DisplayName("Year String"), Size(100), NotMapped]
    public string YearString
    {
        get => fields.YearString[this];
        set => fields.YearString[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public StringField YearString;

        public Int32Field Id;
        public Int32Field Year;
        public EnumField<LeaveCarryForward> LeaveBringForwardMethod;
        public Int32Field HospitalisationLeave;
        public Int32Field PaternityLeave;
        public Int32Field MaternityLeave;
        public Int32Field CompassionateLeave;
        public Int32Field MarriageLeave;
        public Int32Field MonthOfServiceToEligibleForPaternityLeave;
        public Int32Field MonthOfServiceToEligibleForMaternityLeave;
        public Int32Field BringForwardPercentage;
        public Int32Field BringForwardDays;
        public BooleanField LeaveRoundUp;
        public RowListField<AnnualLeaveJobGradePolicyRow> AnnulLeaveBasedOnJobGrade;
        public RowListField<AnnualLeavePolicyRow> PolicyList;
        public RowListField<SickLeavePolicyRow> SickLeavePolicyList;
    }
}