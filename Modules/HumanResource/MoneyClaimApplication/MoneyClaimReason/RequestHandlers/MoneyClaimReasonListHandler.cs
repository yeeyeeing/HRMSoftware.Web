using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.MoneyClaimApplication.MoneyClaimReasonRow>;
using MyRow = HRMSoftware.MoneyClaimApplication.MoneyClaimReasonRow;

namespace HRMSoftware.MoneyClaimApplication;

public interface IMoneyClaimReasonListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class MoneyClaimReasonListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IMoneyClaimReasonListHandler
{
    public MoneyClaimReasonListHandler(IRequestContext context)
            : base(context)
    {
    }
}