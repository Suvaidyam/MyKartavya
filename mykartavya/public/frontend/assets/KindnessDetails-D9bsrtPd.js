var v=(N,y,c)=>new Promise((t,p)=>{var f=a=>{try{_(c.next(a))}catch(u){p(u)}},x=a=>{try{_(c.throw(a))}catch(u){p(u)}},_=a=>a.done?t(a.value):Promise.resolve(a.value).then(f,x);_((c=c.apply(N,y)).next())});import{j as F,r as b,o as M,l as B,c as o,d as s,e as l,t as d,u as m,_ as g,i as L,m as S,F as w,h as k,w as z,a as A,x as O,b as e,f as V,p as T,B as E}from"./index-CGp1uD2y.js";import{N as I,C as $}from"./NotFound-wCD7cIwx.js";import{C}from"./CardLoader-BAHqpPnC.js";import{_ as H}from"./Footer-CPkv5Al6.js";import{S as K,F as R,T as W,L as J,M as X}from"./twitter-Bn77Co4G.js";const q={class:"min-h-screen w-full pt-[62px]"},G={class:"relative w-full h-[300px] md:h-[456px] sm:h-[456px] back-img flex items-center"},P=["src"],Q={class:"w-full absolute top-14 left-10 max-w-sm bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col gap-4 justify-center"},U={class:"border-b pb-2"},Y={class:"text-2xl md:text-heading3 font-normal font-poppins mt-1"},Z={class:"text-secondary font-medium text-caption"},ss={class:"flex items-center",style:{color:"#666666"}},ts={class:"text-sm md:text-bodyh2 font-normal ml-2",style:{color:"#0b0b0b"}},es={class:"flex text-gray-600 text-sm md:text-bodyh2 font-normal justify-between border-b pb-2"},as={class:"flex items-center",style:{color:"#0b0b0b"}},os={class:"ml-2"},ls={class:"flex items-center gap-2",style:{color:"#0b0b0b"}},is={class:"flex space-x-2 border-b pb-2"},ns=["src"],rs={key:1,class:"w-8 h-8 flex items-center justify-center bg-gray-50"},cs={class:"font-poppins text-button"},ds={class:"bg-secondary min-w-[112px] px-2 h-[32px] rounded-[4px] flex justify-center items-center text-white hover:bg-opacity-90 transition-colors"},ms={class:"w-full bg-white"},ps={class:"p-4 md:p-6 lg:p-10"},_s={class:"flex flex-col lg:flex-row gap-4"},us={class:"w-full lg:w-[65%]"},vs=["innerHTML"],fs={class:"w-full lg:w-[35%]"},hs={class:"flex gap-3 flex-col"},gs={class:"text-gray-700 font-medium flex items-center space-x-2"},ys={class:"flex gap-3"},xs=["aria-label"],bs={key:0,class:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 pt-1 gap-4"},ws={key:1,class:""},ks={key:0,class:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 pt-1 items-center gap-4"},Cs={key:1,class:"w-full h-[330px]"},Ns={__name:"KindnessDetails",setup(N){const y=[{name:"Facebook",svg:R},{name:"X",svg:W},{name:"LinkedIn",svg:J},{name:"WhatsApp",svg:X}],c=L("call"),t=b([]),p=O(),f=L("formatDate"),x=b(!1),_=()=>v(this,null,function*(){try{const i=yield c("mykartavya.controllers.api.activity_details",{name:p.params.name});t.value=i}catch(i){console.error("Error fetching activity data:",i)}}),a=b([]),u=()=>v(this,null,function*(){try{const i=yield c("mykartavya.controllers.api.related_opportunities",{name:p.params.name,sdgs:t.value.sdgs});i&&(a.value=i)}catch(i){console.error("Error fetching activity data:",i)}});return M(()=>v(this,null,function*(){yield _(),yield u()})),B(()=>p.params.name,i=>v(this,null,function*(){yield _(),yield u()}),{immediate:!0,deep:!0}),(i,r)=>{var j;const D=A("router-link");return e(),o("div",q,[s("section",null,[s("div",G,[s("img",{src:t.value.activity_image,class:"w-full h-full",alt:""},null,8,P),s("div",Q,[s("div",U,[s("h2",Y,d(t.value.title),1),s("span",Z,d(t.value.activity_type),1)]),s("div",ss,[l(m(g),{name:"calendar",class:"size-4"}),s("span",ts,d(m(f)(t.value.start_date))+" - "+d(m(f)(t.value.end_date)),1)]),s("div",es,[s("div",as,[l(m(g),{name:"clock",class:"size-4"}),s("span",os,d(t.value.hours)+"hr",1)]),s("span",ls,[l(m(g),{name:"database",class:"size-4"}),s("span",null,d(t.value.karma_points),1)])]),r[1]||(r[1]=s("div",{class:"flex justify-between border-b pb-4",style:{color:"#666666"}},[s("span",{class:"text-[12px] font-normal",style:{color:"#e23d90"}}," Individual Activity "),s("span",{class:"text-[12px] font-normal",style:{color:"#666666"}}," Minumum Time Commitment ")],-1)),s("div",is,[t.value.sdgs?(e(!0),o(w,{key:0},k(JSON.parse(t.value.sdgs),n=>{var h;return e(),o("div",null,[n.image?(e(),o("img",{key:0,src:n.image,class:"w-8 h-8"},null,8,ns)):(e(),o("span",rs,d((h=n.sdgs_name)==null?void 0:h.charAt(0)),1))])}),256)):S("",!0)]),s("div",cs,[l(D,{to:`/activity/${t.value.activity}`},{default:z(()=>[s("button",ds,[r[0]||(r[0]=V(" ACT NOW ")),l(m(g),{name:"arrow-up-right",class:"size-4 ml-1"})])]),_:1},8,["to"])])])])]),s("section",ms,[s("div",ps,[s("div",_s,[s("div",us,[s("div",{innerHTML:t.value.activity_description},null,8,vs)]),s("div",fs,[s("div",hs,[s("span",gs,[r[2]||(r[2]=s("span",{class:"text-sm md:text-bodyh1 font-medium font-poppins",style:{color:"#0b0b0b"}}," Share activity with others ",-1)),l(m(K),{class:"w-5 h-5 text-gray-600"})]),s("div",ys,[(e(),o(w,null,k(y,n=>s("button",{key:n.name,"aria-label":n.name,class:"p-1 bg-white rounded-full border border-gray-500 transition-colors"},[(e(),T(E(n.svg),{class:"w-5 h-5 text-gray-600"}))],8,xs)),64))])]),r[3]||(r[3]=s("h2",{class:"text-xl md:text-heading4 pt-6 font-medium font-poppins",style:{color:"#0b0b0b"}}," Related Opportunities ",-1)),x.value?(e(),o("div",bs,[l(C),l(C),l(C)])):(e(),o("div",ws,[((j=a.value)==null?void 0:j.length)>0?(e(),o("div",ks,[(e(!0),o(w,null,k(a.value,(n,h)=>(e(),T($,{key:h,item:n},null,8,["item"]))),128))])):(e(),o("div",Cs,[l(I)]))]))])])])]),l(H)])}}},Bs=F(Ns,[["__scopeId","data-v-15025b8a"]]);export{Bs as default};
