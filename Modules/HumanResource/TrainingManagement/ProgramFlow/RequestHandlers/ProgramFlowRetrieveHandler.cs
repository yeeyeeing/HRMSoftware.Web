using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.TrainingManagement.ProgramFlowRow>;
using MyRow = HRMSoftware.TrainingManagement.ProgramFlowRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramFlowRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramFlowRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IProgramFlowRetrieveHandler
{
    public ProgramFlowRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}