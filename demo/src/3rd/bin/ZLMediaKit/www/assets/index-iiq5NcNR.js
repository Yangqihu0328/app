import{S as W,T as z}from"./SearchForm-DaFpT3z_.js";import{W as L}from"./WForm-C7akG1Od.js";import{_ as V,b as r,u as R,o as p,W as $,w as l,f as K,c as s,h as v,g as m,a3 as q,j as b,k as D,B as A,d as M,e as k,a1 as B,X as E}from"./index-CYQXq1Hw.js";import{_ as O}from"./index-LC1FJtUD.js";import{u as G,_ as J}from"./index.es-BFPZ6LQM.js";import"./index-CZglWv9X.js";import"./Col-CgBZr6YF.js";import"./debounce-C1k7YIl0.js";import"./index-BsRFuyma.js";import"./List-dtbjobtR.js";import"./index-BS4Hp4Ns.js";import"./index-BhuQxcmV.js";import"./index-Bq6jBos-.js";const U={class:"footer"},j={__name:"Edit",emits:["success"],setup(F,{expose:x,emit:_}){const o=r({}),a=r(!1),i=r(""),h=_,u=r(!1),{SEND_MESSAGE:S}=R(),w=async()=>{if(!await i.value.validate())return;const e={type:"setAiBoxNetwork",...o.value};b.on(e.type,t=>{t.result===0?(D.success("操作成功"),a.value=!1,h("success")):D.error("请求失败"),u.value=!1,b.off(e.type)}),u.value=!0,S(e)},y=d=>{o.value=JSON.parse(JSON.stringify(d)),a.value=!0,u.value=!1},f=()=>{a.value=!1},C=[{type:"input",label:"网络名称",key:"name"},{type:"select",label:"分配方式",key:"dhcp",list:[{value:0,label:"手动配置"},{value:1,label:"自动配置"}]},{type:"input",label:"网络地址",key:"address"},{type:"input",label:"子网掩码",key:"mask"},{type:"input",label:"网关地址",key:"gateway"},{type:"input",label:"DNS",key:"dns"}],N={name:[{required:!0,message:"请输入",trigger:"blur"}],address:[{required:!0,message:"请输入",trigger:"blur"}],dhcp:[{required:!0,message:"请输入",trigger:"blur"}],mask:[{required:!0,message:"请输入",trigger:"blur"}],gateway:[{required:!0,message:"请输入",trigger:"blur"}],dns:[{required:!0,message:"请输入",trigger:"blur"}]};return x({showDrawer:y}),(d,e)=>{const t=A,n=O;return p(),$(n,{open:m(a),"onUpdate:open":e[1]||(e[1]=c=>q(a)?a.value=c:null),title:"编辑",width:"520","footer-style":{textAlign:"right"},onClose:f},{footer:l(()=>[K("div",U,[s(t,{type:"primary",onClick:w},{default:l(()=>e[2]||(e[2]=[v("确认")])),_:1}),s(t,{class:"close",onClick:f},{default:l(()=>e[3]||(e[3]=[v("取消")])),_:1})])]),default:l(()=>[s(L,{ref_key:"wFormRef",ref:i,modelValue:m(o),"onUpdate:modelValue":e[0]||(e[0]=c=>q(o)?o.value=c:null),formList:C,rules:N,labelWidth:"100px"},null,8,["modelValue"])]),_:1},8,["open"])}}},P=V(j,[["__scopeId","data-v-5542f433"]]),X={class:"networkConfig-container"},H={key:0},Q={key:1},Y={key:2},Z={__name:"index",setup(F){const{SEND_MESSAGE:x}=R(),_=r([]),o=r(0),a=M(()=>({total:o.value,current:S.value,pageSize:w.value})),i=()=>{const e={type:"getAiBoxNetwork"};b.on(e.type,t=>{t.result===0?_.value=t.data.Interfaces:D.error("请求失败"),b.off(e.type)}),x(e)},{run:h,loading:u,current:S,pageSize:w}=G(i,{formatResult:e=>e.data.results,pagination:{currentKey:"page",pageSizeKey:"results"}}),y=r(""),f=e=>{y.value.showDrawer(e)},C=(e,t,n)=>{console.log("🚀 ~ handleTableChange ~ pag, filters, sorter:",e,t,n),h({results:e.pageSize,page:e==null?void 0:e.current,sortField:n.field,sortOrder:n.order,...t})},N=[{type:"input",key:"keyWord",label:"网络名称"},{type:"select",key:"screenKey",label:"连接状态",list:[{value:"name",label:"已连接"},{value:"description",label:"未连接"},{value:"description",label:"运行中"}]}],d=[{title:"网络名称",dataIndex:"name",key:"name"},{title:"网络地址",dataIndex:"address",key:"address"},{title:"子网掩码",dataIndex:"mask",key:"mask"},{title:"网关地址",dataIndex:"gateway",key:"gateway"},{title:"物理地址",dataIndex:"mac",key:"mac"},{title:"分配方式",dataIndex:"dhcp",key:"dhcp",width:180},{title:"DNS",dataIndex:"dns",key:"dns"},{title:"连接状态",key:"status",dataIndex:"status"},{title:"操作",key:"action"}];return(e,t)=>{const n=z,c=A,T=J;return p(),k("div",X,[s(W,{searchList:N}),s(T,{columns:d,"data-source":m(_),pagination:m(a),loading:m(u),onChange:C,scroll:{x:!0,y:460}},{bodyCell:l(({column:I,record:g})=>[I.key==="status"?(p(),k("span",H,[s(n,{color:g.status?"volcano":"green"},{default:l(()=>[v(B(g.status?"异常":"正常"),1)]),_:2},1032,["color"])])):E("",!0),I.key==="dhcp"?(p(),k("span",Q,B(g.dhcp?"自动":"手动"),1)):E("",!0),I.key==="action"?(p(),k("span",Y,[s(c,{type:"link",onClick:ee=>f(g)},{default:l(()=>t[0]||(t[0]=[v("编辑")])),_:2},1032,["onClick"])])):E("",!0)]),_:1},8,["data-source","pagination","loading"]),s(P,{ref_key:"editRef",ref:y,onSuccess:i},null,512)])}}},_e=V(Z,[["__scopeId","data-v-254d9c2e"]]);export{_e as default};
