using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.OrganisationChart.SplitOrganisationChartRow;

namespace HRMSoftware.OrganisationChart;

public interface ISplitOrganisationChartDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class SplitOrganisationChartDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, ISplitOrganisationChartDeleteHandler
{
    public SplitOrganisationChartDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}