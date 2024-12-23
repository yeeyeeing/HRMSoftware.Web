using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeEarlyLeaving.EmployeeEarlyLeavingRow>;
using MyRow = HRMSoftware.EmployeeEarlyLeaving.EmployeeEarlyLeavingRow;

namespace HRMSoftware.EmployeeEarlyLeaving;

public interface IEmployeeEarlyLeavingRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeEarlyLeavingRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeEarlyLeavingRetrieveHandler
{
    public EmployeeEarlyLeavingRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}