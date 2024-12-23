using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.OrganisationHierarchy.JobGradeRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.OrganisationHierarchy.JobGradeRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface IJobGradeSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class JobGradeSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IJobGradeSaveHandler
{
    public JobGradeSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}