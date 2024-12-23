using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.EisSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface IEisSubjectionDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EisSubjectionDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEisSubjectionDeleteHandler
{
    public EisSubjectionDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}