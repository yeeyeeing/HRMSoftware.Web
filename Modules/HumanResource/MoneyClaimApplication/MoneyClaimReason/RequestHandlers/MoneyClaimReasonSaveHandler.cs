using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.MoneyClaimApplication.MoneyClaimReasonRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.MoneyClaimApplication.MoneyClaimReasonRow;

namespace HRMSoftware.MoneyClaimApplication;

public interface IMoneyClaimReasonSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class MoneyClaimReasonSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IMoneyClaimReasonSaveHandler
{
    public MoneyClaimReasonSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}