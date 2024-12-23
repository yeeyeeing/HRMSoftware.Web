using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeProfile.FixedDeductionRow>;
using MyRow = HRMSoftware.EmployeeProfile.FixedDeductionRow;

namespace HRMSoftware.EmployeeProfile;

public interface IFixedDeductionRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class FixedDeductionRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IFixedDeductionRetrieveHandler
{
    public FixedDeductionRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}