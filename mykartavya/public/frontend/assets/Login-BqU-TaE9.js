var c=(y,d,a)=>new Promise((g,r)=>{var l=o=>{try{n(a.next(o))}catch(u){r(u)}},m=o=>{try{n(a.throw(o))}catch(u){r(u)}},n=o=>o.done?g(o.value):Promise.resolve(o.value).then(l,m);n((a=a.apply(y,d)).next())});import{r as f,o as _,c as b,d as t,e as h,q as k,v as C,g as p,f as j,w as T,a as V,i as G,s as q,x as M,b as v}from"./index-Dar1GTQB.js";import{_ as N,a as S,b as B}from"./Frame (1)-BNHRP8Uf.js";import{_ as E,a as O}from"./icons8-microsoft-48-Dtp2YD9z.js";import{l as x}from"./index-X4-sQW5r.js";const P={class:"flex pt-[62px] flex-col items-center min-h-screen bg-secondary",style:{background:"#f5f5f5"}},R={class:"flex flex-col items-center text-center w-full px-4 min-h-[calc(100vh-64px)] justify-center"},A={class:"mt-8 bg-white p-6 rounded-sm w-full max-w-[443px] shadow-md"},D=["disabled"],J={key:0,class:"h-5 w-5"},L={key:1},Y={class:"text-sm mt-4 text-gray-600"},$={class:"mt-4"},H=["href"],I=["href"],W={__name:"Login",setup(y){const d=G("call"),a=M(),g=q(),r=f(""),l=f(!1),m=f(""),n=f(""),o=()=>c(this,null,function*(){if(r.value===""){x.error("Email is required");return}let s="";g.query.full_name?s="register_send_otp":s="send_otp";try{l.value=!0;const e=yield d(`mykartavya.controllers.email.${s}`,{email:r.value});e.status==="success"?(l.value=!1,x.success("OTP sent successfully"),a.push({name:"Verify",query:{email:r.value}})):(l.value=!1,x.error(e.message))}catch(e){x.error("Something went wrong"),l.value=!1}}),u=()=>c(this,null,function*(){const s=yield d("mykartavya.controllers.api.get_login_details");m.value=s[0].google_login_url,n.value=s[0].office_365_login_url});return _(()=>c(this,null,function*(){console.log("Page has loaded"),yield u()})),(s,e)=>{const w=V("router-link");return v(),b("div",P,[t("main",R,[e[11]||(e[11]=h('<h1 class="text-[28px] md:text-[33px] font-medium font-poppins"> Your Journey of Kindness Starts Here </h1><div class="text-center mt-2"><div class="flex flex-wrap justify-center gap-2 md:gap-4"><button class="border px-4 h-8 items-center bg-white rounded-full text-black border-orange-500 flex gap-1"><img src="'+N+'" alt="" class="w-4"><p class="text-[14px] font-normal">Track Your Impact</p></button><button class="border px-4 h-8 items-center bg-white rounded-full text-black border-orange-500 flex gap-1"><img src="'+S+'" alt="" class="w-4"><p class="text-[14px] font-normal">Join Activities Anywhere</p></button><button class="border px-4 h-8 items-center bg-white rounded-full text-black flex gap-1" style="border-color:#f185bb;"><img src="'+B+'" alt="" class="w-4"><p class="text-[14px] font-normal">Connect with a Community</p></button></div></div>',2)),t("div",A,[e[9]||(e[9]=t("h2",{class:"text-[20px] font-medium mb-4"},"Login to your account",-1)),k(t("input",{type:"email","onUpdate:modelValue":e[0]||(e[0]=i=>r.value=i),placeholder:"sample@example.com",class:"w-full p-2 border rounded-sm mb-4 text-[14px]",style:{color:"#6e7073"}},null,512),[[C,r.value]]),t("button",{disabled:l.value,onClick:e[1]||(e[1]=i=>o()),class:"w-full flex items-center justify-center text-white py-2 rounded-sm text-[14px]",style:{background:"#ff5722"}},[l.value?(v(),b("div",J,e[4]||(e[4]=[t("div",{class:"animate-spin h-full w-full rounded-full border-[2px] flex justify-center items-center border-dotted border-[#fff]"},[t("div",{class:"w-3 h-3 rounded-full border-dashed border-[1px] border-[#fff]"})],-1)]))):(v(),b("p",L,"GET OTP"))],8,D),t("p",Y,[e[6]||(e[6]=p(" Don't have an account? ")),j(w,{to:"/register",class:"text-orange-500"},{default:T(()=>e[5]||(e[5]=[p("Sign up")])),_:1})]),e[10]||(e[10]=t("div",{class:"flex items-center my-4"},[t("hr",{class:"flex-grow border-t border-gray-300"}),t("span",{class:"mx-2 text-gray-500 text-[12px]"},"OR"),t("hr",{class:"flex-grow border-t border-gray-300"})],-1)),t("div",$,[t("a",{href:m.value},[t("button",{class:"w-full flex items-center justify-start p-2 border rounded-sm mb-2 text-[14px] font-normal",onClick:e[2]||(e[2]=(...i)=>s.Google_login&&s.Google_login(...i))},e[7]||(e[7]=[t("img",{src:E,alt:"Google",class:"h-5 mr-2"},null,-1),p(" Continue with Google ")]))],8,H),t("a",{href:n.value},[t("button",{class:"w-full flex items-center justify-start p-2 border rounded-sm text-[14px]",onClick:e[3]||(e[3]=(...i)=>s.micro_login&&s.micro_login(...i))},e[8]||(e[8]=[t("img",{src:O,alt:"Microsoft",class:"h-5 mr-2"},null,-1),p(" Continue with Microsoft ")]))],8,I)])])])])}}};export{W as default};
