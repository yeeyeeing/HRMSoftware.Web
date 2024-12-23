import { Decorators, EditorUtils, EntityDialog, Select2Editor } from '@serenity-is/corelib';
import { EmployeeProfileService } from '../../ServerTypes/EmployeeProfile';
import { EisSubjectionService, EpfSubjectionService, HrdfSubjectionService, NoPaidLeaveService, PayrollForm, PayrollRow, PayrollService, PcbSubjectionService, SocsoSubjectionService } from '../../ServerTypes/PayrollSettings';
import { ListResponse, serviceCall, Authorization } from '@serenity-is/corelib/q';
import { OTApplicationService } from '../../ServerTypes/OTApplication';
import { alertDialog, isEmptyOrNull } from '@serenity-is/corelib/q';
import { MoneyClaimApplicationService } from '../../ServerTypes/MoneyClaimApplication';
import { data } from 'jquery';
import { EmployeeEarlyLeavingService } from '../../ServerTypes/EmployeeEarlyLeaving';
import { CompanySettingsService } from '../../ServerTypes/CompanySettings';
import { EmployeeLateService } from '../../ServerTypes/EmployeeLate';
import { LeaveApplicationService } from '../../ServerTypes/LeaveApplication';
import { confirmDialog, confirm, notifySuccess, notifyError, notifyInfo } from '@serenity-is/corelib/q';
import { PermissionKeys } from '../../ServerTypes/Administration';

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
    public ExternalEarning: string;
    public ExternalDeduction: string;
    public EarningsString: string[] = []
    public DeductionsString: string[] = []
    public FinalEarnings: string[] = []
    public FinalDeductions: string[] = []
    public EmployerContributions: string[] = []


    public EmployeeType: number; // check whether local or not
    public EpfSubjection: number;

    public NettDeductions: number;
    public NettEarnings: number;
    public NettEmployerContributions: number;

    public EmployeeRowId: number;

    public ListOfEpfSubjection: Subjection[] = [];
    public ListOfEisSubjection: Subjection[] = [];
    public ListOfHrdfSubjection: Subjection[] = [];
    public ListOfSocsoSubjection: Subjection[] = [];
    public ListOfPcbSubjection: Subjection[] = [];

    public EpfAmount: number;
    public EisAmount: number;
    public PcbAmount: number;
    public SocsoAmount: number;
    public HrdfAmount: number;


    public EmployeeEpf: number;
    public EmployeeEis: number;
    public EmployeePcb: number;
    public EmployeeSocso: number;



    public EmployerEpf: number;
    public EmployerEis: number;
    public EmployerSocso: number;
    public EmployerHrdf: number;


    public ListOfCriteria: string[] = [];



    public NoPaidLeaveId: number[] = [];
    public MoneyClaimingId: number[] = [];
    public OtPayId: number[] = [];
    public LateArrivalId: number[] = [];
    public EarlyLeavingId: number[] = [];




    public ReadOnly: boolean;
    public PayDate: number;

    public DeductEarlyLeaving: boolean;
    public DeductLateArrival: boolean;
    constructor() {
        super();
        this.ReadOnly = false
        if (Authorization.hasPermission(PermissionKeys.HumanResources)) //if he is HR guy 
        {
            PcbSubjectionService.List({
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
                            var NewKey = key.replace(/([A-Z])/g, ' $1').trim();

                            // Access each key here
                            this.ListOfPcbSubjection.push({
                                id: j,
                                name: NewKey,
                                subjection: dict[key],
                            })
                        }
                        break
                    }
                }

            });
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
                            var NewKey = key.replace(/([A-Z])/g, ' $1').trim();

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

                var BufferDict = this.ListOfEpfSubjection
                var keys = Object.keys(BufferDict);

                for (var j = 0; j < keys.length; j++) {
                    var key = keys[j];
                    this.ListOfCriteria.push(BufferDict[key].name)
                }

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
                            var NewKey = key.replace(/([A-Z])/g, ' $1').trim();

                            this.ListOfEisSubjection.push({
                                id: j,
                                name: NewKey,
                                subjection: dict[key],
                            })
                        }
                        break
                    }
                }

            });
            HrdfSubjectionService.List({
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
                            var NewKey = key.replace(/([A-Z])/g, ' $1').trim();

                            this.ListOfHrdfSubjection.push({
                                id: j,
                                name: NewKey,
                                subjection: dict[key],
                            })
                        }
                        break
                    }
                }

            });
            SocsoSubjectionService.List({
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
                            var NewKey = key.replace(/([A-Z])/g, ' $1').trim();

                            this.ListOfSocsoSubjection.push({
                                id: j,
                                name: NewKey,
                                subjection: dict[key],
                            })
                        }
                        break
                    }
                }
            });

        }
    }
    public dialogClose(): void {

        $("#NewEarningsCategory").remove();
        super.dialogClose()
    }
    public onDialogClose(): void {

        $("#NewEarningsCategory").remove();
        super.onDialogClose()
    }
    protected getDialogOptions() {
        let opt = super.getDialogOptions()
        opt.width = opt.width + 200
        return opt
    }
    public dialogOpen(asPanel?: boolean): void {
        var self = this
        var terminateButtons = document.querySelectorAll('.text-bg-danger')
        terminateButtons.forEach(function (element) {
            $(element).hide()
        });
        var newId = this.idPrefix.substring(0, this.idPrefix.lastIndexOf('_'))
        var resignButtons = document.getElementById(newId).querySelectorAll('.text-bg-success')
        resignButtons.forEach(function (element) {
            $(element).hide()
        });
        CompanySettingsService.List({
        }, response => {
            var today = new Date()
            var todayMonth = today.getMonth()
            var todayYear = today.getFullYear()

            for (var index in response.Entities) {
                if (response.Entities[index].IsActive == 1) {

                    this.DeductEarlyLeaving = response.Entities[index].DeductSalaryIfEarlyLeaving
                    this.DeductLateArrival = response.Entities[index].DeductSalaryIfLate
                    this.PayDate = response.Entities[index].PayDay
                    break
                }
            }
            function isValidDate(dateStr: string): string {
                const date = new Date(dateStr);
                if (!isNaN(date.getTime()))// not valid
                {
                    dateStr
                    date.setDate(28)
                    const year = date.getFullYear();
                    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero based
                    const day = ('0' + date.getDate()).slice(-2);
                    return `${year}-${month}-${day}`
                }
                else
                    return dateStr
            }
            var dateFormat = todayYear.toString() + '-' + todayMonth.toString().padStart(2, '0') + '-' + this.PayDate.toString().padStart(2, '0')
            dateFormat = isValidDate(dateFormat)
            var DateObj = new Date(dateFormat)
            var DateObjYear = DateObj.getFullYear().toString()
            var DateObjMonth = DateObj.getMonth().toString()
            var DateObjDay = DateObj.getDate().toString()
            var LatestDateFormat = DateObjMonth.padStart(2, '0') + '/' + DateObjDay.padStart(2, '0') + '/' + DateObjYear
            if (this.isNew())
                self.form.PayDate.value = LatestDateFormat
            var dropdown = $("#NewEarningsCategory")
            var NewDropDown = document.createElement('select')
            NewDropDown.id = 'NewEarningsCategory'
            //new Select2Editor($(NewDropDown))

            dropdown.empty()
            var BufferDict = this.ListOfEpfSubjection
            var keys = Object.keys(BufferDict);
            for (var j = 0; j < keys.length; j++) {
                var key = keys[j];
                var option = new Option((BufferDict[key].name).toString(), (BufferDict[key].id).toString());
                NewDropDown.append(option);
            }
            $(NewDropDown).trigger('change');
            dropdown.replaceWith(NewDropDown);

            dropdown.select()


        });

        super.dialogOpen(asPanel);

        if (self.isNew() == false)
            self.saveAndCloseButton.hide()



        var ExternalDeductions = this.ExternalDeductions
        var ExternalEarnings = this.ExternalEarnings
        var EarningsString = this.EarningsString
        var DeductionsString = this.DeductionsString
        var EmployerContributions = this.EmployerContributions
        if (self.isNew())
            this.applyChangesButton.hide()
        EditorUtils.setReadonly(this.form.EmployeeName.element, true);
        var EmployeeRowIdValue = this.form.EmployeeRowId.value
        let ElementsArray: string[] = ['Deduction', 'Earnings', 'Nett', 'EmployeeEIS', 'EmployeeEPF', 'EmployeeSOCSO', 'EmployeePCB', 'PayrollTable', 'EmployerTable', 'EmployerHRDF', 'EmployerEPF', 'EmployerEIS', 'EmployerSOCSO']
        for (var index in ElementsArray)
            $('.' + ElementsArray[index]).hide();

        var tabId = $(".fieldset").children().attr('id');
        var ta = $(".fieldset").children().uniqueId()

        tabId = this.idPrefix + "PropertyGrid"

        var node3 = document.getElementById(tabId);
        var divNode = document.createElement('DIV')
        divNode.classList.add('category-title')
        divNode.setAttribute("id", "PayRoll-Description")
        divNode.style.display = 'flex'; // Make the container a flex container to display tables side by side

        node3.appendChild(divNode)
        var node4 = document.createElement("a");
        node4.classList.add("category-anchor");
        var textnode = document.createTextNode("Employee Payroll");
        node4.appendChild(textnode);
        document.getElementById("PayRoll-Description").append(node4);
        var node5 = document.getElementById("PayRoll-Description");
        node5.insertAdjacentHTML('afterend', '<div class="DataGrid" id="PayRollGrid"></div>');
        var PayRollGrid = document.getElementById("PayRollGrid");
        PayRollGrid.style.display = 'flex'; // Make the container a flex container to display tables side by side


        var TableNode = document.createElement('TABLE');
        TableNode.style.width = "66%";
        //TableNode.style.display = 'flex'; // Make the container a flex container to display tables side by side

        TableNode.id = 'PayrollTable'
        TableNode.className = 'table table-hover'
        var node7 = document.createElement('thead');
        node7.className = "thead-dark"
        node7.id = 'PayrollTableHeader'
        var theadnode = document.createElement('tr')

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


        var EmployerContributionsNode = document.createElement('TABLE');
        EmployerContributionsNode.style.width = "33%";
        EmployerContributionsNode.style.height = "55%";
        //EmployerContributionsNode.style.display = 'flex'; // Make the container a flex container to display tables side by side

        EmployerContributionsNode.id = 'EmployerContributionsTable'
        var EmployerContributionsDescriptionNode = document.createElement('TR');
        var EmployerContributionsHeader1 = document.createElement('TH');
        var EmployerContributionsHeader2 = document.createElement('TH');
        EmployerContributionsHeader1.style.width = "50%";
        EmployerContributionsHeader2.style.width = "50%";
        var EmployerContributionstextnode1 = document.createTextNode("Description");
        var EmployerContributionstextnode2 = document.createTextNode("Employer Contributions");
        EmployerContributionsHeader1.appendChild(EmployerContributionstextnode1);
        EmployerContributionsHeader2.appendChild(EmployerContributionstextnode2);



        // document.getElementById("PayRollGrid").append(EmployerContributionsNode);
        theadnode.appendChild(header1)
        theadnode.appendChild(header2)
        theadnode.appendChild(header3)
        theadnode.appendChild(header4)

        node7.appendChild(theadnode)

        TableNode.appendChild(node7)

        EmployerContributionsDescriptionNode.appendChild(EmployerContributionsHeader1)
        EmployerContributionsDescriptionNode.appendChild(EmployerContributionsHeader2)
        EmployerContributionsNode.appendChild(EmployerContributionsDescriptionNode)
        document.getElementById("PayRollGrid").append(TableNode);
        document.getElementById("PayRollGrid").append(EmployerContributionsNode);


        var ListOfEisSubjection = this.ListOfEisSubjection
        var ListOfEpfSubjection = this.ListOfEpfSubjection
        var ListOfHrdfSubjection = this.ListOfHrdfSubjection
        var ListOfSocsoSubjection = this.ListOfSocsoSubjection
        var ListOfPcbSubjection = this.ListOfPcbSubjection
        var EisAmount = this.EisAmount
        var EpfAmount = this.EpfAmount
        var SocsoAmount = this.SocsoAmount
        var PcbAmount = this.PcbAmount
        var HrdfAmount = this.HrdfAmount

        var self = this

        EmployeeProfileService.List({
        }, response => {
            var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'EmployeeRowId')
            var PayDateElement = document.getElementById(this.idPrefix + 'PayDate')
            var PayMonthElement = document.getElementById(this.idPrefix + 'PayMonth')
            var PayYearElement = document.getElementById(this.idPrefix + 'PayYear')
            let PayMonthEditor = new Select2Editor($(PayMonthElement))
            let PayYearEditor = new Select2Editor($(PayYearElement))
            const months: string[] = [
                'January',   // 0
                'February',  // 1
                'March',     // 2
                'April',     // 3
                'May',       // 4
                'June',      // 5
                'July',      // 6
                'August',    // 7
                'September', // 8
                'October',   // 9
                'November',  // 10
                'December'   // 11
            ];
            var today = new Date()
            var todayYear = today.getFullYear()

            var todayMonth = today.getMonth()
            // Example usage:
            for (let i = 0; i < months.length; i++) {
                PayMonthEditor.addItem({ id: (i).toString(), text: (months[i]).toString(), }); // 8am - 6pm , will consider lates
            }
            PayMonthEditor.set_value(todayMonth.toString())
            for (let i = -1; i < 2; i++) {
                PayYearEditor.addItem({ id: (todayYear + i).toString(), text: (todayYear + i).toString(), }); // 8am - 6pm , will consider lates
            }
            PayYearEditor.set_value(todayYear.toString())




            let EmployeeRowIdEditor = new Select2Editor($(EmployeeRowIdElement))
            var PersonNameElement = document.getElementById(this.idPrefix + 'EmployeeName')
            //let PersonNameEditor = new Select2Editor($(PersonNameElement))
            interface Item {
                id: number;
                name: string;
                BasicPay: number;
                Allowance: number;
                type: number;
                EpfSubjection: number;
            }
            let listOfDicts: Item[] = [];
            for (var index in response.Entities) {
                EmployeeRowIdEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].EmployeeID).toString(), }); // 8am - 6pm , will consider lates
                listOfDicts.push({
                    id: response.Entities[index].Id, name: response.Entities[index].EmployeeName, BasicPay:
                        response.Entities[index].BasicSalary, Allowance: response.Entities[index].Allowance, type: response.Entities[index].EmployeeType,
                    EpfSubjection: response.Entities[index].EpfContribution
                });
            }
            if (this.isNew() == true) {
                $(PayMonthElement).on('change', async function () {
                    if (isEmptyOrNull($(EmployeeRowIdElement).val()))
                        return
                    if (isEmptyOrNull($(PayYearElement).val()))
                        return
                    PayrollService.List({
                    }, response => {
                        var convertedDateMonth = parseInt($(PayMonthElement).val())
                        var convertedDateYear = parseInt($(PayYearElement).val())
                        var ignore = false
                        for (var index in response.Entities) {
                            var CurrentRecordYear = response.Entities[index].PayYear
                            var CurrentPayrollMonth = response.Entities[index].PayMonth
                            if (convertedDateMonth == CurrentPayrollMonth
                                && convertedDateYear == CurrentRecordYear
                                && response.Entities[index].EmployeeRowId == $(EmployeeRowIdElement).val()) {
                                notifyError('The employee already have payslip for current month')
                                if (self.isNew())
                                    self.saveAndCloseButton.hide()
                                $(EmployeeRowIdElement).val(0).trigger('change')
                                ignore = true
                                return
                            }
                        }
                        if (ignore == false) {

                            $(EmployeeRowIdElement).trigger('change')
                            if (self.isNew())
                                self.saveAndCloseButton.show();

                        }
                    })


                })

                $(PayYearElement).on('change', async function () {



                    if (isEmptyOrNull($(EmployeeRowIdElement).val()))
                        return
                    if (isEmptyOrNull($(PayMonthElement).val()))
                        return
                    PayrollService.List({
                    }, response => {
                        var convertedDateMonth = parseInt($(PayMonthElement).val())
                        var convertedDateYear = parseInt($(PayYearElement).val())
                        // var inputDate = $(PayDateElement).val()
                        // var convertedDate = new Date(convertDateFormat(inputDate))
                        //var convertedDateYear = convertedDate.getMonth()
                        var ignore = false

                        for (var index in response.Entities) {
                            //var CurrentRecordPaydate = new Date(response.Entities[index].PayDate)
                            //var CurrentRecordYear = CurrentRecordPaydate.getFullYear()
                            //var CurrentPayrollMonth = response.Entities[index].PayMonth
                            var CurrentPayrollMonth = response.Entities[index].PayMonth
                            var CurrentPayrollYear = response.Entities[index].PayYear

                            if (convertedDateMonth == CurrentPayrollMonth
                                && convertedDateYear == CurrentPayrollYear
                                && response.Entities[index].EmployeeRowId == $(EmployeeRowIdElement).val()) {
                                notifyError('The employee already have payslip for current month')
                                if (self.isNew())
                                    self.saveAndCloseButton.hide()
                                $(EmployeeRowIdElement).val(0).trigger('change')
                                ignore = true
                                return
                            }
                        }
                        if (ignore == false) {

                            $(EmployeeRowIdElement).trigger('change')
                            if (self.isNew())
                                self.saveAndCloseButton.show();
                        }
                    })


                })

                $(EmployeeRowIdElement).on('change', async function () {
                    // var EmployeeRowId = $(EmployeeRowIdElement).val()

                    if (isEmptyOrNull($(EmployeeRowIdElement).val())) {
                        var terminateButtons = document.querySelectorAll('.text-bg-danger')
                        terminateButtons.forEach(function (element) {
                            $(element).hide()
                        });

                        var newId = self.idPrefix.substring(0, self.idPrefix.lastIndexOf('_'))
                        var resignButtons = document.getElementById(newId).querySelectorAll('.text-bg-success')
                        resignButtons.forEach(function (element) {
                            $(element).hide()
                        });
                        if (self.isNew())
                            self.saveAndCloseButton.hide()

                        var rows = TableNode.getElementsByTagName('TR');
                        var numRows = rows.length;

                        for (var i = numRows - 1; i > 0; i--)
                            rows[i].parentNode.removeChild(rows[i]);
                        var EmployerRows = EmployerContributionsNode.getElementsByTagName('TR');
                        var numRows = EmployerRows.length;

                        for (var i = numRows - 1; i > 0; i--)
                            EmployerRows[i].parentNode.removeChild(EmployerRows[i]);
                        self.form.EmployeeName.value = ""
                        self.form.EmployeeRowId.value = ""
                        return
                    }
                    else {

                        self.NoPaidLeaveId.length = 0
                        self.MoneyClaimingId.length = 0
                        self.OtPayId.length = 0
                        self.EmployerContributions.length = 0
                        ExternalDeductions.length = 0
                        ExternalEarnings.length = 0
                        EarningsString.length = 0
                        DeductionsString.length = 0
                        self.FinalDeductions.length = 0
                        self.FinalEarnings.length = 0
                        self.NettEarnings = 0
                        self.NettDeductions = 0
                        EisAmount = 0
                        EpfAmount = 0
                        PcbAmount = 0
                        SocsoAmount = 0
                        HrdfAmount = 0
                        var check = 0
                        if (!isEmptyOrNull($(PayMonthElement).val()) && !isEmptyOrNull($(PayYearElement).val())) {
                            check = 1
                            var convertedDateMonth = parseInt($(PayMonthElement).val())
                            var convertedDateYear = parseInt($(PayYearElement).val())
                        }
                        PayrollService.List({
                        }, response => {
                            var ignore = false
                            if (check == 1) {
                                for (var index in response.Entities) {
                                    var CurrentRecordMonth = response.Entities[index].PayMonth
                                    var CurrentRecordYear = response.Entities[index].PayYear
                                    if (convertedDateMonth == CurrentRecordMonth
                                        && convertedDateYear == CurrentRecordYear
                                        && response.Entities[index].EmployeeRowId == $(EmployeeRowIdElement).val()) {
                                        $(EmployeeRowIdElement).val(0)
                                        self.form.EmployeeRowId.value = ""
                                        notifyError('The employee already have payslip for current month')
                                        if (self.isNew())
                                            self.saveAndCloseButton.hide()
                                        ignore = true
                                        return
                                    }
                                }


                            }
                            var terminateButtons = document.querySelectorAll('.text-bg-danger')
                            var newId = self.idPrefix.substring(0, self.idPrefix.lastIndexOf('_'))
                            var resignButtons = document.getElementById(newId).querySelectorAll('.text-bg-success')
                            if (ignore == false) {
                                terminateButtons.forEach(function (element) {
                                    $(element).show()
                                });
                                resignButtons.forEach(function (element) {
                                    $(element).show()
                                });
                                if (self.isNew())
                                    self.saveAndCloseButton.show()

                            }
                            else {
                                terminateButtons.forEach(function (element) {
                                    $(element).hide()
                                });
                                resignButtons.forEach(function (element) {
                                    $(element).hide()
                                });
                            }


                            for (var index in listOfDicts) {
                                if (listOfDicts[index].id == $(EmployeeRowIdElement).val()) {
                                    self.EmployeeType = listOfDicts[index].type
                                    self.EpfSubjection = listOfDicts[index].EpfSubjection
                                    var BasicPay = listOfDicts[index].BasicPay
                                    var Allowance = listOfDicts[index].Allowance
                                    var EmployeeRowId = listOfDicts[index].id
                                    $(PersonNameElement).val(listOfDicts[index].name)
                                    var rows = TableNode.getElementsByTagName('TR');
                                    // Get the number of rows
                                    var numRows = rows.length;
                                    for (var i = numRows - 1; i > 0; i--)
                                        rows[i].parentNode.removeChild(rows[i]);


                                    var Deductions = 0

                                    OTApplicationService.List({
                                    }, response => {
                                        for (var index in response.Entities) {
                                            if (response.Entities[index].Paid == 0 && response.Entities[index].Status == 1 && response.Entities[index].EmployeeRowId == EmployeeRowId)
                                                self.OtPayId.push(response.Entities[index].Id)
                                        }

                                        NoPaidLeaveService.List({
                                        }, response => {
                                            var NoPaidLeaveDeductions = 0
                                            var NoPaidLeaveDays = 0
                                            for (var index in response.Entities) {

                                                if (response.Entities[index].Deducted == 0 && response.Entities[index].EmployeeRowId == EmployeeRowId) {
                                                    self.NoPaidLeaveId.push(response.Entities[index].Id)
                                                    NoPaidLeaveDays += response.Entities[index].HalfDay ? 0.5 : 1
                                                    NoPaidLeaveDeductions += response.Entities[index].Deductions
                                                }

                                            }
                                            if (NoPaidLeaveDays != 0 && NoPaidLeaveDeductions != 0)
                                                DeductionsString.push('(No Paid Leave) ' + NoPaidLeaveDays.toString() + " Days : " + NoPaidLeaveDeductions.toFixed(2).toString() + " : readonly")

                                            Deductions += NoPaidLeaveDeductions

                                            MoneyClaimApplicationService.List({
                                            }, response => {

                                                for (var index in response.Entities) {
                                                    if (response.Entities[index].Paid == 0 && response.Entities[index].Status == 1 && response.Entities[index].EmployeeRowId == EmployeeRowId) {
                                                        EarningsString.push('(' + response.Entities[index].ClaimingCategory + ')' + response.Entities[index].Description + " : " + response.Entities[index].ClaimAmount.toFixed(2) + " : readonly")
                                                        self.MoneyClaimingId.push(response.Entities[index].Id)
                                                    }
                                                }

                                                if (self.DeductEarlyLeaving && !self.DeductLateArrival) {
                                                    EmployeeEarlyLeavingService.List({}, response => {

                                                        var EarlyLeavingMinutes = 0, EarlyLeavingDeductions = 0
                                                        for (var index in response.Entities) {
                                                            if (response.Entities[index].Deducted == 0 && response.Entities[index].EmployeeRowId == EmployeeRowId) {
                                                                EarlyLeavingMinutes += response.Entities[index].EarlyMins
                                                                EarlyLeavingDeductions += response.Entities[index].Deductions
                                                                Deductions += response.Entities[index].Deductions
                                                            }

                                                        }
                                                        if (EarlyLeavingDeductions && EarlyLeavingMinutes)
                                                            DeductionsString.push('(Early Leaving) ' + EarlyLeavingMinutes.toString() + " mins : " + EarlyLeavingDeductions.toFixed(2).toString() + " : readonly")


                                                        EarningsString.push('Basic Salary:' + BasicPay.toString())
                                                        EarningsString.push('Allowances:' + Allowance.toString())




                                                        var retrieve_ot = false
                                                        serviceCall<ListResponse<any>>({
                                                            service: OTApplicationService.baseUrl + '/CalculateOtPay',
                                                            method: "GET",
                                                            data: {
                                                                "EmployeeRowID": EmployeeRowId
                                                            },
                                                            async: false,
                                                            onSuccess: (response) => {

                                                                // console.log(response.Entities)
                                                                if (response.Entities[0].OtRate != -1 && response.Entities[0].OtMinute != -1 && response.Entities[0].TotalOtPay != -1) {

                                                                    var data = response.Entities
                                                                    // Step 1: Sort the array based on OtRate
                                                                    data.sort((a, b) => a.OtRate - b.OtRate);

                                                                    // Step 2: Aggregate totals by OtRate
                                                                    let aggregatedData = [];
                                                                    let currentOtRate = null;
                                                                    let sumTotalOtPay = 0;
                                                                    let sumOtMinute = 0;

                                                                    data.forEach(entry => {
                                                                        if (entry.OtRate !== currentOtRate) {
                                                                            // Push the accumulated totals for the previous OtRate (if it exists)
                                                                            if (currentOtRate !== null) {
                                                                                aggregatedData.push({
                                                                                    OtRate: currentOtRate,
                                                                                    TotalOtPay: sumTotalOtPay,
                                                                                    OtMinute: sumOtMinute
                                                                                });
                                                                            }
                                                                            // Reset accumulators for the new OtRate
                                                                            currentOtRate = entry.OtRate;
                                                                            sumTotalOtPay = 0;
                                                                            sumOtMinute = 0;
                                                                        }
                                                                        // Accumulate totals for the current OtRate
                                                                        sumTotalOtPay += entry.TotalOtPay;
                                                                        sumOtMinute += entry.OtMinute;
                                                                    });

                                                                    // Don't forget to add the last accumulated totals after loop ends
                                                                    if (currentOtRate !== null) {
                                                                        aggregatedData.push({
                                                                            OtRate: currentOtRate,
                                                                            TotalOtPay: sumTotalOtPay,
                                                                            OtMinute: sumOtMinute
                                                                        });
                                                                    }

                                                                    // Output the aggregated data
                                                                    for (var index in aggregatedData) {
                                                                        var OtHour = aggregatedData[index].OtMinute / 60.0
                                                                        EarningsString.push('Overtime Payments: RM' + parseFloat(aggregatedData[index].OtRate).toFixed(2).toString() + 'x' + OtHour.toString() + 'hour = ' + aggregatedData[index].TotalOtPay.toString() + " : readonly")
                                                                    }
                                                                }


                                                                retrieve_ot = true
                                                            }
                                                        })
                                                        while (retrieve_ot == false) { };
                                                        for (let i = 0; i < EarningsString.length; i++) {
                                                            var EarningCriteria, EarningAmount, Buffer

                                                            if (EarningsString[i] == undefined)
                                                                [EarningCriteria, EarningAmount] = [null, null]

                                                            else {
                                                                if (self.EarningsString[i].includes('=')) {
                                                                    [EarningCriteria, EarningAmount] = self.extractOtRateAndPrice(self.EarningsString[i]);
                                                                    [EarningCriteria, Buffer] = self.extractNameAndPrice(EarningCriteria);

                                                                }
                                                                else
                                                                    [EarningCriteria, EarningAmount] = self.extractNameAndPrice(self.EarningsString[i]);
                                                            }

                                                            self.NettEarnings += EarningAmount
                                                            var EisSubjection = self.CheckSubjection(ListOfEisSubjection, EarningCriteria)
                                                            var EpfSubjection = self.CheckSubjection(ListOfEpfSubjection, EarningCriteria)
                                                            var SocsoSubjection = self.CheckSubjection(ListOfSocsoSubjection, EarningCriteria)
                                                            var PcbSubjection = self.CheckSubjection(ListOfPcbSubjection, EarningCriteria)
                                                            var HrdfSubjection = self.CheckSubjection(ListOfHrdfSubjection, EarningCriteria)

                                                            EisAmount += (EisSubjection ? 1 : 0) * EarningAmount
                                                            EpfAmount += (EpfSubjection ? 1 : 0) * EarningAmount
                                                            SocsoAmount += (SocsoSubjection ? 1 : 0) * EarningAmount
                                                            PcbAmount += (PcbSubjection ? 1 : 0) * EarningAmount
                                                            HrdfAmount += (HrdfSubjection ? 1 : 0) * EarningAmount

                                                        }

                                                        var doneCalculatingGovPayments = false
                                                        EpfAmount -= Deductions
                                                        EisAmount -= Deductions
                                                        SocsoAmount -= Deductions
                                                        PcbAmount -= Deductions
                                                        serviceCall<ListResponse<any>>({
                                                            service: PayrollService.baseUrl + '/CalculateGovernmentPayments',
                                                            method: "GET",
                                                            data: {
                                                                "EmployeeRowID": EmployeeRowId,
                                                                "EpfAmount": EpfAmount,
                                                                "EisAmount": EisAmount,
                                                                "SocsoAmount": SocsoAmount,
                                                                "PcbAmount": PcbAmount,
                                                                "HrdfAmount": HrdfAmount
                                                            },
                                                            async: false,
                                                            onSuccess: (response) => {
                                                                doneCalculatingGovPayments = true
                                                                self.EmployerContributions.length = 0
                                                                if (self.EmployeeType == 1) {// if is local 
                                                                    if (response.Entities[0].EmployeeEPF)
                                                                        DeductionsString.push('Employee EPF:' + response.Entities[0].EmployeeEPF.toFixed(2))
                                                                    if (response.Entities[0].EmployeeEIS)
                                                                        DeductionsString.push('Employee EIS:' + response.Entities[0].EmployeeEIS.toFixed(2))
                                                                    if (response.Entities[0].EmployeePCB)
                                                                        DeductionsString.push('Employee PCB:' + response.Entities[0].EmployeePCB.toFixed(2))
                                                                    if (response.Entities[0].EmployeeSOCSO)
                                                                        DeductionsString.push('Employee SOCSO:' + response.Entities[0].EmployeeSOCSO.toFixed(2))
                                                                    if (response.Entities[0].EmployerEPF)
                                                                        EmployerContributions.push('EPF:' + response.Entities[0].EmployerEPF)
                                                                    if (response.Entities[0].EmployerEIS)
                                                                        EmployerContributions.push('EIS:' + response.Entities[0].EmployerEIS)
                                                                    if (response.Entities[0].EmployerHRDF)
                                                                        EmployerContributions.push('HRDF:' + response.Entities[0].EmployerHRDF)
                                                                    if (response.Entities[0].EmployerSOCSO)
                                                                        EmployerContributions.push('SOCSO:' + response.Entities[0].EmployerSOCSO)
                                                                    self.EmployeeEis = response.Entities[0].EmployeeEIS
                                                                    self.EmployeeEpf = response.Entities[0].EmployeeEPF
                                                                    self.EmployeeSocso = response.Entities[0].EmployeeSOCSO
                                                                    self.EmployeePcb = response.Entities[0].EmployeePCB
                                                                    self.EmployerEis = response.Entities[0].EmployerEIS
                                                                    self.EmployerEpf = response.Entities[0].EmployerEPF
                                                                    self.EmployerSocso = response.Entities[0].EmployerSOCSO
                                                                    self.EmployerHrdf = response.Entities[0].EmployerHRDF
                                                                }
                                                                else if (self.EmployeeType == 2) {// if is foreigner 
                                                                    self.EmployeeSocso = 0
                                                                    self.EmployerSocso = response.Entities[0].EmployerSOCSO
                                                                    if (response.Entities[0].EmployerSOCSO)
                                                                        EmployerContributions.push('SOCSO:' + response.Entities[0].EmployerSOCSO)

                                                                    if (self.EpfSubjection) { // if volunteer for epf payments
                                                                        if (response.Entities[0].EmployeeEPF)
                                                                            DeductionsString.push('Employee EPF:' + response.Entities[0].EmployeeEPF.toFixed(2))
                                                                        if (response.Entities[0].EmployerEPF)
                                                                            EmployerContributions.push('EPF:' + response.Entities[0].EmployerEPF)
                                                                        self.EmployeeEpf = response.Entities[0].EmployeeEPF
                                                                        self.EmployerEpf = response.Entities[0].EmployerEPF
                                                                    }
                                                                    DeductionsString.push('Employee PCB:' + response.Entities[0].EmployeePCB.toFixed(2))
                                                                    self.EmployeePcb = response.Entities[0].EmployeePCB


                                                                    self.EmployeeEis = self.EmployerEis = 0
                                                                    self.EmployerHrdf = 0

                                                                }
                                                            }
                                                        })
                                                        while (doneCalculatingGovPayments == false) { }
                                                        self.EmployeeTable()
                                                        self.EmployerTable()

                                                    })

                                                }
                                                else if (!self.DeductEarlyLeaving && self.DeductLateArrival) {
                                                    EmployeeLateService.List({}, response => {
                                                        var LateMinutes = 0, LateDeductions = 0

                                                        for (var index in response.Entities) {
                                                            if (response.Entities[index].Deducted == 0 && response.Entities[index].EmployeeRowId == EmployeeRowId) {
                                                                Deductions += response.Entities[index].Deductions
                                                                LateMinutes += response.Entities[index].LateMins
                                                                LateDeductions += response.Entities[index].Deductions
                                                                self.LateArrivalId.push(response.Entities[index].Id)
                                                            }
                                                        }
                                                        if (LateMinutes && LateDeductions)
                                                            DeductionsString.push('(Late) ' + LateMinutes.toString() + " mins : " + LateDeductions.toFixed(2) + " : readonly")






                                                        EarningsString.push('Basic Salary:' + BasicPay.toString())
                                                        EarningsString.push('Allowances:' + Allowance.toString())

                                                        var retrieve_ot = false
                                                        serviceCall<ListResponse<any>>({
                                                            service: OTApplicationService.baseUrl + '/CalculateOtPay',
                                                            method: "GET",
                                                            data: {
                                                                "EmployeeRowID": EmployeeRowId
                                                            },
                                                            async: false,
                                                            onSuccess: (response) => {

                                                                //console.log(response.Entities)
                                                                if (response.Entities[0].OtRate != -1 && response.Entities[0].OtMinute != -1 && response.Entities[0].TotalOtPay != -1) {

                                                                    var data = response.Entities
                                                                    // Step 1: Sort the array based on OtRate
                                                                    data.sort((a, b) => a.OtRate - b.OtRate);

                                                                    // Step 2: Aggregate totals by OtRate
                                                                    let aggregatedData = [];
                                                                    let currentOtRate = null;
                                                                    let sumTotalOtPay = 0;
                                                                    let sumOtMinute = 0;

                                                                    data.forEach(entry => {
                                                                        if (entry.OtRate !== currentOtRate) {
                                                                            // Push the accumulated totals for the previous OtRate (if it exists)
                                                                            if (currentOtRate !== null) {
                                                                                aggregatedData.push({
                                                                                    OtRate: currentOtRate,
                                                                                    TotalOtPay: sumTotalOtPay,
                                                                                    OtMinute: sumOtMinute
                                                                                });
                                                                            }
                                                                            // Reset accumulators for the new OtRate
                                                                            currentOtRate = entry.OtRate;
                                                                            sumTotalOtPay = 0;
                                                                            sumOtMinute = 0;
                                                                        }
                                                                        // Accumulate totals for the current OtRate
                                                                        sumTotalOtPay += entry.TotalOtPay;
                                                                        sumOtMinute += entry.OtMinute;
                                                                    });

                                                                    // Don't forget to add the last accumulated totals after loop ends
                                                                    if (currentOtRate !== null) {
                                                                        aggregatedData.push({
                                                                            OtRate: currentOtRate,
                                                                            TotalOtPay: sumTotalOtPay,
                                                                            OtMinute: sumOtMinute
                                                                        });
                                                                    }

                                                                    // Output the aggregated data
                                                                    for (var index in aggregatedData) {
                                                                        var OtHour = aggregatedData[index].OtMinute / 60.0
                                                                        EarningsString.push('Overtime Payments: RM' + parseFloat(aggregatedData[index].OtRate).toFixed(2).toString() + 'x' + OtHour.toString() + 'hour = ' + aggregatedData[index].TotalOtPay.toString() + " : readonly")
                                                                    }
                                                                }
                                                                retrieve_ot = true
                                                            }
                                                        })
                                                        while (retrieve_ot == false) { };
                                                        for (let i = 0; i < EarningsString.length; i++) {
                                                            var EarningCriteria, EarningAmount, Buffer

                                                            if (EarningsString[i] == undefined)
                                                                [EarningCriteria, EarningAmount] = [null, null]

                                                            else {
                                                                if (self.EarningsString[i].includes('=')) {
                                                                    [EarningCriteria, EarningAmount] = self.extractOtRateAndPrice(self.EarningsString[i]);
                                                                    //console.log(EarningCriteria);
                                                                    [EarningCriteria, Buffer] = self.extractNameAndPrice(EarningCriteria);
                                                                    // console.log(EarningCriteria)
                                                                    // console.log(EarningAmount)

                                                                }
                                                                else
                                                                    [EarningCriteria, EarningAmount] = self.extractNameAndPrice(self.EarningsString[i]);
                                                            }

                                                            self.NettEarnings += EarningAmount
                                                            var EisSubjection = self.CheckSubjection(ListOfEisSubjection, EarningCriteria)
                                                            var EpfSubjection = self.CheckSubjection(ListOfEpfSubjection, EarningCriteria)
                                                            var SocsoSubjection = self.CheckSubjection(ListOfSocsoSubjection, EarningCriteria)
                                                            var PcbSubjection = self.CheckSubjection(ListOfPcbSubjection, EarningCriteria)
                                                            var HrdfSubjection = self.CheckSubjection(ListOfHrdfSubjection, EarningCriteria)

                                                            EisAmount += (EisSubjection ? 1 : 0) * EarningAmount
                                                            EpfAmount += (EpfSubjection ? 1 : 0) * EarningAmount
                                                            SocsoAmount += (SocsoSubjection ? 1 : 0) * EarningAmount
                                                            PcbAmount += (PcbSubjection ? 1 : 0) * EarningAmount
                                                            HrdfAmount += (HrdfSubjection ? 1 : 0) * EarningAmount

                                                        }
                                                        var doneCalculatingGovPayments = false
                                                        EpfAmount -= Deductions
                                                        EisAmount -= Deductions
                                                        SocsoAmount -= Deductions
                                                        PcbAmount -= Deductions
                                                        HrdfAmount -= Deductions

                                                        serviceCall<ListResponse<any>>({
                                                            service: PayrollService.baseUrl + '/CalculateGovernmentPayments',
                                                            method: "GET",
                                                            data: {
                                                                "EmployeeRowID": EmployeeRowId,
                                                                "EpfAmount": EpfAmount,
                                                                "EisAmount": EisAmount,
                                                                "SocsoAmount": SocsoAmount,
                                                                "PcbAmount": PcbAmount,
                                                                "HrdfAmount": HrdfAmount
                                                            },
                                                            async: false,
                                                            onSuccess: (response) => {
                                                                // console.log(response.Entities)
                                                                doneCalculatingGovPayments = true
                                                                self.EmployerContributions.length = 0
                                                                if (self.EmployeeType == 1) {// if is local 
                                                                    if (response.Entities[0].EmployeeEPF)
                                                                        DeductionsString.push('Employee EPF:' + response.Entities[0].EmployeeEPF.toFixed(2))
                                                                    if (response.Entities[0].EmployeeEIS)
                                                                        DeductionsString.push('Employee EIS:' + response.Entities[0].EmployeeEIS.toFixed(2))
                                                                    if (response.Entities[0].EmployeePCB)
                                                                        DeductionsString.push('Employee PCB:' + response.Entities[0].EmployeePCB.toFixed(2))
                                                                    if (response.Entities[0].EmployeeSOCSO)
                                                                        DeductionsString.push('Employee SOCSO:' + response.Entities[0].EmployeeSOCSO.toFixed(2))
                                                                    if (response.Entities[0].EmployerEPF)
                                                                        EmployerContributions.push('EPF:' + response.Entities[0].EmployerEPF)
                                                                    if (response.Entities[0].EmployerEIS)
                                                                        EmployerContributions.push('EIS:' + response.Entities[0].EmployerEIS)
                                                                    if (response.Entities[0].EmployerHRDF)
                                                                        EmployerContributions.push('HRDF:' + response.Entities[0].EmployerHRDF)
                                                                    if (response.Entities[0].EmployerSOCSO)
                                                                        EmployerContributions.push('SOCSO:' + response.Entities[0].EmployerSOCSO)
                                                                    self.EmployeeEis = response.Entities[0].EmployeeEIS
                                                                    self.EmployeeEpf = response.Entities[0].EmployeeEPF
                                                                    self.EmployeeSocso = response.Entities[0].EmployeeSOCSO
                                                                    self.EmployeePcb = response.Entities[0].EmployeePCB
                                                                    self.EmployerEis = response.Entities[0].EmployerEIS
                                                                    self.EmployerEpf = response.Entities[0].EmployerEPF
                                                                    self.EmployerSocso = response.Entities[0].EmployerSOCSO
                                                                    self.EmployerHrdf = response.Entities[0].EmployerHRDF
                                                                }
                                                                else if (self.EmployeeType == 2) {// if is foreigner 
                                                                    self.EmployeeSocso = 0
                                                                    self.EmployerSocso = response.Entities[0].EmployerSOCSO
                                                                    if (response.Entities[0].EmployerSOCSO)
                                                                        EmployerContributions.push('SOCSO:' + response.Entities[0].EmployerSOCSO)

                                                                    if (self.EpfSubjection) { // if volunteer for epf payments
                                                                        if (response.Entities[0].EmployeeEPF)
                                                                            DeductionsString.push('Employee EPF:' + response.Entities[0].EmployeeEPF.toFixed(2))
                                                                        if (response.Entities[0].EmployerEPF)
                                                                            EmployerContributions.push('EPF:' + response.Entities[0].EmployerEPF)
                                                                        self.EmployeeEpf = response.Entities[0].EmployeeEPF
                                                                        self.EmployerEpf = response.Entities[0].EmployerEPF
                                                                    }
                                                                    DeductionsString.push('Employee PCB:' + response.Entities[0].EmployeePCB.toFixed(2))
                                                                    self.EmployeePcb = response.Entities[0].EmployeePCB

                                                                    self.EmployeeEis = self.EmployerEis = 0
                                                                    self.EmployerHrdf = 0

                                                                }
                                                            }
                                                        })

                                                        while (doneCalculatingGovPayments == false) { }

                                                        self.EmployeeTable()
                                                        self.EmployerTable()

                                                    })

                                                }
                                                else if (self.DeductEarlyLeaving && self.DeductLateArrival) {
                                                    EmployeeEarlyLeavingService.List({}, response => {
                                                        var EarlyLeavingMinutes = 0, EarlyLeavingDeductions = 0
                                                        for (var index in response.Entities) {
                                                            if (response.Entities[index].Deducted == 0 && response.Entities[index].EmployeeRowId == EmployeeRowId) {
                                                                EarlyLeavingMinutes += response.Entities[index].EarlyMins
                                                                EarlyLeavingDeductions += response.Entities[index].Deductions
                                                                Deductions += response.Entities[index].Deductions
                                                                self.EarlyLeavingId.push(response.Entities[index].Id)
                                                            }

                                                        }
                                                        if (EarlyLeavingMinutes && EarlyLeavingDeductions)
                                                            DeductionsString.push('(Early Leaving) ' + EarlyLeavingMinutes.toString() + " mins : " + EarlyLeavingDeductions.toFixed(2).toString() + " : readonly")

                                                        EmployeeLateService.List({}, response => {
                                                            var LateMinutes = 0, LateDeductions = 0

                                                            for (var index in response.Entities) {
                                                                if (response.Entities[index].Deducted == 0 && response.Entities[index].EmployeeRowId == EmployeeRowId) {
                                                                    Deductions += response.Entities[index].Deductions
                                                                    LateMinutes += response.Entities[index].LateMins
                                                                    LateDeductions += response.Entities[index].Deductions
                                                                    self.LateArrivalId.push(response.Entities[index].Id)
                                                                }
                                                            }
                                                            if (LateMinutes && LateDeductions)
                                                                DeductionsString.push('(Late) ' + LateMinutes.toString() + " mins : " + LateDeductions.toFixed(2) + " : readonly")






                                                            EarningsString.push('Basic Salary:' + BasicPay.toString())
                                                            EarningsString.push('Allowances:' + Allowance.toString())

                                                            var retrieve_ot = false
                                                            serviceCall<ListResponse<any>>({
                                                                service: OTApplicationService.baseUrl + '/CalculateOtPay',
                                                                method: "GET",
                                                                data: {
                                                                    "EmployeeRowID": EmployeeRowId
                                                                },
                                                                async: false,
                                                                onSuccess: (response) => {
                                                                    //console.log(response.Entities)
                                                                    if (response.Entities[0].OtRate != -1 && response.Entities[0].OtMinute != -1 && response.Entities[0].TotalOtPay != -1) {

                                                                        var data = response.Entities
                                                                        // Step 1: Sort the array based on OtRate
                                                                        data.sort((a, b) => a.OtRate - b.OtRate);

                                                                        // Step 2: Aggregate totals by OtRate
                                                                        let aggregatedData = [];
                                                                        let currentOtRate = null;
                                                                        let sumTotalOtPay = 0;
                                                                        let sumOtMinute = 0;

                                                                        data.forEach(entry => {
                                                                            if (entry.OtRate !== currentOtRate) {
                                                                                // Push the accumulated totals for the previous OtRate (if it exists)
                                                                                if (currentOtRate !== null) {
                                                                                    aggregatedData.push({
                                                                                        OtRate: currentOtRate,
                                                                                        TotalOtPay: sumTotalOtPay,
                                                                                        OtMinute: sumOtMinute
                                                                                    });
                                                                                }
                                                                                // Reset accumulators for the new OtRate
                                                                                currentOtRate = entry.OtRate;
                                                                                sumTotalOtPay = 0;
                                                                                sumOtMinute = 0;
                                                                            }
                                                                            // Accumulate totals for the current OtRate
                                                                            sumTotalOtPay += entry.TotalOtPay;
                                                                            sumOtMinute += entry.OtMinute;
                                                                        });

                                                                        // Don't forget to add the last accumulated totals after loop ends
                                                                        if (currentOtRate !== null) {
                                                                            aggregatedData.push({
                                                                                OtRate: currentOtRate,
                                                                                TotalOtPay: sumTotalOtPay,
                                                                                OtMinute: sumOtMinute
                                                                            });
                                                                        }

                                                                        // Output the aggregated data
                                                                        // console.log(aggregatedData);
                                                                        for (var index in aggregatedData) {
                                                                            var OtHour = aggregatedData[index].OtMinute / 60.0
                                                                            EarningsString.push('Overtime Payments: RM' + parseFloat(aggregatedData[index].OtRate).toFixed(2).toString() + 'x' + OtHour.toString() + 'hour = ' + aggregatedData[index].TotalOtPay.toString() + " : readonly")


                                                                        }

                                                                    }


                                                                    retrieve_ot = true
                                                                }
                                                            })
                                                            while (retrieve_ot == false) { };
                                                            for (let i = 0; i < EarningsString.length; i++) {
                                                                var EarningCriteria, EarningAmount, Buffer

                                                                if (EarningsString[i] == undefined)
                                                                    [EarningCriteria, EarningAmount] = [null, null]

                                                                else {
                                                                    if (self.EarningsString[i].includes('=')) {
                                                                        [EarningCriteria, EarningAmount] = self.extractOtRateAndPrice(self.EarningsString[i]);
                                                                        [EarningCriteria, Buffer] = self.extractNameAndPrice(EarningCriteria);

                                                                    }
                                                                    else
                                                                        [EarningCriteria, EarningAmount] = self.extractNameAndPrice(self.EarningsString[i]);
                                                                }

                                                                self.NettEarnings += EarningAmount
                                                                var EisSubjection = self.CheckSubjection(ListOfEisSubjection, EarningCriteria)
                                                                var EpfSubjection = self.CheckSubjection(ListOfEpfSubjection, EarningCriteria)
                                                                var SocsoSubjection = self.CheckSubjection(ListOfSocsoSubjection, EarningCriteria)
                                                                var PcbSubjection = self.CheckSubjection(ListOfPcbSubjection, EarningCriteria)
                                                                var HrdfSubjection = self.CheckSubjection(ListOfHrdfSubjection, EarningCriteria)


                                                                EisAmount += (EisSubjection ? 1 : 0) * parseFloat(EarningAmount)
                                                                EpfAmount += (EpfSubjection ? 1 : 0) * parseFloat(EarningAmount)
                                                                SocsoAmount += (SocsoSubjection ? 1 : 0) * parseFloat(EarningAmount)
                                                                PcbAmount += (PcbSubjection ? 1 : 0) * parseFloat(EarningAmount)
                                                                HrdfAmount += (HrdfSubjection ? 1 : 0) * parseFloat(EarningAmount)

                                                            }




                                                            var doneCalculatingGovPayments = false
                                                            EpfAmount -= Deductions
                                                            EisAmount -= Deductions
                                                            SocsoAmount -= Deductions
                                                            PcbAmount -= Deductions
                                                            HrdfAmount -= Deductions



                                                            serviceCall<ListResponse<any>>({
                                                                service: PayrollService.baseUrl + '/CalculateGovernmentPayments',
                                                                method: "GET",
                                                                data: {
                                                                    "EmployeeRowID": EmployeeRowId,
                                                                    "EpfAmount": EpfAmount,
                                                                    "EisAmount": EisAmount,
                                                                    "SocsoAmount": SocsoAmount,
                                                                    "PcbAmount": PcbAmount,
                                                                    "HrdfAmount": HrdfAmount
                                                                },
                                                                async: false,
                                                                onSuccess: (response) => {
                                                                    // console.log(response.Entities)
                                                                    doneCalculatingGovPayments = true
                                                                    self.EmployerContributions.length = 0
                                                                    if (self.EmployeeType == 1) {// if is local 
                                                                        if (response.Entities[0].EmployeeEPF)
                                                                            DeductionsString.push('Employee EPF:' + response.Entities[0].EmployeeEPF.toFixed(2))
                                                                        if (response.Entities[0].EmployeeEIS)
                                                                            DeductionsString.push('Employee EIS:' + response.Entities[0].EmployeeEIS.toFixed(2))
                                                                        if (response.Entities[0].EmployeePCB)
                                                                            DeductionsString.push('Employee PCB:' + response.Entities[0].EmployeePCB.toFixed(2))
                                                                        if (response.Entities[0].EmployeeSOCSO)
                                                                            DeductionsString.push('Employee SOCSO:' + response.Entities[0].EmployeeSOCSO.toFixed(2))
                                                                        if (response.Entities[0].EmployerEPF)
                                                                            EmployerContributions.push('EPF:' + response.Entities[0].EmployerEPF)
                                                                        if (response.Entities[0].EmployerEIS)
                                                                            EmployerContributions.push('EIS:' + response.Entities[0].EmployerEIS)
                                                                        if (response.Entities[0].EmployerHRDF)
                                                                            EmployerContributions.push('HRDF:' + response.Entities[0].EmployerHRDF)
                                                                        if (response.Entities[0].EmployerSOCSO)
                                                                            EmployerContributions.push('SOCSO:' + response.Entities[0].EmployerSOCSO)
                                                                        self.EmployeeEis = response.Entities[0].EmployeeEIS
                                                                        self.EmployeeEpf = response.Entities[0].EmployeeEPF
                                                                        self.EmployeeSocso = response.Entities[0].EmployeeSOCSO
                                                                        self.EmployeePcb = response.Entities[0].EmployeePCB
                                                                        self.EmployerEis = response.Entities[0].EmployerEIS
                                                                        self.EmployerEpf = response.Entities[0].EmployerEPF
                                                                        self.EmployerSocso = response.Entities[0].EmployerSOCSO
                                                                        self.EmployerHrdf = response.Entities[0].EmployerHRDF
                                                                    }
                                                                    else if (self.EmployeeType == 2) {// if is foreigner 
                                                                        self.EmployeeSocso = 0
                                                                        self.EmployerSocso = response.Entities[0].EmployerSOCSO
                                                                        if (response.Entities[0].EmployerSOCSO)
                                                                            EmployerContributions.push('SOCSO:' + response.Entities[0].EmployerSOCSO)

                                                                        if (self.EpfSubjection) { // if volunteer for epf payments
                                                                            if (response.Entities[0].EmployeeEPF)
                                                                                DeductionsString.push('Employee EPF:' + response.Entities[0].EmployeeEPF.toFixed(2))
                                                                            if (response.Entities[0].EmployerEPF)
                                                                                EmployerContributions.push('EPF:' + response.Entities[0].EmployerEPF)
                                                                            self.EmployeeEpf = response.Entities[0].EmployeeEPF
                                                                            self.EmployerEpf = response.Entities[0].EmployerEPF
                                                                        }
                                                                        DeductionsString.push('Employee PCB:' + response.Entities[0].EmployeePCB.toFixed(2))
                                                                        self.EmployeePcb = response.Entities[0].EmployeePCB

                                                                        self.EmployeeEis = self.EmployerEis = 0
                                                                        self.EmployerHrdf = 0

                                                                    }
                                                                }
                                                            })
                                                            while (doneCalculatingGovPayments == false) { }
                                                            self.EmployeeTable()
                                                            self.EmployerTable()

                                                        })

                                                    })
                                                }
                                                else {
                                                    EarningsString.push('Basic Salary:' + BasicPay.toString())
                                                    EarningsString.push('Allowances:' + Allowance.toString())






                                                    var retrieve_ot = false
                                                    serviceCall<ListResponse<any>>({
                                                        service: OTApplicationService.baseUrl + '/CalculateOtPay',
                                                        method: "GET",
                                                        data: {
                                                            "EmployeeRowID": EmployeeRowId
                                                        },
                                                        async: false,
                                                        onSuccess: (response) => {

                                                            // console.log(response.Entities)
                                                            if (response.Entities[0].OtRate != -1 && response.Entities[0].OtMinute != -1 && response.Entities[0].TotalOtPay != -1) {

                                                                var data = response.Entities
                                                                // Step 1: Sort the array based on OtRate
                                                                data.sort((a, b) => a.OtRate - b.OtRate);

                                                                // Step 2: Aggregate totals by OtRate
                                                                let aggregatedData = [];
                                                                let currentOtRate = null;
                                                                let sumTotalOtPay = 0;
                                                                let sumOtMinute = 0;

                                                                data.forEach(entry => {
                                                                    if (entry.OtRate !== currentOtRate) {
                                                                        // Push the accumulated totals for the previous OtRate (if it exists)
                                                                        if (currentOtRate !== null) {
                                                                            aggregatedData.push({
                                                                                OtRate: currentOtRate,
                                                                                TotalOtPay: sumTotalOtPay,
                                                                                OtMinute: sumOtMinute
                                                                            });
                                                                        }
                                                                        // Reset accumulators for the new OtRate
                                                                        currentOtRate = entry.OtRate;
                                                                        sumTotalOtPay = 0;
                                                                        sumOtMinute = 0;
                                                                    }
                                                                    // Accumulate totals for the current OtRate
                                                                    sumTotalOtPay += entry.TotalOtPay;
                                                                    sumOtMinute += entry.OtMinute;
                                                                });

                                                                // Don't forget to add the last accumulated totals after loop ends
                                                                if (currentOtRate !== null) {
                                                                    aggregatedData.push({
                                                                        OtRate: currentOtRate,
                                                                        TotalOtPay: sumTotalOtPay,
                                                                        OtMinute: sumOtMinute
                                                                    });
                                                                }

                                                                // Output the aggregated data
                                                                //console.log(aggregatedData);
                                                                for (var index in aggregatedData) {
                                                                    var OtHour = aggregatedData[index].OtMinute / 60.0
                                                                    EarningsString.push('Overtime Payments: RM' + parseFloat(aggregatedData[index].OtRate).toFixed(2).toString() + 'x' + OtHour.toString() + 'hour = ' + aggregatedData[index].TotalOtPay.toString() + " : readonly")


                                                                }

                                                            }


                                                            retrieve_ot = true
                                                        }
                                                    })
                                                    while (retrieve_ot == false) { };
                                                    for (let i = 0; i < EarningsString.length; i++) {
                                                        var EarningCriteria, EarningAmount, Buffer

                                                        if (EarningsString[i] == undefined)
                                                            [EarningCriteria, EarningAmount] = [null, null]

                                                        else {
                                                            if (self.EarningsString[i].includes('=')) {
                                                                [EarningCriteria, EarningAmount] = self.extractOtRateAndPrice(self.EarningsString[i]);
                                                                [EarningCriteria, Buffer] = self.extractNameAndPrice(EarningCriteria);


                                                            }
                                                            else
                                                                [EarningCriteria, EarningAmount] = self.extractNameAndPrice(self.EarningsString[i]);
                                                        }

                                                        self.NettEarnings += EarningAmount
                                                        var EisSubjection = self.CheckSubjection(ListOfEisSubjection, EarningCriteria)
                                                        var EpfSubjection = self.CheckSubjection(ListOfEpfSubjection, EarningCriteria)
                                                        var SocsoSubjection = self.CheckSubjection(ListOfSocsoSubjection, EarningCriteria)
                                                        var PcbSubjection = self.CheckSubjection(ListOfPcbSubjection, EarningCriteria)
                                                        var HrdfSubjection = self.CheckSubjection(ListOfHrdfSubjection, EarningCriteria)

                                                        EisAmount += (EisSubjection ? 1 : 0) * EarningAmount
                                                        EpfAmount += (EpfSubjection ? 1 : 0) * EarningAmount
                                                        SocsoAmount += (SocsoSubjection ? 1 : 0) * EarningAmount
                                                        PcbAmount += (PcbSubjection ? 1 : 0) * EarningAmount
                                                        HrdfAmount += (HrdfSubjection ? 1 : 0) * EarningAmount

                                                    }




                                                    var doneCalculatingGovPayments = false
                                                    EpfAmount -= Deductions
                                                    EisAmount -= Deductions
                                                    SocsoAmount -= Deductions
                                                    PcbAmount -= Deductions
                                                    HrdfAmount -= Deductions
                                                    serviceCall<ListResponse<any>>({
                                                        service: PayrollService.baseUrl + '/CalculateGovernmentPayments',
                                                        method: "GET",
                                                        data: {
                                                            "EmployeeRowID": EmployeeRowId,
                                                            "EpfAmount": EpfAmount,
                                                            "EisAmount": EisAmount,
                                                            "SocsoAmount": SocsoAmount,
                                                            "PcbAmount": PcbAmount,
                                                            "HrdfAmount": HrdfAmount
                                                        },
                                                        async: false,
                                                        onSuccess: (response) => {
                                                            //console.log(response.Entities)
                                                            doneCalculatingGovPayments = true
                                                            self.EmployerContributions.length = 0

                                                            if (self.EmployeeType == 1) {// if is local 
                                                                if (response.Entities[0].EmployeeEPF)
                                                                    DeductionsString.push('Employee EPF:' + response.Entities[0].EmployeeEPF.toFixed(2))
                                                                if (response.Entities[0].EmployeeEIS)
                                                                    DeductionsString.push('Employee EIS:' + response.Entities[0].EmployeeEIS.toFixed(2))
                                                                if (response.Entities[0].EmployeePCB)
                                                                    DeductionsString.push('Employee PCB:' + response.Entities[0].EmployeePCB.toFixed(2))
                                                                if (response.Entities[0].EmployeeSOCSO)
                                                                    DeductionsString.push('Employee SOCSO:' + response.Entities[0].EmployeeSOCSO.toFixed(2))
                                                                if (response.Entities[0].EmployerEPF)
                                                                    EmployerContributions.push('EPF:' + response.Entities[0].EmployerEPF)
                                                                if (response.Entities[0].EmployerEIS)
                                                                    EmployerContributions.push('EIS:' + response.Entities[0].EmployerEIS)
                                                                if (response.Entities[0].EmployerHRDF)
                                                                    EmployerContributions.push('HRDF:' + response.Entities[0].EmployerHRDF)
                                                                if (response.Entities[0].EmployerSOCSO)
                                                                    EmployerContributions.push('SOCSO:' + response.Entities[0].EmployerSOCSO)
                                                                self.EmployeeEis = response.Entities[0].EmployeeEIS
                                                                self.EmployeeEpf = response.Entities[0].EmployeeEPF
                                                                self.EmployeeSocso = response.Entities[0].EmployeeSOCSO
                                                                self.EmployeePcb = response.Entities[0].EmployeePCB
                                                                self.EmployerEis = response.Entities[0].EmployerEIS
                                                                self.EmployerEpf = response.Entities[0].EmployerEPF
                                                                self.EmployerSocso = response.Entities[0].EmployerSOCSO
                                                                self.EmployerHrdf = response.Entities[0].EmployerHRDF
                                                            }
                                                            else if (self.EmployeeType == 2) {// if is foreigner 
                                                                self.EmployeeSocso = 0
                                                                self.EmployerSocso = response.Entities[0].EmployerSOCSO
                                                                if (response.Entities[0].EmployerSOCSO)
                                                                    EmployerContributions.push('SOCSO:' + response.Entities[0].EmployerSOCSO)

                                                                if (self.EpfSubjection) { // if volunteer for epf payments
                                                                    if (response.Entities[0].EmployeeEPF)
                                                                        DeductionsString.push('Employee EPF:' + response.Entities[0].EmployeeEPF.toFixed(2))
                                                                    if (response.Entities[0].EmployerEPF)
                                                                        EmployerContributions.push('EPF:' + response.Entities[0].EmployerEPF)
                                                                    self.EmployeeEpf = response.Entities[0].EmployeeEPF
                                                                    self.EmployerEpf = response.Entities[0].EmployerEPF
                                                                }
                                                                DeductionsString.push('Employee PCB:' + response.Entities[0].EmployeePCB.toFixed(2))
                                                                self.EmployeePcb = response.Entities[0].EmployeePCB

                                                                self.EmployeeEis = self.EmployerEis = 0
                                                                self.EmployerHrdf = 0

                                                            }
                                                        }
                                                    })
                                                    while (doneCalculatingGovPayments == false) { }


                                                    self.EmployeeTable()
                                                    self.EmployerTable()

                                                }
                                            })
                                        })
                                    })
                                    break
                                }
                            }

                        })
                    }
                })
            }
            else if (this.isNew() == false && EmployeeRowIdValue != null) {

                $(PayYearElement).val(this.form.PayYear.value).trigger('change')
                $(PayMonthElement).val(this.form.PayMonth.value).trigger('change')

                //this.set_readOnly(true)




                var TableDesc = this.form.PayrollTable.value
                var EmployerDesc = this.form.EmployerTable.value
                var Inverter = true, buffer = '', start = false
                var Starter = 0x88, Ender = 0x99
                for (let i = 0; i < TableDesc.length; i++) {
                    var charCode = TableDesc.charCodeAt(i)
                    if (charCode == Starter || (start == true && charCode != Ender))//start
                    {
                        if (start == true)
                            buffer += TableDesc[i].toString()
                        start = true
                    }
                    else if (charCode == Ender) // end
                    {
                        if (Inverter == true)
                            this.EarningsString.push(buffer)
                        else
                            this.DeductionsString.push(buffer)
                        start = false
                        buffer = ''
                        Inverter = !Inverter
                    }
                }
                buffer = '', start = false
                Starter = 0x88, Ender = 0x99
                for (let i = 0; i < EmployerDesc.length; i++) {
                    var charCode = EmployerDesc.charCodeAt(i)
                    if (charCode == Starter || (start == true && charCode != Ender))//start
                    {
                        if (start == true)
                            buffer += EmployerDesc[i].toString()
                        start = true
                    }
                    else if (charCode == Ender) // end
                    {
                        this.EmployerContributions.push(buffer)
                        start = false
                        buffer = ''
                    }
                }
                // this.ReadOnly = true
                for (var index in listOfDicts) {
                    if (listOfDicts[index].id == parseInt(EmployeeRowIdValue))
                        this.EmployeeType = listOfDicts[index].type
                }
                $(EmployeeRowIdElement).val(EmployeeRowIdValue.toString()).trigger('change');

                EditorUtils.setReadonly(this.form.EmployeeRowId.element, true);
                this.EmployerTable()
                this.EmployeeTable()
                if (Authorization.hasPermission(PermissionKeys.HumanResources)) //if he is HR guy 
                {
                    var terminateButtons = document.querySelectorAll('.text-bg-danger')
                    terminateButtons.forEach(function (element) {
                        $(element).show()
                    });
                    var newId = self.idPrefix.substring(0, self.idPrefix.lastIndexOf('_'))
                    var resignButtons = document.getElementById(newId).querySelectorAll('.text-bg-success')
                    resignButtons.forEach(function (element) {
                        $(element).show()
                    });
                }
                else
                    this.readOnly = true

            }
        });
    }
    public CheckSubjection(arrayOfDict, input): number {
        var extractedText = input.match(/\((.*?)\)/);
        var trimmedString;
        // Check if text inside parentheses is found
        if (extractedText && extractedText.length > 1)
            trimmedString = extractedText[1]; // Extracted text is at index 1
        else
            trimmedString = input; // If no parentheses found, set trimmed string to original string

        if (trimmedString == 'Others')
            return 0

        for (var i = 0; i < arrayOfDict.length; i++) {
            var dict = arrayOfDict[i];
            for (var key in dict) {
                if (dict[key] == trimmedString)
                    return dict['subjection']
            }
        }
        return 0
    }
    public extractNameAndPrice(input: string): [string, number] {
        var [name, priceString] = input.split(':', 2).map(part => part.trim());
        var price = parseFloat(priceString);
        return [name, price];
    }
    public extractOtRateAndPrice(input: string): [string, number] {

        let equalsIndex = input.indexOf("=");
        // Extract the substring between ':' and '='
        let overtimePayments = input.substring(0, equalsIndex).trim();
        // Extract the substring after '='
        var overtimeAmount = parseFloat(input.substring(equalsIndex + 1).trim());

        return [overtimePayments, overtimeAmount];
    }
    public EmployerTable(): void {
        var self = this
        var EmployerContributionsTable = $('#EmployerContributionsTable')
        var rows = document.getElementById('EmployerContributionsTable').getElementsByTagName('TR');
        // Get the number of rows
        var numRows = rows.length;
        for (var i = numRows - 1; i > 0; i--)
            rows[i].parentNode.removeChild(rows[i]);

        var EmployerContributionCriteria, EmployerContributionAmount = 0
        var NettEmployerContributions = 0
        var i = 0
        for (var index in this.EmployerContributions) {
            var RowNode = document.createElement('TR');
            if ((i + 1) % 2 == 1)
                RowNode.style.backgroundColor = "#f8f8f8"; // Set background color to light gray
            [EmployerContributionCriteria, EmployerContributionAmount] = this.extractNameAndPrice(this.EmployerContributions[index]);
            var EmployerContributionContent1 = document.createElement('TD');
            EmployerContributionContent1.id = "EmployerDesc"
            var EmployerContributionContent2 = document.createElement('input');
            if (!Authorization.hasPermission(PermissionKeys.HumanResources)) //if he is HR guy 
                EmployerContributionContent2.readOnly = true
            EmployerContributionContent2.id = "EmployerContribution"

            var EmployerContributionContentText1 = document.createTextNode(EmployerContributionCriteria);
            EmployerContributionContent2.value = EmployerContributionAmount.toFixed(2).toString()
            EmployerContributionContent2.type = 'number'
            EmployerContributionContent1.appendChild(EmployerContributionContentText1)
            EmployerContributionContent2.addEventListener('change', function () {
                self.UpdateEmployerTable()
                self.EmployerTable()

            });
            EmployerContributionContent1.style.whiteSpace = "nowrap";
            EmployerContributionContent2.style.whiteSpace = "nowrap";
            RowNode.appendChild(EmployerContributionContent1)
            RowNode.appendChild(EmployerContributionContent2)
            NettEmployerContributions += parseFloat(EmployerContributionAmount.toFixed(2).toString())
            i = i + 1

            if (this.ReadOnly == true)
                EmployerContributionContent2.readOnly = true

            EmployerContributionContent2.style.width = "100%";
            EmployerContributionsTable.append(RowNode)
        }
        this.NettEmployerContributions = NettEmployerContributions
        RowNode = document.createElement('TR');
        var NettEmployerContributionContent1 = document.createElement('TD');
        var NettEmployerContributionContent2 = document.createElement('TD');
        var NettEmployerContributionContentText1 = document.createTextNode("Nett Contribution:");
        var NettEmployerContributionContentText2 = document.createTextNode(NettEmployerContributions.toFixed(2).toString());
        NettEmployerContributionContent1.appendChild(NettEmployerContributionContentText1)
        NettEmployerContributionContent2.appendChild(NettEmployerContributionContentText2)
        NettEmployerContributionContent1.style.whiteSpace = "nowrap";
        NettEmployerContributionContent2.style.whiteSpace = "nowrap";

        RowNode.appendChild(NettEmployerContributionContent1)
        RowNode.appendChild(NettEmployerContributionContent2)
        EmployerContributionsTable.append(RowNode)
    }
    public EmployeeTable(): void {
        var self = this
        var TableNode = $('#PayrollTable')
        var TableBody = $('#PayrollTableBody')
        var TableBodyNode
        if (TableBody.length)
            TableBodyNode = document.getElementById('PayrollTableBody')
        else {
            TableBodyNode = document.createElement('tbody')
            TableBodyNode.id = 'PayrollTableBody'
        }
        var Index2
        this.NettDeductions = 0
        this.NettEarnings = 0
        if (this.EarningsString.length > this.DeductionsString.length)
            Index2 = this.EarningsString.length

        else
            Index2 = this.DeductionsString.length
        const pattern: RegExp = /:\s*readonly\b/;
        for (let i = 0; i < Index2; i++) {
            var EarningCriteria, EarningAmount = 0
            var DeductionCriteria, DeductionAmount = 0
            if (this.DeductionsString[i] == undefined)
                [DeductionCriteria, DeductionAmount] = [null, null]
            else
                [DeductionCriteria, DeductionAmount] = this.extractNameAndPrice(this.DeductionsString[i]);


            if (this.EarningsString[i] == undefined)
                [EarningCriteria, EarningAmount] = [null, null]

            else {
                if (this.EarningsString[i].includes('='))
                    [EarningCriteria, EarningAmount] = this.extractOtRateAndPrice(this.EarningsString[i]);

                else
                    [EarningCriteria, EarningAmount] = this.extractNameAndPrice(this.EarningsString[i]);

            }




            var RowNode = document.createElement('TR');
            if ((i + 1) % 2 == 1)
                RowNode.style.backgroundColor = "#f8f8f8"; // Set background color to light gray

            var content1, content2, content3, content4, content2container, content4container
            content2container = document.createElement('TD');
            content4container = document.createElement('TD');
            if ((EarningCriteria == null && EarningAmount == null) || (EarningCriteria == '-')) {
                content1 = document.createElement('TD');
                content2 = document.createElement('TD');
            }
            else {
                this.NettEarnings += EarningAmount
                content1 = document.createElement('TD');

                content2 = document.createElement('input');
                content2.type = "number";
                if (!Authorization.hasPermission(PermissionKeys.HumanResources)) //if he is HR guy 
                    content2.readOnly = true
                var contentText1 = document.createTextNode(EarningCriteria);
                if (pattern.test(this.EarningsString[i]))
                    content2.readOnly = true
                if (this.ReadOnly == true)
                    content2.readOnly = true

                content1.appendChild(contentText1)
                content2.value = EarningAmount.toFixed(2).toString()

            }
            content1.id = 'EarningCriteria'
            content2.id = 'EarningAmount'
            if ((DeductionCriteria == null && DeductionAmount == null) || (DeductionCriteria == '-')) {
                content3 = document.createElement('TD');
                content4 = document.createElement('TD');
            }
            else {
                this.NettDeductions += DeductionAmount
                content3 = document.createElement('TD');
                content4 = document.createElement('input');
                if (!Authorization.hasPermission(PermissionKeys.HumanResources)) //if he is HR guy 
                    content4.readOnly = true
                content4.type = "number";
                var contentText3 = document.createTextNode(DeductionCriteria);
                if (pattern.test(this.DeductionsString[i]))
                    content4.readOnly = true
                if (this.ReadOnly == true)
                    content4.readOnly = true

                content3.appendChild(contentText3)
                content4.value = DeductionAmount.toFixed(2).toString()

            }

            content2container.appendChild(content2)
            content4container.appendChild(content4)

            content3.id = 'DeductionCriteria'
            content2.style.width = "100%";
            content4.style.width = "100%";

            // Ensure content1 stays on one row
            content1.style.whiteSpace = "nowrap";
            content3.style.whiteSpace = "nowrap";
            content4.id = 'DeductionAmount'

            content2container.style.display = "block";
            content4container.style.display = "block";
            content2container.style.width = "100%";
            content4container.style.width = "100%";

            // Ensure content1 stays on one row
            content1.style.whiteSpace = "nowrap";
            content3.style.whiteSpace = "nowrap";
            content1.style.fontSize = "12px"; // Adjust the font size as needed
            content3.style.fontSize = "12px"; // Adjust the font size as needed

            RowNode.appendChild(content1)
            RowNode.appendChild(content2container)
            RowNode.appendChild(content3)
            RowNode.appendChild(content4container)
            content2.addEventListener('change', function () {
                self.ValueChangeCallback()
            });
            var AddCallBack = true
            let ArrayOfGovPayments: string[] = ["SOCSO", "EIS", "PCB", "EPF"];
            if (DeductionCriteria != null) {
                for (var index in ArrayOfGovPayments) {
                    if (DeductionCriteria.includes(ArrayOfGovPayments[index])) {
                        AddCallBack = false
                        break
                    }
                }

            }
            if (AddCallBack == true)
                content4.addEventListener('change', function () {
                    self.ValueChangeCallback()
                });
            else//only update the sum
                content4.addEventListener('change', function () {
                    self.PartialValueChangeCallback()
                });
            TableBodyNode.appendChild(RowNode)
        }

        TableNode.append(TableBodyNode)

        var TableFoot = $('#PayrollTableFoot')
        var TableFootNode
        if (TableFoot.length)
            TableFootNode = document.getElementById('PayrollTableFoot')

        else {
            TableFootNode = document.createElement('tfoot')
            TableFootNode.id = 'PayrollTableFoot'
        }

        var RowNode = document.createElement('TR');
        var contentText1 = document.createTextNode("Nett Earnings:");
        var contentText3 = document.createTextNode("Nett Deductions:");
        var NewContent1 = document.createElement('TD');
        NewContent1.appendChild(contentText1)
        var NewContent2 = document.createElement('TD');
        var NewContentText2 = document.createTextNode(this.NettEarnings.toFixed(2).toString());
        NewContent2.appendChild(NewContentText2)
        var NewContent3 = document.createElement('TD');
        NewContent3.appendChild(contentText3)
        var NewContent4 = document.createElement('TD');
        var NewContentText4 = document.createTextNode(this.NettDeductions.toFixed(2).toString());
        NewContent4.appendChild(NewContentText4)
        NewContent1.id = 'NettEarnings'
        NewContent2.id = 'NettEarningsAmount'
        NewContent3.id = 'NettDeductions'
        NewContent4.id = 'NettDeductionsAmount'
        RowNode.appendChild(NewContent1)
        RowNode.appendChild(NewContent2)
        RowNode.appendChild(NewContent3)
        RowNode.appendChild(NewContent4)
        TableFootNode.appendChild(RowNode)



        var NettSalary = this.NettEarnings - this.NettDeductions
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
        //        TableNode.append(RowNode)
        TableFootNode.appendChild(RowNode)
        TableNode.append(TableFootNode)
        self.NettDeductions = this.NettDeductions
        self.NettEarnings = this.NettEarnings
        self.FinalDeductions = this.DeductionsString
        self.FinalEarnings = this.EarningsString

    }
    public ValueChangeCallback(): void {
        var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'EmployeeRowId')
        var TableBodyNode = $('#PayrollTableBody')
        var TableNode = $('#PayrollTable')
        var TableFootNode = $('#PayrollTableFoot')
        this.NettDeductions = 0
        this.NettEarnings = 0
        this.EarningsString.length = 0
        this.DeductionsString.length = 0
        this.FinalDeductions.length = 0
        this.FinalEarnings.length = 0
        this.EisAmount = 0
        this.EpfAmount = 0
        this.PcbAmount = 0
        this.SocsoAmount = 0
        this.HrdfAmount = 0
        var TableBodyRows = TableBodyNode.find('tr')
        var TableFootRows = TableFootNode.find('tr')
        var Deductions = 0
        var numRows = TableBodyNode.length;
        if (numRows >= 2) // Check if there are at least two rows
            TableNode.slice(numRows - 2).remove(); // Remove the last two rows
        for (var i = 0; i < TableBodyRows.length; i++) {
            const row = $(TableBodyRows[i]);
            // Now, you can select specific elements inside this row
            const EarningsDescription = row.find('#EarningCriteria');
            const EarningsAmount = row.find('#EarningAmount');
            const DeductionsDescription = row.find('#DeductionCriteria');
            const DeductionsAmount = row.find('#DeductionAmount');
            var BufferEarningAmount = parseFloat(EarningsAmount.val())
            var BufferDeductionAmount = parseFloat(DeductionsAmount.val())

            var EarningReadOnly = EarningsAmount.prop('readOnly')
            var DeductionReadOnly = DeductionsAmount.prop('readOnly')
            if (EarningsAmount.val() != '' && EarningsDescription.text() != '') {
                this.EarningsString.push((EarningsDescription.text() + ' : ' + BufferEarningAmount.toFixed(2)).toString() + (EarningReadOnly ? " : readonly" : '').toString())
                var EisSubjection = this.CheckSubjection(this.ListOfEisSubjection, EarningsDescription.text())
                var EpfSubjection = this.CheckSubjection(this.ListOfEpfSubjection, EarningsDescription.text())
                var PcbSubjection = this.CheckSubjection(this.ListOfPcbSubjection, EarningsDescription.text())
                var SocsoSubjection = this.CheckSubjection(this.ListOfSocsoSubjection, EarningsDescription.text())
                var HrdfSubjection = this.CheckSubjection(this.ListOfHrdfSubjection, EarningsDescription.text())

                this.EisAmount += (EisSubjection ? 1 : 0) * BufferEarningAmount
                this.EpfAmount += (EpfSubjection ? 1 : 0) * BufferEarningAmount
                this.PcbAmount += (PcbSubjection ? 1 : 0) * BufferEarningAmount
                this.SocsoAmount += (SocsoSubjection ? 1 : 0) * BufferEarningAmount
                this.HrdfAmount += (HrdfSubjection ? 1 : 0) * BufferEarningAmount

            }

            if (DeductionsAmount.val() != '' && DeductionsDescription.text() != '') {

                var found = 0
                let ArrayOfGovPayments: string[] = ["SOCSO", "EIS", "PCB", "EPF"];
                for (var index in ArrayOfGovPayments) {
                    if (DeductionsDescription.text() == "Employee " + ArrayOfGovPayments[index]) {
                        found = 1
                        break
                    }
                }
                if (found == 0) {
                    this.DeductionsString.push((DeductionsDescription.text() + ' : ' + BufferDeductionAmount.toFixed(2)).toString() + (DeductionReadOnly ? " : readonly" : '').toString())
                    Deductions += BufferDeductionAmount
                }

            }

        }

        if (!isEmptyOrNull(this.ExternalDeduction)) {
            var [DeductionCriteria, DeductionAmount] = this.extractNameAndPrice(this.ExternalDeduction);
            Deductions += DeductionAmount
            this.DeductionsString.push(this.ExternalDeduction)
            this.ExternalDeduction = ''
        }
        if (!isEmptyOrNull(this.ExternalEarning)) {
            var [EarningCriteria, EarningAmount] = this.extractNameAndPrice(this.ExternalEarning);
            var EisSubjection = this.CheckSubjection(this.ListOfEisSubjection, EarningCriteria)
            var EpfSubjection = this.CheckSubjection(this.ListOfEpfSubjection, EarningCriteria)
            var PcbSubjection = this.CheckSubjection(this.ListOfPcbSubjection, EarningCriteria)
            var SocsoSubjection = this.CheckSubjection(this.ListOfSocsoSubjection, EarningCriteria)
            var HrdfSubjection = this.CheckSubjection(this.ListOfHrdfSubjection, EarningCriteria)
            this.EisAmount += (EisSubjection ? 1 : 0) * EarningAmount
            this.EpfAmount += (EpfSubjection ? 1 : 0) * EarningAmount
            this.PcbAmount += (PcbSubjection ? 1 : 0) * EarningAmount
            this.SocsoAmount += (SocsoSubjection ? 1 : 0) * EarningAmount
            this.HrdfAmount += (HrdfSubjection ? 1 : 0) * EarningAmount

            this.EarningsString.push(this.ExternalEarning)
            this.ExternalEarning = ''
        }
        this.EpfAmount -= Deductions
        this.EisAmount -= Deductions
        this.SocsoAmount -= Deductions
        this.PcbAmount -= Deductions
        var doneCalculatingGovPayments = false
        serviceCall<ListResponse<any>>({
            service: PayrollService.baseUrl + '/CalculateGovernmentPayments',
            method: "GET",
            data: {
                "EmployeeRowID": $(EmployeeRowIdElement).val(),
                "EpfAmount": this.EpfAmount,
                "EisAmount": this.EisAmount,
                "SocsoAmount": this.SocsoAmount,
                "PcbAmount": this.PcbAmount,
                "HrdfAmount": this.HrdfAmount
            },
            async: false,
            onSuccess: (response) => {
                var stringList: string[] = ["SOCSO", "PCB", "EIS", "EPF"];
                for (const deduction of this.DeductionsString)
                    for (const str of stringList)
                        if (deduction.includes(str))
                            this.DeductionsString = this.DeductionsString.filter(s => !s.includes(str));
                this.EmployerContributions.length = 0
                if (this.EmployeeType == 1) {// if is local 
                    if (response.Entities[0].EmployeeEPF)
                        this.DeductionsString.push('Employee EPF:' + response.Entities[0].EmployeeEPF.toFixed(2))
                    if (response.Entities[0].EmployeeEIS)
                        this.DeductionsString.push('Employee EIS:' + response.Entities[0].EmployeeEIS.toFixed(2))
                    if (response.Entities[0].EmployeePCB)
                        this.DeductionsString.push('Employee PCB:' + response.Entities[0].EmployeePCB.toFixed(2))
                    if (response.Entities[0].EmployeeSOCSO)
                        this.DeductionsString.push('Employee SOCSO:' + response.Entities[0].EmployeeSOCSO.toFixed(2))
                    if (response.Entities[0].EmployerEPF)
                        this.EmployerContributions.push('EPF:' + response.Entities[0].EmployerEPF)
                    if (response.Entities[0].EmployerEIS)
                        this.EmployerContributions.push('EIS:' + response.Entities[0].EmployerEIS)
                    if (response.Entities[0].EmployerHRDF)
                        this.EmployerContributions.push('HRDF:' + response.Entities[0].EmployerHRDF)
                    if (response.Entities[0].EmployerSOCSO)
                        this.EmployerContributions.push('SOCSO:' + response.Entities[0].EmployerSOCSO)
                    this.EmployeeEis = response.Entities[0].EmployeeEIS
                    this.EmployeeEpf = response.Entities[0].EmployeeEPF
                    this.EmployeeSocso = response.Entities[0].EmployeeSOCSO
                    this.EmployeePcb = response.Entities[0].EmployeePCB
                    this.EmployerEis = response.Entities[0].EmployerEIS
                    this.EmployerEpf = response.Entities[0].EmployerEPF
                    this.EmployerSocso = response.Entities[0].EmployerSOCSO
                    this.EmployerHrdf = response.Entities[0].EmployerHRDF
                }
                else if (this.EmployeeType == 2) {// if is foreigner 
                    this.EmployeeSocso = 0
                    this.EmployerSocso = response.Entities[0].EmployerSOCSO
                    if (response.Entities[0].EmployerSOCSO)
                        this.EmployerContributions.push('SOCSO:' + response.Entities[0].EmployerSOCSO)

                    if (this.EpfSubjection) { // if volunteer for epf payments
                        if (response.Entities[0].EmployeeEPF)
                            this.DeductionsString.push('Employee EPF:' + response.Entities[0].EmployeeEPF.toFixed(2))
                        if (response.Entities[0].EmployerEPF)
                            this.EmployerContributions.push('EPF:' + response.Entities[0].EmployerEPF)
                        this.EmployeeEpf = response.Entities[0].EmployeeEPF
                        this.EmployerEpf = response.Entities[0].EmployerEPF
                    }
                    this.DeductionsString.push('Employee PCB:' + response.Entities[0].EmployeePCB.toFixed(2))
                    this.EmployeePcb = response.Entities[0].EmployeePCB

                    this.EmployeeEis = this.EmployerEis = 0
                    this.EmployerHrdf = 0

                }
                doneCalculatingGovPayments = true
            }
        })
        while (doneCalculatingGovPayments == false) { }
        TableBodyRows.slice(0).remove(); // Remove all rows
        TableFootRows.slice(0).remove();
        this.EmployeeTable()
        this.EmployerTable()
    }
    public PartialValueChangeCallback(): void {
        var TableBodyNode = $('#PayrollTableBody')
        var TableNode = $('#PayrollTable')
        var TableFootNode = $('#PayrollTableFoot')
        var TableBodyRows = TableBodyNode.find('tr')
        var TableFootRows = TableFootNode.find('tr')
        this.NettDeductions = 0
        this.NettEarnings = 0
        this.EarningsString.length = 0
        this.DeductionsString.length = 0
        this.FinalDeductions.length = 0
        this.FinalEarnings.length = 0
        this.EisAmount = 0
        this.EpfAmount = 0
        this.PcbAmount = 0
        this.SocsoAmount = 0
        this.HrdfAmount = 0
        var numRows = TableBodyNode.length;
        if (numRows >= 2) // Check if there are at least two rows
            TableNode.slice(numRows - 2).remove(); // Remove the last two rows

        for (var i = 0; i < TableBodyRows.length; i++) {
            const row = $(TableBodyRows[i]);
            // Now, you can select specific elements inside this row
            const EarningsDescription = row.find('#EarningCriteria');
            const EarningsAmount = row.find('#EarningAmount');
            const DeductionsDescription = row.find('#DeductionCriteria');
            const DeductionsAmount = row.find('#DeductionAmount');
            var BufferEarningAmount = parseFloat(EarningsAmount.val())
            var BufferDeductionAmount = parseFloat(DeductionsAmount.val())

            var EarningReadOnly = EarningsAmount.prop('readOnly')
            var DeductionReadOnly = DeductionsAmount.prop('readOnly')
            if (EarningsAmount.val() != '' && EarningsDescription.text() != '')
                this.EarningsString.push((EarningsDescription.text() + ' : ' + BufferEarningAmount.toFixed(2)).toString() + (EarningReadOnly ? " : readonly" : '').toString())

            if (DeductionsAmount.val() != '' && DeductionsDescription.text() != '')
                this.DeductionsString.push((DeductionsDescription.text() + ' : ' + BufferDeductionAmount.toFixed(2)).toString() + (DeductionReadOnly ? " : readonly" : '').toString())
        }
        TableBodyRows.slice(0).remove(); // Remove all rows
        TableFootRows.slice(0).remove();
        this.EmployeeTable()
        this.EmployerTable()
    }
    public UpdateEmployerTable(): void {
        this.EmployerContributions.length = 0
        var rows = $('#EmployerContributionsTable').find('TR');

        for (var i = 0; i < rows.length; i++) {
            const row = $(rows[i]);

            // Now, you can select specific elements inside this row
            const EarningsDescription = row.find('#EmployerDesc');
            const EarningsAmount = row.find('#EmployerContribution');

            var BufferEarningAmount = parseFloat(EarningsAmount.val())

            if (EarningsAmount.val() != '' && EarningsDescription.text() != '')
                this.EmployerContributions.push((EarningsDescription.text() + ' : ' + BufferEarningAmount.toFixed(2)).toString())
        }
    }
    protected getToolbarButtons() {
        var buttons = super.getToolbarButtons();
        var warningElement = document.createElement('dialog');
        var warningElementTextNode = document.createTextNode("There is already a similar record! Please check again");
        warningElement.innerHTML = ` <button id="closeDialog" class = "text-bg-danger p-2">Close</button> `;
        const WarningDocumentCloseButton = warningElement.querySelector("#closeDialog") as HTMLButtonElement;

        // Add event listener to close the dialog when the close button is clicked
        WarningDocumentCloseButton.addEventListener("click", () => {
            warningElement.close();
        });
        warningElement.appendChild(warningElementTextNode)
        document.body.appendChild(warningElement);



        var warningDescriptionElement = document.createElement('dialog');
        var warningDescriptionTextNode = document.createTextNode("Please fill in the Description");
        warningDescriptionElement.innerHTML = ` <button id="closeDialog" class = "text-bg-danger p-2">Close</button> `;
        const warningDescriptionCloseButton = warningDescriptionElement.querySelector("#closeDialog") as HTMLButtonElement;

        // Add event listener to close the dialog when the close button is clicked
        warningDescriptionCloseButton.addEventListener("click", () => {
            warningDescriptionElement.close();
        });
        warningDescriptionCloseButton.appendChild(warningDescriptionTextNode)
        document.body.appendChild(warningDescriptionElement);



        var warningEarningsElement = document.createElement('dialog');
        var warningEarningsTextNode = document.createTextNode("Please fill in the Description");
        warningEarningsElement.innerHTML = ` <button id="closeDialog" class = "text-bg-danger p-2">Close</button> `;
        const warningEarningsCloseButton = warningEarningsElement.querySelector("#closeDialog") as HTMLButtonElement;

        // Add event listener to close the dialog when the close button is clicked
        warningEarningsCloseButton.addEventListener("click", () => {
            warningEarningsElement.close();
        });
        warningEarningsCloseButton.appendChild(warningEarningsTextNode)
        document.body.appendChild(warningEarningsElement);
        var EarningsDocument = document.createElement('dialog')
        EarningsDocument.title = 'Add Earnings'
        EarningsDocument.id = "AddEarnings"
        //EarningsDocument.style.position = "fixed";
        EarningsDocument.style.top = "50%";
        EarningsDocument.style.left = "50%";
        EarningsDocument.style.transform = "translate(-50%, -50%)";
        EarningsDocument.innerHTML = `  <button id="confirmAddEarnings"  class = "text-bg-success p-2">Confirm</button>  <button id="closeDialog"  class = "text-bg-danger p-2">Close</button> `;
        EarningsDocument.style.zIndex = "100000"; // Set a high z-index value
        EarningsDocument.tabIndex = -1
        EarningsDocument.addEventListener("", () => {
            EarningsDocument.close();
        });
        const EarningsDocumentCloseButton = EarningsDocument.querySelector("#closeDialog") as HTMLButtonElement;
        EarningsDocumentCloseButton.addEventListener("click", () => {
            EarningsDocument.close();
        });
        const EarningsDocumentConfirmButton = EarningsDocument.querySelector("#confirmAddEarnings") as HTMLButtonElement;
        EarningsDocumentConfirmButton.addEventListener("click", () => {
            var DescriptionElement = document.getElementById('NewEarningsDescription') as HTMLInputElement;
            var AmountElement = document.getElementById('NewEarningsAmount') as HTMLInputElement;
            var EarningsBuffer = '(' + this.ListOfCriteria[$('#NewEarningsCategory').val() - 1] + ')' + DescriptionElement.value + ' : ' + AmountElement.value
            console.log($(DescriptionElement))

            if ($(DescriptionElement).val() == '') {
                notifyError('Please fill in the description')
                return
            }
            if ($(AmountElement).val() == '') {
                notifyError('Please fill in the amount')
                return
            }
            for (var index in this.ExternalEarnings) {
                if (this.ExternalEarnings[index] == EarningsBuffer) {
                    warningElement.showModal()
                    return
                }
            }
            this.ExternalEarning = EarningsBuffer
            this.ValueChangeCallback()
            EarningsDocument.close();
            DeductionsDocument.close();
        });
        var EarningsTable = document.createElement('table');


        var Earnings = document.createElement('TR');
        Earnings.style.zIndex = "100000"

        var NewEarningsCategory = document.createElement('TD');
        var NewEarningsCategoryInput = document.createElement('input');
        NewEarningsCategoryInput.id = "NewEarningsCategory"

        var NewEarningsCategoryTextNode = document.createTextNode("Category");
        NewEarningsCategory.appendChild(NewEarningsCategoryTextNode)
        var NewEarningsDescription = document.createElement('TD');
        var NewEarningsDescriptionInput = document.createElement('input') as HTMLInputElement;
        NewEarningsDescriptionInput.id = "NewEarningsDescription"

        var NewEarningsAmount = document.createElement('TD');
        var NewEarningsAmountInputContainer = document.createElement('div')
        var NewEarningsAmountInput = document.createElement('input') as HTMLInputElement;
        NewEarningsAmountInput.id = "NewEarningsAmount"
        var NewEarningsDescriptionTextNode = document.createTextNode("Description");
        var NewEarningsAmountTextNode = document.createTextNode("Earnings");

        NewEarningsDescription.appendChild(NewEarningsDescriptionTextNode)
        NewEarningsDescriptionInput.type = "text"
        NewEarningsAmount.appendChild(NewEarningsAmountTextNode)
        NewEarningsAmountInput.type = "number";
        NewEarningsAmountInputContainer.appendChild(NewEarningsAmountInput)
        Earnings.appendChild(NewEarningsCategory)
        Earnings.appendChild(NewEarningsCategoryInput)

        Earnings.appendChild(NewEarningsDescription)
        Earnings.appendChild(NewEarningsDescriptionInput)
        Earnings.appendChild(NewEarningsAmount)
        Earnings.appendChild(NewEarningsAmountInputContainer)
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
        DeductionsDocument.innerHTML = `  <button id="confirmAddDeductions" class = "text-bg-success p-2">Confirm</button>  <button id="closeDialog"  class = "text-bg-danger p-2">Close</button> `;
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
            this.ExternalDeduction = DeductionsBuffer
            this.ExternalDeductions.push(DeductionsBuffer)
            this.ValueChangeCallback()
            EarningsDocument.close();
            DeductionsDocument.close();
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
                cssClass: 'text-bg-success p-2',
                icon: 'fa-plus text-green',
                onClick: () => {
                    const state = document.getElementById('AddEarnings') as HTMLDialogElement;
                    if (state.open)
                        return
                    //EarningsDocument.showModal()
                    //                    EarningsDocument.showModal()
                    // *** do something on click if you want **
                    var dialogId = this.idPrefix + "PropertyGrid"
                    // document.getElementById(dialogId).parentElement.tabIndex = 2
                    var haha = document.getElementById(dialogId).parentElement.tabIndex
                    EarningsDocument.showModal()
                    var buffer = document.getElementById("AddDeductions")
                    if (buffer)
                        (buffer as any).close()
                },
            }
        );
        buttons.push(
            {
                title: "Add Deductions",	// *** Get button text from translation
                cssClass: 'text-bg-danger p-2',
                icon: 'fa-minus text-red',
                onClick: () => {
                    const state = document.getElementById('AddDeductions') as HTMLDialogElement;
                    if (state.open)
                        return
                    DeductionsDocument.showModal()
                    // *** do something on click if you want **
                    var buffer = document.getElementById("AddEarnings")
                    if (buffer) {
                        (buffer as any).close()
                    }
                },
            }
        );
        return buttons;
    }
    protected save_submitHandler(response): void {
        var res = response
        var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'EmployeeRowId')
        var self = this
        if (self.isNew()) {
            PayrollService.List({
            }, response => {
                for (var PayrollServiceIndex in response.Entities) {
                    var CurrentRecordMonth = response.Entities[PayrollServiceIndex].PayMonth
                    var CurrentRecordYear = response.Entities[PayrollServiceIndex].PayYear
                    var PayMonthElement = document.getElementById(this.idPrefix + 'PayMonth')
                    var PayYearElement = document.getElementById(this.idPrefix + 'PayYear')
                    var convertedDateMonth = parseInt($(PayMonthElement).val())
                    var convertedDateYear = parseInt($(PayYearElement).val())

                    if (convertedDateMonth == CurrentRecordMonth
                        && convertedDateYear == CurrentRecordYear
                        && response.Entities[PayrollServiceIndex].EmployeeRowId == $(EmployeeRowIdElement).val()) {
                        notifyError('The employee already have payslip for current month')
                        if (self.isNew())
                            self.saveAndCloseButton.hide()

                        return
                    }
                }
                var TableDescriptor = '', EmployerDescriptor = ''
                var index = 0
                if (this.FinalDeductions.length > this.FinalEarnings.length)
                    index = this.FinalDeductions.length
                else
                    index = this.FinalEarnings.length
                for (let i = 0; i < index; i++) {
                    var DeductionString = this.FinalDeductions[i]
                    var EarningString = this.FinalEarnings[i]

                    if (DeductionString === undefined)
                        DeductionString = '-'

                    if (EarningString === undefined)
                        EarningString = '-'
                    DeductionString = String.fromCharCode(0x88) + DeductionString + String.fromCharCode(0x99)
                    EarningString = String.fromCharCode(0x88) + EarningString + String.fromCharCode(0x99)
                    TableDescriptor += EarningString
                    TableDescriptor += DeductionString
                }
                index = this.EmployerContributions.length
                for (let i = 0; i < index; i++) {
                    var EmployerString = this.EmployerContributions[i]
                    EmployerString = String.fromCharCode(0x88) + EmployerString + String.fromCharCode(0x99)
                    EmployerDescriptor += EmployerString
                }
                this.form.Deduction.value = this.NettDeductions
                this.form.Earnings.value = this.NettEarnings
                this.form.Nett.value = this.form.Earnings.value - this.form.Deduction.value
                this.form['EmployerHRDF'].value = this.EmployerHrdf
                this.form['EmployerEPF'].value = this.EmployerEpf
                this.form['EmployerEIS'].value = this.EmployerEis
                this.form['EmployerSOCSO'].value = this.EmployerSocso
                this.form['EmployeeEIS'].value = this.EmployeeEis
                this.form['EmployeeEPF'].value = this.EmployeeEpf
                this.form['EmployeePCB'].value = this.EmployeePcb
                this.form['EmployeeSOCSO'].value = this.EmployeeSocso
                this.form['PayrollTable'].value = TableDescriptor
                this.form['EmployerTable'].value = EmployerDescriptor
                for (var id in this.OtPayId)
                    OTApplicationService.Update({
                        EntityId: this.OtPayId[id],
                        Entity:
                        {
                            "Paid": 1
                        },
                    });
                for (var id in this.MoneyClaimingId)
                    MoneyClaimApplicationService.Update({
                        EntityId: this.MoneyClaimingId[id],
                        Entity:
                        {
                            "Paid": 1
                        },
                    });
                for (var id in this.NoPaidLeaveId)
                    NoPaidLeaveService.Update({
                        EntityId: this.NoPaidLeaveId[id],
                        Entity:
                        {
                            "Deducted": 1
                        },
                    });
                for (var id in this.LateArrivalId)
                    EmployeeLateService.Update({
                        EntityId: this.LateArrivalId[id],
                        Entity:
                        {
                            "Deducted": 1
                        },
                    });

                for (var id in this.EarlyLeavingId)
                    EmployeeEarlyLeavingService.Update({
                        EntityId: this.EarlyLeavingId[id],
                        Entity:
                        {
                            "Deducted": 1
                        },
                    });

                super.save_submitHandler(res)


            })

        }
        else {
            var TableDescriptor = '', EmployerDescriptor = ''
            var index = 0
            if (this.FinalDeductions.length > this.FinalEarnings.length)
                index = this.FinalDeductions.length
            else
                index = this.FinalEarnings.length
            for (let i = 0; i < index; i++) {
                var DeductionString = this.FinalDeductions[i]
                var EarningString = this.FinalEarnings[i]
                if (DeductionString === undefined)
                    DeductionString = '-'
                if (EarningString === undefined)
                    EarningString = '-'
                DeductionString = String.fromCharCode(0x88) + DeductionString + String.fromCharCode(0x99)
                EarningString = String.fromCharCode(0x88) + EarningString + String.fromCharCode(0x99)
                TableDescriptor += EarningString
                TableDescriptor += DeductionString
            }
            index = this.EmployerContributions.length
            for (let i = 0; i < index; i++) {
                var EmployerString = this.EmployerContributions[i]
                EmployerString = String.fromCharCode(0x88) + EmployerString + String.fromCharCode(0x99)
                EmployerDescriptor += EmployerString
            }
            this.form.Deduction.value = this.NettDeductions
            this.form.Earnings.value = this.NettEarnings
            this.form.Nett.value = this.form.Earnings.value - this.form.Deduction.value
            this.form['EmployerHRDF'].value = this.EmployerHrdf
            this.form['EmployerEPF'].value = this.EmployerEpf
            this.form['EmployerEIS'].value = this.EmployerEis
            this.form['EmployerSOCSO'].value = this.EmployerSocso
            this.form['EmployeeEIS'].value = this.EmployeeEis
            this.form['EmployeeEPF'].value = this.EmployeeEpf
            this.form['EmployeePCB'].value = this.EmployeePcb
            this.form['EmployeeSOCSO'].value = this.EmployeeSocso
            this.form['PayrollTable'].value = TableDescriptor
            this.form['EmployerTable'].value = EmployerDescriptor
            super.save_submitHandler(res)
        }
    }
    protected onSaveSuccess(response): void {
        super.onSaveSuccess(response);
        if (!this.isNew()) {
            var queryString = "PayrollRowId=" + encodeURIComponent(this.entityId)
            var url = window.location.origin + '/PayrollSettings/Payroll/PdfSharpConvert?' + queryString
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.send()
        }
    }
}