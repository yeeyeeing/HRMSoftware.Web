using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.OrganisationChart.FinalOrganisationChartRow;

namespace HRMSoftware.OrganisationChart;

public interface IFinalOrganisationChartDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class FinalOrganisationChartDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IFinalOrganisationChartDeleteHandler
{
    public FinalOrganisationChartDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}