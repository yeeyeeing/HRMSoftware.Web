using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.MoneyClaimApplication.MoneyClaimApplicationRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.MoneyClaimApplication.MoneyClaimApplicationRow;

namespace HRMSoftware.MoneyClaimApplication;

public interface IMoneyClaimApplicationSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class MoneyClaimApplicationSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IMoneyClaimApplicationSaveHandler
{
    public MoneyClaimApplicationSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}