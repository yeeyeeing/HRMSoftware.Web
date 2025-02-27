import{a as ke,b as ft,c as _t,d as Rt,e as Ke,f as Pe}from"../../../../_chunks/chunk-PMW367QL.js";import{d as kt}from"../../../../_chunks/chunk-HHF47QKB.js";import"../../../../_chunks/chunk-DA7Z2NN7.js";import{a as de}from"../../../../_chunks/chunk-27W64ILM.js";import"../../../../_chunks/chunk-NN5FEWI3.js";import"../../../../_chunks/chunk-KCWQ5BXW.js";import{f as At,r as It}from"../../../../_chunks/chunk-MVZ476J5.js";import"../../../../_chunks/chunk-DMDSRNFC.js";import{a as St}from"../../../../_chunks/chunk-LLMDZJQJ.js";import"../../../../_chunks/chunk-MUCPV7IN.js";import"../../../../_chunks/chunk-K2UT2MVJ.js";import{a as Ft}from"../../../../_chunks/chunk-DNINIZJD.js";import{a as Lt,c as L,g as $e,j as Xe,k as Ze}from"../../../../_chunks/chunk-L3ECGIWB.js";var Ce=class{constructor(e){this._name="OrgChart",Promise.prototype.finally=function(o){let u=this.constructor;return this.then(_=>u.resolve(o()).then(()=>_),_=>u.resolve(o()).then(()=>{throw _}))};let t=this,r={nodeTitle:"name",nodeId:"id",toggleSiblingsResp:!1,depth:999,chartClass:"",exportButton:!1,exportFilename:"OrgChart",parentNodeSymbol:"fa-users",draggable:!1,direction:"t2b",pan:!1,zoom:!1},i=Object.assign(r,e),a=i.data,c=document.createElement("div"),d=document.querySelector(i.chartContainer);if(this.options=i,delete this.options.data,this.chart=c,this.chartContainer=d,c.dataset.options=JSON.stringify(i),c.setAttribute("class","orgchart"+(i.chartClass!==""?" "+i.chartClass:"")+(i.direction!=="t2b"?" "+i.direction:"")),typeof a=="object")this.buildHierarchy(c,i.ajaxURL?a:this._attachRel(a,"00"),0);else if(typeof a=="string"&&a.startsWith("#"))this.buildHierarchy(c,this._buildJsonDS(document.querySelector(a).children[0]),0);else{let o=document.createElement("i");o.setAttribute("class","fa fa-circle-o-notch fa-spin spinner"),c.appendChild(o),this._getJSON(a).then(function(u){t.buildHierarchy(c,i.ajaxURL?u:t._attachRel(u,"00"),0)}).catch(function(u){console.error("failed to fetch datasource for orgchart",u)}).finally(function(){let u=c.querySelector(".spinner");u.parentNode.removeChild(u)})}if(c.addEventListener("click",this._clickChart.bind(this)),i.exportButton&&!d.querySelector(".oc-export-btn")){let o=document.createElement("button"),u=document.createElement("a");o.setAttribute("class","oc-export-btn"+(i.chartClass!==""?" "+i.chartClass:"")),o.innerHTML="Export",o.addEventListener("click",this._clickExportButton.bind(this)),u.setAttribute("class","oc-download-btn"+(i.chartClass!==""?" "+i.chartClass:"")),u.setAttribute("download",i.exportFilename+".png"),d.appendChild(o),d.appendChild(u)}i.pan&&(d.style.overflow="hidden",c.addEventListener("mousedown",this._onPanStart.bind(this)),c.addEventListener("touchstart",this._onPanStart.bind(this)),document.body.addEventListener("mouseup",this._onPanEnd.bind(this)),document.body.addEventListener("touchend",this._onPanEnd.bind(this))),i.zoom&&(d.addEventListener("wheel",this._onWheeling.bind(this)),d.addEventListener("touchstart",this._onTouchStart.bind(this)),document.body.addEventListener("touchmove",this._onTouchMove.bind(this)),document.body.addEventListener("touchend",this._onTouchEnd.bind(this))),d.appendChild(c)}get name(){return this._name}_closest(e,t){return e&&(t(e)&&e!==this.chart?e:this._closest(e.parentNode,t))}_siblings(e,t){return Array.from(e.parentNode.children).filter(r=>r!==e?t?e.matches(t):!0:!1)}_prevAll(e,t){let r=[],i=e.previousElementSibling;for(;i;)(!t||i.matches(t))&&r.push(i),i=i.previousElementSibling;return r}_nextAll(e,t){let r=[],i=e.nextElementSibling;for(;i;)(!t||i.matches(t))&&r.push(i),i=i.nextElementSibling;return r}_isVisible(e){return e.offsetParent!==null}_addClass(e,t){e.forEach(r=>{t.indexOf(" ")>0?t.split(" ").forEach(i=>r.classList.add(i)):r.classList.add(t)})}_removeClass(e,t){e.forEach(r=>{t.indexOf(" ")>0?t.split(" ").forEach(i=>r.classList.remove(i)):r.classList.remove(t)})}_css(e,t,r){e.forEach(i=>{i.style[t]=r})}_removeAttr(e,t){e.forEach(r=>{r.removeAttribute(t)})}_one(e,t,r,i){let a=L(function(c){try{r.call(i,c)}finally{e.removeEventListener(t,a)}},"one");e.addEventListener(t,a)}_getDescElements(e,t){let r=[];return e.forEach(i=>r.push(...i.querySelectorAll(t))),r}_getJSON(e){return new Promise(function(t,r){let i=new XMLHttpRequest;function a(){this.readyState===4&&(this.status===200?t(JSON.parse(this.response)):r(new Error(this.statusText)))}L(a,"handler"),i.open("GET",e),i.onreadystatechange=a,i.responseType="json",i.setRequestHeader("Content-Type","application/json"),i.send()})}_buildJsonDS(e){let t={name:e.firstChild.textContent.trim(),relationship:(e.parentNode.parentNode.nodeName==="LI"?"1":"0")+(e.parentNode.children.length>1?1:0)+(e.children.length?1:0)};return e.id&&(t.id=e.id),e.querySelector("ul")&&Array.from(e.querySelector("ul").children).forEach(r=>{t.children||(t.children=[]),t.children.push(this._buildJsonDS(r))}),t}_attachRel(e,t){if(e.relationship=t+(e.children&&e.children.length>0?1:0),e.children)for(let r of e.children)this._attachRel(r,"1"+(e.children.length>1?1:0));return e}_repaint(e){e&&(e.style.offsetWidth=e.offsetWidth)}_isInAction(e){return e.querySelector(":scope > .edge").className.indexOf("fa-")>-1}_getNodeState(e,t){let r,i={exist:!1,visible:!1};return t==="parent"?(r=this._closest(e,a=>a.classList&&a.classList.contains("nodes")),r&&(i.exist=!0),i.exist&&this._isVisible(r.parentNode.children[0])&&(i.visible=!0)):t==="children"?(r=this._closest(e,a=>a.nodeName==="TR").nextElementSibling,r&&(i.exist=!0),i.exist&&this._isVisible(r)&&(i.visible=!0)):t==="siblings"&&(r=this._siblings(this._closest(e,a=>a.nodeName==="TABLE").parentNode),r.length&&(i.exist=!0),i.exist&&r.some(a=>this._isVisible(a))&&(i.visible=!0)),i}getRelatedNodes(e,t){return t==="parent"?this._closest(e,r=>r.classList.contains("nodes")).parentNode.children[0].querySelector(".node"):t==="children"?Array.from(this._closest(e,r=>r.nodeName==="TABLE").lastChild.children).map(r=>r.querySelector(".node")):t==="siblings"?this._siblings(this._closest(e,r=>r.nodeName==="TABLE").parentNode).map(r=>r.querySelector(".node")):[]}_switchHorizontalArrow(e){let t=this.options,r=e.querySelector(".leftEdge"),i=e.querySelector(".rightEdge"),a=this._closest(e,c=>c.nodeName==="TABLE").parentNode;if(t.toggleSiblingsResp&&(typeof t.ajaxURL=="undefined"||this._closest(e,c=>c.classList.contains(".nodes")).dataset.siblingsLoaded)){let c=a.previousElementSibling,d=a.nextElementSibling;c&&(c.classList.contains("hidden")?(r.classList.add("fa-chevron-left"),r.classList.remove("fa-chevron-right")):(r.classList.add("fa-chevron-right"),r.classList.remove("fa-chevron-left"))),d&&(d.classList.contains("hidden")?(i.classList.add("fa-chevron-right"),i.classList.remove("fa-chevron-left")):(i.classList.add("fa-chevron-left"),i.classList.remove("fa-chevron-right")))}else{let c=this._siblings(a),d=c.length?!c.some(o=>o.classList.contains("hidden")):!1;r.classList.toggle("fa-chevron-right",d),r.classList.toggle("fa-chevron-left",!d),i.classList.toggle("fa-chevron-left",d),i.classList.toggle("fa-chevron-right",!d)}}_hoverNode(e){let t=e.target,r=!1,i=t.querySelector(":scope > .topEdge"),a=t.querySelector(":scope > .bottomEdge"),c=t.querySelector(":scope > .leftEdge");e.type==="mouseenter"?(i&&(r=this._getNodeState(t,"parent").visible,i.classList.toggle("fa-chevron-up",!r),i.classList.toggle("fa-chevron-down",r)),a&&(r=this._getNodeState(t,"children").visible,a.classList.toggle("fa-chevron-down",!r),a.classList.toggle("fa-chevron-up",r)),c&&this._switchHorizontalArrow(t)):Array.from(t.querySelectorAll(":scope > .edge")).forEach(d=>{d.classList.remove("fa-chevron-up","fa-chevron-down","fa-chevron-right","fa-chevron-left")})}_clickNode(e){let t=e.currentTarget,r=this.chart.querySelector(".focused");r&&r.classList.remove("focused"),t.classList.add("focused")}_buildParentNode(e,t,r){let i=this,a=document.createElement("table");t.relationship=t.relationship||"001",this._createNode(t,0).then(function(c){let d=i.chart;c.classList.remove("slide-up"),c.classList.add("slide-down");let o=document.createElement("tr"),u=document.createElement("tr"),_=document.createElement("tr"),b=document.createElement("tr");o.setAttribute("class","hidden"),o.innerHTML='<td colspan="2"></td>',a.appendChild(o),u.setAttribute("class","lines hidden"),u.innerHTML='<td colspan="2"><div class="downLine"></div></td>',a.appendChild(u),_.setAttribute("class","lines hidden"),_.innerHTML='<td class="rightLine">&nbsp;</td><td class="leftLine">&nbsp;</td>',a.appendChild(_),b.setAttribute("class","nodes"),b.innerHTML='<td colspan="2"></td>',a.appendChild(b),a.querySelector("td").appendChild(c),d.insertBefore(a,d.children[0]),a.children[3].children[0].appendChild(d.lastChild),r()}).catch(function(c){console.error("Failed to create parent node",c)})}_switchVerticalArrow(e){e.classList.toggle("fa-chevron-up"),e.classList.toggle("fa-chevron-down")}showParent(e){let t=this._prevAll(this._closest(e,i=>i.classList.contains("nodes")));this._removeClass(t,"hidden"),this._addClass(Array(t[0].children).slice(1,-1),"hidden");let r=t[2].querySelector(".node");this._one(r,"transitionend",function(){r.classList.remove("slide"),this._isInAction(e)&&this._switchVerticalArrow(e.querySelector(":scope > .topEdge"))},this),this._repaint(r),r.classList.add("slide"),r.classList.remove("slide-down")}showSiblings(e,t){let r=[],i=this._closest(e,c=>c.nodeName==="TABLE").parentNode;t?r=t==="left"?this._prevAll(i):this._nextAll(i):r=this._siblings(i),this._removeClass(r,"hidden");let a=this._prevAll(this._closest(e,c=>c.classList.contains("nodes")));if(i=Array.from(a[0].querySelectorAll(":scope > .hidden")),t?this._removeClass(i.slice(0,r.length*2),"hidden"):this._removeClass(i,"hidden"),!this._getNodeState(e,"parent").visible){this._removeClass(a,"hidden");let c=a[2].querySelector(".node");this._one(c,"transitionend",function(d){d.target.classList.remove("slide")},this),this._repaint(c),c.classList.add("slide"),c.classList.remove("slide-down")}r.forEach(c=>{Array.from(c.querySelectorAll(".node")).forEach(d=>{this._isVisible(d)&&(d.classList.add("slide"),d.classList.remove("slide-left","slide-right"))})}),this._one(r[0].querySelector(".slide"),"transitionend",function(){r.forEach(c=>{this._removeClass(Array.from(c.querySelectorAll(".slide")),"slide")}),this._isInAction(e)&&(this._switchHorizontalArrow(e),e.querySelector(".topEdge").classList.remove("fa-chevron-up"),e.querySelector(".topEdge").classList.add("fa-chevron-down"))},this)}hideSiblings(e,t){let r=this._closest(e,d=>d.nodeName==="TABLE").parentNode;this._siblings(r).forEach(d=>{d.querySelector(".spinner")&&(this.chart.dataset.inAjax=!1)}),(!t||t&&t==="left")&&this._prevAll(r).forEach(o=>{Array.from(o.querySelectorAll(".node")).forEach(u=>{this._isVisible(u)&&u.classList.add("slide","slide-right")})}),(!t||t&&t!=="left")&&this._nextAll(r).forEach(o=>{Array.from(o.querySelectorAll(".node")).forEach(u=>{this._isVisible(u)&&u.classList.add("slide","slide-left")})});let a=[];this._siblings(r).forEach(d=>{Array.prototype.push.apply(a,Array.from(d.querySelectorAll(".slide")))});let c=[];for(let d of a){let o=this._closest(d,function(u){return u.classList.contains("nodes")}).previousElementSibling;c.push(o),c.push(o.previousElementSibling)}c=[...new Set(c)],c.forEach(function(d){d.style.visibility="hidden"}),this._one(a[0],"transitionend",function(d){c.forEach(function(b){b.removeAttribute("style")});let o=[];t?t==="left"?o=this._prevAll(r,":not(.hidden)"):o=this._nextAll(r,":not(.hidden)"):o=this._siblings(r);let _=Array.from(this._closest(r,function(b){return b.classList.contains("nodes")}).previousElementSibling.querySelectorAll(":scope > :not(.hidden)")).slice(1,t?o.length*2+1:-1);this._addClass(_,"hidden"),this._removeClass(a,"slide"),o.forEach(b=>{Array.from(b.querySelectorAll(".node")).slice(1).forEach(O=>{this._isVisible(O)&&(O.classList.remove("slide-left","slide-right"),O.classList.add("slide-up"))})}),o.forEach(b=>{this._addClass(Array.from(b.querySelectorAll(".lines")),"hidden"),this._addClass(Array.from(b.querySelectorAll(".nodes")),"hidden"),this._addClass(Array.from(b.querySelectorAll(".verticalNodes")),"hidden")}),this._addClass(o,"hidden"),this._isInAction(e)&&this._switchHorizontalArrow(e)},this)}hideParent(e){let t=Array.from(this._closest(e,function(c){return c.classList.contains("nodes")}).parentNode.children).slice(0,3);t[0].querySelector(".spinner")&&(this.chart.dataset.inAjax=!1),this._getNodeState(e,"siblings").visible&&this.hideSiblings(e);let r=t.slice(1);this._css(r,"visibility","hidden");let i=t[0].querySelector(".node"),a=this._getNodeState(i,"parent").visible;i&&this._isVisible(i)&&(i.classList.add("slide","slide-down"),this._one(i,"transitionend",function(){i.classList.remove("slide"),this._removeAttr(r,"style"),this._addClass(t,"hidden")},this)),i&&a&&this.hideParent(i)}addParent(e,t){let r=this;this._buildParentNode(e,t,function(){if(!e.querySelector(":scope > .topEdge")){let i=document.createElement("i");i.setAttribute("class","edge verticalEdge topEdge fa"),e.appendChild(i)}r.showParent(e)})}_startLoading(e,t){let r=this.options,i=this.chart;if(typeof i.dataset.inAjax!="undefined"&&i.dataset.inAjax==="true")return!1;e.classList.add("hidden");let a=document.createElement("i");a.setAttribute("class","fa fa-circle-o-notch fa-spin spinner"),t.appendChild(a),this._addClass(Array.from(t.querySelectorAll(":scope > *:not(.spinner)")),"hazy"),i.dataset.inAjax=!0;let c=this.chartContainer.querySelector(".oc-export-btn"+(r.chartClass!==""?"."+r.chartClass:""));return c&&(c.disabled=!0),!0}_endLoading(e,t){let r=this.options;e.classList.remove("hidden"),t.querySelector(":scope > .spinner").remove(),this._removeClass(Array.from(t.querySelectorAll(":scope > .hazy")),"hazy"),this.chart.dataset.inAjax=!1;let i=this.chartContainer.querySelector(".oc-export-btn"+(r.chartClass!==""?"."+r.chartClass:""));i&&(i.disabled=!1)}_clickTopEdge(e){e.stopPropagation();let t=this,r=e.target,i=r.parentNode,a=this._getNodeState(i,"parent"),c=this.options;if(a.exist){let o=this._closest(i,function(u){return u.classList.contains("nodes")}).parentNode.firstChild.querySelector(".node");if(o.classList.contains("slide"))return;a.visible?(this.hideParent(i),this._one(o,"transitionend",function(){this._isInAction(i)&&(this._switchVerticalArrow(r),this._switchHorizontalArrow(i))},this)):this.showParent(i)}else{let d=r.parentNode.id;this._startLoading(r,i)&&this._getJSON(typeof c.ajaxURL.parent=="function"?c.ajaxURL.parent(i.dataset.source):c.ajaxURL.parent+d).then(function(o){t.chart.dataset.inAjax==="true"&&Object.keys(o).length&&t.addParent(i,o)}).catch(function(o){console.error("Failed to get parent node data.",o)}).finally(function(){t._endLoading(r,i)})}}hideChildren(e){let t=this,r=this._nextAll(e.parentNode.parentNode),i=r[r.length-1],a=[];i.querySelector(".spinner")&&(this.chart.dataset.inAjax=!1);let c=Array.from(i.querySelectorAll(".node")).filter(o=>t._isVisible(o)),d=i.classList.contains("verticalNodes");d||(c.forEach(o=>{Array.prototype.push.apply(a,t._prevAll(t._closest(o,u=>u.classList.contains("nodes")),".lines"))}),a=[...new Set(a)],this._css(a,"visibility","hidden")),this._one(c[0],"transitionend",function(o){this._removeClass(c,"slide"),d?t._addClass(r,"hidden"):(a.forEach(u=>{u.removeAttribute("style"),u.classList.add("hidden"),u.parentNode.lastChild.classList.add("hidden")}),this._addClass(Array.from(i.querySelectorAll(".verticalNodes")),"hidden")),this._isInAction(e)&&this._switchVerticalArrow(e.querySelector(".bottomEdge"))},this),this._addClass(c,"slide slide-up")}showChildren(e){let t=this,r=this._nextAll(e.parentNode.parentNode),i=[];this._removeClass(r,"hidden"),r.some(a=>a.classList.contains("verticalNodes"))?r.forEach(a=>{Array.prototype.push.apply(i,Array.from(a.querySelectorAll(".node")).filter(c=>t._isVisible(c)))}):Array.from(r[2].children).forEach(a=>{Array.prototype.push.apply(i,Array.from(a.querySelector("tr").querySelectorAll(".node")).filter(c=>t._isVisible(c)))}),this._repaint(i[0]),this._one(i[0],"transitionend",a=>{this._removeClass(i,"slide"),this._isInAction(e)&&this._switchVerticalArrow(e.querySelector(".bottomEdge"))},this),this._addClass(i,"slide"),this._removeClass(i,"slide-up")}_buildChildNode(e,t,r){let i=t.children||t.siblings;e.querySelector("td").setAttribute("colSpan",i.length*2),this.buildHierarchy(e,{children:i},0,r)}addChildren(e,t){let r=this,i=this.options,a=0;this.chart.dataset.inEdit="addChildren",this._buildChildNode.call(this,this._closest(e,c=>c.nodeName==="TABLE"),t,function(){if(++a===t.children.length){if(!e.querySelector(".bottomEdge")){let c=document.createElement("i");c.setAttribute("class","edge verticalEdge bottomEdge fa"),e.appendChild(c)}if(!e.querySelector(".symbol")){let c=document.createElement("i");c.setAttribute("class","fa "+i.parentNodeSymbol+" symbol"),e.querySelector(":scope > .title").appendChild(c)}r.showChildren(e),r.chart.dataset.inEdit=""}})}_clickBottomEdge(e){e.stopPropagation();let t=this,r=this.options,i=e.target,a=i.parentNode,c=this._getNodeState(a,"children");if(c.exist){let d=this._closest(a,function(o){return o.nodeName==="TR"}).parentNode.lastChild;if(Array.from(d.querySelectorAll(".node")).some(o=>this._isVisible(o)&&o.classList.contains("slide")))return;c.visible?this.hideChildren(a):this.showChildren(a)}else{let d=i.parentNode.id;this._startLoading(i,a)&&this._getJSON(typeof r.ajaxURL.children=="function"?r.ajaxURL.children(a.dataset.source):r.ajaxURL.children+d).then(function(o){t.chart.dataset.inAjax==="true"&&o.children.length&&t.addChildren(a,o)}).catch(function(o){console.error("Failed to get children nodes data",o)}).finally(function(){t._endLoading(i,a)})}}_complementLine(e,t,r){let i=e.parentNode.parentNode.children;i[0].children[0].setAttribute("colspan",t*2),i[1].children[0].setAttribute("colspan",t*2);for(let a=0;a<r;a++){let c=document.createElement("td"),d=document.createElement("td");c.setAttribute("class","rightLine topLine"),c.innerHTML="&nbsp;",i[2].insertBefore(c,i[2].children[1]),d.setAttribute("class","leftLine topLine"),d.innerHTML="&nbsp;",i[2].insertBefore(d,i[2].children[1])}}_buildSiblingNode(e,t,r){let i=this,a=t.siblings?t.siblings.length:t.children.length,c=e.parentNode.nodeName==="TD"?this._closest(e,u=>u.nodeName==="TR").children.length:1,d=c+a,o=d>1?Math.floor(d/2-1):0;if(e.parentNode.nodeName==="TD"){let u=this._prevAll(e.parentNode.parentNode);u[0].remove(),u[1].remove();let _=0;i._buildChildNode.call(i,i._closest(e.parentNode,b=>b.nodeName==="TABLE"),t,()=>{if(++_===a){let b=Array.from(i._closest(e.parentNode,O=>O.nodeName==="TABLE").lastChild.children);if(c>1){let O=e.parentNode.parentNode;Array.from(O.children).forEach(P=>{b[0].parentNode.insertBefore(P,b[0])}),O.remove(),i._complementLine(b[0],d,c),i._addClass(b,"hidden"),b.forEach(P=>{i._addClass(P.querySelectorAll(".node"),"slide-left")})}else{let O=e.parentNode.parentNode;b[o].parentNode.insertBefore(e.parentNode,b[o+1]),O.remove(),i._complementLine(b[o],d,1),i._addClass(b,"hidden"),i._addClass(i._getDescElements(b.slice(0,o+1),".node"),"slide-right"),i._addClass(i._getDescElements(b.slice(o+1),".node"),"slide-left")}r()}})}else{let u=0;i.buildHierarchy.call(i,i.chart,t,0,()=>{if(++u===d){let _=e.nextElementSibling.children[3].children[o],b=document.createElement("td");b.setAttribute("colspan",2),b.appendChild(e),_.parentNode.insertBefore(b,_.nextElementSibling),i._complementLine(_,d,1);let O=i._closest(e,G=>G.classList&&G.classList.contains("nodes")).parentNode.children[0];O.classList.add("hidden"),i._addClass(Array.from(O.querySelectorAll(".node")),"slide-down");let P=this._siblings(e.parentNode);i._addClass(P,"hidden"),i._addClass(i._getDescElements(P.slice(0,o),".node"),"slide-right"),i._addClass(i._getDescElements(P.slice(o),".node"),"slide-left"),r()}})}}addSiblings(e,t){let r=this;this.chart.dataset.inEdit="addSiblings",this._buildSiblingNode.call(this,this._closest(e,i=>i.nodeName==="TABLE"),t,()=>{if(r._closest(e,i=>i.classList&&i.classList.contains("nodes")).dataset.siblingsLoaded=!0,!e.querySelector(".leftEdge")){let i=document.createElement("i"),a=document.createElement("i");i.setAttribute("class","edge horizontalEdge rightEdge fa"),e.appendChild(i),a.setAttribute("class","edge horizontalEdge leftEdge fa"),e.appendChild(a)}r.showSiblings(e),r.chart.dataset.inEdit=""})}removeNodes(e){let t=this._closest(e,i=>i.nodeName==="TABLE").parentNode,r=this._siblings(t.parentNode);t.nodeName==="TD"?this._getNodeState(e,"siblings").exist?(r[2].querySelector(".topLine").nextElementSibling.remove(),r[2].querySelector(".topLine").remove(),r[0].children[0].setAttribute("colspan",r[2].children.length),r[1].children[0].setAttribute("colspan",r[2].children.length),t.remove()):(r[0].children[0].removeAttribute("colspan"),r[0].querySelector(".bottomEdge").remove(),this._siblings(r[0]).forEach(i=>i.remove())):Array.from(t.parentNode.children).forEach(i=>i.remove())}_clickHorizontalEdge(e){e.stopPropagation();let t=this,r=this.options,i=e.target,a=i.parentNode,c=this._getNodeState(a,"siblings");if(c.exist){let d=this._closest(a,function(u){return u.nodeName==="TABLE"}).parentNode;if(this._siblings(d).some(u=>{let _=u.querySelector(".node");return this._isVisible(_)&&_.classList.contains("slide")}))return;if(r.toggleSiblingsResp){let u=this._closest(a,b=>b.nodeName==="TABLE").parentNode.previousElementSibling,_=this._closest(a,b=>b.nodeName==="TABLE").parentNode.nextElementSibling;i.classList.contains("leftEdge")?u.classList.contains("hidden")?this.showSiblings(a,"left"):this.hideSiblings(a,"left"):_.classList.contains("hidden")?this.showSiblings(a,"right"):this.hideSiblings(a,"right")}else c.visible?this.hideSiblings(a):this.showSiblings(a)}else{let d=i.parentNode.id,o=this._getNodeState(a,"parent").exist?typeof r.ajaxURL.siblings=="function"?r.ajaxURL.siblings(JSON.parse(a.dataset.source)):r.ajaxURL.siblings+d:typeof r.ajaxURL.families=="function"?r.ajaxURL.families(JSON.parse(a.dataset.source)):r.ajaxURL.families+d;this._startLoading(i,a)&&this._getJSON(o).then(function(u){t.chart.dataset.inAjax==="true"&&(u.siblings||u.children)&&t.addSiblings(a,u)}).catch(function(u){console.error("Failed to get sibling nodes data",u)}).finally(function(){t._endLoading(i,a)})}}_clickToggleButton(e){let t=this,r=e.target,i=r.parentNode.nextElementSibling,a=Array.from(i.querySelectorAll(".node")),c=Array.from(i.children).map(d=>d.querySelector(".node"));c.some(d=>d.classList.contains("slide"))||(r.classList.toggle("fa-plus-square"),r.classList.toggle("fa-minus-square"),a[0].classList.contains("slide-up")?(i.classList.remove("hidden"),this._repaint(c[0]),this._addClass(c,"slide"),this._removeClass(c,"slide-up"),this._one(c[0],"transitionend",()=>{t._removeClass(c,"slide")})):(this._addClass(a,"slide slide-up"),this._one(a[0],"transitionend",()=>{t._removeClass(a,"slide"),a.forEach(d=>{t._closest(d,function(u){return u.nodeName==="UL"}).classList.add("hidden")})}),a.forEach(d=>{let o=Array.from(d.querySelectorAll(".toggleBtn"));t._removeClass(o,"fa-minus-square"),t._addClass(o,"fa-plus-square")})))}_dispatchClickEvent(e){let t=e.target.classList;t.contains("topEdge")?this._clickTopEdge(e):t.contains("rightEdge")||t.contains("leftEdge")?this._clickHorizontalEdge(e):t.contains("bottomEdge")?this._clickBottomEdge(e):t.contains("toggleBtn")?this._clickToggleButton(e):this._clickNode(e)}_onDragStart(e){let t=e.target,r=this.options,i=/firefox/.test(window.navigator.userAgent.toLowerCase());if(i&&e.dataTransfer.setData("text/html","hack for firefox"),this.chart.style.transform){let o,u;document.querySelector(".ghost-node")?(o=this.chart.querySelector(":scope > .ghost-node"),u=o.children[0]):(o=document.createElementNS("http://www.w3.org/2000/svg","svg"),o.classList.add("ghost-node"),u=document.createElementNS("http://www.w3.org/2000/svg","rect"),o.appendChild(u),this.chart.appendChild(o));let _=this.chart.style.transform.split(","),b=Math.abs(window.parseFloat(r.direction==="t2b"||r.direction==="b2t"?_[0].slice(_[0].indexOf("(")+1):_[1]));o.setAttribute("width",t.offsetWidth),o.setAttribute("height",t.offsetHeight),u.setAttribute("x",5*b),u.setAttribute("y",5*b),u.setAttribute("width",120*b),u.setAttribute("height",40*b),u.setAttribute("rx",4*b),u.setAttribute("ry",4*b),u.setAttribute("stroke-width",1*b);let O=e.offsetX*b,P=e.offsetY*b;if(r.direction==="l2r"?(O=e.offsetY*b,P=e.offsetX*b):r.direction==="r2l"?(O=t.offsetWidth-e.offsetY*b,P=e.offsetX*b):r.direction==="b2t"&&(O=t.offsetWidth-e.offsetX*b,P=t.offsetHeight-e.offsetY*b),i){let G=document.createElement("img");G.src="data:image/svg+xml;utf8,"+new XMLSerializer().serializeToString(o),e.dataTransfer.setDragImage(G,O,P),u.setAttribute("fill","rgb(255, 255, 255)"),u.setAttribute("stroke","rgb(191, 0, 0)")}else e.dataTransfer.setDragImage(o,O,P)}let a=e.target,c=this._closest(a,o=>o.classList&&o.classList.contains("nodes")).parentNode.children[0].querySelector(".node"),d=Array.from(this._closest(a,o=>o.nodeName==="TABLE").querySelectorAll(".node"));this.dragged=a,Array.from(this.chart.querySelectorAll(".node")).forEach(function(o){d.includes(o)||(r.dropCriteria?r.dropCriteria(a,c,o)&&o.classList.add("allowedDrop"):o.classList.add("allowedDrop"))})}_onDragOver(e){e.preventDefault(),e.currentTarget.classList.contains("allowedDrop")||(e.dataTransfer.dropEffect="none")}_onDragEnd(e){Array.from(this.chart.querySelectorAll(".allowedDrop")).forEach(function(t){t.classList.remove("allowedDrop")})}_onDrop(e){let t=e.currentTarget,r=this.chart,i=this.dragged,a=this._closest(i,function(o){return o.classList&&o.classList.contains("nodes")}).parentNode.children[0].children[0];if(this._removeClass(Array.from(r.querySelectorAll(".allowedDrop")),"allowedDrop"),t.parentNode.parentNode.nextElementSibling){let o=window.parseInt(t.parentNode.colSpan)+2;if(t.parentNode.setAttribute("colspan",o),t.parentNode.parentNode.nextElementSibling.children[0].setAttribute("colspan",o),!i.querySelector(".horizontalEdge")){let P=document.createElement("i"),G=document.createElement("i");P.setAttribute("class","edge horizontalEdge rightEdge fa"),i.appendChild(P),G.setAttribute("class","edge horizontalEdge leftEdge fa"),i.appendChild(G)}let u=t.parentNode.parentNode.nextElementSibling.nextElementSibling,_=document.createElement("td"),b=document.createElement("td");_.setAttribute("class","leftLine topLine"),_.innerHTML="&nbsp;",u.insertBefore(_,u.children[1]),b.setAttribute("class","rightLine topLine"),b.innerHTML="&nbsp;",u.insertBefore(b,u.children[2]),u.nextElementSibling.appendChild(this._closest(i,function(P){return P.nodeName==="TABLE"}).parentNode);let O=this._siblings(this._closest(i,function(P){return P.nodeName==="TABLE"}).parentNode).map(P=>P.querySelector(".node"));if(O.length===1){let P=document.createElement("i"),G=document.createElement("i");P.setAttribute("class","edge horizontalEdge rightEdge fa"),O[0].appendChild(P),G.setAttribute("class","edge horizontalEdge leftEdge fa"),O[0].appendChild(G)}}else{let o=document.createElement("i");o.setAttribute("class","edge verticalEdge bottomEdge fa"),t.appendChild(o),t.parentNode.setAttribute("colspan",2);let u=this._closest(t,function(G){return G.nodeName==="TABLE"}),_=document.createElement("tr"),b=document.createElement("tr"),O=document.createElement("tr");_.setAttribute("class","lines"),_.innerHTML='<td colspan="2"><div class="downLine"></div></td>',u.appendChild(_),b.setAttribute("class","lines"),b.innerHTML='<td class="rightLine">&nbsp;</td><td class="leftLine">&nbsp;</td>',u.appendChild(b),O.setAttribute("class","nodes"),u.appendChild(O),Array.from(i.querySelectorAll(".horizontalEdge")).forEach(G=>{i.removeChild(G)});let P=this._closest(i,G=>G.nodeName==="TABLE").parentNode;O.appendChild(P)}let c=window.parseInt(a.colSpan);if(c>2){a.setAttribute("colspan",c-2),a.parentNode.nextElementSibling.children[0].setAttribute("colspan",c-2);let o=a.parentNode.nextElementSibling.nextElementSibling;o.children[1].remove(),o.children[1].remove();let u=Array.from(a.parentNode.parentNode.children[3].children).map(function(_){return _.querySelector(".node")});u.length===1&&(u[0].querySelector(".leftEdge").remove(),u[0].querySelector(".rightEdge").remove())}else a.removeAttribute("colspan"),a.querySelector(".node").removeChild(a.querySelector(".bottomEdge")),Array.from(a.parentNode.parentNode.children).slice(1).forEach(o=>o.remove());let d=new CustomEvent("nodedropped.orgchart",{detail:{draggedNode:i,dragZone:a.children[0],dropZone:t}});r.dispatchEvent(d)}_createNode(e,t){let r=this,i=this.options;return new Promise(function(a,c){if(e.children)for(let b of e.children)b.parentId=e.id;let d=document.createElement("div");delete e.children,d.dataset.source=JSON.stringify(e),e[i.nodeId]&&(d.id=e[i.nodeId]);let o=r.chart.dataset.inEdit,u;o?u=o==="addChildren"?" slide-up":"":u=t>=i.depth?" slide-up":"",d.setAttribute("class","node "+(e.className||"")+u),i.draggable&&d.setAttribute("draggable",!0),e.parentId&&d.setAttribute("data-parent",e.parentId),d.innerHTML=`
        <div class="title">${e[i.nodeTitle]}</div>
        ${i.nodeContent?`<div class="content">${e[i.nodeContent]}</div>`:""}
      `;let _=e.relationship||"";if(i.verticalDepth&&t+2>i.verticalDepth){if(t+1>=i.verticalDepth&&Number(_.substr(2,1))){let b=document.createElement("i"),O=t+1>=i.depth?"plus":"minus";b.setAttribute("class","toggleBtn fa fa-"+O+"-square"),d.appendChild(b)}}else{if(Number(_.substr(0,1))){let b=document.createElement("i");b.setAttribute("class","edge verticalEdge topEdge fa"),d.appendChild(b)}if(Number(_.substr(1,1))){let b=document.createElement("i"),O=document.createElement("i");b.setAttribute("class","edge horizontalEdge rightEdge fa"),d.appendChild(b),O.setAttribute("class","edge horizontalEdge leftEdge fa"),d.appendChild(O)}if(Number(_.substr(2,1))){let b=document.createElement("i"),O=document.createElement("i"),P=d.querySelector(":scope > .title");b.setAttribute("class","edge verticalEdge bottomEdge fa"),d.appendChild(b),O.setAttribute("class","fa "+i.parentNodeSymbol+" symbol"),P.insertBefore(O,P.children[0])}}d.addEventListener("mouseenter",r._hoverNode.bind(r)),d.addEventListener("mouseleave",r._hoverNode.bind(r)),d.addEventListener("click",r._dispatchClickEvent.bind(r)),i.draggable&&(d.addEventListener("dragstart",r._onDragStart.bind(r)),d.addEventListener("dragover",r._onDragOver.bind(r)),d.addEventListener("dragend",r._onDragEnd.bind(r)),d.addEventListener("drop",r._onDrop.bind(r))),i.createNode&&i.createNode(d,e),a(d)})}buildHierarchy(e,t,r,i){let a=this,c=this.options,d,o=t.children,u=c.verticalDepth&&r+1>=c.verticalDepth;if(Object.keys(t).length>1&&(d=u?e:document.createElement("table"),u||e.appendChild(d),this._createNode(t,r).then(function(_){if(u)d.insertBefore(_,d.firstChild);else{let b=document.createElement("tr");b.innerHTML=`
            <td ${o?`colspan="${o.length*2}"`:""}>
            </td>
          `,b.children[0].appendChild(_),d.insertBefore(b,d.children[0]?d.children[0]:null)}i&&i()}).catch(function(_){console.error("Failed to creat node",_)})),o){Object.keys(t).length===1&&(d=e);let _,b=c.verticalDepth&&r+2>=c.verticalDepth,O=a.chart.dataset.inEdit;if(O?_=O==="addSiblings"?"":" hidden":_=r+1>=c.depth?" hidden":"",!b){let M=document.createElement("tr");M.setAttribute("class","lines"+_),M.innerHTML=`
          <td colspan="${o.length*2}">
            <div class="downLine"></div>
          </td>
        `,d.appendChild(M)}let P=document.createElement("tr");P.setAttribute("class","lines"+_),P.innerHTML=`
        <td class="rightLine">&nbsp;</td>
        ${o.slice(1).map(()=>`
          <td class="leftLine topLine">&nbsp;</td>
          <td class="rightLine topLine">&nbsp;</td>
          `).join("")}
        <td class="leftLine">&nbsp;</td>
      `;let G;if(b)if(G=document.createElement("ul"),_&&G.classList.add(_.trim()),r+2===c.verticalDepth){let M=document.createElement("tr");M.setAttribute("class","verticalNodes"+_),M.innerHTML="<td></td>",M.firstChild.appendChild(G),d.appendChild(M)}else d.appendChild(G);else G=document.createElement("tr"),G.setAttribute("class","nodes"+_),d.appendChild(P),d.appendChild(G);o.forEach(M=>{let we;b?we=document.createElement("li"):(we=document.createElement("td"),we.setAttribute("colspan",2)),G.appendChild(we),a.buildHierarchy(we,M,r+1,i)})}}_clickChart(e){!this._closest(e.target,function(r){return r.classList&&r.classList.contains("node")})&&this.chart.querySelector(".node.focused")&&this.chart.querySelector(".node.focused").classList.remove("focused")}_clickExportButton(){let e=this.options,t=this.chartContainer,r=t.querySelector(":scope > .mask"),i=t.querySelector(".orgchart:not(.hidden)"),a=e.direction==="l2r"||e.direction==="r2l";r?r.classList.remove("hidden"):(r=document.createElement("div"),r.setAttribute("class","mask"),r.innerHTML='<i class="fa fa-circle-o-notch fa-spin spinner"></i>',t.appendChild(r)),t.classList.add("canvasContainer"),window.html2canvas(i,{width:a?i.clientHeight:i.clientWidth,height:a?i.clientWidth:i.clientHeight,onclone:function(c){let d=c.querySelector(".canvasContainer");d.style.overflow="visible",d.querySelector(".orgchart:not(.hidden)").transform=""}}).then(c=>{let d=t.querySelector(".oc-download-btn");t.querySelector(".mask").classList.add("hidden"),d.setAttribute("href",c.toDataURL()),d.click()}).catch(c=>{console.error("Failed to export the curent orgchart!",c)}).finally(()=>{t.classList.remove("canvasContainer")})}_loopChart(e){let t={id:e.querySelector(".node").id};return e.children[3]&&Array.from(e.children[3].children).forEach(r=>{t.children||(t.children=[]),t.children.push(this._loopChart(r.firstChild))}),t}getHierarchy(){return this.chart.querySelector(".node").id?this._loopChart(this.chart.querySelector("table")):"Error: Nodes of orghcart to be exported must have id attribute!"}_onPanStart(e){let t=e.currentTarget;if(this._closest(e.target,o=>o.classList&&o.classList.contains("node"))||e.touches&&e.touches.length>1){t.dataset.panning=!1;return}t.style.cursor="move",t.dataset.panning=!0;let r=0,i=0,a=window.getComputedStyle(t).transform;if(a!=="none"){let o=a.split(",");a.includes("3d")?(r=Number.parseInt(o[12],10),i=Number.parseInt(o[13],10)):(r=Number.parseInt(o[4],10),i=Number.parseInt(o[5],10))}let c=0,d=0;if(!e.targetTouches)c=e.pageX-r,d=e.pageY-i;else if(e.targetTouches.length===1)c=e.targetTouches[0].pageX-r,d=e.targetTouches[0].pageY-i;else if(e.targetTouches.length>1)return;t.dataset.panStart=JSON.stringify({startX:c,startY:d}),t.addEventListener("mousemove",this._onPanning.bind(this)),t.addEventListener("touchmove",this._onPanning.bind(this))}_onPanning(e){let t=e.currentTarget;if(t.dataset.panning==="false")return;let r=0,i=0,a=JSON.parse(t.dataset.panStart),c=a.startX,d=a.startY;if(!e.targetTouches)r=e.pageX-c,i=e.pageY-d;else if(e.targetTouches.length===1)r=e.targetTouches[0].pageX-c,i=e.targetTouches[0].pageY-d;else if(e.targetTouches.length>1)return;let o=window.getComputedStyle(t).transform;if(o==="none")o.includes("3d")?t.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, "+r+", "+i+", 0, 1)":t.style.transform="matrix(1, 0, 0, 1, "+r+", "+i+")";else{let u=o.split(",");o.includes("3d")?(u[12]=r,u[13]=i):(u[4]=r,u[5]=i+")"),t.style.transform=u.join(",")}}_onPanEnd(e){let t=this.chart;t.dataset.panning==="true"&&(t.dataset.panning=!1,t.style.cursor="default",document.body.removeEventListener("mousemove",this._onPanning),document.body.removeEventListener("touchmove",this._onPanning))}_setChartScale(e,t){let r=window.getComputedStyle(e).transform;if(r==="none")e.style.transform="scale("+t+","+t+")";else{let i=r.split(",");r.includes("3d")?e.style.transform=r+" scale3d("+t+","+t+", 1)":(i[0]="matrix("+t,i[3]=t,e.style.transform=r+" scale("+t+","+t+")")}e.dataset.scale=t}_onWheeling(e){e.preventDefault();let t=e.deltaY>0?.8:1.2;this._setChartScale(this.chart,t)}_getPinchDist(e){return Math.sqrt((e.touches[0].clientX-e.touches[1].clientX)*(e.touches[0].clientX-e.touches[1].clientX)+(e.touches[0].clientY-e.touches[1].clientY)*(e.touches[0].clientY-e.touches[1].clientY))}_onTouchStart(e){let t=this.chart;if(e.touches&&e.touches.length===2){let r=this._getPinchDist(e);t.dataset.pinching=!0,t.dataset.pinchDistStart=r}}_onTouchMove(e){let t=this.chart;if(t.dataset.pinching){let r=this._getPinchDist(e);t.dataset.pinchDistEnd=r}}_onTouchEnd(e){let t=this.chart;if(t.dataset.pinching){t.dataset.pinching=!1;let r=t.dataset.pinchDistEnd-t.dataset.pinchDistStart;r>0?this._setChartScale(t,1):r<0&&this._setChartScale(t,-1)}}};L(Ce,"OrgChart");function ut(){var pe=document.createElement("style");return pe.textContent=`

.left-panel-class {
  position: fixed; /* Sticks to the left side of the page */
display: flex;
     flex-direction: row; /* Align children in a row */
z-index: 9999; /* Bring the panel to the front */
  background-color: #f4f4f4; /* Light gray background */
  border-right: 1px solid #ccc; /* Optional border */
  padding: 15px; /* Padding inside the panel */
}

.nested {
    list-style-type: none;
    padding-left: 20px; /* Indent nested lists */
    margin-left: 10px; /* Provide left margin for nested lists */
    display: block; /* Ensure it's vertically aligned */
}



/* Add some space between the checkbox and text */
.filterCheckBox {
    margin-left: 10px;
}
.OrgChartFilterCheckBox {
    margin-left: 10px;
}
/* Optional: Style the toggle button */
.toggle {
    cursor: pointer;
    color: #007BFF;
    text-decoration: underline;
    margin-right: 10px; /* Space between the toggle and checkbox */
}
.select2-container {
    width: 100% !important;  /* Ensure Select2 matches the input width */
    box-sizing: border-box;
}

.select2-selection {
    height: 100% !important;  /* Match input height */
    line-height: normal;
}

.select2-selection__rendered {
    padding: 8px !important;  /* Adjust text alignment */
}

.select2-selection__arrow {
    height: 100% !important;
}

.select2-container .select2-choice {
    height: 100% !important;
    line-height: normal;
    padding: 0 8px;
}

    .flex-container {
        display: flex;
     flex-direction: row; /* Align children in a row */
}

    .icon {
    position: fixed; /* Fix the position relative to the viewport */
    bottom: 20px;    /* Distance from the bottom */
    right: 20px;     /* Distance from the right */
    width: 50px;     /* Width of the icon */
    height: 50px;    /* Height of the icon */
    z-index: 1000;   /* Ensure it is above other content */
}

.flex-container {
  display: flex;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box; /* Includes padding and border in width/height */
}

     .CardContent {
            background-color: lightblue;
            padding: 20px;
            width: auto;
            align-items: center; /* Optional: aligns items vertically centered */
                white-space: nowrap; /* Prevents text from wrapping */
        }

.CardContent span {
    display: block; /* Ensures each span is on a new line */
    margin-bottom: 5px; /* Adds space between the lines */
    font-style: italic; /* Applies italic styling */
}
.CardTitle span {
    display: block; /* Ensures each span is on a new line */
    margin-bottom: 5px; /* Adds space between the lines */
    font-family: Arial; /* Applies italic styling */
}
   #SectionTable {
    table-layout: auto; /* Allow the table to resize based on content */
    width: 100%;
      border-collapse: collapse; /* Optional: removes space between borders */

  }
  
        .CardTitle {
            background-color: #eee2ed;
            padding: 20px;
            width: auto;
               white-space: nowrap; /* Prevents text from wrapping */
    align-items: center; /* Optional: aligns items vertically centered */
        }

            .dragging{z-index:111!important}.block{position:absolute;z-index:9}.indicator{width:12px;height:12px;border-radius:60px;background-color:#217ce8;margin-top:-5px;opacity:1;transition:all .3s cubic-bezier(.05,.03,.35,1);transform:scale(1);position:absolute;z-index:2}.invisible{opacity:0!important;transform:scale(0)}.indicator:after{content:"";display:block;width:12px;height:12px;background-color:#217ce8;transform:scale(1.7);opacity:.2;border-radius:60px}.arrowblock{position:absolute;width:100%;overflow:visible;pointer-events:none}.arrowblock svg{width: -webkit-fill-available;overflow: visible;}

  .side-div {
    display: flex;
    flex-direction: row; /* Aligns child elements in a row */
    background-color: #f1f1f1;
}
  .wrapper{
    overflow-x: auto;
}

  .chart-side-div {
    display: flex;
    flex-direction: row; /* Aligns child elements in a row */
    width: auto;
       background-color: #ffffff;
    min-height: 100px; /* Sets a minimum height */
    position: relative; /* Required for absolute positioning of ::before */
}

    .content {
    background-color: #f8f9fa;
    }
    .tab {
          overflow: hidden;
          border: 1px solid #ccc;
          background-color: #f1f1f1;
        }
        .tab button {
          background-color: inherit;
          float: left;
          border: none;
          outline: none;
          cursor: pointer;
          padding: 14px 16px;
          transition: 0.3s;
        }
        .tab button:hover {
          background-color: #ddd;
        }
        .tab button.active {
          background-color: #ccc;
        }
        .tabcontent {
          display: none;
          padding: 6px 12px;
          border: 1px solid #ccc;
          border-top: none;
            animation: fadeEffect 1s; /* Fading effect takes 1 second */

        }
        @keyframes fadeEffect {
          from {opacity: 0;}
          to {opacity: 1;}
        }
   .EmployeeImg {
    width: 100%;
    height: auto; /* Maintain aspect ratio */
    object-fit: cover; /* Or 'contain' depending on your requirement */
}


#chart-container {
    background-color: #f8f9fa;
  height: auto;
  border: 1px solid #aaa;
  margin: 0.5rem;
}

#orgChartContainer {
    background-color: #f8f9fa;
  height: auto;
  border: 1px solid #aaa;
  margin: 0.5rem;
}

  .content {
       display: flex;
    flex-direction: column; /* Stack children vertically */
height: 100vh; /* Make sure the body and html take full height */
margin: 0;
        }

#GridDiv {

  display: block;
overflow: hidden;
position: relative;
}

 .div2 {
    flex: 0.5; /* Takes 7 parts of the total height */

height:10%;
}

.orgchart {
  box-sizing: border-box;
  display: inline-block;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  linear-gradient(to right, rgba(200, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0) 5%),
  linear-gradient(to bottom, rgba(200, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0) 5%),
  linear-gradient(to left, rgba(200, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0) 5%);
  background-size: 10px 10px; /* background square size */
  padding: 20px 20px 0 20px;
  /* border: 0.5px solid rgba(200, 0, 0, 0.15); */
}

.orgchart .hidden, .orgchart~.hidden {
  display: none;
}

.orgchart div,
.orgchart div::before,
.orgchart div::after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.orgchart.b2t {
  -ms-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

.orgchart.l2r {
  position: absolute;
  -ms-transform: rotate(-90deg) rotateY(180deg);
  -moz-transform: rotate(-90deg) rotateY(180deg);
  -webkit-transform: rotate(-90deg) rotateY(180deg);
  transform: rotate(-90deg) rotateY(180deg);
  -ms-transform-origin: left top;
  -moz-transform-origin: left top;
  -webkit-transform-origin: left top;
  transform-origin: left top;
}

.orgchart .verticalNodes ul {
  list-style: none;
  margin: 0;
  padding-left: 18px;
  text-align: left;
}

.orgchart .verticalNodes ul:first-child {
  margin-top: 3px;
}

.orgchart .verticalNodes>td::before {
  content: '';
  border: 1px solid #AFAFAF;

}

.orgchart .verticalNodes>td>ul>li:first-child::before {
  top: -4px;
  height: 30px;
  width: calc(50% - 2px);
  border-width: 2px 0 0 2px;
}

.orgchart .verticalNodes ul>li {
  position: relative;
}

.orgchart .verticalNodes ul>li::before,
.orgchart .verticalNodes ul>li::after {
  content: '';
  position: absolute;
  left: -6px;
  border-color: #AFAFAF;
  border-style: solid;
  border-width: 0 0 2px 2px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.orgchart .verticalNodes ul>li::before {
  top: -4px;
  height: 30px;
  width: 11px;
}

.orgchart .verticalNodes ul>li::after {
  top: 1px;
  height: 100%;
}

.orgchart .verticalNodes ul>li:first-child::after {
  top: 24px;
  width: 11px;
  border-width: 2px 0 0 2px;
}

.orgchart .verticalNodes ul>li:last-child::after {
  border-width: 2px 0 0;
}

.orgchart.r2l {
  position: absolute;
  -ms-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  -ms-transform-origin: left top;
  -moz-transform-origin: left top;
  -webkit-transform-origin: left top;
  transform-origin: left top;
}

.orgchart>.spinner {
  font-size: 100px;
  margin-top: 30px;
  color: rgba(68, 157, 68, 0.8);
}

.orgchart table {
  border-spacing: 0;
  border-collapse: separate;
}

.orgchart>table:first-child{
  margin: 20px auto;
}

.orgchart td {
  text-align: center;
  vertical-align: top;
  padding: 0;
}

.orgchart tr.lines .topLine {
  border-top: 2px solid #AFAFAF;
}

.orgchart tr.lines .rightLine {
  border-right: 1px solid  #AFAFAF;
  float: none;
  border-radius: 0;
}

.orgchart tr.lines .leftLine {
  border-left: 1px solid  #AFAFAF;
  float: none;
  border-radius: 0;
}

.orgchart tr.lines .downLine {
  background-color:  #AFAFAF;
  margin: 0 auto;
  height: 20px;
  width: 2px;
  float: none;
}

/* node styling */
.orgchart .node {
         display: flex;
  box-sizing: border-box;
  display: inline-block;
  position: relative;
    margin: 0 0 20px 0;
  padding: 3px;
  border: 2px dashed transparent;
  text-align: center;
    flex-direction: row; /* Align children in a row */

}

.orgchart.l2r .node, .orgchart.r2l .node {
  width: 50px;
  height: 130px;
}

.orgchart .node>.hazy {
  opacity: 0.2;
}

.orgchart .node>.spinner {
  position: absolute;
  top: calc(50% - 15px);
  left: calc(50% - 15px);
  vertical-align: middle;
  font-size: 30px;
  color: rgba(68, 157, 68, 0.8);
}

.delete-node-icon {
    /* Hide any potential background, border, or box-shadow */
    background: none; /* Remove background color */
    border: none; /* Remove border */
    box-shadow: none; /* Remove box-shadow */
}

.delete-node-icon.active {
    /* Adjust this based on the class or state that triggers the rectangle */
    background: none;
    border: none;
    box-shadow: none;
}

.orgchart .node:hover {
    background-color:#BFBFBF;

  transition: .5s;
}


.orgchart .ghost-node {
  position: fixed;
  left: -10000px;
  top: -10000px;
}

.orgchart .ghost-node rect {
  fill: #ffffff;
  stroke: #bf0000;
}

.orgchart .node.allowedDrop {
  border-color: rgba(68, 157, 68, 0.9);
}



.orgchart.b2t .node .title {
  -ms-transform: rotate(-180deg);
  -moz-transform: rotate(-180deg);
  -webkit-transform: rotate(-180deg);
  transform: rotate(-180deg);
  -ms-transform-origin: center bottom;
  -moz-transform-origin: center bottom;
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom;
    
}

.orgchart.l2r .node .title {
  -ms-transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
  -moz-transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
  -webkit-transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
  transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
  -ms-transform-origin: bottom center;
  -moz-transform-origin: bottom center;
  -webkit-transform-origin: bottom center;
  transform-origin: bottom center;
  width: 120px;
}

.orgchart.r2l .node .title {
  -ms-transform: rotate(-90deg) translate(-40px, -40px);
  -moz-transform: rotate(-90deg) translate(-40px, -40px);
  -webkit-transform: rotate(-90deg) translate(-40px, -40px);
  transform: rotate(-90deg) translate(-40px, -40px);
  -ms-transform-origin: bottom center;
  -moz-transform-origin: bottom center;
  -webkit-transform-origin: bottom center;
  transform-origin: bottom center;
  width: 120px;
}

.orgchart .node .title .symbol {
  float: left;
  margin-top: 4px;
  margin-left: 2px;
}


.orgchart .node .title {
  box-sizing: border-box;
  width: 120px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
    background-color: #f1f1f1;

  color:#A9A9A9;
  border-radius: 4px 4px 0 0;
}
.orgchart .node .content {
  box-sizing: border-box;
  width: 120px;
  height: 20px;
  line-height: 20px;
  font-size: 10px;
  border: 1px solid rgba(217, 83, 79, 0.8);
  border-width: 0 1px 1px 1px;
  border-radius: 0 0 0.25rem 0.25rem;
  text-align: center;
  background-color: #fff;
  color: #333;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.orgchart.b2t .node .content {
  -ms-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
  -ms-transform-origin: center top;
  -moz-transform-origin: center top;
  -webkit-transform-origin: center top;
  transform-origin: center top;
}

.orgchart.l2r .node .content {
  -ms-transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
  -moz-transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
  -webkit-transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
  transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
  -ms-transform-origin: top center;
  -moz-transform-origin: top center;
  -webkit-transform-origin: top center;
  transform-origin: top center;
  width: 120px;
}

.orgchart.r2l .node .content {
  -ms-transform: rotate(-90deg) translate(-40px, -40px);
  -moz-transform: rotate(-90deg) translate(-40px, -40px);
  -webkit-transform: rotate(-90deg) translate(-40px, -40px);
  transform: rotate(-90deg) translate(-40px, -40px);
  -ms-transform-origin: top center;
  -moz-transform-origin: top center;
  -webkit-transform-origin: top center;
  transform-origin: top center;
  width: 200px;
}

.orgchart .node .edge {
  font-size: 15px;
  position: absolute;
  color: rgba(68, 157, 68, 0.5);
  cursor: default;
  transition: .2s;
  -webkit-transition: .2s;
}

.orgchart.noncollapsable .node .edge {
  display: none;
}

.orgchart .edge:hover {
  color: #449d44;
  cursor: pointer;
}

.orgchart .node .verticalEdge {
  width: calc(100% - 10px);
  width: -webkit-calc(100% - 10px);
  width: -moz-calc(100% - 10px);
  left: 5px;
}

.orgchart .node .topEdge {
  top: -4px;
}

.orgchart .node .bottomEdge {
  bottom: -4px;
}

.orgchart .node .horizontalEdge {
  width: 15px;
  height: calc(100% - 10px);
  height: -webkit-calc(100% - 10px);
  height: -moz-calc(100% - 10px);
  top: 5px;
}

.orgchart .node .rightEdge {
  right: -4px;
}

.orgchart .node .leftEdge {
  left: -4px;
}

.orgchart .node .horizontalEdge::before {
  position: absolute;
  top: calc(50% - 7px);
  top: -webkit-calc(50% - 7px);
  top: -moz-calc(50% - 7px);
}

.orgchart .node .rightEdge::before {
  right: 3px;
}

.orgchart .node .leftEdge::before {
  left: 3px;
}

.orgchart .node .toggleBtn {
  position: absolute;
  left: 5px;
  bottom: -2px;
  color: rgba(68, 157, 68, 0.6);
}

.orgchart .node .toggleBtn:hover {
  color: rgba(68, 157, 68, 0.8);
}

.oc-export-btn {
  display: inline-block;
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #fff;
  background-color: #5cb85c;
  border: 1px solid transparent;
  border-color: #4cae4c;
  border-radius: 4px;
}

.oc-export-btn:hover,.oc-export-btn:focus,.oc-export-btn:active  {
  background-color: #449d44;
  border-color: #347a34;
}

.orgchart~.mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  text-align: center;
  background-color: rgba(0,0,0,0.3);
}

.orgchart~.mask .spinner {
  position: absolute;
  top: calc(50% - 54px);
  left: calc(50% - 54px);
  color: rgba(255,255,255,0.8);
  font-size: 108px;
}

.orgchart .node {
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  top: 0;
  left: 0;
}

.orgchart .slide-down {
  opacity: 0;
  top: 40px;
}

.orgchart.l2r .node.slide-down, .orgchart.r2l .node.slide-down {
  top: 130px;
}

.orgchart .slide-up {
  opacity: 0;
  top: -40px;
}

.orgchart.l2r .node.slide-up, .orgchart.r2l .node.slide-up {
  top: -130px;
}

.orgchart .slide-right {
  opacity: 0;
  left: 130px;
}

.orgchart.l2r .node.slide-right, .orgchart.r2l .node.slide-right {
  left: 40px;
}

.orgchart .slide-left {
  opacity: 0;
  left: -130px;
}

.orgchart.l2r .node.slide-left, .orgchart.r2l .node.slide-left {
  left: -40px;
}

 
    .orgchart .node .title {
        display:flex;
      height: unset;
      text-align: left;
      line-height: 40px;
      width: auto;
    padding: 0 10px;

    }
     .select2-container {
      width: 100% !important; /* Full width of the parent container */
    }
    .select2-dropdown {
      width: 100% !important; /* Same width as the container */
      box-sizing: border-box; /* Ensure padding and border are included in width calculation */
    }

    /* Ensure that the selection box is also full width */
    .select2-selection {
      width: 100% !important;
      box-sizing: border-box;
    }
  #EmployeeSelection {
    position: absolute;
    border: 1px solid #ccc;
    background: white;
    z-index: 1000; /* Ensure it stays on top */
  }
    .orgchart .node .content {
                display:flex;

      text-align: left;
      padding: 0 10px;
      width: auto;
      border: 1px
    }
    .orgchart .node .content .symbol {
      color: #aaa;
      margin-right: 20px;
    }
    .oci-leader::before, .oci-leader::after {
      background-color: rgba(217, 83, 79, 0.8);
    }
    .orgchart .node .avatar {
      width: 60px;
      height: 60px;
      float: left;
      margin: 5px;

    }
    .orgchart .node .verticalEdge, .orgchart .node .horizontalEdge { display: none; }

    .dot {
  height: 15px;
  width: 15px;
      background-color: lightgreen; /* Set the dot color to green */
        right: 0;
        position: absolute;

}

.orgchart .node:hover {
      background-color:#BFBFBF;
}
.dot:hover {
  background-color: green; /* Change to green on hover */
}
.CheckBox:hover {
  background-color: blue; /* Change to green on hover */
}    
.CheckBox:hover {
  background-color: blue; /* Change to green on hover */
}

`,pe}L(ut,"appendStyle");var E=$e(Ze(),1),Qe=$e(Ze(),1);var ze=$e(Ze(),1),mt=$e(Ft(),1),oe=$e(Ze(),1);function jt(){let pe;(p=>(p[p.DIRECTOR=0]="DIRECTOR",p[p.DIVISION=1]="DIVISION",p[p.DEPARTMENT=2]="DEPARTMENT",p[p.SECTION=3]="SECTION"))(pe||(pe={}));let e;(s=>(s[s.OrgChart=0]="OrgChart",s[s.OrgStruct=1]="OrgStruct"))(e||(e={}));function t(n){return(0,E.isEmptyOrNull)(n)?"":n.charAt(0).toUpperCase()+n.slice(1).toLowerCase()}L(t,"capitalizeFirstLetter");function r(n){return pe[n]}L(r,"getEnumNameFromValue");function i(n){if(n.length===0)throw new Error("The list is empty.");return Math.max(...n)}L(i,"findMax");function a(){var n=document.createElement("dialog");n.style.top="50%",n.style.left="50%",n.style.transform="translate(-50%, -50%)",n.innerHTML='  <button id="confirmAddEmployee" type="button" class="btn btn-light btn-rounded   " data-mdb-ripple-color="#ffffff" style="background-color:#c2f0c2">Confirm</button>  <button id="closeDialog" type="button" class="btn btn-light btn-rounded   " data-mdb-ripple-color="#ffffff" style="background-color:#ffcccc">Close</button> <span style=" white-space: nowrap;" id = "TargetElementSpan"></span>',n.id="EmployeeSelection",n.addEventListener("",()=>{n.close()}),n.querySelector("#closeDialog").addEventListener("click",()=>{n.close()}),n.querySelector("#confirmAddEmployee").addEventListener("click",()=>{var K=document.getElementById("EmployeeIdInput");if($(K).val()==""){(0,ze.notifyError)("Please fill in the Employee");return}let N=0,y;for(N=0;N<D.length;N++)if(D[N].id==$(K).val()){y=D[N].EmployeeName;break}var C=We(O,136,153),A=JSON.parse(JSON.stringify(W)),w=A,v;if(C.length>1)for(let F=1;F<C.length;F++){v=C[F];var k=r(F);w=st(w,v);var q=`${k}${D[N][t(k)+"Id"]} Class`;if(q!=w.className){var z=pt(t(r(2)),D[N][t(r(2))+"Id"]),B=pt(t(r(1)),D[N][t(r(1))+"Id"]),H=pt(t(r(3)),D[N][t(r(3))+"Id"]),V=`${D[N].EmployeeName} should be in `;(0,E.isEmptyOrNull)(H)||(V+=`${H} ${t(r(3))}, under `),(0,E.isEmptyOrNull)(z)||(V+=`${z} ${t(r(2))}, under `),(0,E.isEmptyOrNull)(B)||(V+=`${B} ${t(r(1))}`),(0,oe.alertDialog)(V);break}}v=C[C.length-1],ot(w,v,parseInt($(K).val())),W=A,Ue(),n.close()});var h=document.createElement("table");h.id="EmployeeSelectionTable";var p=document.createElement("tr"),x=document.createElement("DIV"),f=document.createElement("img");f.setAttribute("id","employeeImg"),f.width=63,f.height=112.5,f.style.display="block",f.style.margin="0 auto",x.appendChild(f);var m=document.createElement("span");m.textContent="ID",m.style.display="block",m.style.whiteSpace="nowrap";var g=document.createElement("TD");g.appendChild(m);var S=document.createElement("span");S.textContent="Name",S.style.display="block",S.style.whiteSpace="nowrap";var I=document.createElement("TD");I.appendChild(S);var R=document.createElement("TD"),Y=document.createElement("input");Y.id="EmployeeIdInput",R.appendChild(Y);var J=document.createElement("TD"),Q=document.createElement("input");return Q.id="EmployeeNameInput",J.appendChild(Q),p.appendChild(g),p.appendChild(R),p.appendChild(I),p.appendChild(J),h.appendChild(p),n.appendChild(x),n.appendChild(h),document.body.appendChild(n),n}L(a,"GenerateEmployeeChoosingDialog"),document.addEventListener("keydown",n=>{if(n.key==="Escape"){pdfDialog.close();var l=document.getElementById("EmployeeSelection");l.close()}});function c(){var n=document.createElement("dialog");n.id="pdfDialog",n.innerHTML=`
    <button id="closePdf" type="button" style="position: absolute; top: 10px; right: 10px; background-color: #ffcccc; border: none; font-size: 20px; cursor: pointer;">
        &times;
    </button>
     <div id="pdfTitle" style="margin: 20px 0; font-size: 20px;"></div>

     <div style="margin-top: 10px;">
        <button id="prevPdf" class="pdf-nav-btn btn btn-light btn-rounded">&lt;</button>
        <button id="nextPdf" class="pdf-nav-btn btn btn-light btn-rounded">&gt;</button>
    </div>
`,n.style.border="none",n.style.width="80%",n.style.height="80%",n.style.transform="translate(-50%, -50%)",n.style.position="fixed",n.style.top="50%",n.style.left="50%",n.querySelector("#closePdf").addEventListener("click",()=>{n.close()});var s=document.createElement("iframe");s.type="application/pdf",s.style.width="100%",s.style.height="calc(100% - 40px)",s.id="pdf",n.appendChild(s),document.body.appendChild(n),document.getElementById("prevPdf").addEventListener("click",()=>{be=(be-1+Ne.length)%Ne.length,d()}),document.getElementById("nextPdf").addEventListener("click",()=>{be=(be+1)%Ne.length,d()})}L(c,"GeneratePdfDialog");function d(){let n=document.getElementById("pdf");n.src=Ne[be];let l=document.getElementById("pdfTitle");l.textContent=at[be],document.getElementById("prevPdf").disabled=be===0,document.getElementById("nextPdf").disabled=be===Ne.length-1}L(d,"updatePdf"),c();var o=null,u=null;let _=Object.values(pe).filter(n=>typeof n=="number").sort((n,l)=>l-n),b=[],O="";for(let n of Object.keys(pe))if(isNaN(Number(n))){let l=pe[n];b.push(l)}let P=Math.min(...b),M=i(b)+1,we=a();var Tt=ut();document.head.appendChild(Tt);var et=document.createElement("div");et.id="chart-container",et.className="BigTab";var Je=document.createElement("div");Je.id="DepartmentPanel",Je.className="tabcontent";var He=document.createElement("div");He.id="DivisionPanel",He.className="tabcontent";var Me=document.createElement("div");Me.id="SectionPanel",Me.className="tabcontent";var Ot=[],qt=[],Bt=[];let ne=[];var D=[],Fe=[];let gt,W,je,X;var tt=(0,Qe.getLookup)("Occupation.Occupation"),Ge=(0,Qe.getLookup)("JobGrade.JobGrade"),Gt;let Yt=[],Vt=[],Ut=[];var Ye=null,bt=null;let ge=[];_t.List({},n=>{for(var l in n.Entities){if(n.Entities[l].Resigned==1||n.Entities[l].Terminated==1||n.Entities[l].Retired==1||n.Entities[l].IsActive==-1){Fe.push(n.Entities[l].Id);continue}D.push({id:n.Entities[l].Id,ImgPath:n.Entities[l].EmployeeImg,OccupationId:n.Entities[l].OccupationId,EmployeeName:n.Entities[l].EmployeeName,EmployeeId:n.Entities[l].EmployeeId,DivisionId:n.Entities[l].DivisionId,DepartmentId:n.Entities[l].DepartmentId,SectionId:n.Entities[l].SectionId,JobDescPath:n.Entities[l].JobDescription,JobGradeId:n.Entities[l].JobGradeId,SalaryDetails:n.Entities[l].BasicSalary})}Rt.List({},A=>{A.Entities.length>0&&(Ye=A.Entities[0].OrgChart),xt()}),ft.List({},A=>{A.Entities.length>0&&(bt=A.Entities[0].FinalOrgChart),ct()}),oe.Authorization.userDefinition.Permissions[de.HumanResources]&&At.List({},A=>{var w=document.createElement("div");w.className="side-div";var v=document.createElement("div");v.id="DivisionTable",v.className="wrapper",w.appendChild(v);var k=document.createElement("div");k.className="wrapper";for(var q in A.Entities){var z=A.Entities[q].Id,B=A.Entities[q].Name;Ot.push({Id:z,Name:B});var H=lt(z,B,1);H.className="item",(0,E.isEmptyOrNull)(H)||k.appendChild(H)}v.appendChild(k),He.appendChild(w),St.List({},V=>{var F=document.createElement("div");F.className="side-div";var j=document.createElement("div");j.id="DepartmentTable",j.className="wrapper",F.appendChild(j);var te=document.createElement("div");te.className="wrapper";for(var ee in V.Entities){var ie=V.Entities[ee].Id,ue=V.Entities[ee].Name;qt.push({Id:ie,Name:ue});var re=lt(ie,ue,2);re.className="item",(0,E.isEmptyOrNull)(re)||te.appendChild(re)}j.appendChild(te),Je.appendChild(F),It.List({},he=>{var ae=document.createElement("div");ae.className="side-div";var T=document.createElement("div");T.id="SectionTable",T.className="wrapper",ae.appendChild(T);var se=document.createElement("div");se.className="wrapper";for(var Ee in he.Entities){var qe=he.Entities[Ee].Id,Be=he.Entities[Ee].Name;Bt.push({Id:qe,Name:Be});var xe=lt(qe,Be,3);xe.className="item",(0,E.isEmptyOrNull)(xe)||se.appendChild(xe)}T.appendChild(se),Me.appendChild(ae),$("#defaultOpen").click(),ve();var le=document.getElementById("EmployeeIdInput");$(le).on("change",function(){return Xe(this,null,function*(){$(fe).val()!=$(le).val()&&$(fe).val($(le).val()).trigger("change");var U=document.createElement("img");U.width=63,U.height=112.5,U.style.display="block",U.style.margin="0 auto";var ye=$("#employeeImg");if((0,E.isEmptyOrNull)($(le).val())){ye.replaceWith(U),U.setAttribute("id","employeeImg");return}let Z=0,me;for(Z=0;Z<D.length;Z++)if(D[Z].id==parseInt($(fe).val())){me=D[Z].ImgPath;break}(0,E.isEmptyOrNull)($(fe).val())||(U.src="/upload/"+me),ye.replaceWith(U),U.setAttribute("id","employeeImg")})});var fe=document.getElementById("EmployeeNameInput");$(fe).on("change",function(){return Xe(this,null,function*(){$(fe).val()!=$(le).val()&&$(le).val($(fe).val()).trigger("change");var U=document.createElement("img");U.width=63,U.height=112.5,U.style.display="block",U.style.margin="0 auto";var ye=$("#employeeImg");if((0,E.isEmptyOrNull)($(fe).val())){ye.replaceWith(U),U.setAttribute("id","employeeImg");return}let Z=0,me;for(Z=0;Z<D.length;Z++)if(D[Z].id==parseInt($(fe).val())){me=D[Z].ImgPath;break}(0,E.isEmptyOrNull)($(fe).val())||(U.src="/upload/"+me),ye.replaceWith(U),U.setAttribute("id","employeeImg")})}),$("#searcher").on("input",function(){return Xe(this,null,function*(){var U=$("#searcher").val(),ye=document.getElementsByClassName("tabcontent");let Z;for(Z=0;Z<ye.length&&ye[Z].style.display!="block";Z++);var me=ye[Z].children[0].querySelector(".wrapper").querySelector(".wrapper").children;let Mt=new RegExp(U,"gi");for(Z=0;Z<me.length;Z++)Mt.test(me[Z].textContent)?me[Z].style.display="":me[Z].style.display="none"})});var Se=0,Ie=D.length;let Ht=new mt.Select2Editor($("#EmployeeIdInput")),De=new mt.Select2Editor($("#EmployeeNameInput"));D.forEach(U=>{Se+=1,Ht.addItem({id:U.id.toString(),text:U.EmployeeId.toString()}),De.addItem({id:U.id.toString(),text:U.EmployeeName.toString()}),Se==Ie&&($("#EmployeeIdInput").trigger("change"),$("#EmployeeNameInput").trigger("change"))})})})});var s=document.createElement("div");s.setAttribute("class","row div2"),s.setAttribute("id","ElementsTab");var h=document.createElement("div");h.setAttribute("class","tab");var p=document.createElement("nav"),x=document.createElement("div");x.innerHTML=`<div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                          <a class="tab-nav-item nav-link " id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="false">Organisation Structure</a>
                          <a class="tab-nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Organisation Chart</a>
                        </div>`,p.appendChild(x),document.querySelector("#GridDiv").appendChild(p),document.querySelector("#GridDiv").appendChild(et);var f=document.createElement("div");f.id="orgChartContainer",f.className="BigTab",document.querySelector("#GridDiv").appendChild(f);function m(A,w){var v,k,q;if(w==S){$(".tab").show();let H=document.querySelector(".tablinks.active");if(H){var z=H.textContent+"Panel";document.getElementById(z)!=null&&(document.getElementById(z).style.display="block")}}else w==I&&($(".tab").hide(),$(".tabcontent").hide());for(k=document.getElementsByClassName("BigTab"),v=0;v<k.length;v++)k[v].style.display="none";for(q=document.getElementsByClassName("tab-nav-item"),v=0;v<q.length;v++)q[v].className=q[v].className.replace(" active","");document.getElementById(w)!=null&&(document.getElementById(w).style.display="block"),A.currentTarget.className+=" active";var B=document.getElementById("orgChartContainer");B.children.length==0&&!(0,E.isEmptyOrNull)(X)&&(ct(),$t())}L(m,"openBig");function g(A,w){var v,k,q;for(k=document.getElementsByClassName("tabcontent"),v=0;v<k.length;v++)k[v].style.display="none";for(q=document.getElementsByClassName("tablinks"),v=0;v<q.length;v++)q[v].className=q[v].className.replace("active","");document.getElementById(w)!=null&&(document.getElementById(w).style.display="block");var z=document.getElementById(w).children[0].querySelector(".wrapper").querySelector(".wrapper").children;for(let B=0;B<z.length;B++)z[B].style.display="";A.currentTarget.className+=" active"}L(g,"open");var S="chart-container",I="orgChartContainer",R=document.getElementById("nav-home-tab");R.addEventListener("click",function(){m(event,S)},!1);var Y=document.getElementById("nav-profile-tab");Y.addEventListener("click",function(){m(event,I)},!1),R.click(),oe.Authorization.userDefinition.Permissions[de.HumanResources]&&(s.appendChild(h),s.appendChild(He),s.appendChild(Me),s.appendChild(Je),document.querySelector(".content").appendChild(s));var J=document.createElement("div"),Q=document.createElement("button");Q.addEventListener("click",function(){g(event,"DepartmentPanel")},!1),Q.setAttribute("class","tablinks"),Q.innerText="Department",Q.setAttribute("id","defaultOpen");var K=document.createElement("button");K.addEventListener("click",function(){g(event,"DivisionPanel")},!1),K.setAttribute("class","tablinks"),K.innerText="Division";var N=document.createElement("button");N.addEventListener("click",function(){g(event,"SectionPanel")},!1),N.setAttribute("class","tablinks"),N.innerText="Section",J.appendChild(K),J.appendChild(Q),J.appendChild(N);var y=document.createElement("div");y.innerHTML='    <input id="searcher" type="text" placeholder="Search..." style="margin-left: 10px;">',h.appendChild(J),h.appendChild(y);let C=null});function _e(n,l,s){if(n.className.includes(l)){if(!n.children)n.children=[s];else{if(L(p=>n.children.some(x=>x.id===p),"checkId")(s.id))return!1;n.children.push(s)}return!0}if(n.children){for(let h of n.children)if(_e(h,l,s))return!1}return!1}L(_e,"addChildren");function Dt(n,l){if(n.children){for(let s of n.children)if(s.className===l.className)return!0}return!1}L(Dt,"hasChild");function it(n,l,s){if(l.endsWith("Class")||(l=l+" Class"),n.className===l){var h=Dt(n,s);return h}if(n.children){for(let p of n.children)if(it(p,l,s))return!0}return!1}L(it,"checkRepeatedChildren");function Re(n,l){if(n.className===l)return n.title;if(n.children)for(let s of n.children){let h=Re(s,l);if(h)return h}return null}L(Re,"findTitleByClassName");function rt(n,l){if(n.className===l)return n.id;if(n.children)for(let s of n.children){let h=rt(s,l);if(h)return h}return null}L(rt,"findIdByClassName");function nt(n,l){if(Array.isArray(n))for(let s=0;s<n.length;s++){let h=n[s];nt(h,h.id),h.id==l&&(n.splice(s,1),s--)}else if(n.children&&(nt(n.children,l),n.id==l))return null}L(nt,"deleteNodeById");function Te(n){(0,E.isEmptyOrNull)(n)||n.children&&(n.children.forEach(l=>Te(l)),n.children.length===0&&delete n.children)}L(Te,"removeEmptyChildren");function Ve(n,l){if(!(0,E.isEmptyOrNull)(n.id)&&n.id.trim()===l.trim())return n.children||[];if(n.children&&Array.isArray(n.children))for(let s of n.children){let h=Ve(s,l);if(h)return h}return null}L(Ve,"findChildrenById");function $t(){new MutationObserver(l=>{for(let f of l)if(f.type==="childList"){var s=document.getElementById("orgChartContainer");if(!(0,E.isEmptyOrNull)(s)){var h=s.querySelector(".orgchart");if(!(0,E.isEmptyOrNull)(h)){var p=h.getElementsByClassName("node");for(let m=0;m<p.length;m++){var x=JSON.parse(p[m].getAttribute("data-source"));x.hierarchyLevel!=M&&(p[m].draggable=!1)}}}}}).observe(document.body,{childList:!0,subtree:!0})}L($t,"DisableOrgChartMovement");var Ne=[],at=[];let be=0;function ve(){let n=new MutationObserver(l=>{for(let Q of l)if(Q.type==="childList"){var s=document.getElementsByClassName("node");if(s.length>0){let N=[];for(let y=0;y<s.length;y++){var h=s[y];N.push(h),N[y].addEventListener("dragover",function(C){let A=C;A.dataTransfer&&(C.preventDefault(),A.dataTransfer.dropEffect="move",C.stopImmediatePropagation())});var p=JSON.parse(N[y].getAttribute("data-source")),x=p.relationship;(x!="001"||s.length==1)&&oe.Authorization.userDefinition.Permissions[de.HumanResources]&&(N[y].draggable=!0),N[y].addEventListener("drop",function(C){C.stopImmediatePropagation();var A=C.dataTransfer.getData("text/plain");if(!(0,E.isEmptyOrNull)(A)){var w=JSON.parse(A),v=$(C.target);if((0,E.isEmptyOrNull)(v.attr("class"))||v.attr("class").includes("avatar")&&(v=v.parent()),(0,E.isEmptyOrNull)(v.parent().attr("data-source")))for(;(0,E.isEmptyOrNull)(v.parent().attr("data-source"));)v=v.parent();var k=JSON.parse(v.parent().attr("data-source")),q=k.hierarchyLevel,z=k.className,B=k.id,H=We(B,136,153);if(!(0,E.isEmptyOrNull)(A)){var V=null,F=null,j=null,te=null,ee=null;if(w.external&&(j=w.id,te=w.hierarchyId,V=w.title,F=w.name,ee=w.hierarchyLevel,q>ee&&!(0,E.isEmptyOrNull)(k.parentId))){var ie=t(r(q))+" cannot be above "+t(r(ee));(0,ze.notifyError)(ie),C.stopImmediatePropagation();return}var ue=parseInt(v.parent().attr("class").replace("node","").replace("Class","").trim());if(ue==parseInt(w.parentId)&&w.parentId!==void 0&&ue!==void 0||(0,E.isEmptyOrNull)(w.parentId)&&(0,E.isEmptyOrNull)(w.external)||(0,E.isEmptyOrNull)(v.parent().attr("class")))return;var re=w.className;ee==null&&(ee=w.hierarchyLevel);var he=v.parent().attr("class").replace("node","").trim().replace("focused","");if(he==re)return;if(ee==M){let Ie=0;var xe=parseInt(w.EmployeeRowId);for(Ie=0;Ie<D.length&&D[Ie].id!=xe;Ie++);var ae=JSON.parse(JSON.stringify(W)),T=ae}w.external==null&&(ee==M?V=Re(X,re):V=Re(W,re)),j==null&&(ee==M?j=rt(X,re):j=rt(W,re)),F==null&&(F=re.replace("Class","").trim()),F=F.replace("focused","");var se;ee==M?se=Ve(X,j):se=Ve(W,j);for(var Ee in se)if(se[Ee].id==w.id)return;var qe=w.parentId,Be=parseInt(w.hierarchyLevel),xe=parseInt(w.EmployeeRowId),le={EmployeeRowId:null,hierarchyLevel:Be,id:j,name:V,title:V,className:`${j} Class`,hierarchyId:te};if(ee==M&&(le.EmployeeRowId=xe,le.className=`EMPLOYEE${xe} Class`),ee==M){var T=X;if(T=ce(T,B),!(0,E.isEmptyOrNull)(T)&&it(T,z,le))return}else{var T=W;if(T=ce(T,B),it(T,z,le))return}if(ee==M){var ae=JSON.parse(JSON.stringify(X)),T=ae;T=ce(T,qe),T.children=T.children.filter(De=>De.EmployeeRowId!==w.EmployeeRowId);for(var Ee in se)T.children.push(se[Ee]);X=ae,T=X,T=ce(T,B),(0,E.isEmptyOrNull)(T.children)||T.children.length==1&&(0,E.isEmptyOrNull)(T.EmployeeRowId)&&T.children[0].title==T.title&&((0,E.isEmptyOrNull)(T.children[0].EmployeeRowId)||(B=T.children[0].id,he=T.children[0].className,T=T.children[0]));var fe=Le(`EMPLOYEE${parseInt(w.EmployeeRowId)}`,136,153);le.id=`${B}${fe}`,_e(T,he,le),Te(X),(0,E.isEmptyOrNull)(X)||ht()}else{var Se=Le(j,136,153);(0,E.isEmptyOrNull)(B)||(Se=B+Se);var le={EmployeeRowId:null,hierarchyId:te,hierarchyLevel:Be,id:Se,name:V,title:V,className:`${j} Class`},T=W;if((0,E.isEmptyOrNull)(w.external)&&(T=ce(T,qe),!(0,E.isEmptyOrNull)(T.children))){T.children=T.children.filter(De=>De.id!==w.id);for(var Ee in se)T.children.push(se[Ee])}T=W,(0,E.isEmptyOrNull)(H)||(T=ce(T,B)),_e(T,he,le),Te(W),zt(B,Se,le.name),(0,E.isEmptyOrNull)(W)||Ue()}ve(),C.dataTransfer.dropEffect="none"}}}),N[y].addEventListener("dragstart",function(C){C.stopImmediatePropagation();var A=C.target.getAttribute("data-source");C.dataTransfer.setData("text/plain",A),C.dataTransfer.dropEffect="move"})}n.disconnect()}var f=document.getElementsByClassName("avatar");for(let N=0;N<f.length;N++){var m=f[N];m.draggable=!1}var g=document.getElementsByClassName("side-div");for(let N=0;N<g.length;N++)g[N].addEventListener("drop",function(y){y.stopImmediatePropagation();var C=y.dataTransfer.getData("text/plain"),A=JSON.parse(C),w=A.hierarchyLevel;if(!A.external){var v=A.hierarchyLevel,k=A.id,q=A.hierarchyId,z=A.title,B=A.name,H=A.className,V=A.parentId;H==null&&(H=A.id);var F=Ve(W,k);if(v!=M){var j=JSON.parse(JSON.stringify(W)),te=j;te=ce(te,V),nt(te,k),te=j;var ee=We(V,136,153),ie=`${ee[ee.length-1]}`,ue=`${ie} Class`;te=ce(te,V);for(var re in F){var he=Le(F[re].className,136,153),ae=`${V}${he}`,T={hierarchyId:q,EmployeeRowId:null,hierarchyLevel:F[re].hierarchyLevel,id:ae,name:F[re].name,title:F[re].title,className:F[re].className};_e(te,ue,T)}W=j,Te(W),gt=JSON.parse(JSON.stringify(W)),Ue();var se=r(w);k=k.replace(se,"")}}}),g[N].addEventListener("dragover",function(y){y.stopImmediatePropagation(),y.preventDefault()});var S=document.getElementsByClassName("CheckBox");for(let N=0;N<S.length;N++)S[N].addEventListener("change",L(function(){event.stopImmediatePropagation();let C=this.checked;var A=JSON.parse(this.parentElement.parentElement.getAttribute("data-source")),w=A.EmployeeRowId;for(let B=0;B<D.length&&D[B].id!=w;B++);var v=A.id,k=JSON.parse(JSON.stringify(X)),q=k;q=ce(q,v),q.Rights[this.id]=C,X=k;var z=Nt(k);ke.ClearOldAdminRightRecord({},B=>{for(let H=0;H<z.length;H++)z[H].nodeHierarchy!=M&&!(0,E.isEmptyOrNull)(z[H].EmployeeRowId)&&ke.Create({Entity:{EmployeeRowId:z[H].EmployeeRowId,NodeId:z[H].id,Appraisal:z[H].Rights.Appraisal,LeaveApproval:z[H].Rights.LeaveApproval,OtApproval:z[H].Rights.OtApproval,Training:z[H].Rights.Training,MoneyClaiming:z[H].Rights.MoneyClaiming}})})},"handleCheckboxChange"));$(".SelectEmployee").on("click",function(N){N.stopImmediatePropagation();let y=$(this);var A=JSON.parse(y.parent().attr("data-source")).id,w=y.parent().attr("class");O=A;var v=w.replace("node","").trim(),k=document.getElementById("TargetElementSpan");k.textContent=Re(W,v),Re(W,v),we.show()});var I=document.getElementsByClassName("filterCheckBox");for(let N=0;N<I.length;N++)I[N].addEventListener("change",L(function(){event.stopImmediatePropagation(),xt()},"handleCheckboxChange"));var R=document.getElementsByClassName("OrgChartFilterCheckBox");for(let N=0;N<R.length;N++)R[N].addEventListener("change",L(function(){event.stopImmediatePropagation(),ct(),console.log("haha")},"handleCheckboxChange"));$(".clickable-icon").on("click",function(N){N.stopImmediatePropagation();for(var y=$(N.target),C=null;(0,E.isEmptyOrNull)(C);)C=y.attr("data-source"),y=y.parent();var A=JSON.parse(C),w=A.id,v=A.className,k=JSON.parse(JSON.stringify(W)),q=k;q=ce(q,w),ot(q,v,null),W=k,Ue()}),$("#generateOrgChartButton").on("click",function(N){N.stopImmediatePropagation(),(0,E.isEmptyOrNull)(X)?(Et(),ve()):(0,ze.confirmDialog)("Do you want to generate Organization Chart? The original chart will be override.",()=>{Et(),ve()})}),$("#togglePanel").on("click",function(N){N.stopImmediatePropagation();function y(A){return window.getComputedStyle(A).display==="none"}L(y,"isDivHidden");let C=document.getElementById("ElementsTab");y(C)?(C.style.display="block",this.textContent="Hide Tab"):(C.style.display="none",this.textContent="Display Tab")}),$("#toggleSidePanel").on("click",function(N){function y(A){return window.getComputedStyle(A).display==="none"}L(y,"isDivHidden");let C=document.getElementById("left-panel");y(C)?(C.style.display="block",this.textContent="Hide Tab"):(C.style.display="none",this.textContent="Display Tab"),console.log("haha"),N.stopImmediatePropagation()}),$("#toggleOrgChartSidePanel").on("click",function(N){function y(A){return window.getComputedStyle(A).display==="none"}L(y,"isDivHidden"),console.log("haha");let C=document.getElementById("chart-left-panel");y(C)?(C.style.display="block",this.textContent="Hide Tab"):(C.style.display="none",this.textContent="Display Tab"),N.stopImmediatePropagation()}),$(".orgchart").addClass("noncollapsable");var Y=document.getElementById("orgChartContainer");if(!(0,E.isEmptyOrNull)(Y)&&oe.Authorization.userDefinition.Permissions[de.HumanResources]){var J=Y.querySelector(".orgchart");if(!(0,E.isEmptyOrNull)(J)){var s=J.getElementsByClassName("node");for(let y=0;y<s.length;y++){var p=JSON.parse(s[y].getAttribute("data-source"));p.hierarchyLevel!=M&&(s[y].draggable=!1),(0,E.isEmptyOrNull)(p.EmployeeRowId)||s[y].addEventListener("click",function(A){A.stopImmediatePropagation();var w=$(A.target);let v=!1;if(!w.hasClass("CheckBox")){w.hasClass("dot")&&(v=!0);for(var k=null;(0,E.isEmptyOrNull)(k);)k=w.attr("data-source"),w=w.parent();var q=JSON.parse(k),z=q.EmployeeRowId;if(v==!0){let V=D.find(F=>F.id===z);var B=document.getElementById("pdf");Ne=[],at=[];try{let F=JSON.parse(V.JobDescPath);for(let j=0;j<F.length;j++)Ne.push(`/upload/${F[j].Filename}`),at.push(`${F[j].OriginalName}`)}catch(F){B.src=`/upload/${V.JobDescPath}`}d(),be=0,pdfDialog.show();return}else{var H=new kt(z);H.loadByIdAndOpenDialog(z)}}})}}}}});n.observe(document.body,{childList:!0,subtree:!0})}L(ve,"setCallbacks");function yt(n){let l=[];if(n.EmployeeRowId!==void 0&&!(0,E.isEmptyOrNull)(n.EmployeeRowId)&&l.push(parseInt(n.EmployeeRowId)),n.children&&Array.isArray(n.children))for(let s of n.children)l=l.concat(yt(s));return l}L(yt,"extractEmployeeInOrgChart");function vt(n){function l(f){return f.endsWith("Class")?f.slice(0,-5):f}L(l,"stripClassSuffix");for(let f of n){let m=f.children||[];var s=`${f.id}`;if(f.EmployeeRowId!=null&&f.hierarchyLevel!==M){f.children=[],s=`${f.id}${Le(`EMPLOYEE${f.EmployeeRowId}`,136,153)}`;var h={EmployeeRowId:f.EmployeeRowId,hierarchyLevel:f.hierarchyLevel,name:f.name,id:s,title:f.title,className:`EMPLOYEE${f.EmployeeRowId} Class`,children:m.length?m:void 0};f.children.push(h),f.EmployeeRowId=null}if(m.length>0){for(let g of m){var p=l(g.className),x=`${s}${Le(p,136,153)}`;g.id=x}vt(m)}}return n}L(vt,"ExtendTree");function ce(n,l){if(n.id==l)return n;if(n.children)for(let h of n.children){var s=ce(h,l);if(s)return s}return null}L(ce,"SearchById");function Et(){function n(y){let C=[];if(y.Rights&&y.EmployeeRowId&&C.push({id:y.id,EmployeeRowId:y.EmployeeRowId,Rights:y.Rights}),y.children)for(let A of y.children)C=C.concat(n(A));return C}L(n,"extractRightsAndEmployeeRowId");function l(y){if(y.hierarchy==0){var C={Appraisal:!0,LeaveApproval:!0,OtApproval:!0,MoneyClaiming:!0,Training:!0};y.Rights=C}else if((0,E.isEmptyOrNull)(y.Rights)&&!(0,E.isEmptyOrNull)(y.EmployeeRowId)){var C={Appraisal:!1,LeaveApproval:!1,OtApproval:!1,MoneyClaiming:!1,Training:!1};y.Rights=C}if(y.children)for(let A of y.children)l(A)}if(L(l,"fillInRights"),!(0,E.isEmptyOrNull)(X))var s=n(X);let h=yt(W);var p=JSON.parse(JSON.stringify(W)),x;x=JSON.parse(JSON.stringify(p));for(let y=0;y<D.length;y++){if(h.includes(D[y].id))continue;var f=x,m;for(var g in tt.items)if(tt.items[g].Id==D[y].OccupationId){m=tt.items[g].Name;break}var S=Le(`EMPLOYEE${D[y].id}`,136,153),I={hierarchyId:D[y].id,EmployeeRowId:D[y].id,hierarchyLevel:M,id:S,name:m,title:m,className:`EMPLOYEE${D[y].id} Class`},R;let C=0,A=0;for(let w of Object.keys(pe))if(isNaN(Number(w))){if((0,E.isEmptyOrNull)(D[y][`${t(w)}Id`]))continue;var Y=`${w}${D[y][t(w)+"Id"]} Class`,J=f;if(f=st(f,Y),(0,E.isEmptyOrNull)(f)){C>0?(f=J,Y=R):A=1;break}R=Y,C+=1}!(0,E.isEmptyOrNull)(f)&&A==0&&(h.includes(D[y].id)||(I.id=f.id+I.id,_e(f,Y,I)))}var Q=x,K=vt(Q.children);if(Q.children=[],Q.children=K,!(0,E.isEmptyOrNull)(s))for(let y=0;y<s.length;y++){var f=x,N=ce(f,s[y].id);(0,E.isEmptyOrNull)(N)||(N.Rights=s[y].Rights)}f=x,l(f),X=x,ht()}L(Et,"GenerateOrgChartData");function lt(n,l,s){var h=document.createElement("div");h.className="flex-child";var p=document.createElement("td"),x=document.createElement("div");p.appendChild(x);var f=pe[s];x.className="flex-container "+f,x.style.border="1px solid #ccc",x.style.padding="10px",x.draggable=!0;var m=`{ "EmployeeRowId":"null","hierarchyLevel":"${s}","hierarchyId":"${n}" ,"id":"${f+n}",
        "type":"${s}","title":"${l}","external": "true","ElementId": "", "className":"${f+n} Class"}`;x.setAttribute("data-source",m),x.id=f+n.toString();var g=document.createElement("div");return g.textContent=l,g.className="CardTitle",h.appendChild(g),x.appendChild(h),x.addEventListener("dragstart",function(S){var I=S.target,R=I.getAttribute("data-source");S.dataTransfer.setData("text/plain",R),S.dataTransfer.dropEffect="move"}),x.addEventListener("dragend",function(S){}),p}L(lt,"GenerateCard");function ot(n,l,s){if(l.endsWith("Class")||(l=l+" Class"),n.className===l)return(0,E.isEmptyOrNull)(s)?n.EmployeeRowId=null:n.EmployeeRowId=parseInt(s),!0;if(n.children){for(let h of n.children)if(ot(h,l,s))return!1}return!1}L(ot,"SetEmployeeByClassName");function st(n,l){l.endsWith("Class")||(l=l+" Class");let s=null;if((0,E.isEmptyOrNull)(n))return s;let h=[n];for(;h.length>0;){let p=h.shift();if(p.className===l)return p;p.children&&h.push(...p.children)}return s}L(st,"findByClassName");function dt(n,l){let s=[],h=l.find(p=>p.id==n);for(;h;)s.push(h),h=l.find(p=>p.id==h.parentId);return s}L(dt,"traceParents");function xt(){Pe.List({},n=>{if(ge.length==0)for(let R=0;R<n.Entities.length;R++){var l=n.Entities[R].EmployeeRowId;Fe.indexOf(n.Entities[R].EmployeeRowId)!=-1&&(l=null,Pe.Update({EntityId:n.Entities[R].Id,Entity:{EmployeeRowId:null}})),ge.push({id:n.Entities[R].NodeId,EmployeeRowId:l,name:n.Entities[R].Name,title:n.Entities[R].Title,className:n.Entities[R].ClassName,hierarchyLevel:n.Entities[R].HierarchyLevel,parentId:n.Entities[R].ParentId,hierarchyId:n.Entities[R].hierarchyId,childrenIndex:n.Entities[R].childrenIndex})}let h=Array.from(document.querySelectorAll(".filterCheckBox:checked")).map(R=>R.getAttribute("wantedId"));var p,x=0;if(h.length>0){x=1;let R=[];h.forEach(Y=>{R.push(Y);let J=dt(Y,ge);R.push(...J)}),R=Array.from(new Set(R.map(Y=>Y.id))).map(Y=>ge.find(J=>J.id===Y)),p=Ae(R)}else p=Ae(ge);(0,E.isEmptyOrNull)(p)&&((0,E.isEmptyOrNull)(Ye)?p=Pt():p=JSON.parse(Ye)),W=JSON.parse(JSON.stringify(p));var f=document.getElementById("chart-container"),m=f.querySelector("#left-panel");if((0,E.isEmptyOrNull)(m)){var g=document.createElement("div");g.id="left-panel",g.className="left-panel-class",f.append(g);var S=Oe(p,1);$("#left-panel").append(S)}if(Ct(p,"chart-container",x),oe.Authorization.userDefinition.Permissions[de.HumanResources]){console.log("haha");var I=f.querySelector("#chart-container .buttonGroup");(0,E.isEmptyOrNull)(I)&&(console.log("haha"),I=document.createElement("div"),I.className="buttonGroup",I.innerHTML=`
            <button id="generateOrgChartButton" class="btn btn-light btn-rounded" style="top: 50px; right: 10px; position: absolute; background-color: rgb(197, 216, 240);">Generate Organisation Chart</button>
            <button id="togglePanel" class="btn btn-light btn-rounded" style="bottom: 10px; right: 10px; position: absolute; background-color: rgb(197, 216, 240);">Hide Tab</button>
            <button id="toggleSidePanel" class="btn btn-light btn-rounded" style="bottom: 10px; left: 10px; position: absolute; background-color: rgb(197, 216, 240);">Hide Filter Tab</button>
            `,f.appendChild(I))}ve()})}L(xt,"GenerateOrgStructure");function Ue(){Pe.DeleteAll({},n=>{gt=JSON.parse(JSON.stringify(W));let l=wt(W);for(let m=0;m<l.length;m++)Pe.Create({Entity:{ParentId:l[m].parentId,NodeId:l[m].id,Name:l[m].name,Title:l[m].title,ClassName:l[m].className,HierarchyLevel:l[m].hierarchyLevel,EmployeeRowId:l[m].EmployeeRowId,hierarchyId:l[m].hierarchyId,childrenIndex:l[m].childrenIndex}});ge=l;let h=Array.from(document.querySelectorAll(".filterCheckBox:checked")).map(m=>m.getAttribute("wantedId"));var p,x=0;if(h.length>0){x=1;let m=[];h.forEach(g=>{m.push(g);let S=dt(g,ge);m.push(...S)}),m=Array.from(new Set(m.map(g=>g.id))).map(g=>ge.find(S=>S.id===g)),p=Ae(m)}else p=Ae(ge);var f=Oe(p,1);$("#left-panel").html(""),$("#left-panel").append(f),Ct(p,"chart-container",x),ve()})}L(Ue,"GenerateSaveOrgStructure");function Pt(){var n=r(0),l=n,s=Le(n,136,153),h={hierarchyId:0,EmployeeRowId:null,hierarchyLevel:0,id:s,name:l,title:n,className:n+" Class"};return h}L(Pt,"GenerateDefaultOrgStruct");function Ct(n,l,s){var h=document.getElementById(l);if(h){var p=h.querySelector(".orgchart");p&&(o=p.getAttribute("style"),u=p.getAttribute("data-pan-start"),p.remove())}let x=new Ce({chartContainer:`#${l}`,data:n,nodeContent:"title",nodeId:"thisOrgChart",zoom:!0,pan:!0,createNode:function(f,m){let g="";f.hierarchyLevel!=M&&(f.draggable=!1);let S=$(f);if((0,E.isEmptyOrNull)(m.EmployeeRowId))oe.Authorization.userDefinition.Permissions[de.HumanResources]&&(g='<button type="button"  class="btn btn-light btn-rounded SelectEmployee" data-mdb-ripple-color="#ffffff" style="background-color:#e4dbd8"> <span style="display:block;">Select Employee</span> </button>',S.append(g));else{var I=D.find(N=>N.id===m.EmployeeRowId),R=I.ImgPath;if(g=` 

                    <div  style="display: flex; align-items: center; height: 100%;" class=" row">
                        </div>
                <div style="text-align: left;height: 100%;padding-right:0;align-items: center;justify-content: center;display: flex;padding-top: 5px;padding-bottom: 5px">
                    <div style="text-align: left;height: 100%;width:100%;padding-right:0">
                            <div class="col-1"  style="font-size: 10px; display: flex; justify-content: space-between; align-items: center; width: 100%; white-space: nowrap;"> <span  style="display: block;white-space: nowrap;"> ${I.EmployeeName} </span>  </div>
                            </div>
                    `,S.append(g),m.hierarchyLevel!=M&&oe.Authorization.userDefinition.Permissions[de.HumanResources]){let N='<div class="fa fa-times btn clickable-icon"></div>';S.find(".col-1").append(N)}var Y=document.createElement("div"),J=document.createElement("img");J.src=`/upload/${R}`,J.className="avatar",J.crossOrigin="anonymous",J.draggable=!1,J.width=63,J.height=112.5,J.style.marginRight="20px",J.onerror=function(){J.src=""},Y.appendChild(J),S.find(".row").append(Y)}S.find(".content").remove()}});return s==0&&(x.chart.style=o),x}L(Ct,"GenerateStructure");function Oe(n,l){if((0,E.isEmptyOrNull)(n))return;let s=document.createElement("input");s.type="checkbox",l===1?s.className="filterCheckBox":l===0&&(s.className="OrgChartFilterCheckBox");let h={},p={};document.querySelectorAll(`input.${s.className}`).forEach(S=>{h[S.getAttribute("wantedId")]=S.checked}),document.querySelectorAll(`.${s.className}.toggle`).forEach(S=>{let I=S.getAttribute("wantedid");p[I]=S.textContent==="-"});let m=document.createElement("ul");m.classList.add("nested"),m.id="bulletList";let g=document.createElement("li");if(g.textContent=`${n.name}`,!(0,E.isEmptyOrNull)(n.EmployeeRowId)){let S=D.find(I=>I.id===n.EmployeeRowId);(0,E.isEmptyOrNull)(S)||(g.textContent=`${g.textContent} (${S.EmployeeId})`)}if(s.setAttribute("wantedId",n.id),s.style.marginLeft="10px",h[n.id]!==void 0&&h[n.id]===!0&&(s.checked=h[n.id]),g.appendChild(s),n.children&&n.children.length>0&&n.hierarchyLevel!==0){let S=document.createElement("span");S.classList.add("toggle"),S.classList.add(`${s.className}`),S.textContent="+",S.style.cursor="pointer",S.style.color="#007BFF",S.style.textDecoration="underline",S.setAttribute("wantedId",n.id),g.prepend(S),S.addEventListener("click",()=>{let I=g.querySelector("ul");I&&(I.style.display=I.style.display==="none"||I.style.display===""?"block":"none",S.textContent=I.style.display==="none"?"+":"-")}),p[n.id]&&(S.textContent="-")}if(n.children&&n.children.length>0){let S=document.createElement("ul"),I=n.hierarchyLevel===0||p[n.id]?"block":"none";S.style.display=I,n.children.forEach(R=>{S.appendChild(Oe(R,l))}),g.appendChild(S)}return m.appendChild(g),m}L(Oe,"GenerateUl");function zt(n,l,s,h="filterCheckBox"){let p=document.querySelector(`[wantedid="${n}"]`);if(!p){console.error(`No element found with wantedId: ${n}`);return}let x=p.closest("li");if(!x){console.error(`No parent <li> found for wantedId: ${n}`);return}let f=x.querySelector("ul.nested");if(!f){f=document.createElement("ul"),f.classList.add("nested"),f.style.display="none";let I=document.createElement("span");I.classList.add("toggle"),I.textContent="+",I.style.cursor="pointer",I.style.color="#007BFF",I.style.textDecoration="underline",I.addEventListener("click",()=>{f.style.display==="none"?(f.style.display="block",I.textContent="-"):(f.style.display="none",I.textContent="+")}),x.prepend(I),x.appendChild(f)}if(f.querySelector(`[wantedid="${l}"]`)){console.warn(`Item with wantedId "${l}" already exists.`);return}let g=document.createElement("li");Array.from(document.querySelectorAll(".filterCheckBox:checked")).length>0?g.innerHTML=`
        ${s}
        <input type="checkbox" class="${h}" wantedid="${l}" style="margin-left: 10px;" checked>
    `:g.innerHTML=`
        ${s}
        <input type="checkbox" class="${h}" wantedid="${l}" style="margin-left: 10px;">
    `,f.appendChild(g)}L(zt,"addListItem");function Ae(n){return Jt(n)}L(Ae,"GenerateJson");function ct(){function n(h,p){for(let x of h){if(x.EmployeeRowId===p)return x;if(x.children){let f=n(x.children,p);if(f)return f}}return null}L(n,"findParentByEmployeeRowId");function l(h,p){let x=!1,f=h.filter(m=>m.EmployeeRowId===p?(x=!0,!1):!0).map(m=>{if(m.children){let g=l(m.children,p);g.wasFiltered&&(x=!0),m.children=g.children}return m});return{wasFiltered:x,children:f}}L(l,"filterChildren");function s(h,p){var x=!1;if(!(0,E.isEmptyOrNull)(h.children)){var f=n(h.children,p);if(!(0,E.isEmptyOrNull)(f)){var m=We(f.id,136,153);if(f){var g=h;g=ce(g,f.id);let S=g.children||[];g=h;for(let I=0;I<m.length-1;I++)g=st(g,m[I]);if(g&&g.children){let I=l(g.children,p);g.children=I.children,(0,E.isEmptyOrNull)(g.children)?g.children=S:g.children.push(...S),x=I.wasFiltered,h=g}}return x}}}L(s,"removeNodeByEmployeeRowId"),Ke.List({},h=>{var p=0;if(ne.length==0){p=1;for(let f=0;f<h.Entities.length;f++){var x=h.Entities[f].EmployeeRowId;ne.push({id:h.Entities[f].NodeId,EmployeeRowId:x,name:h.Entities[f].Name,title:h.Entities[f].Title,className:h.Entities[f].ClassName,hierarchyLevel:h.Entities[f].HierarchyLevel,parentId:h.Entities[f].ParentId,childrenIndex:h.Entities[f].childrenIndex})}}ke.List({},f=>{if(p==1)for(let v=0;v<f.Entities.length;v++){var m=ne.find(k=>k.id===f.Entities[v].NodeId);if(m){var g={Appraisal:f.Entities[v].Appraisal,LeaveApproval:f.Entities[v].LeaveApproval,OtApproval:f.Entities[v].OtApproval,Training:f.Entities[v].Training,MoneyClaiming:f.Entities[v].MoneyClaiming};m.Rights=g}}let I=Array.from(document.querySelectorAll(".OrgChartFilterCheckBox:checked")).map(v=>v.getAttribute("wantedId"));var R;if(I.length>0){let v=[];I.forEach(k=>{v.push(k);let q=dt(k,ne);v.push(...q)}),v=Array.from(new Set(v.map(k=>k.id))).map(k=>ne.find(q=>q.id===k)),R=Ae(v)}else R=Ae(ne);if((0,E.isEmptyOrNull)(R)){if((0,E.isEmptyOrNull)(Ye))return;R=JSON.parse(bt)}var y=document.getElementById("orgChartContainer"),Y=y.querySelector("#chart-left-panel");X=JSON.parse(JSON.stringify(R));var J=!1;for(let v=0;v<Fe.length;v++){var Q=s(X,Fe[v]);Q==!0&&J==!1&&(J=Q)}if(J==!0){ht();return}if((0,E.isEmptyOrNull)(Y)){var K=document.createElement("div");K.id="chart-left-panel",K.className="left-panel-class",y.append(K);var N=Oe(R,0);$("#chart-left-panel").append(N)}var y=document.getElementById("orgChartContainer");if(y){var C=y.querySelector(".orgchart");C&&(o=C.getAttribute("style"),C.remove())}je=JSON.parse(JSON.stringify(X));let A=new Ce({chartContainer:"#orgChartContainer",data:je,nodeContent:"title",zoom:!0,pan:!0,createNode:function(v,k){let q="";v.hierarchyLevel==M&&(v.draggable=!1);let z=$(v);if(!(0,E.isEmptyOrNull)(k.EmployeeRowId)){var B=D.find(ae=>ae.id===k.EmployeeRowId),H="-";(0,E.isEmptyOrNull)(B.JobGradeId)||(0,E.isEmptyOrNull)(Ge.itemById[B.JobGradeId].Name)||(H=Ge.itemById[B.JobGradeId].Name);var V=oe.Authorization.userDefinition.Permissions[de.HumanResources]==!0?B.SalaryDetails:"N/A",F=B.ImgPath;if(q=` 
                    <div  style=" display: flex; align-items: center; height: 100%; flex-direction: column;" class=" rowData">
                        </div>
                    <div style=" text-align: left;height: 100%;padding-right:0;align-items: center;justify-content: center;display: flex;padding-top: 5px;padding-bottom: 5px">
                    <div style="text-align: left;height: 100%;width:100%;padding-right:0">
                            <div class="col-1"  style="font-size: 10px; display: flex; justify-content: space-between; align-items: center; width: 100%; white-space: nowrap;"> <span  style="display: block;white-space: nowrap;"> Name : ${B.EmployeeName} <br> Job Grade : ${H} <br> Salary Details : ${V} </span>  </div>
                            </div>
                    `,oe.Authorization.userDefinition.Permissions[de.HumanResources]&&k.hierarchyLevel!=M&&k.hierarchyLevel!=0){var j;if((0,E.isEmptyOrNull)(k.Rights))j=`
                    <div>
                    <i class="fas fa-band-aid" title="Approve Leave Requests" ></i>
                    <i class="fa fa-wrench" title="Approve Overtime Requests"></i>
                    <i class="fa fa-money-bill" title="Approve Money Claiming Requests"></i>
                    <i class="fa fa-check"  title="Evaluate Employee Requests"></i>
                    <i class="far fa-clock" title="Manage Training Requests"></i>
                    </div>
                    <div>
                    <input class = "CheckBox"  id="LeaveApproval" type="checkbox"  title="Approve Leave Requests">
                    <input  class = "CheckBox" id="OtApproval" type="checkbox" title="Approve Overtime Requests">
                    <input class = "CheckBox"  id="MoneyClaiming" type="checkbox" title="Approve Money Claiming Requests" >
                    <input class = "CheckBox"  id="Appraisal" type="checkbox" title="Evaluate Employee Requests" >
                    <input class = "CheckBox"  id="Training" type="checkbox" title="Manage Training Requests" >

                    </div>    
`;else{j=`
                                <div>
                                    <i class="fas fa-band-aid" title="Approve Leave Requests"></i>
                                    <i class="fa fa-wrench" title="Approve Overtime Requests"></i>
                                   <i class="fa fa-money-bill" title="Approve Money Claiming Requests"></i>
                                    <i class="fa fa-check" title="Evaluate Employee Requests"></i>
                                    <i class="far fa-clock" title="Manage Training Requests"></i>
                                </div>
                                <div>
                            `;var te=["LeaveApproval","OtApproval","MoneyClaiming","Appraisal","Training"];for(let ae of te){var ee=k.Rights[ae];let T=ee?"checked":"";j+=`
                    <input class="CheckBox" id="${ae}" type="checkbox" title="${ae.replace(/([A-Z])/g," $1")}" ${T}>
                `}j+="</div>"}q=j+q}z.append(q);var ie=document.createElement("img");ie.src=`/upload/${F}`,ie.className="avatar",ie.crossOrigin="anonymous",ie.draggable=!1,ie.width=63,ie.height=112.5,ie.style.marginRight="20px",ie.onerror=function(){ie.src=""};let he=z.find(".rowData");he.append(ie);var ue=document.createElement("span");ue.className="dot",oe.Authorization.userDefinition.Permissions[de.HumanResources]&&he.append(ue)}z.find(".content").remove()}});if(ve(),oe.Authorization.userDefinition.Permissions[de.HumanResources]){var w=y.querySelector("#orgChartContainer .buttonGroup");(0,E.isEmptyOrNull)(w)&&(w=document.createElement("div"),w.className="buttonGroup",w.innerHTML=`
            <button id="toggleOrgChartSidePanel" class="btn btn-light btn-rounded" style="bottom: 10px; left: 10px; position: absolute; background-color: rgb(197, 216, 240);">Hide Filter Tab</button>
            `,y.appendChild(w))}})})}L(ct,"GenerateOrgChart");function ht(){Ke.DeleteAll({},l=>{ne=wt(X);for(let m=0;m<ne.length;m++)Ke.Create({Entity:{ParentId:ne[m].parentId,NodeId:ne[m].id,Name:ne[m].name,Title:ne[m].title,ClassName:ne[m].className,HierarchyLevel:ne[m].hierarchyLevel,EmployeeRowId:ne[m].EmployeeRowId,childrenIndex:ne[m].childrenIndex}});var s=Nt(X);ke.ClearOldAdminRightRecord({},m=>{for(let g=0;g<s.length;g++)s[g].nodeHierarchy!=M&&!(0,E.isEmptyOrNull)(s[g].EmployeeRowId)&&ke.Create({Entity:{EmployeeRowId:s[g].EmployeeRowId,NodeId:s[g].id,Appraisal:s[g].Rights.Appraisal,LeaveApproval:s[g].Rights.LeaveApproval,OtApproval:s[g].Rights.OtApproval,Training:s[g].Rights.Training,MoneyClaiming:s[g].Rights.MoneyClaiming}})});var h=document.getElementById("orgChartContainer");if(h){var p=h.querySelector(".orgchart");p&&(o=p.getAttribute("style"),u=p.getAttribute("data-pan-start"),p.remove())}var x=Oe(X,0);$("#chart-left-panel").html(""),$("#chart-left-panel").append(x),Te(X),je=JSON.parse(JSON.stringify(X));let f=new Ce({chartContainer:"#orgChartContainer",data:je,nodeContent:"title",nodeId:"thisOrgChart",zoom:!0,pan:!0,id:"orgChart",createNode:function(m,g){let S="",I=$(m);if(!(0,E.isEmptyOrNull)(g.EmployeeRowId)){var R=D.find(k=>k.id===g.EmployeeRowId),Y="-";(0,E.isEmptyOrNull)(R.JobGradeId)||(0,E.isEmptyOrNull)(Ge.itemById[R.JobGradeId].Name)||(Y=Ge.itemById[R.JobGradeId].Name);var J=oe.Authorization.userDefinition.Permissions[de.HumanResources]==!0?R.SalaryDetails:"N/A",Q=R.ImgPath;if(S=` 
                    <div  style="display: flex; align-items: center; height: 100%; flex-direction: column;" class=" rowData">
                        </div>
                <div style="text-align: left;height: 100%;padding-right:0;align-items: center;justify-content: center;display: flex;padding-top: 5px;padding-bottom: 5px">
                    <div style="text-align: left;height: 100%;width:100%;padding-right:0">
                            <div class="col-1"  style="font-size: 10px; display: flex; justify-content: space-between; align-items: center; width: 100%; white-space: nowrap;"> <span  style="display: block;white-space: nowrap;"> Name : ${R.EmployeeName} <br> Job Grade : ${Y} <br> Salary Details : ${J} </span>  </div>
                            </div>`,g.hierarchyLevel!=M&&g.hierarchyLevel!=0){var K;if((0,E.isEmptyOrNull)(g.Rights))K=`
                    <div>
                 <i class="fas fa-band-aid" title="Approve Leave Requests"></i>
                    <i class="fa fa-wrench" title="Approve Overtime Requests"></i>
                   <i class="fa fa-money-bill" title="Approve Money Claiming Requests"></i>
                    <i class="fa fa-check" title="Evaluate Employee Requests"></i>
                    <i class="far fa-clock" title="Manage Training Requests"></i>
                    </div>
                    <div>
                    <input class = "CheckBox"  id="LeaveApproval" type="checkbox"  title="Approve Leave Requests">
                    <input  class = "CheckBox" id="OtApproval" type="checkbox" title="Approve Overtime Requests">
                    <input class = "CheckBox"  id="MoneyClaiming" type="checkbox" title="Approve Money Claiming Requests" >
                    <input class = "CheckBox"  id="Appraisal" type="checkbox" title="Evaluate Employee Requests" >
                    <input class = "CheckBox"  id="Training" type="checkbox" title="Manage Training Requests" >

                    </div>    
`;else{K=`
                <div>
                     <i class="fas fa-band-aid" title="Approve Leave Requests"></i>
                    <i class="fa fa-wrench" title="Approve Overtime Requests"></i>
                   <i class="fa fa-money-bill" title="Approve Money Claiming Requests"></i>
                    <i class="fa fa-check" title="Evaluate Employee Requests"></i>
                    <i class="far fa-clock" title="Manage Training Requests"></i>
                </div>
                <div>`;var N=["LeaveApproval","OtApproval","MoneyClaiming","Appraisal","Training"];for(let k of N){var y=g.Rights[k];let q=y?"checked":"";K+=`
                    <input class="CheckBox" id="${k}" type="checkbox" title="${k.replace(/([A-Z])/g," $1")}" ${q}>
                `}K+="</div>"}S=K+S}I.append(S);var C=document.createElement("img");C.src=`/upload/${Q}`,C.className="avatar",C.crossOrigin="anonymous",C.draggable=!1,C.width=63,C.height=112.5,C.style.marginRight="20px",C.onerror=function(){C.src=""};let v=I.find(".rowData");v.append(C);var A=document.createElement("span");A.className="dot",oe.Authorization.userDefinition.Permissions[de.HumanResources]&&v.append(A)}I.find(".content").remove()}});(0,E.isEmptyOrNull)(o)||(f.chart.style=o),ve()});let n=JSON.stringify(X);ft.Create({Entity:{FinalOrgChart:n}})}L(ht,"GenerateSaveOrgChart");function pt(n,l){var s,h=(0,Qe.getLookup)(`${t(n)}.${t(n)}`);for(var p in h.items)if(h.items[p].Id==l){s=h.items[p].Name.replace(/\s/g,"");break}return s}L(pt,"GetLookupValueFromId");function We(n,l,s){var h="",p=!1,x=[];for(let m=0;m<n.length;m++){var f=n.charCodeAt(m);f==l||p==!0&&f!=s?(p==!0&&(h+=n[m].toString()),p=!0):f==s&&(x.push(h),p=!1,h="")}return x}L(We,"DecomposeStringToList");function Le(n,l,s){n.endsWith("Class")&&(n=n.slice(0,-5));var h=String.fromCharCode(l)+n+String.fromCharCode(s);return h.replace(/\s+/g,"")}L(Le,"EncodeString");function wt(n){let l=[];function s(h,p,x=0){l.push({id:h.id,EmployeeRowId:h.EmployeeRowId,name:h.name,title:h.title,className:h.className,hierarchyLevel:h.hierarchyLevel,parentId:p,hierarchyId:h.hierarchyId,childrenIndex:x}),h.children&&h.children.forEach((f,m)=>s(f,h.id,m))}return L(s,"processNode"),s(n,null,null),l}L(wt,"splitIntoNodes");function Nt(n){let l=[];function s(h){h.Rights&&l.push({id:h.id,Rights:h.Rights,EmployeeRowId:h.EmployeeRowId,nodeHierarchy:h.hierarchyLevel}),h.children&&h.children.forEach(p=>s(p))}return L(s,"processRights"),s(n),l}L(Nt,"extractRights");function Jt(n){let l={},s=null;n.forEach(p=>{(0,E.isEmptyOrNull)(p)||(l[p.id]=Lt({},p))}),n.forEach(p=>{if(!(0,E.isEmptyOrNull)(p))if(p.parentId){let x=l[p.parentId];x&&(x.children||(x.children=[]),x.children[p.childrenIndex]=l[p.id])}else s=l[p.id]});function h(p){return p.children&&(p.children=p.children.filter(x=>x!==void 0),p.children.forEach(h),p.children.length===0&&delete p.children),p}return L(h,"cleanChildrenArray"),s?h(s):null}L(Jt,"buildHierarchy")}L(jt,"pageInit");export{jt as default};
//# sourceMappingURL=OrganisationChartPage.js.map
