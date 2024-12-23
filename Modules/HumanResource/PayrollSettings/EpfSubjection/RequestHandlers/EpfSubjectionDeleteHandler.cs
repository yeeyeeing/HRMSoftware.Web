using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.EpfSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface IEpfSubjectionDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EpfSubjectionDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEpfSubjectionDeleteHandler
{
    public EpfSubjectionDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}