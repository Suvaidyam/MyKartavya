var m=(f,u,a)=>new Promise((n,l)=>{var d=e=>{try{t(a.next(e))}catch(o){l(o)}},s=e=>{try{t(a.throw(e))}catch(o){l(o)}},t=e=>e.done?n(e.value):Promise.resolve(e.value).then(d,s);t((a=a.apply(f,u)).next())});import{C as y,_ as k}from"./NotFound-gcag92jh.js";import{F as B,_ as w}from"./Sorting-Bec5KydR.js";import{C as _}from"./CardLoader-r_9EgmGG.js";import{_ as C,r as g,o as F,l as V,c as i,a as p,b as c,p as h,F as b,h as j,i as v,j as r}from"./index-BlslbTPz.js";const N={class:"pt-[62px] h-screen"},O={class:"flex flex-col lg:flex-row px-5 h-full"},E={class:"w-full h-full py-3 lg:pl-[270px]"},K={class:"flex justify-between items-center pb-1"},L={key:0,class:"px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"},$={key:1,class:"h-full w-full px-3"},I={key:0,class:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"},J={__name:"VolunteeringOpportunities",setup(f){const u=v("call"),a=v("store"),n=g([]),l=g(!1),d=s=>m(this,null,function*(){var t,e;l.value=!0;try{const o=yield u("mykartavya.controllers.api.related_opportunities",{filter:s,sdgs:JSON.stringify((e=(t=s.sdgs)==null?void 0:t.map(x=>({sdgs_name:x})))!=null?e:[])});n.value=o}catch(o){console.error("Error fetching Kindness data:",o)}finally{l.value=!1}});return F(()=>{d()}),V(()=>a.filters,s=>{s&&d(s)},{immediate:!0,deep:!0}),(s,t)=>(r(),i("div",N,[p("section",O,[c(B),p("main",E,[p("div",K,[t[0]||(t[0]=p("h2",{class:"text-[23px] font-normal my-2 font-poppins text-[#0B0B0B] px-3"},"Kindness & Volunteering",-1)),c(w,{sort:s.filter},null,8,["sort"])]),l.value?(r(),i("div",L,[c(_),c(_),c(_)])):(r(),i("div",$,[n.value.length>0?(r(),i("div",I,[(r(!0),i(b,null,j(n.value,e=>(r(),h(y,{key:e.name,item:e,mode:"opportunity"},null,8,["item"]))),128))])):(r(),h(k,{key:1}))]))])])]))}},D=C(J,[["__scopeId","data-v-095dde43"]]);export{D as default};
