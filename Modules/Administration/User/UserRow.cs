
using HRMSoftware.EmployeeProfile;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.Administration
{
    [ConnectionKey("Default"), Module("Administration"), TableName("Users")]
    [DisplayName("Users"), InstanceName("User")]
    [ReadPermission("*")]
    [ModifyPermission("*")]
    [LookupScript("User.User", Permission = "*")]
    public sealed class UserRow : LoggingRow<UserRow.RowFields>, IIdRow, INameRow

    {
        [DisplayName("User Id"), Identity, IdProperty]
        public int? UserId
        {
            get => fields.UserId[this];
            set => fields.UserId[this] = value;
        }





        [DisplayName("Employee ID")]
        public int? EmployeeRowID
        {
            get => fields.EmployeeRowID[this];
            set => fields.EmployeeRowID[this] = value;
        }
        

      
        

        [DisplayName("Username"), Size(100), NotNull, QuickSearch, LookupInclude, NameProperty]
        public string Username
        {
            get => fields.Username[this];
            set => fields.Username[this] = value;
        }

        [DisplayName("Source"), Size(4), NotNull, Insertable(false), Updatable(false), DefaultValue("site")]
        public string Source
        {
            get => fields.Source[this];
            set => fields.Source[this] = value;
        }

        [DisplayName("Password Hash"), Size(86), NotNull, Insertable(false), Updatable(false), MinSelectLevel(SelectLevel.Never)]
        public string PasswordHash
        {
            get => fields.PasswordHash[this];
            set => fields.PasswordHash[this] = value;
        }

        [DisplayName("Password Salt"), Size(10), NotNull, Insertable(false), Updatable(false), MinSelectLevel(SelectLevel.Never)]
        public string PasswordSalt
        {
            get => fields.PasswordSalt[this];
            set => fields.PasswordSalt[this] = value;
        }

        [DisplayName("Display Name"), Size(100), NotNull, LookupInclude]
        public string DisplayName
        {
            get => fields.DisplayName[this];
            set => fields.DisplayName[this] = value;
        }

        [DisplayName("Email"), Size(100)]
        public string Email
        {
            get => fields.Email[this];
            set => fields.Email[this] = value;
        }

        [DisplayName("Mobile Phone Number"), Size(20)]
        public string MobilePhoneNumber
        {
            get => fields.MobilePhoneNumber[this];
            set => fields.MobilePhoneNumber[this] = value;
        }

        [DisplayName("Mobile Phone Verified"), NotNull, DefaultValue(false)]
        public bool? MobilePhoneVerified
        {
            get => fields.MobilePhoneVerified[this];
            set => fields.MobilePhoneVerified[this] = value;
        }

        [DisplayName("Two-Factor Authentication")]
        public TwoFactorAuthType? TwoFactorAuth
        {
            get { return (TwoFactorAuthType?)Fields.TwoFactorAuth[this]; }
            set => fields.TwoFactorAuth[this] = (int?)value;
        }

        [DisplayName("User Image"), Size(100)]
        [ImageUploadEditor(FilenameFormat = "UserImage/~", CopyToHistory = true)]
        public string UserImage
        {
            get => fields.UserImage[this];
            set => fields.UserImage[this] = value;
        }

        [DisplayName("Password"), Size(50)]
        public string Password
        {
            get => fields.Password[this];
            set => fields.Password[this] = value;
        }

        [NotNull, Insertable(false), Updatable(true)]
        public short? IsActive
        {
            get => fields.IsActive[this];
            set => fields.IsActive[this] = value;
        }

        [DisplayName("Confirm Password"), Size(50), NotMapped]
        public string PasswordConfirm
        {
            get => fields.PasswordConfirm[this];
            set => fields.PasswordConfirm[this] = value;
        }

        [DisplayName("Last Directory Update"), Insertable(false), Updatable(false)]
        public DateTime? LastDirectoryUpdate
        {
            get => fields.LastDirectoryUpdate[this];
            set => fields.LastDirectoryUpdate[this] = value;
        }

        [NotMapped, MinSelectLevel(SelectLevel.Explicit), ReadPermission("*")]//, ReadPermission("ImpersonateAs")
        public string ImpersonationToken
        {
            get => fields.ImpersonationToken[this];
            set => fields.ImpersonationToken[this] = value;
        }

        [DisplayName("Roles"), LinkingSetRelation(typeof(UserRoleRow), nameof(UserRoleRow.UserId), nameof(UserRoleRow.RoleId))]
        [AsyncLookupEditor(typeof(RoleRow), Multiple = true)]
        public List<int> Roles
        {
            get => fields.Roles[this];
            set => fields.Roles[this] = value;
        }


        [NotMapped]
        public string EmployeeName
        {
            get => fields.EmployeeName[this];
            set => fields.EmployeeName[this] = value;
        }
        /*
        Int16Field IIsActiveRow.IsActiveField
        {
            get => fields.IsActive;
        }
        

        
        public UserRow()
        {
        }

        public UserRow(RowFields fields)
            : base(fields)
        {
        }
        */

        public class RowFields : LoggingRowFields
        {
            public Int32Field UserId;
            public StringField EmployeeName;

            public StringField Username;
            public StringField Source;
            public StringField PasswordHash;
            public StringField PasswordSalt;
            public StringField DisplayName;
            public StringField Email;
            public StringField MobilePhoneNumber;
            public BooleanField MobilePhoneVerified;
            public Int32Field TwoFactorAuth;
            public StringField UserImage;
            public DateTimeField LastDirectoryUpdate;
            public Int32Field EmployeeRowID;

            public StringField Password;
            public StringField PasswordConfirm;

            public StringField ImpersonationToken;
            public ListField<int> Roles;

        }
    }
}