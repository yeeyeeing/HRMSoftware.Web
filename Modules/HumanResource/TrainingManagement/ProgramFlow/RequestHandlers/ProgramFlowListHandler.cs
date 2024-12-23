using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.TrainingManagement.ProgramFlowRow>;
using MyRow = HRMSoftware.TrainingManagement.ProgramFlowRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramFlowListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramFlowListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IProgramFlowListHandler
{
    public ProgramFlowListHandler(IRequestContext context)
            : base(context)
    {
    }
}