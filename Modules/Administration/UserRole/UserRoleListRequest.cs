using Serenity.Services;

namespace HRMSoftware.Administration
{
    public class UserRoleListRequest : ServiceRequest
    {
        public int? UserID { get; set; }
    }
}