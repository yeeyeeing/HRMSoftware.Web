using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeProfile.MasterDeductionRow>;
using MyRow = HRMSoftware.EmployeeProfile.MasterDeductionRow;

namespace HRMSoftware.EmployeeProfile;

public interface IMasterDeductionRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterDeductionRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterDeductionRetrieveHandler
{
    public MasterDeductionRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}