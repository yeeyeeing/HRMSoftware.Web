using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.TrainingManagement.ProgramSessionRow>;
using MyRow = HRMSoftware.TrainingManagement.ProgramSessionRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramSessionRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramSessionRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IProgramSessionRetrieveHandler
{
    public ProgramSessionRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}