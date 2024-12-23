using FluentMigrator;

namespace HRMSoftware.Migrations.DefaultDB
{
    [Migration(20210522_1623)]
    public class DefaultDB_20210522_1623_MailSerializedMessage : AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("Mail")
                .AddColumn("SerializedMessage").AsBinary(int.MaxValue).Nullable();
        }
    }
}