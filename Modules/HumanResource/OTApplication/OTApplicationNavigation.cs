using Serenity.Navigation;
using MyPages = HRMSoftware.OTApplication.Pages;

[assembly: NavigationLink(int.MaxValue, "HumanResource/Working Over Time/Over Time Application", typeof(MyPages.OTApplicationPage), icon: "fa-file-invoice")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Working Over Time/Over Time Reason", typeof(MyPages.OTReasonPage), icon: "fa-bookmark")]