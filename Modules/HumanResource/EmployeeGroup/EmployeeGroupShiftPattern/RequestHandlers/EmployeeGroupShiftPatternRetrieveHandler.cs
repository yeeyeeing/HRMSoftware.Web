using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeGroup.EmployeeGroupShiftPatternRow>;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupShiftPatternRow;

namespace HRMSoftware.EmployeeGroup;

public interface IEmployeeGroupShiftPatternRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeGroupShiftPatternRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeGroupShiftPatternRetrieveHandler
{
    public EmployeeGroupShiftPatternRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}