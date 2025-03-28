import { UserPermissionService } from "@/ServerTypes/Administration";
import { TemplatedDialog } from "@serenity-is/corelib";
import { format, getRemoteData, localText, notifySuccess } from "@serenity-is/corelib/q";
import { PermissionCheckEditor } from "./PermissionCheckEditor";

export class UserPermissionDialog extends TemplatedDialog<UserPermissionDialogOptions>
{

    private permissions: PermissionCheckEditor;

    constructor(opt: UserPermissionDialogOptions) {
        super(opt);

        this.permissions = new PermissionCheckEditor(this.byId('Permissions'), {
            showRevoke: true
        });




        UserPermissionService.List({
            UserID: this.options.userID,
            Module: null,
            Submodule: null
        }, response => {
            console.log(response.Entities)

            this.permissions.value = response.Entities;
        });






        UserPermissionService.ListRolePermissions({
            UserID: this.options.userID,
            Module: null,
            Submodule: null,
        }, response => {
            console.log(response.Entities)
            this.permissions.rolePermissions = response.Entities;
        });





        this.permissions.implicitPermissions = getRemoteData('Administration.ImplicitPermissions');



        this.dialogTitle = format(localText('Site.UserPermissionDialog.DialogTitle'),
            this.options.username);




    }














    protected getDialogButtons() {
        return [
            {
                text: localText('Dialogs.OkButton'),
                cssClass: 'btn btn-primary',
                click: e => {
                    UserPermissionService.Update({
                        UserID: this.options.userID,
                        Permissions: this.permissions.value,
                        Module: null,
                        Submodule: null
                    }, response => {
                        this.dialogClose();
                        window.setTimeout(() => notifySuccess(localText('Site.UserPermissionDialog.SaveSuccess')), 0);
                    });
                }
            }, {
                text: localText('Dialogs.CancelButton'),
                click: () => this.dialogClose()
            }
        ];
    }

















    protected getTemplate(): string {
        return '<div id="~_Permissions"></div>';
    }








}







export interface UserPermissionDialogOptions {
    userID?: number;
    username?: string;
}
