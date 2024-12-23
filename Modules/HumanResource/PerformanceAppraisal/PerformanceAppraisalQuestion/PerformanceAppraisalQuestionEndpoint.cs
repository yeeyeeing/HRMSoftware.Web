using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Data;
using System.Globalization;
using System.Net;
using HRMSoftware.Web.Modules.PerformanceAppraisal;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalQuestionRow;

namespace HRMSoftware.PerformanceAppraisal.Endpoints;

[Route("Services/PerformanceAppraisal/PerformanceAppraisalQuestion/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class PerformanceAppraisalQuestionEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IPerformanceAppraisalQuestionSaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IPerformanceAppraisalQuestionSaveHandler handler)
    {
        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IPerformanceAppraisalQuestionDeleteHandler handler)
    {
        var questId = (long)request.EntityId;
        var connection = uow.Connection;
        
        DeleteResponsesByQuestId(connection, questId);
        
        return handler.Delete(uow, request);
    }
    
    // public void DeleteResponsesByQuestId(IDbConnection connection, long questId)
    // {
    //     
    //     // Direct SQL for deletion
    //     var sql = $"DELETE FROM PerformanceAppraisalTemplateQuestion  WHERE QuestionID = @questId";
    //
    //     // Execute the delete operation with parameter
    //     connection.Execute(sql, new { questId });
    // }
    
    public void DeleteResponsesByQuestId(IDbConnection connection, long questId)
    {
        var kualaLumpurTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Asia/Kuala_Lumpur");
        var currentDate = TimeZoneInfo.ConvertTime(DateTime.UtcNow, kualaLumpurTimeZone);

        // Direct SQL for updating records
        var sql = @"
        UPDATE PerformanceAppraisalTemplateQuestion
        SET isActive = -1, 
            deleteDate = @currentDate
        WHERE QuestionID = @questId";
    
        // Execute the update operation with parameters
        connection.Execute(sql, new { questId, currentDate });
    }
    
    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IPerformanceAppraisalQuestionRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IPerformanceAppraisalQuestionListHandler handler)
    {
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IPerformanceAppraisalQuestionListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.PerformanceAppraisalQuestionColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "PerformanceAppraisalQuestionList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }
    
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse DeleteAll(IDbConnection connection, DeleteAllRequest request)
    {
        if (request.RecordIds == null || request.RecordIds.Length == 0)
            throw new ArgumentNullException(nameof(request.RecordIds));

        connection.Execute(@"
        UPDATE [PerformanceAppraisalQuestion]
        SET IsActive = -1, DeleteDate = @now
        WHERE Id IN @RecordIds", new { RecordIds = request.RecordIds, now = DateTime.Now });

        return new DeleteResponse();
    }
}