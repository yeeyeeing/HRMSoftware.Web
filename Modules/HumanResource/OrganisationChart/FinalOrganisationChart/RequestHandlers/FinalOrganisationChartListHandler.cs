using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.OrganisationChart.FinalOrganisationChartRow>;
using MyRow = HRMSoftware.OrganisationChart.FinalOrganisationChartRow;

namespace HRMSoftware.OrganisationChart;

public interface IFinalOrganisationChartListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class FinalOrganisationChartListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IFinalOrganisationChartListHandler
{
    public FinalOrganisationChartListHandler(IRequestContext context)
            : base(context)
    {
    }
}