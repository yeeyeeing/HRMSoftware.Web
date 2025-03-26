import { Decorators, EntityDialog, serviceCall } from '@serenity-is/corelib';
import { EmployeeEditHistoryForm, EmployeeEditHistoryRow, EmployeeEditHistoryService } from '../../../ServerTypes/EmployeeEditHistory';

@Decorators.registerClass('HRMSoftware.EmployeeEditHistory.EmployeeEditHistoryDialog')
export class EmployeeEditHistoryDialog extends EntityDialog<EmployeeEditHistoryRow, any> {
    protected getFormKey() { return EmployeeEditHistoryForm.formKey; }
    protected getRowDefinition() { return EmployeeEditHistoryRow; }
    protected getService() { return EmployeeEditHistoryService.baseUrl; }

    protected form = new EmployeeEditHistoryForm(this.idPrefix);

    public EmployeeRowID: number;

    constructor(EmployeeRowID: number) {
        super();
        this.EmployeeRowID = EmployeeRowID;
        this.deleteButton.hide();
        this.localizationButton.hide();
        this.undeleteButton.hide();
        this.cloneButton.hide();
        this.applyChangesButton.hide();
        this.saveAndCloseButton.hide();

        this.dialogTitle = 'Employee Profile Edit History'
    }

    protected getDialogOptions()
    {
        let opt = super.getDialogOptions()
        opt.height = 400
        opt.width = opt.width+ 200
        return opt
    }

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);
        var tabId = $(".fieldset").children().attr('id');

        var node3 = document.getElementById(tabId);
        var divNode = document.createElement('DIV')
        divNode.classList.add('category-title')
        divNode.setAttribute("id", "Edit-History")
        node3.appendChild(divNode)
        
        var node4 = document.createElement("a");
        node4.classList.add("category-anchor");
        var textnode = document.createTextNode("Employee Profile Edit History");
        node4.appendChild(textnode);
        document.getElementById("Edit-History").append(node4);

        var node5 = document.getElementById("Edit-History");
        node5.insertAdjacentHTML('afterend', '<div class="DataGrid" id="HistoryGrid"></div>');

        var node6 = document.createElement('TABLE');
        var node7 = document.createElement('TR');
        var header1 = document.createElement('TH');
        var header3 = document.createElement('TH');

        var textnode1 = document.createTextNode("Description");
        var textnode3 = document.createTextNode("Date");


        header1.appendChild(textnode1);
        header3.appendChild(textnode3);

        document.getElementById("HistoryGrid").append(node6);
        node6.appendChild(node7)
        node7.appendChild(header1)
        node7.appendChild(header3)
        var counter = 1
        EmployeeEditHistoryService.List({
        }, response => {
            let BufferList: any[] = []; // Declaring an empty array of any type
            for (var index in response.Entities)
            {
                if (response.Entities[index].EmployeeRowId == this.EmployeeRowID)
                    BufferList.push(response.Entities[index])
            }
            BufferList.sort((a, b) => a - b);

            BufferList.reverse()




            if (BufferList.length) {

                for (var index in BufferList) {

                    if (counter % 2 == 0) {
                        var color = "white"
                    }
                    else {
                        var color = "#f8f8f8"
                    }
                    counter = counter + 1
                    var node8 = document.createElement('TR');
                    node8.style.backgroundColor = color;
                    var content1 = document.createElement('TD');
                    var content3 = document.createElement('TD');
                    var contentnode1 = document.createTextNode(String(BufferList[index]["Description"]));
                    var contentnode3 = document.createTextNode(String(BufferList[index]["InsertDate"].substring(0, 10)));
                    content1.appendChild(contentnode1)
                    content3.appendChild(contentnode3)
                    node6.appendChild(node8)
                    node8.appendChild(content1)
                    node8.appendChild(content3)
                }

            }
        });
        //this.set_readOnly(true);

    }
}