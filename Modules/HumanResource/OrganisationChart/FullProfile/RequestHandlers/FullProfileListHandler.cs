using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.OrganisationChart.FullProfileRow>;
using MyRow = HRMSoftware.OrganisationChart.FullProfileRow;

namespace HRMSoftware.OrganisationChart;

public interface IFullProfileListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class FullProfileListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IFullProfileListHandler
{
    public FullProfileListHandler(IRequestContext context)
            : base(context)
    {
    }
}