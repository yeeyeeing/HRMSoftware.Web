using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.OrganisationChart.OrganisationChartRow>;
using MyRow = HRMSoftware.OrganisationChart.OrganisationChartRow;

namespace HRMSoftware.OrganisationChart;

public interface IOrganisationChartListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class OrganisationChartListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IOrganisationChartListHandler
{
    public OrganisationChartListHandler(IRequestContext context)
            : base(context)
    {
    }
}