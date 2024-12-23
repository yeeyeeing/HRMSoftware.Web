using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.OrganisationChart.FinalOrganisationChartRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.OrganisationChart.FinalOrganisationChartRow;

namespace HRMSoftware.OrganisationChart;

public interface IFinalOrganisationChartSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class FinalOrganisationChartSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IFinalOrganisationChartSaveHandler
{
    public FinalOrganisationChartSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}