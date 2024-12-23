using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeProfile.EmployeeAllowanceRow>;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeAllowanceRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeAllowanceListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeAllowanceListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeAllowanceListHandler
{
    public EmployeeAllowanceListHandler(IRequestContext context)
            : base(context)
    {
    }
}