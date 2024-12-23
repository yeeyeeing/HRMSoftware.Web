using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.OrganisationHierarchy.JobGradeRow>;
using MyRow = HRMSoftware.OrganisationHierarchy.JobGradeRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface IJobGradeRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class JobGradeRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IJobGradeRetrieveHandler
{
    public JobGradeRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}