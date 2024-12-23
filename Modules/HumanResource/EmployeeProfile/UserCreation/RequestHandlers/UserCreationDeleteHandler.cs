using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeProfile.UserCreationRow;

namespace HRMSoftware.EmployeeProfile;

public interface IUserCreationDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class UserCreationDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IUserCreationDeleteHandler
{
    public UserCreationDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}