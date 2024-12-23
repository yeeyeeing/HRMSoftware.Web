using Serenity.Services;

namespace HRMSoftware.Membership
{
    public class SignUpRequest : ServiceRequest
    {
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}