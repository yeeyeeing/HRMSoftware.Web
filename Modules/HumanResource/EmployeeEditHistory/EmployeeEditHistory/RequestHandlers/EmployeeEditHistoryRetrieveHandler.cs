using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeEditHistory.EmployeeEditHistoryRow>;
using MyRow = HRMSoftware.EmployeeEditHistory.EmployeeEditHistoryRow;

namespace HRMSoftware.EmployeeEditHistory;

public interface IEmployeeEditHistoryRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeEditHistoryRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeEditHistoryRetrieveHandler
{
    public EmployeeEditHistoryRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}