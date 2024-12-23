using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeProfile.EmployeeAllowanceRow>;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeAllowanceRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeAllowanceRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeAllowanceRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeAllowanceRetrieveHandler
{
    public EmployeeAllowanceRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}