using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.MoneyClaimApplication.MoneyClaimApplicationRow>;
using MyRow = HRMSoftware.MoneyClaimApplication.MoneyClaimApplicationRow;

namespace HRMSoftware.MoneyClaimApplication;

public interface IMoneyClaimApplicationRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class MoneyClaimApplicationRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IMoneyClaimApplicationRetrieveHandler
{
    public MoneyClaimApplicationRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}