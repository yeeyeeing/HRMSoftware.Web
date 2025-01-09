using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeProfile.MasterCareerPathRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeProfile.MasterCareerPathRow;

namespace HRMSoftware.EmployeeProfile;

public interface IMasterCareerPathSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCareerPathSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCareerPathSaveHandler
{
    public MasterCareerPathSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}