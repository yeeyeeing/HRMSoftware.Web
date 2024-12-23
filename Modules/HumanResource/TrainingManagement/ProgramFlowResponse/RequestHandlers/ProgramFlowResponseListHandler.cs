using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.TrainingManagement.ProgramFlowResponseRow>;
using MyRow = HRMSoftware.TrainingManagement.ProgramFlowResponseRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramFlowResponseListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramFlowResponseListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IProgramFlowResponseListHandler
{
    public ProgramFlowResponseListHandler(IRequestContext context)
            : base(context)
    {
    }
}