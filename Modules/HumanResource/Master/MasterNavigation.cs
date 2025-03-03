using Serenity.Navigation;
using MyPages = HRMSoftware.Master.Pages;
using MyPages2 = HRMSoftware.OrganisationHierarchy.Pages;
using MyPages3 = HRMSoftware.EmployeeProfile.Pages;

[assembly: NavigationLink(int.MaxValue, "HumanResource/Master Data/Master Bank", typeof(MyPages.MasterBankPage), icon: "fa-university")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Master Data/Master Cost Centre", typeof(MyPages.MasterCostCentrePage), icon: "fa-book")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Master Data/Master City", typeof(MyPages.MasterCityPage), icon: "fa-home")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Master Data/Master Country", typeof(MyPages.MasterCountryPage), icon: "fa-globe")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Master Data/Master Cp8d", typeof(MyPages.MasterCp8dPage), icon: "fa-object-group")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Master Data/Master State", typeof(MyPages.MasterStatePage), icon: "fa-flag")]

[assembly: NavigationLink(int.MaxValue, "HumanResource/Master Data/Job Grade", typeof(MyPages2.JobGradePage), icon: "fa-font")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Master Data/Department", typeof(MyPages2.DepartmentPage), icon: "fa-building")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Master Data/Division", typeof(MyPages2.DivisionPage), icon: "fa-archway")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Master Data/Occupation", typeof(MyPages2.OccupationPage), icon: "fa-wrench")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Master Data/Section", typeof(MyPages2.SectionPage), icon: "fa-folder-open")]

[assembly: NavigationLink(int.MaxValue, "HumanResource/Master Data/Postcode", typeof(MyPages.MasterPostcodePage), icon: "fas fa-envelope")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Master Data/Nationality", typeof(MyPages.NationalityPage), icon: "fas fa-globe")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Master Data/Master Career Path Code", typeof(MyPages3.MasterCareerPathPage), icon: "fas fa-road")]

[assembly: NavigationLink(int.MaxValue, "HumanResource/Master Data/Master Allowance Code", typeof(MyPages3.MasterAllowancePage), icon: "fas fa-money-bill-wave")]

[assembly: NavigationLink(int.MaxValue, "HumanResource/Master Data/Master Deduction Code", typeof(MyPages3.MasterDeductionPage), icon: "fas fa-minus-circle")]
