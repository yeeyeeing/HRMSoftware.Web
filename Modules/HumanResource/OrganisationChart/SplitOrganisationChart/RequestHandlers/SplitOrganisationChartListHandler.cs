using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.OrganisationChart.SplitOrganisationChartRow>;
using MyRow = HRMSoftware.OrganisationChart.SplitOrganisationChartRow;

namespace HRMSoftware.OrganisationChart;

public interface ISplitOrganisationChartListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class SplitOrganisationChartListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ISplitOrganisationChartListHandler
{
    public SplitOrganisationChartListHandler(IRequestContext context)
            : base(context)
    {
    }
}