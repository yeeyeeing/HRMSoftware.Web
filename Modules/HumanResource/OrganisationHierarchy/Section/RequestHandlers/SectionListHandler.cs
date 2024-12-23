using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.OrganisationHierarchy.SectionRow>;
using MyRow = HRMSoftware.OrganisationHierarchy.SectionRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface ISectionListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class SectionListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ISectionListHandler
{
    public SectionListHandler(IRequestContext context)
            : base(context)
    {
    }
}