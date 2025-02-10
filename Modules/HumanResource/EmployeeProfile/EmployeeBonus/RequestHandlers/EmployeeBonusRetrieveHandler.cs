using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeProfile.EmployeeBonusRow>;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeBonusRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeBonusRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeBonusRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeBonusRetrieveHandler
{
    public EmployeeBonusRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}