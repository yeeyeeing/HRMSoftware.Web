using Serenity.ComponentModel;
using Serenity.Services;
using System.ComponentModel;

namespace HRMSoftware.Membership
{
    [FormScript("Membership.ForgotPassword")]
    public class ForgotPasswordRequest : ServiceRequest
    {
        [Required(true), EmailAddressEditor, DisplayName("E-mail Address"), Placeholder("e-mail")]
        public string Email { get; set; }
    }
}