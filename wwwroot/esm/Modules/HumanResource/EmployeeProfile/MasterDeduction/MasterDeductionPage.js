import{k as w,l as c,q as R,r as d,s,t as a}from"../../../../_chunks/chunk-KJR5IZZY.js";import"../../../../_chunks/chunk-2SJ2SYN6.js";import"../../../../_chunks/chunk-K2UT2MVJ.js";import{a as D}from"../../../../_chunks/chunk-DNINIZJD.js";import{c as o,g as i,h as n,k as y}from"../../../../_chunks/chunk-L3ECGIWB.js";var h=i(y(),1);var m=i(D(),1);var u=i(D(),1);var l=i(y(),1);var e=class extends u.EntityDialog{constructor(){super(...arguments);this.form=new d(this.idPrefix)}getFormKey(){return d.formKey}getRowDefinition(){return s}getService(){return a.baseUrl}save_submitHandler(p){var v=p,r=this;if(this.form.Recurring.value==!1&&this.form.OneTime.value==!1){(0,l.alertDialog)("Please choose the frequency of this allowance");return}this.isNew()?super.save_submitHandler(p):(0,l.confirmDialog)("Do you want to update all employee with the Deduction?",()=>{c.List({Criteria:[[w.Fields.MasterDeductionId],"=",r.entityId]},g=>{for(var C in g.Entities)c.Update({EntityId:g.Entities[C].Id,Entity:{DeductionCode:r.form.DeductionCode.value,Amount:r.form.Amount.value,Description:r.form.Description.value,OneTime:r.form.OneTime.value,Recurring:r.form.Recurring.value}});super.save_submitHandler(v)})},{onNo:()=>{super.save_submitHandler(v)}})}};o(e,"MasterDeductionDialog"),e=n([u.Decorators.registerClass("HRMSoftware.EmployeeProfile.MasterDeductionDialog")],e);var t=class extends m.EntityGrid{getColumnsKey(){return R.columnsKey}getDialogType(){return e}getRowDefinition(){return s}getService(){return a.baseUrl}constructor(f){super(f)}};o(t,"MasterDeductionGrid"),t=n([m.Decorators.registerClass("HRMSoftware.EmployeeProfile.MasterDeductionGrid")],t);function E(){(0,h.initFullHeightGridPage)(new t($("#GridDiv")).element)}o(E,"pageInit");export{E as default};
//# sourceMappingURL=MasterDeductionPage.js.map