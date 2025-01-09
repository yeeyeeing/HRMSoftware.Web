using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeProfile.EmployeeCareerPathRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeCareerPathRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeCareerPathSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeCareerPathSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeCareerPathSaveHandler
{
    public EmployeeCareerPathSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}