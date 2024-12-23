using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.EpfSubjectionRow>;
using MyRow = HRMSoftware.PayrollSettings.EpfSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface IEpfSubjectionListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EpfSubjectionListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEpfSubjectionListHandler
{
    public EpfSubjectionListHandler(IRequestContext context)
            : base(context)
    {
    }
}