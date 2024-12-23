using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.MoneyClaimApplication.MoneyClaimReasonRow;

namespace HRMSoftware.MoneyClaimApplication;

public interface IMoneyClaimReasonDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class MoneyClaimReasonDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IMoneyClaimReasonDeleteHandler
{
    public MoneyClaimReasonDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}