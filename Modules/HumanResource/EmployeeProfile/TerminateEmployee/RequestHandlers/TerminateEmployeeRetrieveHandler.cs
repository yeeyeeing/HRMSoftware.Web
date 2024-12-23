using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeProfile.TerminateEmployeeRow>;
using MyRow = HRMSoftware.EmployeeProfile.TerminateEmployeeRow;

namespace HRMSoftware.EmployeeProfile;

public interface ITerminateEmployeeRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class TerminateEmployeeRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ITerminateEmployeeRetrieveHandler
{
    public TerminateEmployeeRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}