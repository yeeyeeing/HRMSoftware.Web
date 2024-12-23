using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeEarlyLeaving.EmployeeEarlyLeavingRow;

namespace HRMSoftware.EmployeeEarlyLeaving;

public interface IEmployeeEarlyLeavingDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeEarlyLeavingDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeEarlyLeavingDeleteHandler
{
    public EmployeeEarlyLeavingDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}