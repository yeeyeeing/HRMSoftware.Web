using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.OrganisationHierarchy.JobGradeRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface IJobGradeDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class JobGradeDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IJobGradeDeleteHandler
{
    public JobGradeDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}