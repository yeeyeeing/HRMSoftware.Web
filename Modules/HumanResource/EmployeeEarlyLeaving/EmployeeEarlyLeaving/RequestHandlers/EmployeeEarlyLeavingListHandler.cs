using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeEarlyLeaving.EmployeeEarlyLeavingRow>;
using MyRow = HRMSoftware.EmployeeEarlyLeaving.EmployeeEarlyLeavingRow;

namespace HRMSoftware.EmployeeEarlyLeaving;

public interface IEmployeeEarlyLeavingListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeEarlyLeavingListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeEarlyLeavingListHandler
{
    public EmployeeEarlyLeavingListHandler(IRequestContext context)
            : base(context)
    {
    }
}