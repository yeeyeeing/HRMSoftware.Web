import {Criteria, Decorators, EntityDialog, ToolButton} from '@serenity-is/corelib';
import {ReportForm, ReportRow, ReportService} from '../../../ServerTypes/TrainingManagement';
import { DepartmentService } from '../../../ServerTypes/OrganisationHierarchy/DepartmentService';

@Decorators.registerClass('HRMSoftware.TrainingManagement.ReportDialog')
export class ReportDialog extends EntityDialog<ReportRow, any> {
    protected getFormKey() {
        return ReportForm.formKey;
    }

    protected getRowDefinition() {
        return ReportRow;
    }

    protected getService() {
        return ReportService.baseUrl;
    }

    protected form = new ReportForm(this.idPrefix);

    protected dialogOpen(asPanel?: boolean) {
        super.dialogOpen(true);
    }

    protected onDialogOpen() {
        super.onDialogOpen();

        this.element.closest(".ui-dialog").css("top", "1%");
        this.element.children().hide();
        
        let nameField = this.form.ProgramName.value;
        let dateField = this.form.StartDate.value + (this.form.StartDate.value == this.form.EndDate.value ? "":" to " + this.form.EndDate.value);

        if(this.form.DepartmentList.values.length > 0){
            DepartmentService.List({
                Criteria: Criteria('Id').in(this.form.DepartmentList.values),
            }, response => {
                setTimeout(()=>{
                    console.log("Trigged");
                    let departmentField = response.Entities.map((elem, idx)=>
                        elem.Name
                    ).join(", ");

                    $("#departmentPlaceholder").first().text(departmentField);
                }, 1000)
            });
        } else {
                setTimeout(()=>{
                $("#departmentPlaceholder").first().text("N/A");
            }, 1000)
        }
        
        const TemplateHtml =
            `<div class="header">
                <h4>Training Report</h4>
                   <p><strong>Course Name:</strong> ${nameField}</p>
                   <p><strong>Date:</strong> ${dateField}</p>
                   <p><strong>Department:</strong> <span id="departmentPlaceholder">Loading...</span></p>
            </div>
            <hr>

            `;

        $(TemplateHtml).appendTo(this.element);

    }

    protected getToolbarButtons(): ToolButton[] {
        // return super.getToolbarButtons();
        return [];
    }

    protected updateTitle() {
        super.updateTitle();
        this.dialogTitle = "View Report (" + this.entity.ProgramName + ")";
    }
}