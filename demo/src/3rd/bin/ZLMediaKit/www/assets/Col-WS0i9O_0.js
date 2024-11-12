import{cd as k,ag as _,X as D,D as U,k as V,b as $,q as F,s as K,p as y,x as L,y as W,z as P,a as N,C as q,H as j,ah as B,c as H,G,al as O}from"./index-BDp3QOIY.js";const J=()=>k()&&window.document.documentElement,T=e=>{if(k()&&window.document.documentElement){const t=Array.isArray(e)?e:[e],{documentElement:n}=window.document;return t.some(a=>a in n.style)}return!1},Q=(e,t)=>{if(!T(e))return!1;const n=document.createElement("div"),a=n.style[e];return n.style[e]=t,n.style[e]!==a};function fe(e,t){return!Array.isArray(e)&&t!==void 0?Q(e,t):T(e)}let C;const Y=()=>{if(!J())return!1;if(C!==void 0)return C;const e=document.createElement("div");return e.style.display="flex",e.style.flexDirection="column",e.style.rowGap="1px",e.appendChild(document.createElement("div")),e.appendChild(document.createElement("div")),document.body.appendChild(e),C=e.scrollHeight===1,document.body.removeChild(e),C},Z=()=>{const e=_(!1);return D(()=>{e.value=Y()}),e},X=Symbol("rowContextKey"),z=e=>{U(X,e)},ee=()=>V(X,{gutter:$(()=>{}),wrap:$(()=>{}),supportFlexGap:$(()=>{})}),te=e=>{const{componentCls:t}=e;return{[t]:{display:"flex",flexFlow:"row wrap",minWidth:0,"&::before, &::after":{display:"flex"},"&-no-wrap":{flexWrap:"nowrap"},"&-start":{justifyContent:"flex-start"},"&-center":{justifyContent:"center"},"&-end":{justifyContent:"flex-end"},"&-space-between":{justifyContent:"space-between"},"&-space-around ":{justifyContent:"space-around"},"&-space-evenly ":{justifyContent:"space-evenly"},"&-top":{alignItems:"flex-start"},"&-middle":{alignItems:"center"},"&-bottom":{alignItems:"flex-end"}}}},ne=e=>{const{componentCls:t}=e;return{[t]:{position:"relative",maxWidth:"100%",minHeight:1}}},re=(e,t)=>{const{componentCls:n,gridColumns:a}=e,l={};for(let o=a;o>=0;o--)o===0?(l[`${n}${t}-${o}`]={display:"none"},l[`${n}-push-${o}`]={insetInlineStart:"auto"},l[`${n}-pull-${o}`]={insetInlineEnd:"auto"},l[`${n}${t}-push-${o}`]={insetInlineStart:"auto"},l[`${n}${t}-pull-${o}`]={insetInlineEnd:"auto"},l[`${n}${t}-offset-${o}`]={marginInlineEnd:0},l[`${n}${t}-order-${o}`]={order:0}):(l[`${n}${t}-${o}`]={display:"block",flex:`0 0 ${o/a*100}%`,maxWidth:`${o/a*100}%`},l[`${n}${t}-push-${o}`]={insetInlineStart:`${o/a*100}%`},l[`${n}${t}-pull-${o}`]={insetInlineEnd:`${o/a*100}%`},l[`${n}${t}-offset-${o}`]={marginInlineStart:`${o/a*100}%`},l[`${n}${t}-order-${o}`]={order:o});return l},M=(e,t)=>re(e,t),se=(e,t,n)=>({[`@media (min-width: ${t}px)`]:y({},M(e,n))}),oe=F("Grid",e=>[te(e)]),le=F("Grid",e=>{const t=K(e,{gridColumns:24}),n={"-sm":t.screenSMMin,"-md":t.screenMDMin,"-lg":t.screenLGMin,"-xl":t.screenXLMin,"-xxl":t.screenXXLMin};return[ne(t),M(t,""),M(t,"-xs"),Object.keys(n).map(a=>se(t,n[a],a)).reduce((a,l)=>y(y({},a),l),{})]}),ue=()=>({align:O([String,Object]),justify:O([String,Object]),prefixCls:String,gutter:O([Number,Array,Object],0),wrap:{type:Boolean,default:void 0}}),pe=L({compatConfig:{MODE:3},name:"ARow",inheritAttrs:!1,props:ue(),setup(e,t){let{slots:n,attrs:a}=t;const{prefixCls:l,direction:o}=W("row",e),[A,g]=oe(l);let x;const v=P(),b=N({xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0}),S=N({xs:!1,sm:!1,md:!1,lg:!1,xl:!1,xxl:!1}),h=r=>$(()=>{if(typeof e[r]=="string")return e[r];if(typeof e[r]!="object")return"";for(let s=0;s<j.length;s++){const u=j[s];if(!S.value[u])continue;const i=e[r][u];if(i!==void 0)return i}return""}),f=h("align"),p=h("justify"),d=Z();D(()=>{x=v.value.subscribe(r=>{S.value=r;const s=e.gutter||0;(!Array.isArray(s)&&typeof s=="object"||Array.isArray(s)&&(typeof s[0]=="object"||typeof s[1]=="object"))&&(b.value=r)})}),q(()=>{v.value.unsubscribe(x)});const m=$(()=>{const r=[void 0,void 0],{gutter:s=0}=e;return(Array.isArray(s)?s:[s,void 0]).forEach((i,R)=>{if(typeof i=="object")for(let E=0;E<j.length;E++){const I=j[E];if(b.value[I]&&i[I]!==void 0){r[R]=i[I];break}}else r[R]=i}),r});z({gutter:m,supportFlexGap:d,wrap:$(()=>e.wrap)});const w=$(()=>B(l.value,{[`${l.value}-no-wrap`]:e.wrap===!1,[`${l.value}-${p.value}`]:p.value,[`${l.value}-${f.value}`]:f.value,[`${l.value}-rtl`]:o.value==="rtl"},a.class,g.value)),c=$(()=>{const r=m.value,s={},u=r[0]!=null&&r[0]>0?`${r[0]/-2}px`:void 0,i=r[1]!=null&&r[1]>0?`${r[1]/-2}px`:void 0;return u&&(s.marginLeft=u,s.marginRight=u),d.value?s.rowGap=`${r[1]}px`:i&&(s.marginTop=i,s.marginBottom=i),s});return()=>{var r;return A(H("div",G(G({},a),{},{class:w.value,style:y(y({},c.value),a.style)}),[(r=n.default)===null||r===void 0?void 0:r.call(n)]))}}});function ae(e){return typeof e=="number"?`${e} ${e} auto`:/^\d+(\.\d+)?(px|em|rem|%)$/.test(e)?`0 0 ${e}`:e}const ie=()=>({span:[String,Number],order:[String,Number],offset:[String,Number],push:[String,Number],pull:[String,Number],xs:{type:[String,Number,Object],default:void 0},sm:{type:[String,Number,Object],default:void 0},md:{type:[String,Number,Object],default:void 0},lg:{type:[String,Number,Object],default:void 0},xl:{type:[String,Number,Object],default:void 0},xxl:{type:[String,Number,Object],default:void 0},prefixCls:String,flex:[String,Number]}),de=["xs","sm","md","lg","xl","xxl"],me=L({compatConfig:{MODE:3},name:"ACol",inheritAttrs:!1,props:ie(),setup(e,t){let{slots:n,attrs:a}=t;const{gutter:l,supportFlexGap:o,wrap:A}=ee(),{prefixCls:g,direction:x}=W("col",e),[v,b]=le(g),S=$(()=>{const{span:f,order:p,offset:d,push:m,pull:w}=e,c=g.value;let r={};return de.forEach(s=>{let u={};const i=e[s];typeof i=="number"?u.span=i:typeof i=="object"&&(u=i||{}),r=y(y({},r),{[`${c}-${s}-${u.span}`]:u.span!==void 0,[`${c}-${s}-order-${u.order}`]:u.order||u.order===0,[`${c}-${s}-offset-${u.offset}`]:u.offset||u.offset===0,[`${c}-${s}-push-${u.push}`]:u.push||u.push===0,[`${c}-${s}-pull-${u.pull}`]:u.pull||u.pull===0,[`${c}-rtl`]:x.value==="rtl"})}),B(c,{[`${c}-${f}`]:f!==void 0,[`${c}-order-${p}`]:p,[`${c}-offset-${d}`]:d,[`${c}-push-${m}`]:m,[`${c}-pull-${w}`]:w},r,a.class,b.value)}),h=$(()=>{const{flex:f}=e,p=l.value,d={};if(p&&p[0]>0){const m=`${p[0]/2}px`;d.paddingLeft=m,d.paddingRight=m}if(p&&p[1]>0&&!o.value){const m=`${p[1]/2}px`;d.paddingTop=m,d.paddingBottom=m}return f&&(d.flex=ae(f),A.value===!1&&!d.minWidth&&(d.minWidth=0)),d});return()=>{var f;return v(H("div",G(G({},a),{},{class:S.value,style:[h.value,a.style]}),[(f=n.default)===null||f===void 0?void 0:f.call(n)]))}}});export{pe as A,me as C,J as c,fe as i};