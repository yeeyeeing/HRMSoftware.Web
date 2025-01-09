using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeProfile.EmployeeCareerPathRow>;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeCareerPathRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeCareerPathRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeCareerPathRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeCareerPathRetrieveHandler
{
    public EmployeeCareerPathRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}