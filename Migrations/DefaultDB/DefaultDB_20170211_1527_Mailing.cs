using FluentMigrator;
using Serenity.Extensions;

namespace HRMSoftware.Migrations.DefaultDB
{
    [Migration(20170211_1527)]
    public class DefaultDB_20170211_1527_Mailing : AutoReversingMigration
    {
        public override void Up()
        {
            this.CreateTableWithId64("Mail", "MailId", s => s
                .WithColumn("UID").AsGuid().NotNullable()
                .WithColumn("Subject").AsString(400).NotNullable()
                .WithColumn("Body").AsString(int.MaxValue).Nullable()
                .WithColumn("MailFrom").AsString(100).Nullable()
                .WithColumn("MailTo").AsString(2000).Nullable()
                .WithColumn("ReplyTo").AsString(100).Nullable()
                .WithColumn("CC").AsString(2000).Nullable()
                .WithColumn("BCC").AsString(2000).Nullable()
                .WithColumn("Priority").AsInt32().NotNullable().WithDefaultValue(2)
                .WithColumn("Status").AsInt32().NotNullable().WithDefaultValue(0)
                .WithColumn("RetryCount").AsInt32().NotNullable().WithDefaultValue(0)
                .WithColumn("ErrorMessage").AsString(int.MaxValue).Nullable()
                .WithColumn("LockExpiration").AsDateTime().NotNullable()
                .WithColumn("SentDate").AsDateTime().Nullable()
                .WithColumn("InsertUserId").AsInt32().Nullable()
                .WithColumn("InsertDate").AsDateTime().NotNullable());
        }
    }
}