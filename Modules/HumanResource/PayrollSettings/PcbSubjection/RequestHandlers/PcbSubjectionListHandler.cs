using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.PcbSubjectionRow>;
using MyRow = HRMSoftware.PayrollSettings.PcbSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface IPcbSubjectionListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PcbSubjectionListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPcbSubjectionListHandler
{
    public PcbSubjectionListHandler(IRequestContext context)
            : base(context)
    {
    }
}