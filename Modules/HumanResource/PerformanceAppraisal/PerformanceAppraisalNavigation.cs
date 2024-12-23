using HRMSoftware.Administration;
using Serenity.Navigation;
using MyPages = HRMSoftware.PerformanceAppraisal.Pages;

[assembly: NavigationMenu(int.MaxValue, "HumanResource/Performance Appraisal", icon: "fa-clipboard-list")]

[assembly: NavigationLink(int.MaxValue, "HumanResource/Performance Appraisal/Appraisal Question", 
    typeof(MyPages.PerformanceAppraisalQuestionPage), icon: "fa-question-circle", 
    Permission = PermissionKeys.HumanResources)]

[assembly: NavigationLink(int.MaxValue, "HumanResource/Performance Appraisal/Appraisal Type", 
    typeof(MyPages.PerformanceAppraisalTypePage), icon: "fa-tag", 
    Permission = PermissionKeys.HumanResources)]

[assembly: NavigationLink(int.MaxValue, "HumanResource/Performance Appraisal/Appraisal Template", 
    typeof(MyPages.PerformanceAppraisalTemplatePage), icon: "fa-clipboard-list", 
    Permission = PermissionKeys.HumanResources)]

[assembly: NavigationLink(int.MaxValue, "HumanResource/Performance Appraisal/Appraisal Form", 
    typeof(MyPages.PerformanceAppraisalFormPage), icon: "fa-pencil-alt")]

[assembly: NavigationLink(int.MaxValue, "HumanResource/Performance Appraisal/File Attach", 
    typeof(MyPages.PerformanceAppraisalFileAttachPage), icon: "fa-file-alt")]

[assembly: NavigationLink(int.MaxValue, "HumanResource/Performance Appraisal/Company Profile", 
    typeof(MyPages.CompanyProfilePage), icon: "fa-landmark")]

