using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.OrganisationHierarchy.OccupationRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.OrganisationHierarchy.OccupationRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface IOccupationSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class OccupationSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IOccupationSaveHandler
{
    public OccupationSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}