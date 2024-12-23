using HRMSoftware.Administration;using Serenity.Navigation;
using MyPages = HRMSoftware.TrainingManagement.Pages;
using Ctrl = Serenity.Demo.BasicSamples.BasicSamplesPage;

[assembly: NavigationMenu(int.MaxValue, "HumanResource/Training Management", icon: "fa-book-reader")]

[assembly: NavigationLink(int.MaxValue, "HumanResource/Training Management/Program Session", typeof(MyPages.ProgramSessionPage), icon: "fa-chalkboard-teacher")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Training Management/Apply Training Session", typeof(MyPages.ApplyNewSessionPage), icon: "fa-plus-circle", Permission = PermissionKeys.HumanResources)]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Training Management/Master Training Program", typeof(MyPages.MasterProgramPage), icon: "fa-book", Permission = PermissionKeys.HumanResources)]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Training Management/Report", typeof(MyPages.ReportPage), icon: "fa-clipboard-list", Permission =  PermissionKeys.HumanResources)]
// [assembly: NavigationLink(int.MaxValue, "Training Management/Apply New Program", typeof(MyPages.ApplyNewProgramPage), icon: "fa-plus-circle", Permission = PermissionKeys.HumanResources)]