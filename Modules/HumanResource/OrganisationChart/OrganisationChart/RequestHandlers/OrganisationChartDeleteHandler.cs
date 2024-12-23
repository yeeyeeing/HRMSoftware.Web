using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.OrganisationChart.OrganisationChartRow;

namespace HRMSoftware.OrganisationChart;

public interface IOrganisationChartDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class OrganisationChartDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IOrganisationChartDeleteHandler
{
    public OrganisationChartDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}