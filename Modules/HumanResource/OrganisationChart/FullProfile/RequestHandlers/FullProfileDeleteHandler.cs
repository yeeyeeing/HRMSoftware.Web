using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.OrganisationChart.FullProfileRow;

namespace HRMSoftware.OrganisationChart;

public interface IFullProfileDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class FullProfileDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IFullProfileDeleteHandler
{
    public FullProfileDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}