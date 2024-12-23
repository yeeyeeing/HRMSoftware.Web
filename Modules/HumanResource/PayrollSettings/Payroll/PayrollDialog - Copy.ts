





import {
    Decorators, EditorUtils, EntityDialog, Select2Editor
}
    from '@serenity-is/corelib';
import {
    EmployeeProfileService
}
    from '../../ServerTypes/EmployeeProfile';
import { EisSubjectionService, EpfSubjectionService, HrdfSubjectionService, NoPaidLeaveService, PayrollForm, PayrollRow, PayrollService, SocsoSubjectionService } from '../../ServerTypes/PayrollSettings';
import { ListResponse, serviceCall } from '@serenity-is/corelib/q';
import { OTApplicationService } from '../../ServerTypes/OTApplication';

export interface Subjection {
    id: number;
    name: string;
    subjection: number;
}
/*
subjection format
(X,X,X,X)
(EPF,EIS,HRDF,SOCSO)
Example:(0,1,1,0)
The external earning subjected to eis and socso
*/
@Decorators.registerClass('HRMSoftware.PayrollSettings.PayrollDialog')
export class PayrollDialog extends EntityDialog<PayrollRow, any> {
    protected getFormKey() { return PayrollForm.formKey; }
    protected getRowDefinition() { return PayrollRow; }
    protected getService() { return PayrollService.baseUrl; }

    protected form = new PayrollForm(this.idPrefix);


    public ExternalEarnings: string[] = [];
    public ExternalDeductions: string[] = [];
    public NettDeductions: number;
    public NettEarnings: number;
    public EmployeeRowId: number;


    public ListOfEpfSubjection: Subjection[] = [];
    public ListOfEisSubjection: Subjection[] = [];
    public ListOfHrdfSubjection: Subjection[] = [];
    public ListOfSocsoSubjection: Subjection[] = [];
    public EpfOffset: number;
    public EisOffset: number;
    public HrdfOffset: number;
    public SocsoOffset: number;
    public ListOfCriteria: string[] = [];
    constructor() {
        super();
        EpfSubjectionService.List({
        }, response => {
            for (var index in response.Entities) {
                if (response.Entities[index].IsActive == 1) {
                    var dict = response.Entities[index]
                    var keys = Object.keys(dict);
                    for (var j = 0; j < keys.length; j++) {
                        var key = keys[j];
                        if (key.toLowerCase() == 'id' || key.toLowerCase() == 'isactive')
                            continue
                        if (dict[key] != true && dict[key] != false && dict[key] !== undefined)
                            continue
                        var NewKey = key.replace(/ ([A - Z]) / g, ' $1').trim();

                        // Access each key here
                        this.ListOfEpfSubjection.push({
                            id: j,
                            name: NewKey,
                            subjection: dict[key],
                        })
                    }
                    break
                }
            }

            //var dropdown = $("#NewEarningsCategory")

            var BufferDict = this.ListOfEpfSubjection
            var keys = Object.keys(BufferDict);

            for (var j = 0; j < keys.length; j++) {
                var key = keys[j];
                var option = new Option((BufferDict[key].name).toString(), (BufferDict[key].id).toString());
                //   dropdown.append(option);
                this.ListOfCriteria.push(BufferDict[key].name)
            }
            /*
            dropdown.on('click', function (e) {
                console.log('hereee');
            });
        
            dropdown.select2(null)
            dropdown.on('select2:click', function (e) {
                console.log('her');
            });
            */

            /*
            $('#NewEarningsCategory').on('select2:select', function (e) {
                console.log('her');
            });
            $("#NewEarningsCategory").on("select2:open", function (e) { console.log("select2:open", e); });
            $("#NewEarningsCategory").select2({
            });
            */
            console.log(this.ListOfEpfSubjection)

        });
        EisSubjectionService.List({
        }, response => {
            for (var index in response.Entities) {
                if (response.Entities[index].IsActive == 1) {
                    var dict = response.Entities[index]
                    var keys = Object.keys(dict);

                    for (var j = 0; j < keys.length; j++) {
                        var key = keys[j];
                        if (key.toLowerCase() == 'id' || key.toLowerCase() == 'isactive')
                            continue
                        if (dict[key] != true && dict[key] != false && dict[key] !== undefined)
                            continue
                        // Access each key here
                        var NewKey = key.replace(/ ([A - Z]) / g, ' $1').trim();

                        this.ListOfEisSubjection.push({
                            id: j,
                            name: NewKey,
                            subjection: dict[key],
                        })
                    }
                    break
                }
            }
            console.log(this.ListOfEisSubjection)

        });
        HrdfSubjectionService.List({
        }, response => {
            for (var index in response.Entities) {
                if (response.Entities[index].IsActive == 1) {
                    var dict = response.Entities[index]
                    var keys = Object.keys(dict);
                    for (var j = 0; j < keys.length; j++) {
                        var key = keys[j];
                        console.log(dict[key])
                        if (key.toLowerCase() == 'id' || key.toLowerCase() == 'isactive')
                            continue
                        if (dict[key] != true && dict[key] != false && dict[key] !== undefined)
                            continue
                        // Access each key here
                        var NewKey = key.replace(/ ([A - Z]) / g, ' $1').trim();

                        this.ListOfHrdfSubjection.push({
                            id: j,
                            name: NewKey,
                            subjection: dict[key],
                        })
                    }
                    break
                }
            }
            console.log(this.ListOfHrdfSubjection)

        });
        SocsoSubjectionService.List({
        }, response => {
            for (var index in response.Entities) {
                if (response.Entities[index].IsActive == 1) {
                    var dict = response.Entities[index]
                    var keys = Object.keys(dict);
                    for (var j = 0; j < keys.length; j++) {
                        var key = keys[j];
                        console.log(dict[key])
                        if (key.toLowerCase() == 'id' || key.toLowerCase() == 'isactive')
                            continue

                        if (dict[key] != true && dict[key] != false && dict[key] !== undefined)
                            continue

                        // Access each key here
                        var NewKey = key.replace(/ ([A - Z]) / g, ' $1').trim();

                        this.ListOfSocsoSubjection.push({
                            id: j,
                            name: NewKey,
                            subjection: dict[key],
                        })
                    }
                    break
                }
            }
            console.log(this.ListOfSocsoSubjection)

        });
    }
    public dialogClose(): void {

        $("#NewEarningsCategory").remove();
        super.dialogClose()
    }
    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);
        var ExternalDeductions = this.ExternalDeductions
        var ExternalEarnings = this.ExternalEarnings
        this.applyChangesButton.hide()
        EditorUtils.setReadonly(this.form.EmployeeName.element, true);
        var EmployeeRowIdValue = this.form.EmployeeRowId.value
        let ElementsArray: string[] = ['Deduction', 'Earnings', 'Nett', 'LunchTimeStartingFrom', 'LunchTimeEndingAt']
        for (var index in ElementsArray)
            $('.' + ElementsArray[index]).hide();//.DaysArray[x]WorkingTime
        var tabId = $(".fieldset").children().attr('id');
        var node3 = document.getElementById(tabId);
        var divNode = document.createElement('DIV')
        divNode.classList.add('category-title')
        divNode.setAttribute("id", "PayRoll-Description")
        node3.appendChild(divNode)
        var node4 = document.createElement("a");
        node4.classList.add("category-anchor");
        var textnode = document.createTextNode("Employee Payroll");
        node4.appendChild(textnode);
        document.getElementById("PayRoll-Description").append(node4);
        var node5 = document.getElementById("PayRoll-Description");
        node5.insertAdjacentHTML('afterend', '<div class="DataGrid" id="PayRollGrid"></div>');
        var TableNode = document.createElement('TABLE');
        TableNode.style.width = "100%";
        TableNode.id = 'PayrollTable'
        var node7 = document.createElement('TR');
        var header1 = document.createElement('TH');
        var header2 = document.createElement('TH');
        var header3 = document.createElement('TH');
        var header4 = document.createElement('TH');
        header1.style.width = "25%";
        header2.style.width = "25%";
        header3.style.width = "25%";
        header4.style.width = "25%";
        var textnode1 = document.createTextNode("Description");
        var textnode2 = document.createTextNode("Earnings");
        var textnode3 = document.createTextNode("Description");
        var textnode4 = document.createTextNode("Deductions");
        header1.appendChild(textnode1);
        header2.appendChild(textnode2);
        header3.appendChild(textnode3);
        header4.appendChild(textnode4);
        document.getElementById("PayRollGrid").append(TableNode);
        node7.appendChild(header1)
        node7.appendChild(header2)
        node7.appendChild(header3)
        node7.appendChild(header4)
        TableNode.appendChild(node7)
        EmployeeProfileService.List({
        }, response => {
            var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'EmployeeRowId')
            let EmployeeRowIdEditor = new Select2Editor($(EmployeeRowIdElement))
            var PersonNameElement = document.getElementById(this.idPrefix + 'EmployeeName')
            //let PersonNameEditor = new Select2Editor($(PersonNameElement))
            interface Item {
                id: number;
                name: string;
                BasicPay: number;
                Allowance: number;
            }
            let listOfDicts: Item[] = [];
            for (var index in response.Entities) {
                EmployeeRowIdEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].EmployeeID).toString(), }); // 8am - 6pm , will consider lates
                listOfDicts.push({
                    id: response.Entities[index].Id, name: response.Entities[index].EmployeeName, BasicPay:
                        response.Entities[index].BasicSalary, Allowance: response.Entities[index].Allowance
                });
            }
            $(EmployeeRowIdElement).on('change', async function () {
                ExternalDeductions.length = 0
                ExternalEarnings.length = 0
                for (var index in listOfDicts) {
                    if (listOfDicts[index].id == $(EmployeeRowIdElement).val()) {
                        let EarningsString: string[] = []
                        let DeductionsString: string[] = []
                        var BasicPay = listOfDicts[index].BasicPay
                        var Allowance = listOfDicts[index].Allowance
                        var EmployeeRowId = listOfDicts[index].id
                        $(PersonNameElement).val(listOfDicts[index].name)
                        var rows = TableNode.getElementsByTagName('TR');
                        // Get the number of rows
                        var numRows = rows.length;
                        for (var i = numRows - 1; i > 0; i--)
                            rows[i].parentNode.removeChild(rows[i]);
                        function extractNameAndPrice(input: string): [string, number] {
                            console.log(input)
                            // Split the input string by the colon and trim any leading/trailing whitespace
                            var [name, priceString] = input.split(':').map(part => part.trim());
                            // Convert the priceString to a number
                            var price = parseFloat(priceString);
                            // Return the extracted name and price as an object
                            return [name, price];
                        }
                        NoPaidLeaveService.List({
                        }, response => {
                            var NoPaidLeaveDeductions = 0
                            for (var index in response.Entities) {
                                if (response.Entities[index].Deducted == 0 && response.Entities[index].EmployeeRowId == EmployeeRowId) {
                                    console.log('No Paid Leave:' + response.Entities[index].LeaveDate + " " + response.Entities[index].Deductions)
                                    DeductionsString.push('No Paid Leave ' + response.Entities[index].LeaveDate.substring(0, 10) + " : " + response.Entities[index].Deductions)
                                    console.log(DeductionsString)
                                    NoPaidLeaveDeductions = NoPaidLeaveDeductions + response.Entities[index].Deductions
                                }
                            }












                            serviceCall<ListResponse<any>>({
                                service: PayrollService.baseUrl + '/CalculateGovernmentPayments',
                                method: "GET",
                                data:
                                {
                                    "EmployeeID": EmployeeRowId
                                },
                                async: false,
                                onSuccess: (response) => {













                                    DeductionsString.push('Employee EPF:' + response.Entities[0].EmployeeEPF)
                                    DeductionsString.push('Employee EIS:' + response.Entities[0].EmployeeEIS)
                                    DeductionsString.push('Employee HRDF:' + response.Entities[0].EmployeeHRDF)
                                    DeductionsString.push('Employee SOCSO:' + response.Entities[0].EmployeeSOCSO)
                                    EarningsString.push('Basic Salary:' + BasicPay.toString())
                                    EarningsString.push('Allowances:' + Allowance.toString())
                                    var retrieve_ot = false
                                    serviceCall<ListResponse<any>>({
                                        service: OTApplicationService.baseUrl + '/CalculateOtPay',
                                        method: "GET",
                                        data:
                                        {
                                            "EmployeeRowID": EmployeeRowId
                                        },
                                        async: false,
                                        onSuccess: (response) => {
                                            if (response.Entities[0].OtRate != 0 && response.Entities[0].OtMinute != 0 && response.Entities[0].TotalOtPay != 0) {
                                                var OtHour = response.Entities[0].OtMinute / 60
                                                EarningsString.push('Overtime Payments :' + response.Entities[0].OtRate.toString() + 'x' + OtHour.toString() + ' = ' + response.Entities[0].TotalOtPay.toString())
                                            }
                                            retrieve_ot = true
                                        }
                                    })
                                    while (retrieve_ot == false) { };
                                    var NettEarnings = BasicPay + Allowance
                                    var NettDeductions = NoPaidLeaveDeductions + response.Entities[0].EmployeeEPF + response.Entities[0].EmployeeEIS + response.Entities[0].EmployeeHRDF + response.Entities[0].EmployeeSOCSO
                                    var index = 0
                                    if (EarningsString.length > DeductionsString.length)
                                        index = EarningsString.length

                                    else
                                        index = DeductionsString.length

                                    for (let i = 0; i < index; i++)
                                    {
                                        var EarningCriteria, EarningAmount
                                        var DeductionCriteria, DeductionAmount
                                        if (DeductionsString[i] == undefined)
                                            [DeductionCriteria, DeductionAmount] = [null, null]

                                        else
                                            [DeductionCriteria, DeductionAmount] = extractNameAndPrice(DeductionsString[i]);

                                        if (EarningsString[i] == undefined)
                                            [EarningCriteria, EarningAmount] = [null, null]

                                        else
                                            [EarningCriteria, EarningAmount] = extractNameAndPrice(EarningsString[i]);
                                        var RowNode = document.createElement('TR');
                                        var content1, content2, content3, content4
                                        if (EarningCriteria == null && EarningAmount == null) {
                                            content1 = document.createElement('TD');
                                            content2 = document.createElement('TD');
                                        }
                                        else {
                                            content1 = document.createElement('TD');
                                            content2 = document.createElement('input');
                                            content2.type = "number";
                                            var contentText1 = document.createTextNode(EarningCriteria);
                                            content1.appendChild(contentText1)
                                            content2.value = EarningAmount.toString()
                                        }
                                        content1.id = 'EarningCriteria'
                                        content2.id = 'EarningAmount'
                                        if (DeductionCriteria == null && DeductionAmount == null) {
                                            content3 = document.createElement('TD');
                                            content4 = document.createElement('TD');
                                        }
                                        else {
                                            content3 = document.createElement('TD');
                                            content4 = document.createElement('input');
                                            content4.type = "number";
                                            var contentText3 = document.createTextNode(DeductionCriteria);
                                            content3.appendChild(contentText3)
                                            content4.value = DeductionAmount.toString()
                                        }
                                        content3.id = 'DeductionCriteria'
                                        content4.id = 'DeductionAmount'
                                        RowNode.appendChild(content1)
                                        RowNode.appendChild(content2)
                                        RowNode.appendChild(content3)
                                        RowNode.appendChild(content4)
                                        content2.addEventListener('change', function () {
                                            // Your event handling code here




























                                            var TableNode = $('#PayrollTable')
                                            NettDeductions = 0
                                            NettEarnings = 0
                                            var TableRows = TableNode.find('tr')
                                            var numRows = TableRows.length;
                                            if (numRows >= 2) // Check if there are at least two rows
                                                TableRows.slice(numRows - 2).remove(); // Remove the last two rows

                                            for (var i = 1; i < TableRows.length; i++) {
                                                const row = $(TableRows[i]);
                                                // Now, you can select specific elements inside this row
                                                const EarningsAmount = row.find('#EarningAmount');
                                                const DeductionsAmount = row.find('#DeductionAmount');
                                                // Now, you can perform operations on these elements


                                                if (DeductionsAmount.val() != '' && DeductionsAmount.val() !== undefined)
                                                    NettDeductions = NettDeductions + parseFloat(DeductionsAmount.val())

                                                if (EarningsAmount.val() != '' && EarningsAmount.val() !== undefined)
                                                    NettEarnings = NettEarnings + parseFloat(EarningsAmount.val())

                                            }
                                            var RowNode = document.createElement('TR');
                                            var contentText1 = document.createTextNode("Nett Earnings");
                                            var contentText3 = document.createTextNode("Nett Deductions");

                                            var content1 = document.createElement('TD');
                                            content1.appendChild(contentText1)
                                            var content2 = document.createElement('TD');
                                            var contentText2 = document.createTextNode(NettEarnings.toFixed(2).toString());
                                            content2.appendChild(contentText2)
                                            var content3 = document.createElement('TD');
                                            content3.appendChild(contentText3)
                                            var content4 = document.createElement('TD');
                                            var contentText4 = document.createTextNode(NettDeductions.toFixed(2).toString());
                                            content4.appendChild(contentText4)

                                            content1.id = 'NettEarnings'
                                            content2.id = 'NettEarningsAmount'
                                            content3.id = 'NettDeductions'
                                            content4.id = 'NettDeductionsAmount'

                                            RowNode.appendChild(content1)
                                            RowNode.appendChild(content2)
                                            RowNode.appendChild(content3)
                                            RowNode.appendChild(content4)
                                            TableNode.append(RowNode)





                                            var NettSalary = NettEarnings - NettDeductions
                                            RowNode = document.createElement('TR');
                                            var NettSalaryContentText3 = document.createTextNode("Nett Salary:");
                                            var NettSalaryContent1 = document.createElement('TD');
                                            var NettSalaryContent2 = document.createElement('TD');
                                            var NettSalaryContent3 = document.createElement('TD');
                                            NettSalaryContent3.appendChild(NettSalaryContentText3)
                                            var NettSalaryContent4 = document.createElement('td');
                                            var NettSalaryContentText4 = document.createTextNode(NettSalary.toFixed(2).toString());
                                            NettSalaryContent4.appendChild(NettSalaryContentText4)
                                            RowNode.appendChild(NettSalaryContent1)
                                            RowNode.appendChild(NettSalaryContent2)
                                            RowNode.appendChild(NettSalaryContent3)
                                            RowNode.appendChild(NettSalaryContent4)
                                            TableNode.append(RowNode)




















                                        });


                                        content4.addEventListener('change', function () {
                                            // Your event handling code here




























                                            var TableNode = $('#PayrollTable')
                                            NettDeductions = 0
                                            NettEarnings = 0
                                            var TableRows = TableNode.find('tr')
                                            var numRows = TableRows.length;
                                            if (numRows >= 2)  // Check if there are at least two rows
                                                TableRows.slice(numRows - 2).remove(); // Remove the last two rows
                                            for (var i = 1; i < TableRows.length; i++) {
                                                const row = $(TableRows[i]);
                                                // Now, you can select specific elements inside this row
                                                const EarningsAmount = row.find('#EarningAmount');
                                                const DeductionsAmount = row.find('#DeductionAmount');
                                                // Now, you can perform operations on these elements
                                                if (DeductionsAmount.val() != '' && DeductionsAmount.val() !== undefined)
                                                    NettDeductions = NettDeductions + parseFloat(DeductionsAmount.val())
                                                if (EarningsAmount.val() != '' && EarningsAmount.val() !== undefined)
                                                    NettEarnings = NettEarnings + parseFloat(EarningsAmount.val())
                                            }
                                            var RowNode = document.createElement('TR');
                                            var contentText1 = document.createTextNode("Nett Earnings");
                                            var contentText3 = document.createTextNode("Nett Deductions");

                                            var content1 = document.createElement('TD');
                                            content1.appendChild(contentText1)
                                            var content2 = document.createElement('TD');
                                            var contentText2 = document.createTextNode(NettEarnings.toFixed(2).toString());
                                            content2.appendChild(contentText2)
                                            var content3 = document.createElement('TD');
                                            content3.appendChild(contentText3)
                                            var content4 = document.createElement('TD');
                                            var contentText4 = document.createTextNode(NettDeductions.toFixed(2).toString());
                                            content4.appendChild(contentText4)

                                            content1.id = 'NettEarnings'
                                            content2.id = 'NettEarningsAmount'
                                            content3.id = 'NettDeductions'
                                            content4.id = 'NettDeductionsAmount'

                                            RowNode.appendChild(content1)
                                            RowNode.appendChild(content2)
                                            RowNode.appendChild(content3)
                                            RowNode.appendChild(content4)
                                            TableNode.append(RowNode)



                                            var NettSalary = NettEarnings - NettDeductions
                                            RowNode = document.createElement('TR');
                                            var NettSalaryContentText3 = document.createTextNode("Nett Salary:");
                                            var NettSalaryContent1 = document.createElement('TD');
                                            var NettSalaryContent2 = document.createElement('TD');
                                            var NettSalaryContent3 = document.createElement('TD');
                                            NettSalaryContent3.appendChild(NettSalaryContentText3)
                                            var NettSalaryContent4 = document.createElement('td');
                                            var NettSalaryContentText4 = document.createTextNode(NettSalary.toFixed(2).toString());
                                            NettSalaryContent4.appendChild(NettSalaryContentText4)
                                            RowNode.appendChild(NettSalaryContent1)
                                            RowNode.appendChild(NettSalaryContent2)
                                            RowNode.appendChild(NettSalaryContent3)
                                            RowNode.appendChild(NettSalaryContent4)
                                            TableNode.append(RowNode)

























                                        });
                                        TableNode.appendChild(RowNode)
                                    }

                                    this.NettEarnings = NettEarnings
                                    this.NettDeductions = NettDeductions



                                    NettEarnings = this.NettEarnings
                                    NettDeductions = this.NettDeductions









                                    var RowNode = document.createElement('TR');
                                    var contentText1 = document.createTextNode("Nett Earnings");
                                    var contentText3 = document.createTextNode("Nett Deductions");

                                    var NewContent1 = document.createElement('TD');
                                    NewContent1.appendChild(contentText1)
                                    var NewContent2 = document.createElement('TD');
                                    var NewContentText2 = document.createTextNode(NettEarnings.toFixed(2).toString());
                                    NewContent2.appendChild(NewContentText2)
                                    var NewContent3 = document.createElement('TD');
                                    NewContent3.appendChild(contentText3)
                                    var NewContent4 = document.createElement('TD');
                                    var NewContentText4 = document.createTextNode(NettDeductions.toFixed(2).toString());
                                    NewContent4.appendChild(NewContentText4)

                                    NewContent1.id = 'NettEarnings'
                                    NewContent2.id = 'NettEarningsAmount'
                                    NewContent3.id = 'NettDeductions'
                                    NewContent4.id = 'NettDeductionsAmount'

                                    RowNode.appendChild(NewContent1)
                                    RowNode.appendChild(NewContent2)
                                    RowNode.appendChild(NewContent3)
                                    RowNode.appendChild(NewContent4)
                                    TableNode.append(RowNode)


                                    var NettSalary = NettEarnings - NettDeductions
                                    RowNode = document.createElement('TR');
                                    var NettSalaryContentText3 = document.createTextNode("Nett Salary:");
                                    var NettSalaryContent1 = document.createElement('TD');
                                    var NettSalaryContent2 = document.createElement('TD');
                                    var NettSalaryContent3 = document.createElement('TD');
                                    NettSalaryContent3.appendChild(NettSalaryContentText3)
                                    var NettSalaryContent4 = document.createElement('td');
                                    var NettSalaryContentText4 = document.createTextNode(NettSalary.toFixed(2).toString());
                                    NettSalaryContent4.appendChild(NettSalaryContentText4)
                                    RowNode.appendChild(NettSalaryContent1)
                                    RowNode.appendChild(NettSalaryContent2)
                                    RowNode.appendChild(NettSalaryContent3)
                                    RowNode.appendChild(NettSalaryContent4)
                                    TableNode.append(RowNode)

                                },
                                onError: (error) => {

                                    console.log(error)
                                }
                            });
















                        });
                    }
                }
            })





            if (EmployeeRowIdValue != null)
                $(EmployeeRowIdElement).val(EmployeeRowIdValue.toString()).trigger('change');
        });
    }



    protected getToolbarButtons() {
        var buttons = super.getToolbarButtons();


        var EarningsDocument = document.createElement('dialog')
        EarningsDocument.title = 'Add Earnings'
        EarningsDocument.id = "AddEarnings"
        //EarningsDocument.style.position = "fixed";
        EarningsDocument.style.top = "50%";
        EarningsDocument.style.left = "50%";
        EarningsDocument.style.transform = "translate(-50%, -50%)";
        EarningsDocument.innerHTML = ` < button id = "closeDialog" > Close </ button >  < button id = "confirmAddEarnings" > Confirm </ button >`;
        EarningsDocument.style.zIndex = "100000"; // Set a high z-index value

        EarningsDocument.addEventListener("", () => {
            EarningsDocument.close();
        });

        const EarningsDocumentCloseButton = EarningsDocument.querySelector("#closeDialog") as HTMLButtonElement;

        // Add event listener to close the dialog when the close button is clicked
        EarningsDocumentCloseButton.addEventListener("click", () => {
            EarningsDocument.close();
        });
        const EarningsDocumentConfirmButton = EarningsDocument.querySelector("#confirmAddEarnings") as HTMLButtonElement;

        // Add event listener to close the dialog when the close button is clicked
        EarningsDocumentConfirmButton.addEventListener("click", () => {
            var DescriptionElement = document.getElementById('NewEarningsDescription') as HTMLInputElement;
            var AmountElement = document.getElementById('NewEarningsAmount') as HTMLInputElement;
            var EarningsBuffer = '(' + this.ListOfCriteria[$('#NewEarningsCategory').val() - 1] + ')' + DescriptionElement.value + ' : ' + AmountElement.value
            this.ExternalEarnings.push(EarningsBuffer)
            var TableNode = $('#PayrollTable')
            this.NettDeductions = 0, this.NettEarnings = 0, this.EisOffset = 0, this.EpfOffset = 0, this.HrdfOffset = 0, this.SocsoOffset = 0

            var index, done = 0
            function extractNameAndPrice(input: string): [string, number] {
                // Split the input string by the colon and trim any leading/trailing whitespace
                var [name, priceString] = input.split(':').map(part => part.trim());
                // Convert the priceString to a number
                var price = parseFloat(priceString);
                // Return the extracted name and price as an object
                return [name, price];
            }
            function CheckSubjection(arrayOfDict, input): number {
                var extractedText = input.match(/\((.*?)\)/);
                var trimmedString;
                // Check if text inside parentheses is found
                if (extractedText && extractedText.length > 1)
                    trimmedString = extractedText[1]; // Extracted text is at index 1
                else
                    trimmedString = input; // If no parentheses found, set trimmed string to original string
                for (var i = 0; i < arrayOfDict.length; i++) {
                    var dict = arrayOfDict[i];
                    for (var key in dict) {
                        if (dict[key] == trimmedString)
                            return dict['subjection']
                    }
                }
                return 0
            }
            if (this.ExternalDeductions.length > this.ExternalEarnings.length)
                index = this.ExternalDeductions.length
            else
                index = this.ExternalEarnings.length
            var TableRows = TableNode.find('TR')
            var numRows = TableRows.length;
            if (numRows >= 2)  // Check if there are at least two rows
                TableRows.slice(numRows - 2).remove(); // Remove the last two rows
            for (var i = 1; i < TableRows.length - 1; i++) {
                const row = $(TableRows[i]);
                // Now, you can select specific elements inside this row
                var EarningsDescription = row.find('#EarningCriteria');
                var CheckingCriteria = EarningsDescription.text()
                var EarningsAmount = row.find('#EarningAmount');
                var DeductionsDescription = row.find('#DeductionCriteria');
                var DeductionsAmount = row.find('#DeductionAmount');
                // Now, you can perform operations on these elements
                var ReplaceDescription, ReplaceAmount, BufferDescriptionElement, BufferAmountElement;
                ReplaceDescription = document.createElement('TD');
                ReplaceAmount = document.createElement('input');
                ReplaceAmount.type = "number";
                ReplaceDescription.type = "text";
                if ((EarningsAmount.val() == '' || EarningsAmount.val() === undefined) && DeductionsAmount.val() && done == 0) // append for external earnings
                {
                    done = 1;
                    ReplaceAmount.id = 'EarningAmount'
                    ReplaceDescription.id = 'EarningCriteria'
                    BufferDescriptionElement = DeductionsDescription
                    BufferAmountElement = DeductionsAmount
                    var BufferDescription, BufferAmount
                    [BufferDescription, BufferAmount] = extractNameAndPrice(EarningsBuffer)
                    var TextContent = document.createTextNode(BufferDescription);
                    ReplaceDescription.appendChild(TextContent)
                    ReplaceAmount.value = BufferAmount
                    row.empty();
                    row.append(ReplaceDescription)
                    row.append(ReplaceAmount)
                    row.append(BufferDescriptionElement)
                    row.append(BufferAmountElement)
                    CheckingCriteria = BufferDescription
                    ReplaceAmount.addEventListener('change', function () { //for deductions
                        var TableNode = $('#PayrollTable')
                        NettDeductions = 0
                        NettEarnings = 0
                        var TableRows = TableNode.find('tr')
                        var numRows = TableRows.length;
                        if (numRows >= 2)  // Check if there are at least two rows
                            TableRows.slice(numRows - 2).remove(); // Remove the last two rows
                        for (var i = 1; i < TableRows.length; i++) {
                            const row = $(TableRows[i]);
                            const EarningsAmount = row.find('#EarningAmount');
                            const DeductionsAmount = row.find('#DeductionAmount');
                            // Now, you can perform operations on these elements
                            if (DeductionsAmount.val() != '' && DeductionsAmount.val() !== undefined)
                                NettDeductions = NettDeductions + parseFloat(DeductionsAmount.val())
                            if (EarningsAmount.val() != '' && EarningsAmount.val() !== undefined)
                                NettEarnings = NettEarnings + parseFloat(EarningsAmount.val())
                        }
                        var RowNode = document.createElement('TR');
                        var contentText1 = document.createTextNode("Nett Earnings");
                        var contentText3 = document.createTextNode("Nett Deductions");
                        var content1 = document.createElement('TD');
                        content1.appendChild(contentText1)
                        var content2 = document.createElement('TD');
                        var contentText2 = document.createTextNode(NettEarnings.toFixed(2).toString());
                        content2.appendChild(contentText2)
                        var content3 = document.createElement('TD');
                        content3.appendChild(contentText3)
                        var content4 = document.createElement('TD');
                        var contentText4 = document.createTextNode(NettDeductions.toFixed(2).toString());
                        content4.appendChild(contentText4)
                        content1.id = 'NettEarnings'
                        content2.id = 'NettEarningsAmount'
                        content3.id = 'NettDeductions'
                        content4.id = 'NettDeductionsAmount'
                        RowNode.appendChild(content1)
                        RowNode.appendChild(content2)
                        RowNode.appendChild(content3)
                        RowNode.appendChild(content4)
                        TableNode.append(RowNode)
                        var NettSalary = NettEarnings - NettDeductions
                        RowNode = document.createElement('TR');
                        var NettSalaryContentText3 = document.createTextNode("Nett Salary:");
                        var NettSalaryContent1 = document.createElement('TD');
                        var NettSalaryContent2 = document.createElement('TD');
                        var NettSalaryContent3 = document.createElement('TD');
                        NettSalaryContent3.appendChild(NettSalaryContentText3)
                        var NettSalaryContent4 = document.createElement('td');
                        var NettSalaryContentText4 = document.createTextNode(NettSalary.toFixed(2).toString());
                        NettSalaryContent4.appendChild(NettSalaryContentText4)
                        RowNode.appendChild(NettSalaryContent1)
                        RowNode.appendChild(NettSalaryContent2)
                        RowNode.appendChild(NettSalaryContent3)
                        RowNode.appendChild(NettSalaryContent4)
                        TableNode.append(RowNode)
                    });
                    this.NettEarnings = this.NettEarnings + parseFloat(BufferAmount)
                }
                if (CheckingCriteria != '') {
                    var EisSubjection = CheckSubjection(this.ListOfEisSubjection, CheckingCriteria)
                    var EpfSubjection = CheckSubjection(this.ListOfEpfSubjection, CheckingCriteria)
                    var HrdfSubjection = CheckSubjection(this.ListOfHrdfSubjection, CheckingCriteria)
                    var SocsoSubjection = CheckSubjection(this.ListOfSocsoSubjection, CheckingCriteria)
                    this.EisOffset += EisSubjection * EarningsAmount.val()
                    this.EpfOffset += EpfSubjection * EarningsAmount.val()
                    this.HrdfOffset += HrdfSubjection * EarningsAmount.val()
                    this.SocsoOffset += SocsoSubjection * EarningsAmount.val()












                    console.log("EIS " + EisSubjection)
                    console.log("EPF " + EpfSubjection)
                    console.log("HRDF " + HrdfSubjection)
                    console.log("SOCSO " + SocsoSubjection)
                }
                if (DeductionsAmount.val() != '' && DeductionsAmount.val() !== undefined)
                    this.NettDeductions = this.NettDeductions + parseFloat(DeductionsAmount.val())

                if (EarningsAmount.val() != '' && EarningsAmount.val() !== undefined)
                    this.NettEarnings = this.NettEarnings + parseFloat(EarningsAmount.val())
            }
            var NewRowDescription, NewRowAmount, NewRowBufferElement1, NewRowBufferElement2;
            NewRowBufferElement1 = document.createElement('TD')
            NewRowBufferElement2 = document.createElement('TD')
            NewRowDescription = document.createElement('TD');
            NewRowAmount = document.createElement('input');
            NewRowAmount.type = "number";
            NewRowDescription.type = "text";
            if (done == 0)//append new row external earning
            {
                NewRowDescription.id = 'EarningCriteria'
                NewRowAmount.id = 'EarningAmount'
                var BufferDescription, BufferAmount
                [BufferDescription, BufferAmount] = extractNameAndPrice(EarningsBuffer)
                var TextContent = document.createTextNode(BufferDescription);
                CheckingCriteria = BufferDescription
                if (CheckingCriteria != '') {
                    var EisSubjection = CheckSubjection(this.ListOfEisSubjection, CheckingCriteria)
                    var EpfSubjection = CheckSubjection(this.ListOfEpfSubjection, CheckingCriteria)
                    var HrdfSubjection = CheckSubjection(this.ListOfHrdfSubjection, CheckingCriteria)
                    var SocsoSubjection = CheckSubjection(this.ListOfSocsoSubjection, CheckingCriteria)
                    this.EisOffset += EisSubjection * EarningsAmount.val()
                    this.EpfOffset += EpfSubjection * EarningsAmount.val()
                    this.HrdfOffset += HrdfSubjection * EarningsAmount.val()
                    this.SocsoOffset += SocsoSubjection * EarningsAmount.val()
                    console.log("EIS: " + EisSubjection)
                    console.log("EPF: " + EpfSubjection)
                    console.log("HRDF: " + HrdfSubjection)
                    console.log("SOCSO: " + SocsoSubjection)
                }
                var BufferRow = document.createElement('TR');
                NewRowDescription.appendChild(TextContent)
                NewRowAmount.value = BufferAmount
                BufferRow.appendChild(NewRowDescription)
                BufferRow.appendChild(NewRowAmount)
                BufferRow.appendChild(NewRowBufferElement1)
                BufferRow.appendChild(NewRowBufferElement2)
                TableNode.append(BufferRow)
                this.NettEarnings = this.NettEarnings + parseFloat(BufferAmount)
                NewRowAmount.addEventListener('change', function () { //for deductions
                    // Your event handling code here



























                    console.log('in earnings callback')
                    var TableNode = $('#PayrollTable')
                    NettDeductions = 0
                    NettEarnings = 0
                    var TableRows = TableNode.find('tr')


                    var numRows = TableRows.length;
                    if (numRows >= 2) // Check if there are at least two rows
                        TableRows.slice(numRows - 2).remove(); // Remove the last two rows

                    for (var i = 1; i < TableRows.length; i++) {
                        const row = $(TableRows[i]);
                        // Now, you can select specific elements inside this row
                        const EarningsAmount = row.find('#EarningAmount');
                        const DeductionsAmount = row.find('#DeductionAmount');
                        // Now, you can perform operations on these elements
                        if (DeductionsAmount.val() != '' && DeductionsAmount.val() !== undefined)
                            NettDeductions = NettDeductions + parseFloat(DeductionsAmount.val())

                        if (EarningsAmount.val() != '' && EarningsAmount.val() !== undefined)
                            NettEarnings = NettEarnings + parseFloat(EarningsAmount.val())


                    }
                    var RowNode = document.createElement('TR');
                    var contentText1 = document.createTextNode("Nett Earnings");
                    var contentText3 = document.createTextNode("Nett Deductions");

                    var content1 = document.createElement('TD');
                    content1.appendChild(contentText1)
                    var content2 = document.createElement('TD');
                    var contentText2 = document.createTextNode(NettEarnings.toFixed(2).toString());
                    content2.appendChild(contentText2)
                    var content3 = document.createElement('TD');
                    content3.appendChild(contentText3)
                    var content4 = document.createElement('TD');
                    var contentText4 = document.createTextNode(NettDeductions.toFixed(2).toString());
                    content4.appendChild(contentText4)

                    content1.id = 'NettEarnings'
                    content2.id = 'NettEarningsAmount'
                    content3.id = 'NettDeductions'
                    content4.id = 'NettDeductionsAmount'

                    RowNode.appendChild(content1)
                    RowNode.appendChild(content2)
                    RowNode.appendChild(content3)
                    RowNode.appendChild(content4)
                    TableNode.append(RowNode)



                    var NettSalary = NettEarnings - NettDeductions
                    RowNode = document.createElement('TR');
                    var NettSalaryContentText3 = document.createTextNode("Nett Salary:");
                    var NettSalaryContent1 = document.createElement('TD');
                    var NettSalaryContent2 = document.createElement('TD');
                    var NettSalaryContent3 = document.createElement('TD');
                    NettSalaryContent3.appendChild(NettSalaryContentText3)
                    var NettSalaryContent4 = document.createElement('td');
                    var NettSalaryContentText4 = document.createTextNode(NettSalary.toFixed(2).toString());
                    NettSalaryContent4.appendChild(NettSalaryContentText4)
                    RowNode.appendChild(NettSalaryContent1)
                    RowNode.appendChild(NettSalaryContent2)
                    RowNode.appendChild(NettSalaryContent3)
                    RowNode.appendChild(NettSalaryContent4)
                    TableNode.append(RowNode)






















                });

            }
            var NewGovernmentPayment = false
            serviceCall<ListResponse<any>>({
                service: PayrollService.baseUrl + '/CalculateGovernmentPayments',
                method: "GET",
                data:
                {
                    "EmployeeID": this.form.EmployeeRowId.value,
                    "EpfOffset": this.EpfOffset,
                    "EisOffset": this.EisOffset,
                    "HrdfOffset": this.HrdfOffset,
                    "SocsoOffset": this.SocsoOffset

                },
                async: false,
                onSuccess: (response) => {
                    NewGovernmentPayment = true
                    console.log(response.Entities)
                },
                onError: (error) => {

                    console.log(error)
                }
            });

            while (NewGovernmentPayment == false) { }
            var TableRows = TableNode.find('TR')
            var numRows = TableRows.length;
            for (var i = 1; i < numRows; i++) {
                const row = $(TableRows[i]);
                var EarningsDescription = row.find('#EarningCriteria');
                var CheckingCriteria = EarningsDescription.text()
                var EarningsAmount = row.find('#EarningAmount');
                var DeductionsDescription = row.find('#DeductionCriteria');
                var DeductionsAmount = row.find('#DeductionAmount');
                console.log(CheckingCriteria)
                console.log(DeductionsDescription.text())



            }






            var NettEarnings = this.NettEarnings
            var NettDeductions = this.NettDeductions
            var RowNode = document.createElement('TR');
            var contentText1 = document.createTextNode("Nett Earnings");
            var contentText3 = document.createTextNode("Nett Deductions");

            var content1 = document.createElement('TD');
            content1.appendChild(contentText1)
            var content2 = document.createElement('TD');
            var contentText2 = document.createTextNode(NettEarnings.toFixed(2).toString());
            content2.appendChild(contentText2)
            var content3 = document.createElement('TD');
            content3.appendChild(contentText3)
            var content4 = document.createElement('TD');
            var contentText4 = document.createTextNode(NettDeductions.toFixed(2).toString());
            content4.appendChild(contentText4)

            content1.id = 'NettEarnings'
            content2.id = 'NettEarningsAmount'
            content3.id = 'NettDeductions'
            content4.id = 'NettDeductionsAmount'

            RowNode.appendChild(content1)
            RowNode.appendChild(content2)
            RowNode.appendChild(content3)
            RowNode.appendChild(content4)
            TableNode.append(RowNode)

            var NettSalary = NettEarnings - NettDeductions
            RowNode = document.createElement('TR');
            var NettSalaryContentText3 = document.createTextNode("Nett Salary:");
            var NettSalaryContent1 = document.createElement('TD');
            var NettSalaryContent2 = document.createElement('TD');
            var NettSalaryContent3 = document.createElement('TD');
            NettSalaryContent3.appendChild(NettSalaryContentText3)
            var NettSalaryContent4 = document.createElement('td');
            var NettSalaryContentText4 = document.createTextNode(NettSalary.toFixed(2).toString());
            NettSalaryContent4.appendChild(NettSalaryContentText4)
            RowNode.appendChild(NettSalaryContent1)
            RowNode.appendChild(NettSalaryContent2)
            RowNode.appendChild(NettSalaryContent3)
            RowNode.appendChild(NettSalaryContent4)
            TableNode.append(RowNode)




            EarningsDocument.close();
            DeductionsDocument.close();


        });

        var EarningsTable = document.createElement('table');

        var Earnings = document.createElement('TR');

        var NewEarningsCategory = document.createElement('TD');

        //var NewEarningsCategoryInput = document.createElement('input') as HTMLInputElement;
        var NewEarningsCategoryInput = document.createElement('select');
        NewEarningsCategoryInput.id = "NewEarningsCategory"


        var NewEarningsCategoryTextNode = document.createTextNode("Category");
        NewEarningsCategory.appendChild(NewEarningsCategoryTextNode)







        var NewEarningsDescription = document.createElement('TD');
        var NewEarningsDescriptionInput = document.createElement('input') as HTMLInputElement;
        NewEarningsDescriptionInput.id = "NewEarningsDescription"
        var NewEarningsAmount = document.createElement('TD');
        var NewEarningsAmountInput = document.createElement('input') as HTMLInputElement;
        NewEarningsAmountInput.id = "NewEarningsAmount"
        var NewEarningsDescriptionTextNode = document.createTextNode("Description");
        var NewEarningsAmountTextNode = document.createTextNode("Earnings");

        NewEarningsDescription.appendChild(NewEarningsDescriptionTextNode)
        NewEarningsDescriptionInput.type = "text"
        NewEarningsAmount.appendChild(NewEarningsAmountTextNode)
        NewEarningsAmountInput.type = "number";

        Earnings.appendChild(NewEarningsCategory)
        Earnings.appendChild(NewEarningsCategoryInput)

        Earnings.appendChild(NewEarningsDescription)
        Earnings.appendChild(NewEarningsDescriptionInput)
        Earnings.appendChild(NewEarningsAmount)
        Earnings.appendChild(NewEarningsAmountInput)
        EarningsTable.appendChild(Earnings)
        EarningsDocument.appendChild(EarningsTable)
        document.body.appendChild(EarningsDocument);


        var DeductionsDocument = document.createElement('dialog')
        DeductionsDocument.title = 'Add Deductions'
        DeductionsDocument.id = "AddDeductions"
        //DeductionsDocument.style.position = "fixed";
        DeductionsDocument.style.top = "50%";
        DeductionsDocument.style.left = "50%";
        DeductionsDocument.style.transform = "translate(-50%, -50%)";
        DeductionsDocument.innerHTML = ` < button id = "closeDialog" > Close </ button >  < button id = "confirmAddDeductions" > Confirm </ button >`;
        DeductionsDocument.style.zIndex = "100000"; // Set a high z-index value

        const DeductionsDocumentCloseButton = DeductionsDocument.querySelector("#closeDialog") as HTMLButtonElement;

        // Add event listener to close the dialog when the close button is clicked
        DeductionsDocumentCloseButton.addEventListener("click", () => {
            DeductionsDocument.close();
        });
        const DeductionsDocumentConfirmButton = DeductionsDocument.querySelector("#confirmAddDeductions") as HTMLButtonElement;
        DeductionsDocumentConfirmButton.addEventListener("click", () => {
            var DescriptionElement = document.getElementById('NewDeductionsDescription') as HTMLInputElement;
            var AmountElement = document.getElementById('NewDeductionsAmount') as HTMLInputElement;

            var DeductionsBuffer = DescriptionElement.value + ' : ' + AmountElement.value
            this.ExternalDeductions.push(DeductionsBuffer)
            var TableNode = $('#PayrollTable')

            this.NettDeductions = 0
            this.NettEarnings = 0

            var index, done = 0
            function extractNameAndPrice(input: string): [string, number] {
                console.log(input)
                // Split the input string by the colon and trim any leading/trailing whitespace
                var [name, priceString] = input.split(':').map(part => part.trim());
                // Convert the priceString to a number
                var price = parseFloat(priceString);
                // Return the extracted name and price as an object
                return [name, price];
            }

            if (this.ExternalDeductions.length > this.ExternalEarnings.length)
                index = this.ExternalDeductions.length

            else
                index = this.ExternalEarnings.length
            var TableRows = TableNode.find('tr')
            var numRows = TableRows.length;
            if (numRows >= 2)  // Check if there are at least two rows
                TableRows.slice(numRows - 2).remove(); // Remove the last two rows

            for (var i = 1; i < TableRows.length - 1; i++) {
                const row = $(TableRows[i]);
                // Now, you can select specific elements inside this row
                const EarningsDescription = row.find('#EarningCriteria');
                const EarningsAmount = row.find('#EarningAmount');
                const DeductionsAmount = row.find('#DeductionAmount');
                // Now, you can perform operations on these elements
                var ReplaceDescription, ReplaceAmount, BufferDescriptionElement, BufferAmountElement;
                ReplaceDescription = document.createElement('TD');
                ReplaceAmount = document.createElement('input');
                ReplaceAmount.type = "number";
                ReplaceDescription.type = "text";
                if ((DeductionsAmount.val() == '' || DeductionsAmount.val() === undefined) && EarningsAmount.val() && done == 0) // append for external earnings
                {
                    done = 1;
                    ReplaceAmount.id = 'DeductionAmount'
                    ReplaceDescription.id = 'DeductionCriteria'
                    BufferDescriptionElement = EarningsDescription
                    BufferAmountElement = EarningsAmount
                    var BufferDescription, BufferAmount
                    [BufferDescription, BufferAmount] = extractNameAndPrice(DeductionsBuffer)
                    var TextContent = document.createTextNode(BufferDescription);

                    ReplaceDescription.appendChild(TextContent)
                    ReplaceAmount.value = BufferAmount
                    row.empty();
                    row.append(BufferDescriptionElement)
                    row.append(BufferAmountElement)
                    row.append(ReplaceDescription)
                    row.append(ReplaceAmount)


                    ReplaceAmount.addEventListener('change', function () { //for deductions
                        var TableNode = $('#PayrollTable')
                        NettDeductions = 0
                        NettEarnings = 0
                        var TableRows = TableNode.find('tr')
                        var numRows = TableRows.length;
                        if (numRows >= 2)  // Check if there are at least two rows
                            TableRows.slice(numRows - 2).remove(); // Remove the last two rows

                        for (var i = 1; i < TableRows.length; i++) {

                            const row = $(TableRows[i]);
                            // Now, you can select specific elements inside this row
                            const EarningsAmount = row.find('#EarningAmount');
                            const DeductionsAmount = row.find('#DeductionAmount');
                            // Now, you can perform operations on these elements

                            if (DeductionsAmount.val() != '' && DeductionsAmount.val() !== undefined)
                                NettDeductions = NettDeductions + parseFloat(DeductionsAmount.val())

                            if (EarningsAmount.val() != '' && EarningsAmount.val() !== undefined)
                                NettEarnings = NettEarnings + parseFloat(EarningsAmount.val())

                        }
                        var RowNode = document.createElement('TR');
                        var RowNode = document.createElement('TR');
                        var contentText1 = document.createTextNode("Nett Earnings");
                        var contentText3 = document.createTextNode("Nett Deductions");

                        var content1 = document.createElement('TD');
                        content1.appendChild(contentText1)
                        var content2 = document.createElement('TD');
                        var contentText2 = document.createTextNode(NettEarnings.toFixed(2).toString());
                        content2.appendChild(contentText2)
                        var content3 = document.createElement('TD');
                        content3.appendChild(contentText3)
                        var content4 = document.createElement('TD');
                        var contentText4 = document.createTextNode(NettDeductions.toFixed(2).toString());
                        content4.appendChild(contentText4)

                        content1.id = 'NettEarnings'
                        content2.id = 'NettEarningsAmount'
                        content3.id = 'NettDeductions'
                        content4.id = 'NettDeductionsAmount'

                        RowNode.appendChild(content1)
                        RowNode.appendChild(content2)
                        RowNode.appendChild(content3)
                        RowNode.appendChild(content4)
                        TableNode.append(RowNode)


                        var NettSalary = NettEarnings - NettDeductions
                        RowNode = document.createElement('TR');
                        var NettSalaryContentText3 = document.createTextNode("Nett Salary:");
                        var NettSalaryContent1 = document.createElement('TD');
                        var NettSalaryContent2 = document.createElement('TD');
                        var NettSalaryContent3 = document.createElement('TD');
                        NettSalaryContent3.appendChild(NettSalaryContentText3)
                        var NettSalaryContent4 = document.createElement('td');
                        var NettSalaryContentText4 = document.createTextNode(NettSalary.toFixed(2).toString());
                        NettSalaryContent4.appendChild(NettSalaryContentText4)
                        RowNode.appendChild(NettSalaryContent1)
                        RowNode.appendChild(NettSalaryContent2)
                        RowNode.appendChild(NettSalaryContent3)
                        RowNode.appendChild(NettSalaryContent4)
                        TableNode.append(RowNode)

                    });

                    this.NettDeductions = this.NettDeductions + parseFloat(BufferAmount)

                }


                if (DeductionsAmount.val() != '' && DeductionsAmount.val() !== undefined)
                    this.NettDeductions = this.NettDeductions + parseFloat(DeductionsAmount.val())

                if (EarningsAmount.val() != '' && EarningsAmount.val() !== undefined)
                    this.NettEarnings = this.NettEarnings + parseFloat(EarningsAmount.val())
            }

            var NewRowDescription, NewRowAmount, NewRowBufferElement1, NewRowBufferElement2;
            NewRowBufferElement1 = document.createElement('TD')
            NewRowBufferElement2 = document.createElement('TD')

            NewRowDescription = document.createElement('TD');
            NewRowAmount = document.createElement('input');
            NewRowAmount.type = "number";
            NewRowDescription.type = "text";


            if (done == 0)//append new row external deductions
            {
                NewRowDescription.id = 'DeductionCriteria'
                NewRowAmount.id = 'DeductionAmount'
                var BufferDescription, BufferAmount
                [BufferDescription, BufferAmount] = extractNameAndPrice(DeductionsBuffer)
                var TextContent = document.createTextNode(BufferDescription);
                var BufferRow = document.createElement('TR');

                NewRowDescription.appendChild(TextContent)
                NewRowAmount.value = BufferAmount

                BufferRow.appendChild(NewRowBufferElement1)
                BufferRow.appendChild(NewRowBufferElement2)

                BufferRow.appendChild(NewRowDescription)
                BufferRow.appendChild(NewRowAmount)
                TableNode.append(BufferRow)
                this.NettDeductions = this.NettDeductions + parseFloat(BufferAmount)

                NewRowAmount.addEventListener('change', function () { //for deductions

                    var TableNode = $('#PayrollTable')
                    NettDeductions = 0
                    NettEarnings = 0
                    var TableRows = TableNode.find('tr')


                    var numRows = TableRows.length;
                    if (numRows >= 2)  // Check if there are at least two rows
                        TableRows.slice(numRows - 2).remove(); // Remove the last two rows

                    for (var i = 1; i < TableRows.length; i++) {
                        const row = $(TableRows[i]);
                        // Now, you can select specific elements inside this row
                        const EarningsAmount = row.find('#EarningAmount');
                        const DeductionsAmount = row.find('#DeductionAmount');
                        // Now, you can perform operations on these elements
                        if (DeductionsAmount.val() != '' && DeductionsAmount.val() !== undefined)
                            NettDeductions = NettDeductions + parseFloat(DeductionsAmount.val())

                        if (EarningsAmount.val() != '' && EarningsAmount.val() !== undefined)
                            NettEarnings = NettEarnings + parseFloat(EarningsAmount.val())

                    }
                    var RowNode = document.createElement('TR');
                    var contentText1 = document.createTextNode("Nett Earnings");
                    var contentText3 = document.createTextNode("Nett Deductions");

                    var content1 = document.createElement('TD');
                    content1.appendChild(contentText1)
                    var content2 = document.createElement('TD');
                    var contentText2 = document.createTextNode(NettEarnings.toFixed(2).toString());
                    content2.appendChild(contentText2)
                    var content3 = document.createElement('TD');
                    content3.appendChild(contentText3)
                    var content4 = document.createElement('TD');
                    var contentText4 = document.createTextNode(NettDeductions.toFixed(2).toString());
                    content4.appendChild(contentText4)

                    content1.id = 'NettEarnings'
                    content2.id = 'NettEarningsAmount'
                    content3.id = 'NettDeductions'
                    content4.id = 'NettDeductionsAmount'

                    RowNode.appendChild(content1)
                    RowNode.appendChild(content2)
                    RowNode.appendChild(content3)
                    RowNode.appendChild(content4)
                    TableNode.append(RowNode)


                    var NettSalary = NettEarnings - NettDeductions
                    RowNode = document.createElement('TR');
                    var NettSalaryContentText3 = document.createTextNode("Nett Salary:");
                    var NettSalaryContent1 = document.createElement('TD');
                    var NettSalaryContent2 = document.createElement('TD');
                    var NettSalaryContent3 = document.createElement('TD');
                    NettSalaryContent3.appendChild(NettSalaryContentText3)
                    var NettSalaryContent4 = document.createElement('td');
                    var NettSalaryContentText4 = document.createTextNode(NettSalary.toFixed(2).toString());
                    NettSalaryContent4.appendChild(NettSalaryContentText4)
                    RowNode.appendChild(NettSalaryContent1)
                    RowNode.appendChild(NettSalaryContent2)
                    RowNode.appendChild(NettSalaryContent3)
                    RowNode.appendChild(NettSalaryContent4)
                    TableNode.append(RowNode)
                });
            }


            var NettEarnings = this.NettEarnings
            var NettDeductions = this.NettDeductions
            var RowNode = document.createElement('TR');
            var contentText1 = document.createTextNode("Nett Earnings");
            var contentText3 = document.createTextNode("Nett Deductions");

            var content1 = document.createElement('TD');
            content1.appendChild(contentText1)
            var content2 = document.createElement('TD');
            var contentText2 = document.createTextNode(NettEarnings.toFixed(2).toString());
            content2.appendChild(contentText2)
            var content3 = document.createElement('TD');
            content3.appendChild(contentText3)
            var content4 = document.createElement('TD');
            var contentText4 = document.createTextNode(NettDeductions.toFixed(2).toString());
            content4.appendChild(contentText4)

            content1.id = 'NettEarnings'
            content2.id = 'NettEarningsAmount'
            content3.id = 'NettDeductions'
            content4.id = 'NettDeductionsAmount'

            RowNode.appendChild(content1)
            RowNode.appendChild(content2)
            RowNode.appendChild(content3)
            RowNode.appendChild(content4)
            TableNode.append(RowNode)

            var NettSalary = NettEarnings - NettDeductions
            RowNode = document.createElement('TR');
            var NettSalaryContentText3 = document.createTextNode("Nett Salary:");
            var NettSalaryContent1 = document.createElement('TD');
            var NettSalaryContent2 = document.createElement('TD');
            var NettSalaryContent3 = document.createElement('TD');
            NettSalaryContent3.appendChild(NettSalaryContentText3)
            var NettSalaryContent4 = document.createElement('td');
            var NettSalaryContentText4 = document.createTextNode(NettSalary.toFixed(2).toString());
            NettSalaryContent4.appendChild(NettSalaryContentText4)
            RowNode.appendChild(NettSalaryContent1)
            RowNode.appendChild(NettSalaryContent2)
            RowNode.appendChild(NettSalaryContent3)
            RowNode.appendChild(NettSalaryContent4)
            TableNode.append(RowNode)

            EarningsDocument.close();
            DeductionsDocument.close();


        });


        var DeductionsTable = document.createElement('table');


        var Deductions = document.createElement('TR');


        var NewDeductionsDescription = document.createElement('TD');
        var NewDeductionsDescriptionInput = document.createElement('input') as HTMLInputElement;
        NewDeductionsDescriptionInput.id = "NewDeductionsDescription"

        var NewDeductionsAmount = document.createElement('TD');
        var NewDeductionsAmountInput = document.createElement('input') as HTMLInputElement;
        NewDeductionsAmountInput.id = "NewDeductionsAmount"

        var NewDeductionsDocumentDescriptionTextNode = document.createTextNode("Description");
        var NewDeductionsDocumentAmountTextNode = document.createTextNode("Deductions");

        NewDeductionsDescription.appendChild(NewDeductionsDocumentDescriptionTextNode)
        NewDeductionsDescriptionInput.type = "text"
        NewDeductionsAmount.appendChild(NewDeductionsDocumentAmountTextNode)
        NewDeductionsAmountInput.type = "number";
        Deductions.appendChild(NewDeductionsDescription)
        Deductions.appendChild(NewDeductionsDescriptionInput)
        Deductions.appendChild(NewDeductionsAmount)
        Deductions.appendChild(NewDeductionsAmountInput)
        DeductionsTable.appendChild(Deductions);

        DeductionsDocument.appendChild(DeductionsTable)
        document.body.appendChild(DeductionsDocument);
        // *** Create Dropdown-Button ***
        buttons.push(
            {
                title: "Add Earnings",	// *** Get button text from translation
                cssClass: 'green',
                icon: 'fa-plus',
                onClick: () => {
                    const state = document.getElementById('AddEarnings') as HTMLDialogElement;
                    if (state.open)
                        return
                    //EarningsDocument.showModal()
                    EarningsDocument.showModal()

                    // *** do something on click if you want **
                    var buffer = document.getElementById("AddDeductions")
                    var dropdown = $("#NewEarningsCategory")
                    var BufferDict = this.ListOfEpfSubjection
                    var keys = Object.keys(BufferDict);
                    for (var j = 0; j < keys.length; j++) {
                        var key = keys[j];
                        var option = new Option((BufferDict[key].name).toString(), (BufferDict[key].id).toString());
                        dropdown.append(option);
                    }


                    if (buffer) {
                        (buffer as any).close()
                    }
                },
            }
        );
        buttons.push(
            {
                title: "Add Deductions",	// *** Get button text from translation
                cssClass: 'red',
                icon: 'fa-minus',
                onClick: () => {
                    const state = document.getElementById('AddDeductions') as HTMLDialogElement;
                    if (state.open)
                        return

                    DeductionsDocument.showModal()
                    // *** do something on click if you want **
                    var buffer = document.getElementById("AddEarnings")
                    var dropdown = $("#NewEarningsCategory")
                    var BufferDict = this.ListOfEpfSubjection
                    var keys = Object.keys(BufferDict);
                    for (var j = 0; j < keys.length; j++) {
                        var key = keys[j];
                        var option = new Option((BufferDict[key].name).toString(), (BufferDict[key].id).toString());
                        dropdown.append(option);
                    }

                    if (buffer) {
                        (buffer as any).close()
                    }

                },
            }
        );



        return buttons;
    }






    protected save_submitHandler(response): void {

        var TableNode = $('#PayrollTable')
        var TableRows = TableNode.find('tr')
        var numRows = TableRows.length;
        for (let i = 0; i < numRows; i++)
            console.log($(TableRows[i]))

        //super.save_submitHandler(response)



    }


}






























