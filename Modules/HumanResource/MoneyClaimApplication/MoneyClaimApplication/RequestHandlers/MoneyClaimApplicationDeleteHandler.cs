using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.MoneyClaimApplication.MoneyClaimApplicationRow;

namespace HRMSoftware.MoneyClaimApplication;

public interface IMoneyClaimApplicationDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class MoneyClaimApplicationDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IMoneyClaimApplicationDeleteHandler
{
    public MoneyClaimApplicationDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}