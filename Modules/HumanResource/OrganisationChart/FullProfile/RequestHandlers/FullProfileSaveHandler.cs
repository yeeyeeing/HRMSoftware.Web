using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.OrganisationChart.FullProfileRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.OrganisationChart.FullProfileRow;

namespace HRMSoftware.OrganisationChart;

public interface IFullProfileSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class FullProfileSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IFullProfileSaveHandler
{
    public FullProfileSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}