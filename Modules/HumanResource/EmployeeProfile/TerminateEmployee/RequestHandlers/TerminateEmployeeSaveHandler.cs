using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeProfile.TerminateEmployeeRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeProfile.TerminateEmployeeRow;

namespace HRMSoftware.EmployeeProfile;

public interface ITerminateEmployeeSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class TerminateEmployeeSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ITerminateEmployeeSaveHandler
{
    public TerminateEmployeeSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}