using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.OrganisationHierarchy.SectionRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.OrganisationHierarchy.SectionRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface ISectionSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class SectionSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ISectionSaveHandler
{
    public SectionSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}