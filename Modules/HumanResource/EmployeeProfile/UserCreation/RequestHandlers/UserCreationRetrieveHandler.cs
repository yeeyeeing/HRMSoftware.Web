using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeProfile.UserCreationRow>;
using MyRow = HRMSoftware.EmployeeProfile.UserCreationRow;

namespace HRMSoftware.EmployeeProfile;

public interface IUserCreationRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class UserCreationRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IUserCreationRetrieveHandler
{
    public UserCreationRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}