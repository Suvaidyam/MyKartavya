var g=(f,m,a)=>new Promise((i,o)=>{var r=e=>{try{t(a.next(e))}catch(n){o(n)}},u=e=>{try{t(a.throw(e))}catch(n){o(n)}},t=e=>e.done?i(e.value):Promise.resolve(e.value).then(r,u);t((a=a.apply(f,m)).next())});import{_ as y,F as k}from"./Sorting-B7pB1YIK.js";import{i as x,r as p,o as F,k as v,c as d,b as l,d as s,f as c,n as h,y as _,p as w,F as K,h as A,_ as z}from"./index-B8k8yuhv.js";import{C as j}from"./Card-DDeLYPK1.js";import{C as b,N as O}from"./NotFound-Biv9OI5u.js";const S={class:"mt-2 w-full h-full"},B={class:"flex flex-wrap gap-5 justify-between w-full max-md:mr-0.5 max-md:max-w-full"},R={class:"flex flex-col justify-center items-start py-px mt-4 text-base tracking-normal leading-none bg-white border-b-2 border-solid border-b-[color:var(--Stroke,#D9D9D9)] max-md:pr-5 max-md:mr-0.5 max-md:max-w-full"},q={class:"flex flex-wrap gap-4 items-center max-w-full min-h-9 w-[519px]"},E={class:"mt-5 w-full h-4/5"},M={key:0,class:"grid grid-cols-3 gap-5 max-md:grid-cols-1"},C={key:1,class:"h-full"},L={key:0,class:"grid grid-cols-3 gap-5 max-md:grid-cols-1"},G={__name:"VolunteeringContent",setup(f){const m=x("call"),a=x("store"),i=p([]),o=p(!1),r=p("kindness"),u=t=>g(this,null,function*(){o.value=!0;try{const e=yield m("mykartavya.controllers.api.available_commitments",{filter:t!=null?t:{}});i.value=e,setTimeout(()=>{o.value=!1},1e3)}catch(e){o.value=!1,console.error("Error fetching Kindness data:",e)}});return F(()=>{u(a.filters)}),v(()=>r.value,t=>{t&&u(a.filters)},{immediate:!0}),v(()=>a.filters,t=>{t&&u(t)},{immediate:!0,deep:!0}),(t,e)=>(l(),d("section",S,[s("header",B,[e[2]||(e[2]=s("div",{class:"flex flex-col leading-none"},[s("h1",{class:"self-start mt-1 text-2xl text-center text-neutral-950"}," Kindness & Volunteering ")],-1)),c(y)]),s("nav",R,[s("div",q,[s("a",{onClick:e[0]||(e[0]=_(n=>r.value="kindness",["prevent"])),class:h(["flex gap-1 items-center self-stretch cursor-pointers p-2 my-auto bg-white border-b-2 border-solid min-w-60 text-stone-500",{"border-b-[color:var(--S2,#FF7C3A)] text-neutral-950":r.value==="kindness","border-b-[color:var(--Primary,#FFF)]":r.value!=="kindness"}])},e[3]||(e[3]=[s("img",{src:"https://cdn.builder.io/api/v1/image/assets/TEMP/e19184eebc4a59cfdb05175c1ea1d1c4b671b0eb0457754baf6d25cefb636347?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193",alt:"",class:"object-contain shrink-0 self-stretch my-auto w-5 aspect-square"},null,-1),s("span",null,"Acts of Random Kindness",-1)]),2),s("a",{onClick:e[1]||(e[1]=_(n=>r.value="volunteering",["prevent"])),class:h(["flex gap-1 items-center self-stretch cursor-pointers p-2 my-auto bg-white border-b-2 border-solid min-w-60 text-stone-500",{"border-b-[color:var(--S2,#FF7C3A)] text-neutral-950":r.value==="volunteering","border-b-[color:var(--Primary,#FFF)]":r.value!=="volunteering"}])},e[4]||(e[4]=[s("img",{src:"https://cdn.builder.io/api/v1/image/assets/TEMP/5df16569a7fc25da6cc37b22e0be591bf7cdc731ac26089af74b0ead24bbac7b?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193",alt:"",class:"object-contain shrink-0 self-stretch my-auto w-5 aspect-square"},null,-1),s("span",null,"Volunteering Opportunities",-1)]),2)])]),s("div",E,[o.value?(l(),d("div",M,[c(b),c(b),c(b)])):(l(),d("div",C,[i.value.length>0?(l(),d("div",L,[(l(!0),d(K,null,A(i.value,n=>(l(),w(j,{key:n.name,item:n},null,8,["item"]))),128))])):(l(),w(O,{key:1}))]))])]))}},T={class:"max-w-[1920px] w-full h-screen pt-[62px] mx-auto bg-gray-50"},V={class:"w-full h-full flex flex-col lg:flex-row px-5"},I={class:"w-full lg:pl-[270px] flex flex-col xl:flex-row"},N={__name:"Kindness & Volunteering",setup(f){const m=p([{title:"Empower the needy",description:"This Women’s Entrepreneurship Day, let’s empower underserved women running small business.",image:"https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__",points:40,sdg:"SDG 10 : Reduced Inequalities",time:"01 Oct, 2024 - 30 Nov, 2024",hours:50,status:"On-Ground",participant_users:["assets/download (3).jpeg","assets/download (2).jpeg","assets/download (2).jpeg"]},{title:"Empower the needy",description:"This Women’s Entrepreneurship Day, let’s empower underserved women running small business.",image:"https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__",points:40,sdg:"SDG 10 : Reduced Inequalities",time:"01 Oct, 2024 - 30 Nov, 2024",hours:50,status:"On-Ground",participant_users:["assets/download (3).jpeg","assets/download (2).jpeg","assets/download (2).jpeg"]}]);return(a,i)=>(l(),d("div",T,[s("div",V,[c(k),s("div",I,[c(G,{available_commitments:m.value,class:"px-3"},null,8,["available_commitments"])])])]))}},Z=z(N,[["__scopeId","data-v-247732b5"]]);export{Z as default};
