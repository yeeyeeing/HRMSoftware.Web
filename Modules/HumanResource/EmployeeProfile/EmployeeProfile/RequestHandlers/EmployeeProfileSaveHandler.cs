using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeProfile.EmployeeProfileRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeProfileRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeProfileSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeProfileSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeProfileSaveHandler
{
    public EmployeeProfileSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}