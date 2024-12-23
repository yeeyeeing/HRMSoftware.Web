using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.OrganisationHierarchy.SectionRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface ISectionDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class SectionDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, ISectionDeleteHandler
{
    public SectionDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}