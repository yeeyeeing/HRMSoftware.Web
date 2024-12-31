using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeProfile.MasterAllowanceRow>;
using MyRow = HRMSoftware.EmployeeProfile.MasterAllowanceRow;

namespace HRMSoftware.EmployeeProfile;

public interface IMasterAllowanceListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class MasterAllowanceListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IMasterAllowanceListHandler
{
    public MasterAllowanceListHandler(IRequestContext context)
            : base(context)
    {
    }
}