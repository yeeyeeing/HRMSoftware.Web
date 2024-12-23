using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeProfile.EmployeeResignRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeResignRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeResignSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeResignSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeResignSaveHandler
{
    public EmployeeResignSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}