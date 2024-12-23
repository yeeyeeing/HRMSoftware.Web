using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeProfile.UserCreationRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeProfile.UserCreationRow;

namespace HRMSoftware.EmployeeProfile;

public interface IUserCreationSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class UserCreationSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IUserCreationSaveHandler
{
    public UserCreationSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}