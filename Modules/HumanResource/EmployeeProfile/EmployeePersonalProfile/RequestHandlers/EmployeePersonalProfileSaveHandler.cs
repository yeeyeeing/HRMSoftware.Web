using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeProfile.EmployeePersonalProfileRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeProfile.EmployeePersonalProfileRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeePersonalProfileSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeePersonalProfileSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeePersonalProfileSaveHandler
{
    public EmployeePersonalProfileSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}