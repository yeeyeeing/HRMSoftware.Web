using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeLate.EmployeeLateRow>;
using MyRow = HRMSoftware.EmployeeLate.EmployeeLateRow;

namespace HRMSoftware.EmployeeLate;

public interface IEmployeeLateRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeLateRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeLateRetrieveHandler
{
    public EmployeeLateRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}