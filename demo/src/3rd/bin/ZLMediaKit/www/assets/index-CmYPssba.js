import{u as P,_ as V}from"./index.es-6I7khdZy.js";import{W as L}from"./WForm-B1-Shd-1.js";import{_ as w,a as y,o as b,U as S,w as l,e as I,c as n,g as _,f as i,a1 as x,B as h,b as $,d as C,V as z}from"./index-C38Df1EU.js";import{_ as D}from"./index-ii9I2BiE.js";import{P as E}from"./PlusOutlined-Dvl9e-Lu.js";import"./Col-DSXiI12J.js";import"./index-DY-HbyBZ.js";import"./index-D6ZRVRvs.js";const R={class:"footer"},T={__name:"Edit",setup(B,{expose:k}){const s=y({}),o=y(!1),u=y(""),f=(c,a)=>{u.value=c,s.value=a,o.value=!0},d=()=>{o.value=!1},p=[{type:"input",label:"Modbus 输出标识",key:"name"},{type:"select",label:"设备",key:"description",list:[{value:11,label:"手动配置"},{value:2,label:"自动配置"}]},{type:"select",label:"波特率",key:"description",list:[{value:11,label:"手动配置"},{value:2,label:"自动配置"}]},{type:"input",label:"从机地址",key:"name"},{type:"input",label:"寄存器地址(报警)",key:"name"},{type:"input",label:"寄存器地址(消警)",key:"name"},{type:"input",label:"下发数据(报警)",key:"name"},{type:"input",label:"持续时间(秒)",key:"name"},{type:"textarea",label:"备注",key:"name1"}],m={name:[{required:!0,message:"Please input Activity name",trigger:"change"},{min:3,max:5,message:"Length should be 3 to 5",trigger:"blur"}],description:[{required:!0,message:"Please input Activity name",trigger:"change"}]};return k({showDrawer:f}),(c,a)=>{const g=h,t=D;return b(),S(t,{open:i(o),"onUpdate:open":a[1]||(a[1]=e=>x(o)?o.value=e:null),title:i(u),width:"36%","footer-style":{textAlign:"right"},onClose:d},{footer:l(()=>[I("div",R,[n(g,{type:"primary",onClick:d},{default:l(()=>a[2]||(a[2]=[_("确认")])),_:1}),n(g,{class:"close",onClick:d},{default:l(()=>a[3]||(a[3]=[_("取消")])),_:1})])]),default:l(()=>[n(L,{modelValue:i(s),"onUpdate:modelValue":a[0]||(a[0]=e=>x(s)?s.value=e:null),formList:p,rules:m,labelWidth:"130px"},null,8,["modelValue"])]),_:1},8,["open","title"])}}},q=w(T,[["__scopeId","data-v-81e38bd9"]]),A={class:"planTemplate-container"},J={class:"header-tool"},U={key:0},W={__name:"index",setup(B){const k=t=>{},{run:s,loading:o,current:u,pageSize:f}=P(k,{formatResult:t=>t.data.results,pagination:{currentKey:"page",pageSizeKey:"results"}}),d=$(()=>({total:200,current:u.value,pageSize:f.value})),p=y(""),m=(t,e={})=>{p.value.showDrawer(t,e)},c=(t,e,r)=>{console.log("🚀 ~ handleTableChange ~ pag, filters, sorter:",t,e,r),s({results:t.pageSize,page:t==null?void 0:t.current,sortField:r.field,sortOrder:r.order,...e})},a=[{title:"Modbus 输出标识",dataIndex:"name",key:"name",width:180},{title:"设备",dataIndex:"age",key:"age"},{title:"波特率",dataIndex:"age",key:"age"},{title:"从机地址",dataIndex:"age",key:"age"},{title:"寄存器地址(报警)",dataIndex:"age",key:"age"},{title:"寄存器地址(消警)",dataIndex:"age",key:"age"},{title:"下发数据(报警)",dataIndex:"age",key:"age"},{title:"持续时间(秒)",dataIndex:"age",key:"age"},{title:"操作",key:"action"}],g=[{key:"1",name:"John Brown",age:"/data/bm-app",address:"New York No. 1 Lake Park",tags:1},{key:"2",name:"Jim Green",age:"/data/bm-app",address:"London No. 1 Lake Park",tags:1},{key:"3",name:"Joe Black",age:32,address:"Sidney No. 1 Lake Park",tags:0}];return(t,e)=>{const r=h,N=V;return b(),C("div",A,[I("div",J,[n(r,{type:"primary",onClick:e[0]||(e[0]=v=>m("新增"))},{default:l(()=>[n(i(E)),e[2]||(e[2]=_("新建配置 "))]),_:1})]),n(N,{columns:a,"data-source":g,pagination:i(d),loading:i(o),onChange:c,scroll:{x:!0,y:460}},{bodyCell:l(({column:v,record:F})=>[v.key==="action"?(b(),C("span",U,[n(r,{type:"link",onClick:e[1]||(e[1]=K=>m("编辑"))},{default:l(()=>e[3]||(e[3]=[_("编辑")])),_:1})])):z("",!0)]),_:1},8,["pagination","loading"]),n(q,{ref_key:"editRef",ref:p},null,512)])}}},Z=w(W,[["__scopeId","data-v-f47cb703"]]);export{Z as default};
