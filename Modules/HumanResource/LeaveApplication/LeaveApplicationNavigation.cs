using Serenity.Navigation;
using MyPages = HRMSoftware.LeaveApplication.Pages;

[assembly: NavigationLink(int.MaxValue, "HumanResource/Leave/Leave Application", typeof(MyPages.LeaveApplicationPage), icon: "fa-plane")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Leave/Leave Description", typeof(MyPages.LeaveDescriptionPage), icon: "fa-archive")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Leave/Leave Reason", typeof(MyPages.LeaveReasonPage), icon: null)]