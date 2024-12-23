using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeProfile.EmployeePersonalProfileRow>;
using MyRow = HRMSoftware.EmployeeProfile.EmployeePersonalProfileRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeePersonalProfileRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeePersonalProfileRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeePersonalProfileRetrieveHandler
{
    public EmployeePersonalProfileRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}