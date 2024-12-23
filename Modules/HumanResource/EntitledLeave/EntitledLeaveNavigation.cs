using HRMSoftware.Administration;
using Serenity.Navigation;
using MyPages = HRMSoftware.EntitledLeave.Pages;

[assembly: NavigationLink(int.MaxValue, "HumanResource/Leave/Entitled Leave", typeof(MyPages.EntitledLeavePage), icon: " fa-paper-plane-o",Permission =PermissionKeys.HumanResources)]