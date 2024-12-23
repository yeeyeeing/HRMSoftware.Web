using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.OrganisationHierarchy.DivisionRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.OrganisationHierarchy.DivisionRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface IDivisionSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class DivisionSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IDivisionSaveHandler
{
    public DivisionSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}