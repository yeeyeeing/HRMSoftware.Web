using HRMSoftware.Administration;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Serenity;
using Serenity.Abstractions;
using Serenity.Data;
using Serenity.Extensions;
using Serenity.Services;
using Serenity.Web;
using System;
using System.IO;

namespace HRMSoftware.Membership.Pages
{
    public partial class AccountPage : Controller
    {
        [HttpGet]
        public ActionResult ForgotPassword()
        {
            return this.PanelPage(new()
            {
                Module = ESM.Modules.Membership.Account.ForgotPassword.ForgotPasswordPage,
                PageTitle = Texts.Forms.Membership.ForgotPassword.FormTitle,
                Layout = MVC.Views.Shared._LayoutNoNavigation
            });
        }

        static int GetDeterministicHashCode(string str)
        {
            unchecked
            {
                int hash1 = (5381 << 16) + 5381;
                int hash2 = hash1;

                for (int i = 0; i < str.Length; i += 2)
                {
                    hash1 = ((hash1 << 5) + hash1) ^ str[i];
                    if (i == str.Length - 1)
                        break;
                    hash2 = ((hash2 << 5) + hash2) ^ str[i + 1];
                }

                return hash1 + (hash2 * 1566083941);
            }
        }

        static int NonceForResetPassword(UserRow user)
        {
            return GetDeterministicHashCode(
                (user.UpdateDate ?? user.InsertDate ?? DateTime.Today).ToString("s") +
                user.PasswordHash + user.PasswordSalt);
        }

        [HttpPost, JsonRequest]
        public Result<ServiceResponse> ForgotPassword(ForgotPasswordRequest request,
            [FromServices] IEmailSender emailSender,
            [FromServices] ISiteAbsoluteUrl siteAbsoluteUrl)
        {
            return this.UseConnection("Default", connection =>
            {
                if (request is null)
                    throw new ArgumentNullException(nameof(request));

                if (string.IsNullOrEmpty(request.Email))
                    throw new ArgumentNullException(nameof(request.Email));

                var user = connection.TryFirst<UserRow>(UserRow.Fields.Email == request.Email);
                if (user == null)
                    return new ServiceResponse();

                byte[] bytes;
                using (var ms = new MemoryStream())
                using (var bw = new BinaryWriter(ms))
                {
                    bw.Write(DateTime.UtcNow.AddHours(3).ToBinary());
                    bw.Write(user.UserId.Value);
                    bw.Write(NonceForResetPassword(user));
                    bw.Flush();
                    bytes = ms.ToArray();
                }

                var token = Convert.ToBase64String(HttpContext.RequestServices
                    .GetDataProtector("ResetPassword").Protect(bytes));

                var externalUrl = siteAbsoluteUrl.GetExternalUrl();
                var resetLink = UriHelper.Combine(externalUrl, "Account/ResetPassword?t=");
                resetLink += Uri.EscapeDataString(token);

                var emailModel = new ResetPasswordEmailModel
                {
                    Username = user.Username,
                    DisplayName = user.DisplayName,
                    ResetLink = resetLink
                };

                var emailSubject = Texts.Forms.Membership.ResetPassword.EmailSubject.ToString(Localizer);
                var emailBody = TemplateHelper.RenderViewToString(HttpContext.RequestServices,
                    MVC.Views.Membership.Account.ResetPassword.ResetPasswordEmail, emailModel);

                if (emailSender is null)
                    throw new ArgumentNullException(nameof(emailSender));

                emailSender.Send(subject: emailSubject, body: emailBody, mailTo: user.Email);

                return new ServiceResponse();
            });
        }
    }
}