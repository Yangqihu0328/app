import{S as G}from"./SearchForm-B_b3BvyS.js";import{_ as O}from"./Title-D2NgJLnW.js";import{W as q}from"./WForm-DuZVnybr.js";import{q as J,s as K,p as g,v as Y,t as Q,x as B,ab as x,a as _,R as ee,b as P,C as te,c as r,ac as le,S as ne,ad as oe,ae,af as ie,y as se,ag as M,G as R,ah as E,ai as re,aj as N,ak as de,al as ue,am as V,an as ce,_ as L,r as me,o as H,U,w as y,e as s,g as j,f as w,a1 as T,B as X,d as z,F as ve,Y as pe,a8 as be,$ as I,a7 as ge}from"./index-BDp3QOIY.js";import{_ as fe}from"./index-CW84fUDa.js";import{a as he,_ as _e}from"./index-CnLrzIUi.js";import"./index-UOzwUsgt.js";import"./Col-WS0i9O_0.js";import"./index-Ctd8tvvV.js";function D(e,t){return{[`${e}, ${e}:hover, ${e}:focus`]:{color:t.colorTextDisabled,cursor:"not-allowed"}}}function W(e){return{backgroundColor:e.bgColorSelected,boxShadow:e.boxShadow}}const ye=g({overflow:"hidden"},Y),xe=e=>{const{componentCls:t}=e;return{[t]:g(g(g(g(g({},Q(e)),{display:"inline-block",padding:e.segmentedContainerPadding,color:e.labelColor,backgroundColor:e.bgColor,borderRadius:e.borderRadius,transition:`all ${e.motionDurationMid} ${e.motionEaseInOut}`,[`${t}-group`]:{position:"relative",display:"flex",alignItems:"stretch",justifyItems:"flex-start",width:"100%"},[`&${t}-rtl`]:{direction:"rtl"},[`&${t}-block`]:{display:"flex"},[`&${t}-block ${t}-item`]:{flex:1,minWidth:0},[`${t}-item`]:{position:"relative",textAlign:"center",cursor:"pointer",transition:`color ${e.motionDurationMid} ${e.motionEaseInOut}`,borderRadius:e.borderRadiusSM,"&-selected":g(g({},W(e)),{color:e.labelColorHover}),"&::after":{content:'""',position:"absolute",width:"100%",height:"100%",top:0,insetInlineStart:0,borderRadius:"inherit",transition:`background-color ${e.motionDurationMid}`,pointerEvents:"none"},[`&:hover:not(${t}-item-selected):not(${t}-item-disabled)`]:{color:e.labelColorHover,"&::after":{backgroundColor:e.bgColorHover}},"&-label":g({minHeight:e.controlHeight-e.segmentedContainerPadding*2,lineHeight:`${e.controlHeight-e.segmentedContainerPadding*2}px`,padding:`0 ${e.segmentedPaddingHorizontal}px`},ye),"&-icon + *":{marginInlineStart:e.marginSM/2},"&-input":{position:"absolute",insetBlockStart:0,insetInlineStart:0,width:0,height:0,opacity:0,pointerEvents:"none"}},[`${t}-thumb`]:g(g({},W(e)),{position:"absolute",insetBlockStart:0,insetInlineStart:0,width:0,height:"100%",padding:`${e.paddingXXS}px 0`,borderRadius:e.borderRadiusSM,[`& ~ ${t}-item:not(${t}-item-selected):not(${t}-item-disabled)::after`]:{backgroundColor:"transparent"}}),[`&${t}-lg`]:{borderRadius:e.borderRadiusLG,[`${t}-item-label`]:{minHeight:e.controlHeightLG-e.segmentedContainerPadding*2,lineHeight:`${e.controlHeightLG-e.segmentedContainerPadding*2}px`,padding:`0 ${e.segmentedPaddingHorizontal}px`,fontSize:e.fontSizeLG},[`${t}-item, ${t}-thumb`]:{borderRadius:e.borderRadius}},[`&${t}-sm`]:{borderRadius:e.borderRadiusSM,[`${t}-item-label`]:{minHeight:e.controlHeightSM-e.segmentedContainerPadding*2,lineHeight:`${e.controlHeightSM-e.segmentedContainerPadding*2}px`,padding:`0 ${e.segmentedPaddingHorizontalSM}px`},[`${t}-item, ${t}-thumb`]:{borderRadius:e.borderRadiusXS}}}),D(`&-disabled ${t}-item`,e)),D(`${t}-item-disabled`,e)),{[`${t}-thumb-motion-appear-active`]:{transition:`transform ${e.motionDurationSlow} ${e.motionEaseInOut}, width ${e.motionDurationSlow} ${e.motionEaseInOut}`,willChange:"transform, width"}})}},$e=J("Segmented",e=>{const{lineWidthBold:t,lineWidth:d,colorTextLabel:v,colorText:u,colorFillSecondary:a,colorBgLayout:c,colorBgElevated:o}=e,b=K(e,{segmentedPaddingHorizontal:e.controlPaddingHorizontal-d,segmentedPaddingHorizontalSM:e.controlPaddingHorizontalSM-d,segmentedContainerPadding:t,labelColor:v,labelColorHover:u,bgColor:c,bgColorHover:a,bgColorSelected:o});return[xe(b)]}),A=e=>e?{left:e.offsetLeft,right:e.parentElement.clientWidth-e.clientWidth-e.offsetLeft,width:e.clientWidth}:null,C=e=>e!==void 0?`${e}px`:void 0,Se=B({props:{value:x(),getValueIndex:x(),prefixCls:x(),motionName:x(),onMotionStart:x(),onMotionEnd:x(),direction:x(),containerRef:x()},emits:["motionStart","motionEnd"],setup(e,t){let{emit:d}=t;const v=_(),u=l=>{var n;const S=e.getValueIndex(l),$=(n=e.containerRef.value)===null||n===void 0?void 0:n.querySelectorAll(`.${e.prefixCls}-item`)[S];return($==null?void 0:$.offsetParent)&&$},a=_(null),c=_(null);ee(()=>e.value,(l,n)=>{const S=u(n),$=u(l),k=A(S),F=A($);a.value=k,c.value=F,d(S&&$?"motionStart":"motionEnd")},{flush:"post"});const o=P(()=>{var l,n;return e.direction==="rtl"?C(-((l=a.value)===null||l===void 0?void 0:l.right)):C((n=a.value)===null||n===void 0?void 0:n.left)}),b=P(()=>{var l,n;return e.direction==="rtl"?C(-((l=c.value)===null||l===void 0?void 0:l.right)):C((n=c.value)===null||n===void 0?void 0:n.left)});let p;const i=l=>{clearTimeout(p),ne(()=>{l&&(l.style.transform="translateX(var(--thumb-start-left))",l.style.width="var(--thumb-start-width)")})},f=l=>{p=setTimeout(()=>{l&&(oe(l,`${e.motionName}-appear-active`),l.style.transform="translateX(var(--thumb-active-left))",l.style.width="var(--thumb-active-width)")})},h=l=>{a.value=null,c.value=null,l&&(l.style.transform=null,l.style.width=null,ae(l,`${e.motionName}-appear-active`)),d("motionEnd")},m=P(()=>{var l,n;return{"--thumb-start-left":o.value,"--thumb-start-width":C((l=a.value)===null||l===void 0?void 0:l.width),"--thumb-active-left":b.value,"--thumb-active-width":C((n=c.value)===null||n===void 0?void 0:n.width)}});return te(()=>{clearTimeout(p)}),()=>{const l={ref:v,style:m.value,class:[`${e.prefixCls}-thumb`]};return r(le,{appear:!0,onBeforeEnter:i,onEnter:f,onAfterEnter:h},{default:()=>[!a.value||!c.value?null:r("div",l,null)]})}}});function Ce(e){return e.map(t=>typeof t=="object"&&t!==null?t:{label:t==null?void 0:t.toString(),title:t==null?void 0:t.toString(),value:t})}const we=()=>({prefixCls:String,options:re(),block:N(),disabled:N(),size:de(),value:g(g({},ue([String,Number])),{required:!0}),motionName:String,onChange:V(),"onUpdate:value":V()}),Z=(e,t)=>{let{slots:d,emit:v}=t;const{value:u,disabled:a,payload:c,title:o,prefixCls:b,label:p=d.label,checked:i,className:f}=e,h=m=>{a||v("change",m,u)};return r("label",{class:E({[`${b}-item-disabled`]:a},f)},[r("input",{class:`${b}-item-input`,type:"radio",disabled:a,checked:i,onChange:h},null),r("div",{class:`${b}-item-label`,title:typeof o=="string"?o:""},[typeof p=="function"?p({value:u,disabled:a,payload:c,title:o}):p??u])])};Z.inheritAttrs=!1;const Re=B({name:"ASegmented",inheritAttrs:!1,props:ie(we(),{options:[],motionName:"thumb-motion"}),slots:Object,setup(e,t){let{emit:d,slots:v,attrs:u}=t;const{prefixCls:a,direction:c,size:o}=se("segmented",e),[b,p]=$e(a),i=M(),f=M(!1),h=P(()=>Ce(e.options)),m=(l,n)=>{e.disabled||(d("update:value",n),d("change",n))};return()=>{const l=a.value;return b(r("div",R(R({},u),{},{class:E(l,{[p.value]:!0,[`${l}-block`]:e.block,[`${l}-disabled`]:e.disabled,[`${l}-lg`]:o.value=="large",[`${l}-sm`]:o.value=="small",[`${l}-rtl`]:c.value==="rtl"},u.class),ref:i}),[r("div",{class:`${l}-group`},[r(Se,{containerRef:i,prefixCls:l,value:e.value,motionName:`${l}-${e.motionName}`,direction:c.value,getValueIndex:n=>h.value.findIndex(S=>S.value===n),onMotionStart:()=>{f.value=!0},onMotionEnd:()=>{f.value=!1}},null),h.value.map(n=>r(Z,R(R({key:n.value,prefixCls:l,checked:n.value===e.value,onChange:m},n),{},{className:E(n.className,`${l}-item`,{[`${l}-item-selected`]:n.value===e.value&&!f.value}),disabled:!!e.disabled||!!n.disabled}),v))])]))}}}),Ie=ce(Re),Pe={class:"detail-img"},He={class:"footer"},Te={__name:"Detail",setup(e,{expose:t}){const d=_({}),v=_(!1),u=_("警告原图");_(!1);const a=()=>{v.value=!1},c=()=>{v.value=!0},o=[{type:"text",label:"告警类别",key:"name"},{type:"text",label:"告警标识",key:"name1"},{type:"text",label:"视频通道",key:"name2"},{type:"text",label:"上报情况",key:"description"},{type:"text",label:"人员数量",key:"checkbox"},{type:"text",label:"人员相似度",key:"checkbox"},{type:"slot",label:"抓拍图",key:"img"}],b=me(["警告原图","前端标注图",{value:"后端标注图",disabled:!0}]);return t({handleOpen:c}),(p,i)=>{const f=O,h=Ie,m=X,l=fe;return H(),U(l,{open:w(v),"onUpdate:open":i[2]||(i[2]=n=>T(v)?v.value=n:null),title:"告警详情",width:"48%","footer-style":{textAlign:"right"},onClose:a},{footer:y(()=>[s("div",He,[r(m,{class:"close",onClick:a},{default:y(()=>i[4]||(i[4]=[j("取消")])),_:1})])]),default:y(()=>[r(f,{title:"告警明细",class:"detail-info-title"}),r(q,{modelValue:w(d),"onUpdate:modelValue":i[0]||(i[0]=n=>T(d)?d.value=n:null),formList:o,labelWidth:"100px"},{img:y(()=>i[3]||(i[3]=[s("img",{src:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",style:{width:"200px"}},null,-1)])),_:1},8,["modelValue"]),r(f,{title:"告警预览",class:"detail-info-title title"}),s("div",Pe,[r(h,{value:w(u),"onUpdate:value":i[1]||(i[1]=n=>T(u)?u.value=n:null),options:w(b)},null,8,["value","options"])]),i[5]||(i[5]=s("img",{src:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",style:{width:"100%"}},null,-1))]),_:1},8,["open"])}}},Ee=L(Te,[["__scopeId","data-v-69088f71"]]),je={class:"channel-container"},Me={class:"alarm-box"},Ne={class:"flex"},Ve={class:"item-label"},ze={class:"item"},De={class:"content"},We={class:"item"},Ae={class:"content"},Be={class:"item"},Le={class:"content"},Ue={class:"item"},Xe={class:"item-alarm"},Ze={class:"content"},ke={__name:"index",setup(e){const t=_([]),d=_([{},{}]),v=_(""),u=c=>{v.value.handleOpen()},a=[{type:"select",key:"keyWord",label:"警告任务",list:[{value:"name",label:"分组名称"},{value:"description",label:"描述"}]},{type:"select",key:"screenKey",label:"视频通道",list:[{value:"name",label:"分组名称"},{value:"description",label:"描述"}]},{type:"range",key:"keyWord",label:"警告时间"},{type:"select",key:"screenKey",label:"警告内容",list:[{value:"name",label:"分组名称"},{value:"description",label:"描述"}]}];return(c,o)=>{const b=ge,p=X,i=_e,f=he,h=be;return H(),z("div",je,[r(G,{searchList:a,isRow:!0,span:5}),r(h,{value:w(t),"onUpdate:value":o[0]||(o[0]=m=>T(t)?t.value=m:null),style:{width:"100%"}},{default:y(()=>[r(f,{gutter:16,style:{width:"100%"}},{default:y(()=>[(H(!0),z(ve,null,pe(w(d),m=>(H(),U(i,{class:"gutter-row",xs:24,sm:12,md:8,lg:6,key:m.id},{default:y(()=>[s("div",Me,[s("div",Ne,[r(b,{value:m.id,label:`告警任务: ${m.AlarmType}`,class:"flex1"},null,8,["value","label"]),r(p,{type:"link",text:"",onClick:u},{default:y(()=>o[1]||(o[1]=[j("详情")])),_:1})]),o[7]||(o[7]=s("img",{class:"icon",src:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"},null,-1)),s("div",Ve,[s("div",ze,[o[2]||(o[2]=s("div",null,"视频通道：",-1)),s("div",De,I(m.channleId),1)]),s("div",We,[o[3]||(o[3]=s("div",null,"告警时间：",-1)),s("div",Ae,I(m.channleId),1)]),s("div",Be,[o[4]||(o[4]=s("div",null,"上报状态：",-1)),s("div",Le,I(m.channleId),1)]),s("div",Ue,[o[6]||(o[6]=s("div",null,"告警内容：",-1)),s("div",Xe,[s("div",Ze,I(m.channleId)+"1111",1),r(p,{danger:"",class:"delete"},{default:y(()=>o[5]||(o[5]=[j("删除")])),_:1})])])])])]),_:2},1024))),128))]),_:1})]),_:1},8,["value"]),r(Ee,{ref_key:"detailRef",ref:v},null,512)])}}},tt=L(ke,[["__scopeId","data-v-5a0fdc09"]]);export{tt as default};
