import{S as K,T as O}from"./SearchForm-Le4kopkO.js";import{u as R,D as W,_ as j}from"./index.es-6I7khdZy.js";import{_ as F,u as G,a0 as H,a as A,b as J,o as _,d as f,c as s,e as g,w as o,f as p,g as r,$ as h,V as v,i,j as d,h as Q,B as X,a4 as Y}from"./index-C38Df1EU.js";import{c as Z}from"./channelStore-BWMHn781.js";import{P as tt}from"./PlusOutlined-Dvl9e-Lu.js";import{D as et}from"./index-D6ZRVRvs.js";import{_ as at}from"./index-C7yBD92n.js";import"./index-DY-HbyBZ.js";import"./Col-DSXiI12J.js";import"./index-Pm1oL2Lt.js";import"./ActionButton-BoQHiA5B.js";const st={class:"channel-container"},ot={class:"add_btn"},nt={key:0},lt={key:1},it={key:2},rt={class:"option"},dt={__name:"list",setup(ut){const{SEND_MESSAGE:c}=G();H(Z());const x=A([]),D=A(0),w=J(()=>({total:D.value,current:T.value,pageSize:L.value})),k=()=>{const e={type:"getAlgoTaskList"};i.on(e.type,t=>{if(t.result===0||t.msg){const a=t.data.tasks;x.value=a.filter(n=>n.taskDelete!=1)}else d.error("请求失败");i.off(e.type)}),c(e)};let S=[];(()=>{const e={type:"getAiModelList"};i.on(e.type,t=>{t.result===0||t.msg?S=t.data.models:d.error("请求失败"),i.off(e.type)}),c(e)})();const M=e=>e.map(a=>{const n=S.find(y=>y.modelId==a);return n?n.modelName:""}).join("，"),{run:N,loading:u,current:T,pageSize:L}=R(k,{formatResult:e=>e.data.results,pagination:{currentKey:"page",pageSizeKey:"results"}}),C=Q(),I=(e=null)=>{console.log("🚀 ~ handleEdit ~ id:",e),e!=null?C.push({path:"/task/edit",query:{id:e}}):C.push("/task/edit")},E=e=>{const t={type:"delAlgoTaskInfo",mediaId:e,controlCommand:2};i.on(t.type,a=>{a.result===0||a.msg?(d.success("操作成功"),k()):d.error("请求失败"),u.value=!1,i.off(t.type)}),u.value=!0,c(t)},$=(e,t)=>{const a={type:"algoTaskControl",mediaId:e,controlCommand:t?1:0};i.on(a.type,n=>{n.result===0||n.msg?(d.success("操作成功"),k()):d.error("请求失败"),u.value=!1,i.off(a.type)}),u.value=!0,c(a)},B=(e,t,a)=>{console.log("🚀 ~ handleTableChange ~ pag, filters, sorter:",e,t,a),N({results:e.pageSize,page:e==null?void 0:e.current,sortField:a.field,sortOrder:a.order,...t})},P=[{type:"input",key:"keyWord",label:"任务编号"},{type:"select",key:"screenKey",label:"任务状态",list:[{value:"name",label:"分组名称"},{value:"description",label:"描述"}]}],V=[{title:"任务编号",dataIndex:"taskName",key:"taskName",width:180},{title:"视频源",dataIndex:"mediaUrl",key:"mediaUrl",maxWidth:200,ellipsis:!0},{title:"上报地址",dataIndex:"taskPushUrl",key:"taskPushUrl",maxWidth:200,ellipsis:!0},{title:"算法配置信息",dataIndex:"taskAlgos",key:"taskAlgos",width:180},{title:"任务状态",dataIndex:"taskStatus",key:"taskStatus",fixed:"right",width:180},{title:"操作",dataIndex:"action",key:"action",fixed:"right"}];return(e,t)=>{const a=X,n=O,y=at,z=Y,U=W,q=j;return _(),f("div",st,[s(K,{searchList:P}),g("div",ot,[s(a,{type:"primary",onClick:t[0]||(t[0]=m=>I(null)),style:{padding:"0 15px"}},{default:o(()=>[s(p(tt)),t[2]||(t[2]=r("新建 "))]),_:1})]),s(q,{columns:V,"data-source":p(x),pagination:p(w),loading:p(u),scroll:{x:!0,y:560},onChange:B},{bodyCell:o(({column:m,record:l})=>[m.dataIndex==="taskStatus"?(_(),f("span",nt,[s(n,{color:l.taskStatus?"green":"volcano"},{default:o(()=>[r(h(l.taskStatus?"运行中":"未运行"),1)]),_:2},1032,["color"])])):v("",!0),m.dataIndex==="taskAlgos"?(_(),f("span",lt,h(M(l.taskAlgos)),1)):v("",!0),m.dataIndex==="action"?(_(),f("span",it,[s(a,{type:"link",onClick:b=>I(l.mediaId)},{default:o(()=>t[3]||(t[3]=[r("编辑")])),_:2},1032,["onClick"]),s(a,{type:"link",onClick:b=>$(l.mediaId,l.taskStatus)},{default:o(()=>[r(h(l.taskStatus?"关闭":"启动"),1)]),_:2},1032,["onClick"]),s(U,null,{overlay:o(()=>[s(z,null,{default:o(()=>[g("div",rt,[s(y,{title:"是否确定删除该数据?",onConfirm:b=>E(l.mediaId),onCancel:t[1]||(t[1]=()=>{})},{default:o(()=>[s(a,{type:"link"},{default:o(()=>t[4]||(t[4]=[r(" 删除 ")])),_:1})]),_:2},1032,["onConfirm"]),s(a,{type:"link",disabled:""},{default:o(()=>t[5]||(t[5]=[r("配置区域")])),_:1})])]),_:2},1024)]),default:o(()=>[g("a",null,[t[6]||(t[6]=r(" 更多 ")),s(p(et))])]),_:2},1024)])):v("",!0)]),_:1},8,["data-source","pagination","loading"])])}}},Ct=F(dt,[["__scopeId","data-v-1ac02c57"]]);export{Ct as default};
