
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

        [Description("ViewShiftAttendance")]
        public const string ViewShiftAttendance = "Administration:ViewShiftAttendance";


        /*
         do not touch the names below
         
         
         */
        [Description("OT Approval"), Hidden]
        public const string OtApproval = "Administration:OtApproval";
        [Description("Leave Approval"), Hidden]
        public const string LeaveApproval = "Administration:LeaveApproval";
        [Description("Appraisal"), Hidden]
        public const string Appraisal = "Administration:Appraisal";
        [Description("Training"), Hidden]
        public const string Training = "Administration:Training";

        [Description("Money Claiming"),Hidden]
        public const string MoneyClaiming = "Administration:MoneyClaiming";


    }
}