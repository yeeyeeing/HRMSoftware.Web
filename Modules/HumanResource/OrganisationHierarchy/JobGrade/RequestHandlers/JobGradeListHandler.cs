using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.OrganisationHierarchy.JobGradeRow>;
using MyRow = HRMSoftware.OrganisationHierarchy.JobGradeRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface IJobGradeListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class JobGradeListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IJobGradeListHandler
{
    public JobGradeListHandler(IRequestContext context)
            : base(context)
    {
    }
}