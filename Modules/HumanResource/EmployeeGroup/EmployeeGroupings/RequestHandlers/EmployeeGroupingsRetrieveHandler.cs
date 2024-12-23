using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeGroup.EmployeeGroupingsRow>;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupingsRow;

namespace HRMSoftware.EmployeeGroup;

public interface IEmployeeGroupingsRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeGroupingsRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeGroupingsRetrieveHandler
{
    public EmployeeGroupingsRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}