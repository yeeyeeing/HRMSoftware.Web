using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeProfile.EmployeeCp38Row>;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeCp38Row;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeCp38RetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeCp38RetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeCp38RetrieveHandler
{
    public EmployeeCp38RetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}