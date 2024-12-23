using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.OrganisationChart.SplitOrganisationStructureRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.OrganisationChart.SplitOrganisationStructureRow;

namespace HRMSoftware.OrganisationChart;

public interface ISplitOrganisationStructureSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class SplitOrganisationStructureSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ISplitOrganisationStructureSaveHandler
{
    public SplitOrganisationStructureSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}