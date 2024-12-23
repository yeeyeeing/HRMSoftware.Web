
using Serenity.ComponentModel;
using System.ComponentModel;

namespace HRMSoftware.Administration
{
    [NestedPermissionKeys]
    [DisplayName("Administration")]
    public class PermissionKeys
    {
        [Description("User, Role Management and Permissions")]
        public const string Security = "Administration:Security";

        [Description("Languages and Translations")]
        public const string Translation = "Administration:Translation";


        [Description("Tenant Management")]
        public const string Tenants = "Administration:Tenants";



        [Description("HumanResources")]
        public const string HumanResources = "Administration:HumanResources";


        [Description("Employee")]
        public const string Employee = "Administration:Employee";

        [Description("ViewSalary")]
        public const string ViewSalary = "Administration:ViewSalary";


        /*
         do not touch the names below
         
         
         */
        [Description("OT Approval")]
        public const string OtApproval = "Administration:OtApproval";
        [Description("Leave Approval")]
        public const string LeaveApproval = "Administration:LeaveApproval";
        [Description("Appraisal")]
        public const string Appraisal = "Administration:Appraisal";
        [Description("Training")]
        public const string Training = "Administration:Training";

        [Description("Money Claiming")]
        public const string MoneyClaiming = "Administration:MoneyClaiming";


    }
}