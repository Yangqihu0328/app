import{bs as Re,bf as be,P as S,x as O,p as i,a as K,b as k,c as a,G as $,bh as xe,aX as $e,aY as he,ac as Se,S as Le,af as J,ag as T,R as q,C as De,a2 as Ee,ah as U,aW as we,bt as We,as as se,bu as je,bv as Ve,q as _e,s as Ge,bw as Xe,t as Ke,bx as Ue,bp as Qe,aT as le,y as Ye,b1 as ke,aO as qe,b3 as Z,by as Ze,aP as X,B as ce,b7 as Je,F as eo,b6 as oo,aV as no,bg as to,bz as lo,bA as de,bB as ao,bC as io,bD as ro,bE as so,bF as co,b5 as uo,f as fo,a1 as mo}from"./index-BDp3QOIY.js";import{p as po}from"./index-Ctd8tvvV.js";import{c as go}from"./Col-WS0i9O_0.js";import{A as ue}from"./ActionButton-Bho_34Da.js";const Co=new be("antFadeIn",{"0%":{opacity:0},"100%":{opacity:1}}),vo=new be("antFadeOut",{"0%":{opacity:1},"100%":{opacity:0}}),yo=function(e){let o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;const{antCls:n}=e,t=`${n}-fade`,l=o?"&":"";return[Re(t,Co,vo,e.motionDurationMid,o),{[`
        ${l}${t}-enter,
        ${l}${t}-appear
      `]:{opacity:0,animationTimingFunction:"linear"},[`${l}${t}-leave`]:{animationTimingFunction:"linear"}}]};function ae(){return{keyboard:{type:Boolean,default:void 0},mask:{type:Boolean,default:void 0},afterClose:Function,closable:{type:Boolean,default:void 0},maskClosable:{type:Boolean,default:void 0},visible:{type:Boolean,default:void 0},destroyOnClose:{type:Boolean,default:void 0},mousePosition:S.shape({x:Number,y:Number}).loose,title:S.any,footer:S.any,transitionName:String,maskTransitionName:String,animation:S.any,maskAnimation:S.any,wrapStyle:{type:Object,default:void 0},bodyStyle:{type:Object,default:void 0},maskStyle:{type:Object,default:void 0},prefixCls:String,wrapClassName:String,rootClassName:String,width:[String,Number],height:[String,Number],zIndex:Number,bodyProps:S.any,maskProps:S.any,wrapProps:S.any,getContainer:S.any,dialogStyle:{type:Object,default:void 0},dialogClass:String,closeIcon:S.any,forceRender:{type:Boolean,default:void 0},getOpenCount:Function,focusTriggerAfterClose:{type:Boolean,default:void 0},onClose:Function,modalRender:Function}}function fe(e,o,n){let t=o;return!t&&n&&(t=`${e}-${n}`),t}let me=-1;function bo(){return me+=1,me}function pe(e,o){let n=e[`page${o?"Y":"X"}Offset`];const t=`scroll${o?"Top":"Left"}`;if(typeof n!="number"){const l=e.document;n=l.documentElement[t],typeof n!="number"&&(n=l.body[t])}return n}function xo(e){const o=e.getBoundingClientRect(),n={left:o.left,top:o.top},t=e.ownerDocument,l=t.defaultView||t.parentWindow;return n.left+=pe(l),n.top+=pe(l,!0),n}const ge={width:0,height:0,overflow:"hidden",outline:"none"},$o=O({compatConfig:{MODE:3},name:"DialogContent",inheritAttrs:!1,props:i(i({},ae()),{motionName:String,ariaId:String,onVisibleChanged:Function,onMousedown:Function,onMouseup:Function}),setup(e,o){let{expose:n,slots:t,attrs:l}=o;const s=K(),p=K(),g=K();n({focus:()=>{var c;(c=s.value)===null||c===void 0||c.focus()},changeActive:c=>{const{activeElement:r}=document;c&&r===p.value?s.value.focus():!c&&r===s.value&&p.value.focus()}});const h=K(),m=k(()=>{const{width:c,height:r}=e,v={};return c!==void 0&&(v.width=typeof c=="number"?`${c}px`:c),r!==void 0&&(v.height=typeof r=="number"?`${r}px`:r),h.value&&(v.transformOrigin=h.value),v}),u=()=>{Le(()=>{if(g.value){const c=xo(g.value);h.value=e.mousePosition?`${e.mousePosition.x-c.left}px ${e.mousePosition.y-c.top}px`:""}})},d=c=>{e.onVisibleChanged(c)};return()=>{var c,r,v,y;const{prefixCls:x,footer:f=(c=t.footer)===null||c===void 0?void 0:c.call(t),title:b=(r=t.title)===null||r===void 0?void 0:r.call(t),ariaId:C,closable:w,closeIcon:B=(v=t.closeIcon)===null||v===void 0?void 0:v.call(t),onClose:F,bodyStyle:I,bodyProps:M,onMousedown:H,onMouseup:A,visible:D,modalRender:E=t.modalRender,destroyOnClose:_,motionName:N}=e;let W;f&&(W=a("div",{class:`${x}-footer`},[f]));let j;b&&(j=a("div",{class:`${x}-header`},[a("div",{class:`${x}-title`,id:C},[b])]));let R;w&&(R=a("button",{type:"button",onClick:F,"aria-label":"Close",class:`${x}-close`},[B||a("span",{class:`${x}-close-x`},null)]));const z=a("div",{class:`${x}-content`},[R,j,a("div",$({class:`${x}-body`,style:I},M),[(y=t.default)===null||y===void 0?void 0:y.call(t)]),W]),ee=xe(N);return a(Se,$($({},ee),{},{onBeforeEnter:u,onAfterEnter:()=>d(!0),onAfterLeave:()=>d(!1)}),{default:()=>[D||!_?$e(a("div",$($({},l),{},{ref:g,key:"dialog-element",role:"document",style:[m.value,l.style],class:[x,l.class],onMousedown:H,onMouseup:A}),[a("div",{tabindex:0,ref:s,style:ge,"aria-hidden":"true"},null),E?E({originVNode:z}):z,a("div",{tabindex:0,ref:p,style:ge,"aria-hidden":"true"},null)]),[[he,D]]):null]})}}}),ho=O({compatConfig:{MODE:3},name:"DialogMask",props:{prefixCls:String,visible:Boolean,motionName:String,maskProps:Object},setup(e,o){return()=>{const{prefixCls:n,visible:t,maskProps:l,motionName:s}=e,p=xe(s);return a(Se,p,{default:()=>[$e(a("div",$({class:`${n}-mask`},l),null),[[he,t]])]})}}}),Ce=O({compatConfig:{MODE:3},name:"VcDialog",inheritAttrs:!1,props:J(i(i({},ae()),{getOpenCount:Function,scrollLocker:Object}),{mask:!0,visible:!1,keyboard:!0,closable:!0,maskClosable:!0,destroyOnClose:!1,prefixCls:"rc-dialog",getOpenCount:()=>null,focusTriggerAfterClose:!0}),setup(e,o){let{attrs:n,slots:t}=o;const l=T(),s=T(),p=T(),g=T(e.visible),h=T(`vcDialogTitle${bo()}`),m=f=>{var b,C;if(f)We(s.value,document.activeElement)||(l.value=document.activeElement,(b=p.value)===null||b===void 0||b.focus());else{const w=g.value;if(g.value=!1,e.mask&&l.value&&e.focusTriggerAfterClose){try{l.value.focus({preventScroll:!0})}catch{}l.value=null}w&&((C=e.afterClose)===null||C===void 0||C.call(e))}},u=f=>{var b;(b=e.onClose)===null||b===void 0||b.call(e,f)},d=T(!1),c=T(),r=()=>{clearTimeout(c.value),d.value=!0},v=()=>{c.value=setTimeout(()=>{d.value=!1})},y=f=>{if(!e.maskClosable)return null;d.value?d.value=!1:s.value===f.target&&u(f)},x=f=>{if(e.keyboard&&f.keyCode===se.ESC){f.stopPropagation(),u(f);return}e.visible&&f.keyCode===se.TAB&&p.value.changeActive(!f.shiftKey)};return q(()=>e.visible,()=>{e.visible&&(g.value=!0)},{flush:"post"}),De(()=>{var f;clearTimeout(c.value),(f=e.scrollLocker)===null||f===void 0||f.unLock()}),Ee(()=>{var f,b;(f=e.scrollLocker)===null||f===void 0||f.unLock(),g.value&&((b=e.scrollLocker)===null||b===void 0||b.lock())}),()=>{const{prefixCls:f,mask:b,visible:C,maskTransitionName:w,maskAnimation:B,zIndex:F,wrapClassName:I,rootClassName:M,wrapStyle:H,closable:A,maskProps:D,maskStyle:E,transitionName:_,animation:N,wrapProps:W,title:j=t.title}=e,{style:R,class:z}=n;return a("div",$({class:[`${f}-root`,M]},po(e,{data:!0})),[a(ho,{prefixCls:f,visible:b&&C,motionName:fe(f,w,B),style:i({zIndex:F},E),maskProps:D},null),a("div",$({tabIndex:-1,onKeydown:x,class:U(`${f}-wrap`,I),ref:s,onClick:y,role:"dialog","aria-labelledby":j?h.value:null,style:i(i({zIndex:F},H),{display:g.value?null:"none"})},W),[a($o,$($({},we(e,["scrollLocker"])),{},{style:R,class:z,onMousedown:r,onMouseup:v,ref:p,closable:A,ariaId:h.value,prefixCls:f,visible:C,onClose:u,onVisibleChanged:m,motionName:fe(f,_,N)}),t)])])}}}),So=ae(),wo=O({compatConfig:{MODE:3},name:"DialogWrap",inheritAttrs:!1,props:J(So,{visible:!1}),setup(e,o){let{attrs:n,slots:t}=o;const l=K(e.visible);return je({},{inTriggerContext:!1}),q(()=>e.visible,()=>{e.visible&&(l.value=!0)},{flush:"post"}),()=>{const{visible:s,getContainer:p,forceRender:g,destroyOnClose:h=!1,afterClose:m}=e;let u=i(i(i({},e),n),{ref:"_component",key:"dialog"});return p===!1?a(Ce,$($({},u),{},{getOpenCount:()=>2}),t):!g&&h&&!l.value?null:a(Ve,{autoLock:!0,visible:s,forceRender:g,getContainer:p},{default:d=>(u=i(i(i({},u),d),{afterClose:()=>{m==null||m(),l.value=!1}}),a(Ce,u,t))})}}});function ve(e){return{position:e,top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0}}const To=e=>{const{componentCls:o}=e;return[{[`${o}-root`]:{[`${o}${e.antCls}-zoom-enter, ${o}${e.antCls}-zoom-appear`]:{transform:"none",opacity:0,animationDuration:e.motionDurationSlow,userSelect:"none"},[`${o}${e.antCls}-zoom-leave ${o}-content`]:{pointerEvents:"none"},[`${o}-mask`]:i(i({},ve("fixed")),{zIndex:e.zIndexPopupBase,height:"100%",backgroundColor:e.colorBgMask,[`${o}-hidden`]:{display:"none"}}),[`${o}-wrap`]:i(i({},ve("fixed")),{overflow:"auto",outline:0,WebkitOverflowScrolling:"touch"})}},{[`${o}-root`]:yo(e)}]},Bo=e=>{const{componentCls:o}=e;return[{[`${o}-root`]:{[`${o}-wrap`]:{zIndex:e.zIndexPopupBase,position:"fixed",inset:0,overflow:"auto",outline:0,WebkitOverflowScrolling:"touch"},[`${o}-wrap-rtl`]:{direction:"rtl"},[`${o}-centered`]:{textAlign:"center","&::before":{display:"inline-block",width:0,height:"100%",verticalAlign:"middle",content:'""'},[o]:{top:0,display:"inline-block",paddingBottom:0,textAlign:"start",verticalAlign:"middle"}},[`@media (max-width: ${e.screenSMMax})`]:{[o]:{maxWidth:"calc(100vw - 16px)",margin:`${e.marginXS} auto`},[`${o}-centered`]:{[o]:{flex:1}}}}},{[o]:i(i({},Ke(e)),{pointerEvents:"none",position:"relative",top:100,width:"auto",maxWidth:`calc(100vw - ${e.margin*2}px)`,margin:"0 auto",paddingBottom:e.paddingLG,[`${o}-title`]:{margin:0,color:e.modalHeadingColor,fontWeight:e.fontWeightStrong,fontSize:e.modalHeaderTitleFontSize,lineHeight:e.modalHeaderTitleLineHeight,wordWrap:"break-word"},[`${o}-content`]:{position:"relative",backgroundColor:e.modalContentBg,backgroundClip:"padding-box",border:0,borderRadius:e.borderRadiusLG,boxShadow:e.boxShadowSecondary,pointerEvents:"auto",padding:`${e.paddingMD}px ${e.paddingContentHorizontalLG}px`},[`${o}-close`]:i({position:"absolute",top:(e.modalHeaderCloseSize-e.modalCloseBtnSize)/2,insetInlineEnd:(e.modalHeaderCloseSize-e.modalCloseBtnSize)/2,zIndex:e.zIndexPopupBase+10,padding:0,color:e.modalCloseColor,fontWeight:e.fontWeightStrong,lineHeight:1,textDecoration:"none",background:"transparent",borderRadius:e.borderRadiusSM,width:e.modalConfirmIconSize,height:e.modalConfirmIconSize,border:0,outline:0,cursor:"pointer",transition:`color ${e.motionDurationMid}, background-color ${e.motionDurationMid}`,"&-x":{display:"block",fontSize:e.fontSizeLG,fontStyle:"normal",lineHeight:`${e.modalCloseBtnSize}px`,textAlign:"center",textTransform:"none",textRendering:"auto"},"&:hover":{color:e.modalIconHoverColor,backgroundColor:e.wireframe?"transparent":e.colorFillContent,textDecoration:"none"},"&:active":{backgroundColor:e.wireframe?"transparent":e.colorFillContentHover}},Ue(e)),[`${o}-header`]:{color:e.colorText,background:e.modalHeaderBg,borderRadius:`${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0`,marginBottom:e.marginXS},[`${o}-body`]:{fontSize:e.fontSize,lineHeight:e.lineHeight,wordWrap:"break-word"},[`${o}-footer`]:{textAlign:"end",background:e.modalFooterBg,marginTop:e.marginSM,[`${e.antCls}-btn + ${e.antCls}-btn:not(${e.antCls}-dropdown-trigger)`]:{marginBottom:0,marginInlineStart:e.marginXS}},[`${o}-open`]:{overflow:"hidden"}})},{[`${o}-pure-panel`]:{top:"auto",padding:0,display:"flex",flexDirection:"column",[`${o}-content,
          ${o}-body,
          ${o}-confirm-body-wrapper`]:{display:"flex",flexDirection:"column",flex:"auto"},[`${o}-confirm-body`]:{marginBottom:"auto"}}}]},Po=e=>{const{componentCls:o}=e,n=`${o}-confirm`;return{[n]:{"&-rtl":{direction:"rtl"},[`${e.antCls}-modal-header`]:{display:"none"},[`${n}-body-wrapper`]:i({},Qe()),[`${n}-body`]:{display:"flex",flexWrap:"wrap",alignItems:"center",[`${n}-title`]:{flex:"0 0 100%",display:"block",overflow:"hidden",color:e.colorTextHeading,fontWeight:e.fontWeightStrong,fontSize:e.modalHeaderTitleFontSize,lineHeight:e.modalHeaderTitleLineHeight,[`+ ${n}-content`]:{marginBlockStart:e.marginXS,flexBasis:"100%",maxWidth:`calc(100% - ${e.modalConfirmIconSize+e.marginSM}px)`}},[`${n}-content`]:{color:e.colorText,fontSize:e.fontSize},[`> ${e.iconCls}`]:{flex:"none",marginInlineEnd:e.marginSM,fontSize:e.modalConfirmIconSize,[`+ ${n}-title`]:{flex:1},[`+ ${n}-title + ${n}-content`]:{marginInlineStart:e.modalConfirmIconSize+e.marginSM}}},[`${n}-btns`]:{textAlign:"end",marginTop:e.marginSM,[`${e.antCls}-btn + ${e.antCls}-btn`]:{marginBottom:0,marginInlineStart:e.marginXS}}},[`${n}-error ${n}-body > ${e.iconCls}`]:{color:e.colorError},[`${n}-warning ${n}-body > ${e.iconCls},
        ${n}-confirm ${n}-body > ${e.iconCls}`]:{color:e.colorWarning},[`${n}-info ${n}-body > ${e.iconCls}`]:{color:e.colorInfo},[`${n}-success ${n}-body > ${e.iconCls}`]:{color:e.colorSuccess},[`${o}-zoom-leave ${o}-btns`]:{pointerEvents:"none"}}},Fo=e=>{const{componentCls:o}=e;return{[`${o}-root`]:{[`${o}-wrap-rtl`]:{direction:"rtl",[`${o}-confirm-body`]:{direction:"rtl"}}}}},Io=e=>{const{componentCls:o,antCls:n}=e,t=`${o}-confirm`;return{[o]:{[`${o}-content`]:{padding:0},[`${o}-header`]:{padding:e.modalHeaderPadding,borderBottom:`${e.modalHeaderBorderWidth}px ${e.modalHeaderBorderStyle} ${e.modalHeaderBorderColorSplit}`,marginBottom:0},[`${o}-body`]:{padding:e.modalBodyPadding},[`${o}-footer`]:{padding:`${e.modalFooterPaddingVertical}px ${e.modalFooterPaddingHorizontal}px`,borderTop:`${e.modalFooterBorderWidth}px ${e.modalFooterBorderStyle} ${e.modalFooterBorderColorSplit}`,borderRadius:`0 0 ${e.borderRadiusLG}px ${e.borderRadiusLG}px`,marginTop:0}},[t]:{[`${n}-modal-body`]:{padding:`${e.padding*2}px ${e.padding*2}px ${e.paddingLG}px`},[`${t}-body`]:{[`> ${e.iconCls}`]:{marginInlineEnd:e.margin,[`+ ${t}-title + ${t}-content`]:{marginInlineStart:e.modalConfirmIconSize+e.margin}}},[`${t}-btns`]:{marginTop:e.marginLG}}}},zo=_e("Modal",e=>{const o=e.padding,n=e.fontSizeHeading5,t=e.lineHeightHeading5,l=Ge(e,{modalBodyPadding:e.paddingLG,modalHeaderBg:e.colorBgElevated,modalHeaderPadding:`${o}px ${e.paddingLG}px`,modalHeaderBorderWidth:e.lineWidth,modalHeaderBorderStyle:e.lineType,modalHeaderTitleLineHeight:t,modalHeaderTitleFontSize:n,modalHeaderBorderColorSplit:e.colorSplit,modalHeaderCloseSize:t*n+o*2,modalContentBg:e.colorBgElevated,modalHeadingColor:e.colorTextHeading,modalCloseColor:e.colorTextDescription,modalFooterBg:"transparent",modalFooterBorderColorSplit:e.colorSplit,modalFooterBorderStyle:e.lineType,modalFooterPaddingVertical:e.paddingXS,modalFooterPaddingHorizontal:e.padding,modalFooterBorderWidth:e.lineWidth,modalConfirmTitleFontSize:e.fontSizeLG,modalIconHoverColor:e.colorIconHover,modalConfirmIconSize:e.fontSize*e.lineHeight,modalCloseBtnSize:e.controlHeightLG*.55});return[Bo(l),Po(l),Fo(l),To(l),e.wireframe&&Io(l),Xe(l,"zoom")]});var Mo=function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,t=Object.getOwnPropertySymbols(e);l<t.length;l++)o.indexOf(t[l])<0&&Object.prototype.propertyIsEnumerable.call(e,t[l])&&(n[t[l]]=e[t[l]]);return n};let te;const Ho=e=>{te={x:e.pageX,y:e.pageY},setTimeout(()=>te=null,100)};go()&&Ze(document.documentElement,"click",Ho,!0);const No=()=>({prefixCls:String,visible:{type:Boolean,default:void 0},open:{type:Boolean,default:void 0},confirmLoading:{type:Boolean,default:void 0},title:S.any,closable:{type:Boolean,default:void 0},closeIcon:S.any,onOk:Function,onCancel:Function,"onUpdate:visible":Function,"onUpdate:open":Function,onChange:Function,afterClose:Function,centered:{type:Boolean,default:void 0},width:[String,Number],footer:S.any,okText:S.any,okType:String,cancelText:S.any,icon:S.any,maskClosable:{type:Boolean,default:void 0},forceRender:{type:Boolean,default:void 0},okButtonProps:X(),cancelButtonProps:X(),destroyOnClose:{type:Boolean,default:void 0},wrapClassName:String,maskTransitionName:String,transitionName:String,getContainer:{type:[String,Function,Boolean,Object],default:void 0},zIndex:Number,bodyStyle:X(),maskStyle:X(),mask:{type:Boolean,default:void 0},keyboard:{type:Boolean,default:void 0},wrapProps:Object,focusTriggerAfterClose:{type:Boolean,default:void 0},modalRender:Function,mousePosition:X()}),P=O({compatConfig:{MODE:3},name:"AModal",inheritAttrs:!1,props:J(No(),{width:520,confirmLoading:!1,okType:"primary"}),setup(e,o){let{emit:n,slots:t,attrs:l}=o;const[s]=le("Modal"),{prefixCls:p,rootPrefixCls:g,direction:h,getPopupContainer:m}=Ye("modal",e),[u,d]=zo(p);ke(e.visible===void 0);const c=y=>{n("update:visible",!1),n("update:open",!1),n("cancel",y),n("change",!1)},r=y=>{n("ok",y)},v=()=>{var y,x;const{okText:f=(y=t.okText)===null||y===void 0?void 0:y.call(t),okType:b,cancelText:C=(x=t.cancelText)===null||x===void 0?void 0:x.call(t),confirmLoading:w}=e;return a(eo,null,[a(ce,$({onClick:c},e.cancelButtonProps),{default:()=>[C||s.value.cancelText]}),a(ce,$($({},Je(b)),{},{loading:w,onClick:r},e.okButtonProps),{default:()=>[f||s.value.okText]})])};return()=>{var y,x;const{prefixCls:f,visible:b,open:C,wrapClassName:w,centered:B,getContainer:F,closeIcon:I=(y=t.closeIcon)===null||y===void 0?void 0:y.call(t),focusTriggerAfterClose:M=!0}=e,H=Mo(e,["prefixCls","visible","open","wrapClassName","centered","getContainer","closeIcon","focusTriggerAfterClose"]),A=U(w,{[`${p.value}-centered`]:!!B,[`${p.value}-wrap-rtl`]:h.value==="rtl"});return u(a(wo,$($($({},H),l),{},{rootClassName:d.value,class:U(d.value,l.class),getContainer:F||(m==null?void 0:m.value),prefixCls:p.value,wrapClassName:A,visible:C??b,onClose:c,focusTriggerAfterClose:M,transitionName:Z(g.value,"zoom",e.transitionName),maskTransitionName:Z(g.value,"fade",e.maskTransitionName),mousePosition:(x=H.mousePosition)!==null&&x!==void 0?x:te}),i(i({},t),{footer:t.footer||v,closeIcon:()=>a("span",{class:`${p.value}-close-x`},[I||a(qe,{class:`${p.value}-close-icon`},null)])})))}}});function V(e){return typeof e=="function"?e():e}const Te=O({name:"ConfirmDialog",inheritAttrs:!1,props:["icon","onCancel","onOk","close","closable","zIndex","afterClose","visible","open","keyboard","centered","getContainer","maskStyle","okButtonProps","cancelButtonProps","okType","prefixCls","okCancel","width","mask","maskClosable","okText","cancelText","autoFocusButton","transitionName","maskTransitionName","type","title","content","direction","rootPrefixCls","bodyStyle","closeIcon","modalRender","focusTriggerAfterClose","wrapClassName","confirmPrefixCls","footer"],setup(e,o){let{attrs:n}=o;const[t]=le("Modal");return()=>{const{icon:l,onCancel:s,onOk:p,close:g,okText:h,closable:m=!1,zIndex:u,afterClose:d,keyboard:c,centered:r,getContainer:v,maskStyle:y,okButtonProps:x,cancelButtonProps:f,okCancel:b,width:C=416,mask:w=!0,maskClosable:B=!1,type:F,open:I,title:M,content:H,direction:A,closeIcon:D,modalRender:E,focusTriggerAfterClose:_,rootPrefixCls:N,bodyStyle:W,wrapClassName:j,footer:R}=e;let z=l;if(!l&&l!==null)switch(F){case"info":z=a(lo,null,null);break;case"success":z=a(to,null,null);break;case"error":z=a(no,null,null);break;default:z=a(oo,null,null)}const ee=e.okType||"primary",oe=e.prefixCls||"ant-modal",G=`${oe}-confirm`,He=n.style||{},ie=b??F==="confirm",re=e.autoFocusButton===null?!1:e.autoFocusButton||"ok",Y=`${oe}-confirm`,Ne=U(Y,`${Y}-${e.type}`,{[`${Y}-rtl`]:A==="rtl"},n.class),ne=t.value,Oe=ie&&a(ue,{actionFn:s,close:g,autofocus:re==="cancel",buttonProps:f,prefixCls:`${N}-btn`},{default:()=>[V(e.cancelText)||ne.cancelText]});return a(P,{prefixCls:oe,class:Ne,wrapClassName:U({[`${Y}-centered`]:!!r},j),onCancel:Ae=>g==null?void 0:g({triggerCancel:!0},Ae),open:I,title:"",footer:"",transitionName:Z(N,"zoom",e.transitionName),maskTransitionName:Z(N,"fade",e.maskTransitionName),mask:w,maskClosable:B,maskStyle:y,style:He,bodyStyle:W,width:C,zIndex:u,afterClose:d,keyboard:c,centered:r,getContainer:v,closable:m,closeIcon:D,modalRender:E,focusTriggerAfterClose:_},{default:()=>[a("div",{class:`${G}-body-wrapper`},[a("div",{class:`${G}-body`},[V(z),M===void 0?null:a("span",{class:`${G}-title`},[V(M)]),a("div",{class:`${G}-content`},[V(H)])]),R!==void 0?V(R):a("div",{class:`${G}-btns`},[Oe,a(ue,{type:ee,actionFn:p,close:g,autofocus:re==="ok",buttonProps:x,prefixCls:`${N}-btn`},{default:()=>[V(h)||(ie?ne.okText:ne.justOkText)]})])])]})}}}),L=[],Q=e=>{const o=document.createDocumentFragment();let n=i(i({},we(e,["parentContext","appContext"])),{close:s,open:!0}),t=null;function l(){t&&(de(null,o),t=null);for(var m=arguments.length,u=new Array(m),d=0;d<m;d++)u[d]=arguments[d];const c=u.some(r=>r&&r.triggerCancel);e.onCancel&&c&&e.onCancel(()=>{},...u.slice(1));for(let r=0;r<L.length;r++)if(L[r]===s){L.splice(r,1);break}}function s(){for(var m=arguments.length,u=new Array(m),d=0;d<m;d++)u[d]=arguments[d];n=i(i({},n),{open:!1,afterClose:()=>{typeof e.afterClose=="function"&&e.afterClose(),l.apply(this,u)}}),n.visible&&delete n.visible,p(n)}function p(m){typeof m=="function"?n=m(n):n=i(i({},n),m),t&&ao(t,n,o)}const g=m=>{const u=ro,d=u.prefixCls,c=m.prefixCls||`${d}-modal`,r=u.iconPrefixCls,v=so();return a(io,$($({},u),{},{prefixCls:d}),{default:()=>[a(Te,$($({},m),{},{rootPrefixCls:d,prefixCls:c,iconPrefixCls:r,locale:v,cancelText:m.cancelText||v.cancelText}),null)]})};function h(m){const u=a(g,i({},m));return u.appContext=e.parentContext||e.appContext||u.appContext,de(u,o),u}return t=h(n),L.push(s),{destroy:s,update:p}};function Be(e){return i(i({},e),{type:"warning"})}function Pe(e){return i(i({},e),{type:"info"})}function Fe(e){return i(i({},e),{type:"success"})}function Ie(e){return i(i({},e),{type:"error"})}function ze(e){return i(i({},e),{type:"confirm"})}const Oo=()=>({config:Object,afterClose:Function,destroyAction:Function,open:Boolean}),Ao=O({name:"HookModal",inheritAttrs:!1,props:J(Oo(),{config:{width:520,okType:"primary"}}),setup(e,o){let{expose:n}=o;var t;const l=k(()=>e.open),s=k(()=>e.config),{direction:p,getPrefixCls:g}=co(),h=g("modal"),m=g(),u=()=>{var v,y;e==null||e.afterClose(),(y=(v=s.value).afterClose)===null||y===void 0||y.call(v)},d=function(){e.destroyAction(...arguments)};n({destroy:d});const c=(t=s.value.okCancel)!==null&&t!==void 0?t:s.value.type==="confirm",[r]=le("Modal",uo.Modal);return()=>a(Te,$($({prefixCls:h,rootPrefixCls:m},s.value),{},{close:d,open:l.value,afterClose:u,okText:s.value.okText||(c?r==null?void 0:r.value.okText:r==null?void 0:r.value.justOkText),direction:s.value.direction||p.value,cancelText:s.value.cancelText||(r==null?void 0:r.value.cancelText)}),null)}});let ye=0;const Ro=O({name:"ElementsHolder",inheritAttrs:!1,setup(e,o){let{expose:n}=o;const t=T([]);return n({addModal:s=>(t.value.push(s),t.value=t.value.slice(),()=>{t.value=t.value.filter(p=>p!==s)})}),()=>t.value.map(s=>s())}});function Lo(){const e=T(null),o=T([]);q(o,()=>{o.value.length&&([...o.value].forEach(p=>{p()}),o.value=[])},{immediate:!0});const n=s=>function(g){var h;ye+=1;const m=T(!0),u=T(null),d=T(fo(g)),c=T({});q(()=>g,C=>{x(i(i({},mo(C)?C.value:C),c.value))});const r=function(){m.value=!1;for(var C=arguments.length,w=new Array(C),B=0;B<C;B++)w[B]=arguments[B];const F=w.some(I=>I&&I.triggerCancel);d.value.onCancel&&F&&d.value.onCancel(()=>{},...w.slice(1))};let v;const y=()=>a(Ao,{key:`modal-${ye}`,config:s(d.value),ref:u,open:m.value,destroyAction:r,afterClose:()=>{v==null||v()}},null);v=(h=e.value)===null||h===void 0?void 0:h.addModal(y),v&&L.push(v);const x=C=>{d.value=i(i({},d.value),C)};return{destroy:()=>{u.value?r():o.value=[...o.value,r]},update:C=>{c.value=C,u.value?x(C):o.value=[...o.value,()=>x(C)]}}},t=k(()=>({info:n(Pe),success:n(Fe),error:n(Ie),warning:n(Be),confirm:n(ze)})),l=Symbol("modalHolderKey");return[t.value,()=>a(Ro,{key:l,ref:e},null)]}function Me(e){return Q(Be(e))}P.useModal=Lo;P.info=function(o){return Q(Pe(o))};P.success=function(o){return Q(Fe(o))};P.error=function(o){return Q(Ie(o))};P.warning=Me;P.warn=Me;P.confirm=function(o){return Q(ze(o))};P.destroyAll=function(){for(;L.length;){const o=L.pop();o&&o()}};P.install=function(e){return e.component(P.name,P),e};export{P as M};
