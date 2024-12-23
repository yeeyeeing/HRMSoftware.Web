import { Decorators, EntityGrid, ListResponse } from '@serenity-is/corelib';
import { CompanySettingsColumns, CompanySettingsRow, CompanySettingsService } from '../../../ServerTypes/CompanySettings';
import { CompanySettingsDialog } from './CompanySettingsDialog';

@Decorators.registerClass('HRMSoftware.CompanySettings.CompanySettingsGrid')
export class CompanySettingsGrid extends EntityGrid<CompanySettingsRow, any> {
    protected getColumnsKey() { return CompanySettingsColumns.columnsKey; }
    protected getDialogType() { return CompanySettingsDialog; }
    protected getRowDefinition() { return CompanySettingsRow; }
    protected getService() { return CompanySettingsService.baseUrl; }
    public ActivePolicyRow: number;
    public ActivePolicyId: number;

    public EditPolicyRow: number;
    public EditPolicyId: number;
    protected getAddButtonCaption() {
        return "Create Company Settings";
    }

    public RowID: number[] = [];

    constructor(container: JQuery) {
        super(container);

    }

  


    protected onViewProcessData(response: ListResponse<CompanySettingsRow>)
    {
        response = super.onViewProcessData(response);
        if (response.Entities.length >= 1) {
            this.toolbar.findButton("add-button").toggle(false);
        }
        this.toolbar.findButton("column-picker-button").toggle(false);




        var today = new Date();
        this.RowID = []
        for (var index in response.Entities)
        {
            this.RowID.push(response.Entities[index].Id)
            var StartingFrom = response.Entities[index].EffectiveSince
            var EndingAt = response.Entities[index].EffectiveUntil
        
            if (EndingAt === undefined) {
                this.EditPolicyRow = Number(index)
                this.EditPolicyId = response.Entities[index].Id
            }
            /*
            else if (EndingAt !== undefined && StartingFrom !== undefined)
            {
                var StartingFromObject = new Date(StartingFrom.substring(0, 10))
                var EndingAtObject = new Date(EndingAt.substring(0, 10))

                if ((today >= StartingFromObject) && (today <= EndingAtObject)) {
                    this.ActivePolicyRow = Number(index)
                    this.ActivePolicyId = response.Entities[index].Id
                }



            }
            */
            }

        

        return response;

    }
  
   


    protected onClick(e: JQueryEventObject, row: number, cell: number)
    {
        e.preventDefault()

        var dlg = new CompanySettingsDialog()

       

        
        dlg.loadByIdAndOpenDialog(this.RowID[row])
        if (row != this.EditPolicyRow) 
            dlg.set_readOnly(true)
        

        super.onClick(e, row, cell);
   
    }


}