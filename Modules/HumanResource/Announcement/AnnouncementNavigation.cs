using HRMSoftware.Administration;
using Serenity.Navigation;
using MyPages = HRMSoftware.Announcement.Pages;
[assembly: NavigationLink(int.MaxValue, "HumanResource/Announcement Management/Announcement Generated", typeof(MyPages.AnnouncementGeneratedPage), icon: "fa-solid fa-clipboard",Permission =PermissionKeys.HumanResources)]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Announcement Management/Announcement Wizard", typeof(MyPages.AnnouncementWizardPage), icon: "fas fa-volume-up", Permission = PermissionKeys.HumanResources)]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Announcement Management/Recurring Announcement", typeof(MyPages.RecurringAnnouncementPage), icon: "fa-regular fa-clock",Permission =PermissionKeys.HumanResources)]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Announcement", typeof(MyPages.AnnouncementPage), icon: "fa-solid fa-envelope")]
