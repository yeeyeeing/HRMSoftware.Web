import{Y as r,Z as l,_ as c}from"./chunk-JVVTNWA6.js";import{a as d}from"./chunk-DNINIZJD.js";import{c as s,g as n,h as a,k as p}from"./chunk-L3ECGIWB.js";var o=n(d(),1);var m=n(p(),1);var e=class extends o.EntityDialog{constructor(){super(...arguments);this.form=new r(this.idPrefix)}getFormKey(){return r.formKey}getRowDefinition(){return l}getService(){return c.baseUrl}save_submitHandler(t){var i=t;this.isNew()==!1?(0,m.confirm)("Edit changes to the company settings? The changes will take effect next month",()=>{super.save_submitHandler(i)}):super.save_submitHandler(t)}dialogOpen(t){super.dialogOpen(t),this.applyChangesButton.hide(),this.deleteButton.hide();var i=this;this.undeleteButton.remove(),this.localizationButton.remove(),this.cloneButton.remove()}};s(e,"SocsoSubjectionDialog"),e=a([o.Decorators.registerClass("HRMSoftware.PayrollSettings.SocsoSubjectionDialog")],e);export{e as a};
//# sourceMappingURL=chunk-Z5G2QNGG.js.map