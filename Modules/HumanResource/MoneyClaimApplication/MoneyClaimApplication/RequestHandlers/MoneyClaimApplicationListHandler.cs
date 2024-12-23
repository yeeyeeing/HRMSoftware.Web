using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.MoneyClaimApplication.MoneyClaimApplicationRow>;
using MyRow = HRMSoftware.MoneyClaimApplication.MoneyClaimApplicationRow;

namespace HRMSoftware.MoneyClaimApplication;

public interface IMoneyClaimApplicationListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class MoneyClaimApplicationListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IMoneyClaimApplicationListHandler
{
    public MoneyClaimApplicationListHandler(IRequestContext context)
            : base(context)
    {
    }
}