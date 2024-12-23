using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.HrdfSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface IHrdfSubjectionDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class HrdfSubjectionDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IHrdfSubjectionDeleteHandler
{
    public HrdfSubjectionDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}