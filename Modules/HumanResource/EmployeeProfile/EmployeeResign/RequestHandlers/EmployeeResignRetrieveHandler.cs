using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeProfile.EmployeeResignRow>;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeResignRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeResignRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeResignRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeResignRetrieveHandler
{
    public EmployeeResignRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}