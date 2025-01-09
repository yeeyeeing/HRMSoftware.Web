using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeProfile.MasterCareerPathRow>;
using MyRow = HRMSoftware.EmployeeProfile.MasterCareerPathRow;

namespace HRMSoftware.EmployeeProfile;

public interface IMasterCareerPathRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCareerPathRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCareerPathRetrieveHandler
{
    public MasterCareerPathRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}