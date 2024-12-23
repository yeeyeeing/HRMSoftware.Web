using Serenity.ComponentModel;
using System;
using System.ComponentModel;
using System.Xml.Schema;

namespace HRMSoftware.EmployeeProfile.Columns;

[ColumnsScript("EmployeeProfile.EmployeeProfile")]
[BasedOnRow(typeof(EmployeeProfileRow), CheckNames = true)]
public class EmployeeProfileColumns
{

    [Width(200, Max = 250,Min = 200), EditLink]
    public string EmployeeName { get; set; }
    [Width(200, Max = 250, Min = 200), EditLink]
    public string EmployeeID { get; set; }
    [Width(10, Max = 300)]
    public int Age { get; set; }
    [Width(50, Max = 300)]
    public int Sex { get; set; }

    [Width(100), AsyncLookupEditor("Race.Race"), QuickFilter(CssClass = "hidden-xs")]
    public string Race { get; set; }
    [Width(200, Max = 300), AsyncLookupEditor("Department.Department"), QuickFilter(CssClass = "hidden-xs")]
    public string DepartmentDept { get; set; }
    [Width(100, Max = 300), AsyncLookupEditor("Division.Division"), QuickFilter(CssClass = "hidden-xs")]
    public string Division { get; set; }
    [Width(100, Max = 300), AsyncLookupEditor("Section.Section"), QuickFilter(CssClass = "hidden-xs")]
    public string Section { get; set; }

    [Width(100, Max = 300), AsyncLookupEditor("JobGrade.JobGrade"), QuickFilter(CssClass = "hidden-xs")]
    public string JobGrade { get; set; }

    [Width(200, Max = 500, Min = 100), AsyncLookupEditor("Occupation.Occupation"), QuickFilter(CssClass = "hidden-xs")]
    public string Occupation { get; set; }

    [Width(100, Max = 300), AsyncLookupEditor("MasterCity.MasterCity"), QuickFilter(CssClass = "hidden-xs")]
    public string CityName { get; set; }
    [Width(100, Max = 300), AsyncLookupEditor("MasterState.MasterState"), QuickFilter(CssClass = "hidden-xs")]
    public string StateName { get; set; }

    [Width(100, Max = 300), AsyncLookupEditor("MasterCp8d.MasterCp8d"), QuickFilter(CssClass = "hidden-xs")]
    public string Cp8dName { get; set; }


    [Width(100, Max = 300), AsyncLookupEditor("MasterCostCentre.MasterCostCentre"), QuickFilter(CssClass = "hidden-xs")]
    public string CostCentreName { get; set; }

    //public string TelNumber1 { get; set; }


    /*
    // public DateTime ProbationPeriodEnd { get; set; }
    public DateTime LastPaymentDate { get; set; }
    public DateTime RecruitmentDate { get; set; }
    public DateTime ResignationDate { get; set; }
    public DateTime Birthday { get; set; }
    public string EmployeeEmail { get; set; }
    public string EpfAccountNumber { get; set; }
    public int ProbationPeriod { get; set; }
    public int NoticePeriod { get; set; }
    public string TelNumber2 { get; set; }


    public string PassportNumber { get; set; }
    public DateTime PassportIssueDate { get; set; }
    public int PassportValidPeriod { get; set; }
    public DateTime PassportExpiryDate { get; set; }
    public double BonusFactor { get; set; }
    public double BasicSalary { get; set; }
    public double Allowance { get; set; }
    */


    // [Width(130), AsyncLookupEditor("MasterBank.MasterBank"), QuickFilter(CssClass = "hidden-xs")]
    // public string BankName { get; set; }


    // public string Address { get; set; }

    // public string NationalityName { get; set; }
}