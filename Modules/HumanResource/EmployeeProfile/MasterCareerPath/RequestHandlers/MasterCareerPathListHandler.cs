using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeProfile.MasterCareerPathRow>;
using MyRow = HRMSoftware.EmployeeProfile.MasterCareerPathRow;

namespace HRMSoftware.EmployeeProfile;

public interface IMasterCareerPathListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCareerPathListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCareerPathListHandler
{
    public MasterCareerPathListHandler(IRequestContext context)
            : base(context)
    {
    }
}