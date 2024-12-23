using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.OrganisationHierarchy.SectionRow>;
using MyRow = HRMSoftware.OrganisationHierarchy.SectionRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface ISectionRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class SectionRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ISectionRetrieveHandler
{
    public SectionRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}