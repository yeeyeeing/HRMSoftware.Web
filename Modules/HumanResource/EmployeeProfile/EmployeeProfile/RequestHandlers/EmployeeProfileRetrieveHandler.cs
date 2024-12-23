using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeProfile.EmployeeProfileRow>;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeProfileRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeProfileRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeProfileRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeProfileRetrieveHandler
{
    public EmployeeProfileRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}