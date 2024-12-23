using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.HrdfSubjectionRow>;
using MyRow = HRMSoftware.PayrollSettings.HrdfSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface IHrdfSubjectionListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class HrdfSubjectionListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IHrdfSubjectionListHandler
{
    public HrdfSubjectionListHandler(IRequestContext context)
            : base(context)
    {
    }
}