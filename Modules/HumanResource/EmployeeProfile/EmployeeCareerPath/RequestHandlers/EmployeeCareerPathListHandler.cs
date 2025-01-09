using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeProfile.EmployeeCareerPathRow>;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeCareerPathRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeCareerPathListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeCareerPathListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeCareerPathListHandler
{
    public EmployeeCareerPathListHandler(IRequestContext context)
            : base(context)
    {
    }
}