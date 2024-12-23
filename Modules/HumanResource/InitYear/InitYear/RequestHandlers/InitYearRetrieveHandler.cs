using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.InitYear.InitYearRow>;
using MyRow = HRMSoftware.InitYear.InitYearRow;

namespace HRMSoftware.InitYear;

public interface IInitYearRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class InitYearRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IInitYearRetrieveHandler
{
    public InitYearRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}