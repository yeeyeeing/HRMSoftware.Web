import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { GridEditorBase } from "@serenity-is/extensions";
import { PerformanceAppraisalTemplateQuestionColumns, PerformanceAppraisalTemplateQuestionRow } from '../../ServerTypes/PerformanceAppraisal';
import { PerformanceAppraisalTemplateQuestionEditDialog} from "./PerformanceAppraisalTemplateQuestionEditDialog";

@Decorators.registerEditor('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateQuestionEditor')
export class PerformanceAppraisalTemplateQuestionEditor extends GridEditorBase<PerformanceAppraisalTemplateQuestionRow, any> {
    protected getColumnsKey() { return PerformanceAppraisalTemplateQuestionColumns.columnsKey; }
    protected getLocalTextPrefix() { return PerformanceAppraisalTemplateQuestionRow.localTextPrefix; }

    constructor(container: JQuery) {
        super(container);
    }

    protected getDialogType() { return PerformanceAppraisalTemplateQuestionEditDialog; }

    protected getAddButtonCaption() {
        return "Add";
    }
}
