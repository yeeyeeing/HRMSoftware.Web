using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.MoneyClaimApplication.MoneyClaimReasonRow>;
using MyRow = HRMSoftware.MoneyClaimApplication.MoneyClaimReasonRow;

namespace HRMSoftware.MoneyClaimApplication;

public interface IMoneyClaimReasonRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class MoneyClaimReasonRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IMoneyClaimReasonRetrieveHandler
{
    public MoneyClaimReasonRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}