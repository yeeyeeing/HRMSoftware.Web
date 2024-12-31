using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeProfile.MasterDeductionRow>;
using MyRow = HRMSoftware.EmployeeProfile.MasterDeductionRow;

namespace HRMSoftware.EmployeeProfile;

public interface IMasterDeductionListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class MasterDeductionListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IMasterDeductionListHandler
{
    public MasterDeductionListHandler(IRequestContext context)
            : base(context)
    {
    }
}