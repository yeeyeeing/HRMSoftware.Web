using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeGroup.EmployeeGroupRow>;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupRow;

namespace HRMSoftware.EmployeeGroup;

public interface IEmployeeGroupRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeGroupRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeGroupRetrieveHandler
{
    public EmployeeGroupRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}