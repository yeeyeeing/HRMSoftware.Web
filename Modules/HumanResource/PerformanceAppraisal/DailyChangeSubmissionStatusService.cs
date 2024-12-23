using System;
using System.Threading;
using System.Threading.Tasks;
using HRMSoftware.PerformanceAppraisal;
using HRMSoftware.Web.Modules.PerformanceAppraisal.PerformanceAppraisalForm;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serenity.Data;

namespace HRMSoftware.Web.Modules.PerformanceAppraisal
{
    public class DailyChangeSubmissionStatusService : IHostedService, IDisposable
    {
        private readonly ILogger<DailyChangeSubmissionStatusService> _logger;
        private readonly ISqlConnections _sqlConnections;
        private Timer _timer;

        public DailyChangeSubmissionStatusService(ILogger<DailyChangeSubmissionStatusService> logger, ISqlConnections sqlConnections)
        {
            _logger = logger;
            _sqlConnections = sqlConnections;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Daily Change Submission Status Service is starting.");
            
            var runAtTime = DateTime.Today.AddHours(0).AddMinutes(0);
            var now = DateTime.Now;
            // var runAtTime = now.AddMinutes(5);

            if (now > runAtTime)
            {
                runAtTime = runAtTime.AddDays(1);
            }

            var timeToGo = runAtTime - now;

            _logger.LogInformation($"Task will run in {timeToGo.TotalMinutes} minutes.");

            _timer = new Timer(RunTask, null, timeToGo, TimeSpan.FromDays(1));

            return Task.CompletedTask;
        }

        private void RunTask(object state)
        {
            _logger.LogInformation("Running DailyChangeSubmissionStatus...");

            using (var connection = _sqlConnections.NewFor<PerformanceAppraisalFormRow>())
            {
                var today = DateTime.Now;
                
                var recordsToUpdate = connection.List<PerformanceAppraisalFormRow>(
                    new Criteria("SubmissionStatus") == PerformanceAppraisalFormStatus.Draft &&
                    new Criteria("EndDate") <= today);
                foreach (var record in recordsToUpdate)
                {
                    record.SubmissionStatus = PerformanceAppraisalFormStatus.Completed;
                    connection.UpdateById(record);
                    _logger.LogInformation($"Updated form ID: {record.Id} to status 'Completed'.");
                }
            }
            _logger.LogInformation("Task completed successfully.");
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Daily Change Submission Status Service is stopping.");
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
