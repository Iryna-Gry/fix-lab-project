"use strict";(()=>{var e={};e.id=554,e.ids=[554],e.modules={55403:e=>{e.exports=require("next/dist/client/components/request-async-storage.external")},94749:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},25528:e=>{e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},91877:e=>{e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},25319:e=>{e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},39491:e=>{e.exports=require("assert")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},85477:e=>{e.exports=require("punycode")},12781:e=>{e.exports=require("stream")},76224:e=>{e.exports=require("tty")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},85437:(e,r,t)=>{t.r(r),t.d(r,{GlobalError:()=>i.a,__next_app__:()=>c,originalPathname:()=>u,pages:()=>l,routeModule:()=>g,tree:()=>p});var a=t(67096),n=t(16132),s=t(37284),i=t.n(s),o=t(32564),d={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>o[e]);t.d(r,d);let p=["",{children:["(pages)",{children:["repair",{children:["[gadget]",{children:["brands",{children:["[brand]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,85675)),"C:\\Users\\dimar\\OneDrive\\Документы\\GitHub\\fix-lab-project\\client\\app\\(pages)\\repair\\[gadget]\\brands\\[brand]\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,50613)),"C:\\Users\\dimar\\OneDrive\\Документы\\GitHub\\fix-lab-project\\client\\app\\(pages)\\repair\\[gadget]\\layout.tsx"]}]},{}]},{"not-found":[()=>Promise.resolve().then(t.t.bind(t,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,35345)),"C:\\Users\\dimar\\OneDrive\\Документы\\GitHub\\fix-lab-project\\client\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],l=["C:\\Users\\dimar\\OneDrive\\Документы\\GitHub\\fix-lab-project\\client\\app\\(pages)\\repair\\[gadget]\\brands\\[brand]\\page.tsx"],u="/(pages)/repair/[gadget]/brands/[brand]/page",c={require:t,loadChunk:()=>Promise.resolve()},g=new a.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/(pages)/repair/[gadget]/brands/[brand]/page",pathname:"/repair/[gadget]/brands/[brand]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:p}})},85675:(e,r,t)=>{t.r(r),t.d(r,{default:()=>p,dynamicParams:()=>l,generateStaticParams:()=>generateStaticParams});var a=t(4656),n=t(99660),s=t(23740);let getSingleBrandData=async e=>{let r=`/brands/find-by-slug/${e}`;return(0,s.Z)(r)};var i=t(64395),o=t(92127),d=t(73793);let Index=async({params:e})=>{let r=await (0,o.U)(e.gadget),t=await (0,i.l)(),s=await getSingleBrandData(e.brand);return(0,a.jsxs)("main",{className:"h-full flex-auto",children:[a.jsx(d.ZP,{contactsData:t,gadgetData:r,brandData:s}),a.jsx(n.lk,{}),a.jsx(n.zD,{contactsData:t})]})},p=Index,l=!0;async function generateStaticParams({params:e}){let r=await (0,o.U)(e.gadget);return r.brands.map(e=>({gadget:r.slug,brand:e.slug}))}}};var r=require("../../../../../../webpack-runtime.js");r.C(e);var __webpack_exec__=e=>r(r.s=e),t=r.X(0,[75,323,797,703,679,159,777,972],()=>__webpack_exec__(85437));module.exports=t})();