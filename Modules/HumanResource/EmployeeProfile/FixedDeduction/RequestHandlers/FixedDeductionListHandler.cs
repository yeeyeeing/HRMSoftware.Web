using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeProfile.FixedDeductionRow>;
using MyRow = HRMSoftware.EmployeeProfile.FixedDeductionRow;

namespace HRMSoftware.EmployeeProfile;

public interface IFixedDeductionListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class FixedDeductionListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IFixedDeductionListHandler
{
    public FixedDeductionListHandler(IRequestContext context)
            : base(context)
    {
    }
}