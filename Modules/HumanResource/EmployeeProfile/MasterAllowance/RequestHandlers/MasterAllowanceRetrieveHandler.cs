using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeProfile.MasterAllowanceRow>;
using MyRow = HRMSoftware.EmployeeProfile.MasterAllowanceRow;

namespace HRMSoftware.EmployeeProfile;

public interface IMasterAllowanceRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterAllowanceRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterAllowanceRetrieveHandler
{
    public MasterAllowanceRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}