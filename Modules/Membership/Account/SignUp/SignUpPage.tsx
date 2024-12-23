import { SignUpForm, SignUpRequest } from "@/ServerTypes/Membership";
import { SignUpResponse } from "@/ServerTypes/Membership/SignUpResponse";
import { Texts } from "@/ServerTypes/Texts";
import { PropertyPanel } from "@serenity-is/corelib";
import { informationDialog, resolveUrl, serviceCall } from "@serenity-is/corelib/q";
import { AccountPanelTitle } from "../AccountPanelTitle";

export default function pageInit() {
    new SignUpPanel($('#SignUpPanel'));
}

const myTexts = Texts.Forms.Membership.SignUp;

class SignUpPanel extends PropertyPanel<SignUpRequest, any> {

    protected getFormKey() { return SignUpForm.formKey; }

    private form: SignUpForm;

    constructor(container: JQuery) {
        super(container);

        this.form = new SignUpForm(this.idPrefix);

        this.form.Email.element.attr("autocomplete", "off");
        this.form.Password.element.attr("autocomplete", "new-password");

        this.form.ConfirmEmail.addValidationRule(this.uniqueName, e => {
            if (this.form.ConfirmEmail.value !== this.form.Email.value) {
                return Texts.Validation.EmailConfirm;
            }
        });

        this.form.ConfirmPassword.addValidationRule(this.uniqueName, e => {
            if (this.form.ConfirmPassword.value !== this.form.Password.value) {
                return Texts.Validation.PasswordConfirmMismatch;
            }
        });
    }

    submitClick() {
        if (!this.validateForm()) {
            return;
        }

        serviceCall({
            url: resolveUrl('~/Account/SignUp'),
            request: {
                DisplayName: this.form.DisplayName.value,
                Email: this.form.Email.value,
                Password: this.form.Password.value
            },
            onSuccess: (response: SignUpResponse) => {
                if (response.DemoActivationLink) {
                    informationDialog("You would normally receive an e-mail with instructions to active your account now.\n\n" +
                        "But as this is a DEMO, you'll be redirected to the activation page automatically. ", () => {
                            window.location.href = resolveUrl(response.DemoActivationLink);
                        });

                    return;
                }

                informationDialog(myTexts.Success, () => {
                    window.location.href = resolveUrl('~/');
                });
            }
        });
    }

    renderContents() {
        const id = this.useIdPrefix();
        this.element.empty().append(<>
            <AccountPanelTitle />

            <div class="s-Panel p-4">
                <h5 class="text-center my-4">{myTexts.FormTitle}</h5>
                <p class="text-center">{myTexts.FormInfo}</p>

                <form id={id.Form} action="" autoComplete="off">
                    <input autoComplete="false" name="hidden" type="text" style="display:none;" />
                    <div id={id.PropertyGrid}></div>
                    <div class="px-field">
                        <button id={id.SubmitButton} type="submit" class="btn btn-primary my-4 w-100"
                            onClick={e => { e.preventDefault(); this.submitClick(); }}>
                            {myTexts.SubmitButton}
                        </button>
                    </div>
                </form>
            </div>
        </>)
    }
}
