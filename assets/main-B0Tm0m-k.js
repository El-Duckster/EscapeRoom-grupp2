import{f as o,r as g}from"./renderChallenges-2Cduj9sn.js";const e=document.querySelector(".challenges__list");let l=[];const i=async()=>{const{success:s,data:a,error:n}=await o();if(!s){console.error("Failed to fetch challenges:",n),e.innerHTML="<li>Error loading challenges. Please try again later.</li>";return}l=a;const r=[...l].sort((t,c)=>c.rating-t.rating).slice(0,3);g(r,e)};i();
//# sourceMappingURL=main-B0Tm0m-k.js.map
