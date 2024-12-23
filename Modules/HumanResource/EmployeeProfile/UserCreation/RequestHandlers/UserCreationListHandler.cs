using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeProfile.UserCreationRow>;
using MyRow = HRMSoftware.EmployeeProfile.UserCreationRow;

namespace HRMSoftware.EmployeeProfile;

public interface IUserCreationListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class UserCreationListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IUserCreationListHandler
{
    public UserCreationListHandler(IRequestContext context)
            : base(context)
    {
    }
}