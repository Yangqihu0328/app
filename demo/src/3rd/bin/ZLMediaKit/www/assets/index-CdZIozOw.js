import{u as V,_ as I}from"./index.es-Dm7cplbH.js";import{W as L}from"./WForm-CcIB-S29.js";import{_ as w,a as _,o as v,U as S,w as s,e as h,c as n,g as y,f as i,a1 as x,B,b as $,d as C,V as z}from"./index-BRitYTiU.js";import{_ as D}from"./index-Y869UH-H.js";import{P as E}from"./PlusOutlined-DNJZ4WbK.js";import"./Col-Dwr-0tBl.js";import"./index-tmqCaoZs.js";import"./index-Ckjajqdl.js";const R={class:"footer"},T={__name:"Edit",setup(N,{expose:f}){const l=_({}),o=_(!1),u=_(""),k=(c,a)=>{u.value=c,l.value=a,o.value=!0},d=()=>{o.value=!1},p=[{type:"input",label:"标识",key:"name"},{type:"select",label:"来源",key:"description",list:[{value:11,label:"手动配置"},{value:2,label:"自动配置"}]},{type:"input",label:"上报地址",key:"name"},{type:"textarea",label:"备注",key:"name1"}],m={name:[{required:!0,message:"Please input Activity name",trigger:"change"},{min:3,max:5,message:"Length should be 3 to 5",trigger:"blur"}],description:[{required:!0,message:"Please input Activity name",trigger:"change"}]};return f({showDrawer:k}),(c,a)=>{const g=B,t=D;return v(),S(t,{open:i(o),"onUpdate:open":a[1]||(a[1]=e=>x(o)?o.value=e:null),title:i(u),width:"36%","footer-style":{textAlign:"right"},onClose:d},{footer:s(()=>[h("div",R,[n(g,{type:"primary",onClick:d},{default:s(()=>a[2]||(a[2]=[y("确认")])),_:1}),n(g,{class:"close",onClick:d},{default:s(()=>a[3]||(a[3]=[y("取消")])),_:1})])]),default:s(()=>[n(L,{modelValue:i(l),"onUpdate:modelValue":a[0]||(a[0]=e=>x(l)?l.value=e:null),formList:p,rules:m,labelWidth:"100px"},null,8,["modelValue"])]),_:1},8,["open","title"])}}},q=w(T,[["__scopeId","data-v-a6eafd9b"]]),A={class:"planTemplate-container"},J={class:"header-tool"},U={key:0},W={__name:"index",setup(N){const f=t=>{},{run:l,loading:o,current:u,pageSize:k}=V(f,{formatResult:t=>t.data.results,pagination:{currentKey:"page",pageSizeKey:"results"}}),d=$(()=>({total:200,current:u.value,pageSize:k.value})),p=_(""),m=(t,e={})=>{p.value.showDrawer(t,e)},c=(t,e,r)=>{console.log("🚀 ~ handleTableChange ~ pag, filters, sorter:",t,e,r),l({results:t.pageSize,page:t==null?void 0:t.current,sortField:r.field,sortOrder:r.order,...e})},a=[{title:"标识",dataIndex:"name",key:"name"},{title:"来源类型",dataIndex:"age",key:"age"},{title:"数据接口",dataIndex:"age",key:"age"},{title:"上报地址",dataIndex:"age",key:"age"},{title:"备注",dataIndex:"age",key:"age"},{title:"操作",key:"action"}],g=[{key:"1",name:"John Brown",age:"/data/bm-app",address:"New York No. 1 Lake Park",tags:1},{key:"2",name:"Jim Green",age:"/data/bm-app",address:"London No. 1 Lake Park",tags:1},{key:"3",name:"Joe Black",age:32,address:"Sidney No. 1 Lake Park",tags:0}];return(t,e)=>{const r=B,P=I;return v(),C("div",A,[h("div",J,[n(r,{type:"primary",onClick:e[0]||(e[0]=b=>m("新增"))},{default:s(()=>[n(i(E)),e[2]||(e[2]=y("新建配置 "))]),_:1})]),n(P,{columns:a,"data-source":g,pagination:i(d),loading:i(o),onChange:c,scroll:{x:!0,y:460}},{bodyCell:s(({column:b,record:F})=>[b.key==="action"?(v(),C("span",U,[n(r,{type:"link",onClick:e[1]||(e[1]=K=>m("编辑"))},{default:s(()=>e[3]||(e[3]=[y("编辑")])),_:1})])):z("",!0)]),_:1},8,["pagination","loading"]),n(q,{ref_key:"editRef",ref:p},null,512)])}}},Z=w(W,[["__scopeId","data-v-8c445a27"]]);export{Z as default};
