using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.TrainingManagement.ProgramFlowRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramFlowDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramFlowDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IProgramFlowDeleteHandler
{
    public ProgramFlowDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}