using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeProfile.EmployeePersonalProfileRow>;
using MyRow = HRMSoftware.EmployeeProfile.EmployeePersonalProfileRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeePersonalProfileListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeePersonalProfileListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeePersonalProfileListHandler
{
    public EmployeePersonalProfileListHandler(IRequestContext context)
            : base(context)
    {
    }
}