var f=(m,u,l)=>new Promise((r,o)=>{var c=t=>{try{s(l.next(t))}catch(p){o(p)}},e=t=>{try{s(l.throw(t))}catch(p){o(p)}},s=t=>t.done?r(t.value):Promise.resolve(t.value).then(c,e);s((l=l.apply(m,u)).next())});import{C as x,_ as y}from"./NotFound--qaGgeZh.js";import{F as k,_ as B}from"./Sorting-DHBBrA-H.js";import{_ as b,r as g,o as w,l as C,c as n,a as d,b as i,p as v,F,h as V,i as h,j as a}from"./index-BZ_dGV7y.js";import{C as _}from"./CardLoader-BALp_lUB.js";const j={class:"pt-[62px] h-screen"},E={class:"flex flex-col lg:flex-row px-5 h-full"},K={class:"w-full h-full py-3 lg:pl-[270px]"},L={class:"flex justify-between items-center pb-1"},N={key:0,class:"px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"},O={key:1,class:"h-full w-full px-3"},$={key:0,class:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"},I={__name:"VolunteeringOpportunities",setup(m){const u=h("call"),l=h("store"),r=g([]),o=g(!1),c=e=>f(this,null,function*(){o.value=!0;try{const s=yield u("mykartavya.controllers.api.available_commitments",{filter:e!=null?e:{}});r.value=s,setTimeout(()=>{o.value=!1},1e3)}catch(s){o.value=!1,console.error("Error fetching Kindness data:",s)}});return w(()=>{c()}),C(()=>l.filters,e=>{e&&c(e)},{immediate:!0,deep:!0}),(e,s)=>(a(),n("div",j,[d("section",E,[i(k),d("main",K,[d("div",L,[s[0]||(s[0]=d("h2",{class:"text-3xl font-normal mb-4 text-[#0B0B0B] px-3"},"Kindness & Volunteering",-1)),i(B,{sort:e.filter},null,8,["sort"])]),o.value?(a(),n("div",N,[i(_),i(_),i(_)])):(a(),n("div",O,[r.value.length>0?(a(),n("div",$,[(a(!0),n(F,null,V(r.value,t=>(a(),v(x,{key:t.name,item:t,type:"card"},null,8,["item"]))),128))])):(a(),v(y,{key:1}))]))])])]))}},D=b(I,[["__scopeId","data-v-e98ff2ac"]]);export{D as default};
