using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.TrainingManagement.MasterProgramRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.TrainingManagement.MasterProgramRow;

namespace HRMSoftware.TrainingManagement;

public interface IMasterProgramSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterProgramSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterProgramSaveHandler
{
    public MasterProgramSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}