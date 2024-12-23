using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.EisSubjectionRow>;
using MyRow = HRMSoftware.PayrollSettings.EisSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface IEisSubjectionListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EisSubjectionListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEisSubjectionListHandler
{
    public EisSubjectionListHandler(IRequestContext context)
            : base(context)
    {
    }
}