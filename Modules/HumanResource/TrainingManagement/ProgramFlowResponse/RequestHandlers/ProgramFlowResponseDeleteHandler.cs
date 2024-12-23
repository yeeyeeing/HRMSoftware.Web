using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.TrainingManagement.ProgramFlowResponseRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramFlowResponseDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramFlowResponseDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IProgramFlowResponseDeleteHandler
{
    public ProgramFlowResponseDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}