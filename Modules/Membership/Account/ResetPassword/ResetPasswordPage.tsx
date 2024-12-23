import { ResetPasswordForm, ResetPasswordRequest } from "@/ServerTypes/Membership";
import { Texts } from "@/ServerTypes/Texts";
import { PropertyPanel } from "@serenity-is/corelib";
import { format, informationDialog, resolveUrl, serviceCall } from "@serenity-is/corelib/q";
import { AccountPanelTitle } from "../AccountPanelTitle";

export default function pageInit(opt: ResetPasswordOptions) {
    $(function () {
        new ResetPasswordPanel($('#PanelDiv')
            .addClass('s-full-page justify-content-center'), opt);
    });
}

interface ResetPasswordOptions {
    token: string;
}

const myTexts = Texts.Forms.Membership.ResetPassword;

export class ResetPasswordPanel extends PropertyPanel<ResetPasswordRequest, ResetPasswordOptions> {

    protected getFormKey() { return ResetPasswordForm.formKey; }

    private form = new ResetPasswordForm(this.idPrefix);

    constructor(container: JQuery, opt: ResetPasswordOptions) {
        super(container, opt);

        this.form.NewPassword.addValidationRule(this.uniqueName, e => {
            if (this.form.NewPassword.value.length < 7)
                return format(Texts.Validation.MinRequiredPasswordLength, 7);
        });

        this.form.ConfirmPassword.addValidationRule(this.uniqueName, e => {
            if (this.form.ConfirmPassword.value !== this.form.NewPassword.value)
                return Texts.Validation.PasswordConfirmMismatch;
        });
    }

    submitClick() {
        if (!this.validateForm())
            return;

        var request = this.getSaveEntity();
        request.Token = this.byId('Token').val();
        serviceCall({
            url: resolveUrl('~/Account/ResetPassword'),
            request: request,
            onSuccess: () => {
                informationDialog(myTexts.Success, () => {
                    window.location.href = resolveUrl('~/Account/Login');
                });
            }
        });
    }

    renderContents() {
        const id = this.useIdPrefix();
        this.element.empty().append(
            <div class="s-container-tight">
                <AccountPanelTitle />
                <div class="s-Panel p-4">
                    <h5 class="text-center mb-4">{myTexts.FormTitle}</h5>
                    <form id={id.Form} action="">
                        <div id={id.PropertyGrid}></div>
                        <button id={id.SubmitButton} type="submit" class="btn btn-primary mx-8 w-100"
                            onClick={e => { e.preventDefault(); this.submitClick(); }}>
                            {myTexts.SubmitButton}
                        </button>
                        <input type="hidden" id={id.Token} value={this.options.token} />
                    </form>
                </div>
            </div>
        );
    }
}