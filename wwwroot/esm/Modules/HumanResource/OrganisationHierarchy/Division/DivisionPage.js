import{c as v,d as f,e as c,f as o}from"../../../../_chunks/chunk-HERT6KZV.js";import"../../../../_chunks/chunk-TIB4BNCY.js";import"../../../../_chunks/chunk-DMDSRNFC.js";import{a as u}from"../../../../_chunks/chunk-DNINIZJD.js";import{c as r,g as n,h as a,k as d}from"../../../../_chunks/chunk-L3ECGIWB.js";var h=n(d(),1);var p=n(u(),1);var m=n(u(),1);var g=n(d(),1);var e=class extends m.EntityDialog{constructor(){super();this.form=new f(this.idPrefix);this.list_of_division=[];o.List({},s=>{for(var i in s.Entities)this.list_of_division.push(s.Entities[i].Name.toLowerCase())})}getFormKey(){return f.formKey}getRowDefinition(){return c}getService(){return o.baseUrl}save_submitHandler(s){var i=[],y=this.form.Name.value.toLowerCase();for(var _ in this.list_of_division)this.list_of_division[_]===y&&i.push("This Division is inserted.");if(i.length>0){let D=i.map(R=>`- ${R}`).join(`
`);(0,g.alertDialog)(D)}else super.save_submitHandler(s)}};r(e,"DivisionDialog"),e=a([m.Decorators.registerClass("HRMSoftware.OrganisationHierarchy.DivisionDialog")],e);var t=class extends p.EntityGrid{getColumnsKey(){return v.columnsKey}getDialogType(){return e}getRowDefinition(){return c}getService(){return o.baseUrl}constructor(l){super(l)}};r(t,"DivisionGrid"),t=a([p.Decorators.registerClass("HRMSoftware.OrganisationHierarchy.DivisionGrid")],t);function H(){(0,h.initFullHeightGridPage)(new t($("#GridDiv")).element)}r(H,"pageInit");export{H as default};
//# sourceMappingURL=DivisionPage.js.map