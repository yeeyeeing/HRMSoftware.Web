using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Master.NationalityRow>;
using MyRow = HRMSoftware.Master.NationalityRow;

namespace HRMSoftware.Master;

public interface INationalityRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class NationalityRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, INationalityRetrieveHandler
{
    public NationalityRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}