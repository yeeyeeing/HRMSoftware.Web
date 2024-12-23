using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeGroup.EmployeeGroupShiftRow>;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupShiftRow;

namespace HRMSoftware.EmployeeGroup;

public interface IEmployeeGroupShiftRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeGroupShiftRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeGroupShiftRetrieveHandler
{
    public EmployeeGroupShiftRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}