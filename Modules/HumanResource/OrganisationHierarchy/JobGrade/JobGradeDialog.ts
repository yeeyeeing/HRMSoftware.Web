import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { JobGradeForm, JobGradeRow, JobGradeService } from '../../../ServerTypes/OrganisationHierarchy';
import { alertDialog } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.OrganisationHierarchy.JobGradeDialog')
export class JobGradeDialog extends EntityDialog<JobGradeRow, any> {
    protected getFormKey() { return JobGradeForm.formKey; }
    protected getRowDefinition() { return JobGradeRow; }
    protected getService() { return JobGradeService.baseUrl; }

    protected form = new JobGradeForm(this.idPrefix);
    public list_of_job_grade: string[] = [];
    protected onDialogOpen() {
        super.onDialogOpen()
       
       }
  
    constructor()
    {
        super();
        JobGradeService.List({
        }, response => {
            for (var key in response.Entities) 
                this.list_of_job_grade.push(response.Entities[key].Name.toLowerCase())
        });
    }
    protected save_submitHandler(response): void {
        var list_of_errors: string[] = [];
        var InsertedJobGrade = this.form.Name.value.toLowerCase()
        for (var item in this.list_of_job_grade) {
            if (this.list_of_job_grade[item] === InsertedJobGrade)
                list_of_errors.push("This Job Grade is inserted.")
        }
        if (list_of_errors.length > 0) {
            const concatenatedString: string = list_of_errors.map(item => `- ${item}`).join('\n');
            alertDialog(concatenatedString)
        }
        else
            super.save_submitHandler(response)
    }
}