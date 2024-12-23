using Serenity.Navigation;
using MyPages = HRMSoftware.MoneyClaimApplication.Pages;

[assembly: NavigationLink(int.MaxValue, "HumanResource/Money Claiming/Money Claim Application", typeof(MyPages.MoneyClaimApplicationPage), icon: "fa-money-bill")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Money Claiming/Money Claim Reason", typeof(MyPages.MoneyClaimReasonPage), icon: "fa-bookmark")]