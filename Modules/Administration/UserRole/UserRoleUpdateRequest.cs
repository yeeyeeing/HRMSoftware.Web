using Serenity.Services;
using System.Collections.Generic;

namespace HRMSoftware.Administration
{
    public class UserRoleUpdateRequest : ServiceRequest
    {
        public int? UserID { get; set; }
        public List<int> Roles { get; set; }
    }
}