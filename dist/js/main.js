(()=>{"use strict";const e={windowEl:window,documentEl:document,htmlEl:document.documentElement,bodyEl:document.body},t=()=>{const t=document?.querySelectorAll(".fixed-block");t.forEach((e=>{e.style.paddingRight="0px"})),e.bodyEl.style.paddingRight="0px",e.bodyEl.classList.remove("dis-scroll")},n=document.querySelector(".menu__btn"),o=document.querySelector(".nav-menu"),i=i=>{i.stopPropagation(),n.classList.toggle("close"),o.classList.toggle("active-menu"),o.classList.contains("active-menu")?(()=>{const t=document?.querySelectorAll(".fixed-block"),n=window.innerWidth-e.bodyEl.offsetWidth+"px";t.forEach((e=>{e.style.paddingRight=n})),e.bodyEl.style.paddingRight=n,e.bodyEl.classList.add("dis-scroll")})():t()},c=()=>{n.classList.remove("close"),o.classList.remove("active-menu"),t()};document.addEventListener("click",(e=>{const t=e.target;o.contains(t)||c()})),n.addEventListener("keydown",(e=>{"Tab"!==e.key&&9!==e.keyCode||n.focus(),"Enter"!==e.key&&13!==e.keyCode||(e.preventDefault(),i())})),n.addEventListener("click",i);const s=document.querySelectorAll(".article__btn"),l=document.querySelector(".menu"),d=document.querySelector(".home__button"),r=document.querySelector(".menu__logo"),a=o.querySelectorAll("a"),m=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;e.preventDefault();const o=t.getAttribute("href"),i=document.querySelector(o).offsetTop;window.scrollTo({top:i-n,behavior:"smooth"})},u=e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})};window.addEventListener("scroll",(()=>{window.scrollY>60?l.style.opacity=.9:l.style.opacity=1})),d.addEventListener("click",(e=>m(e,d,60))),s.forEach((e=>{e.addEventListener("click",(t=>{m(t,e,20)}))})),r.addEventListener("click",u),a.forEach((e=>e.addEventListener("click",(t=>{a.forEach((e=>{e.classList.remove("active")})),c(),m(t,e,20),e.classList.add("active")}))));const g=[{id:1,name:"Sergejs",img:"./img/testimonials/person1.jpg",text:"Оксана - мастер своего дела. Перепробовал почти все виды массажа в её исполнении. Любимый - класический.Боль в спине после тяжелого рабочего дня, которая была раньше, пропадает.))"},{id:2,name:"Ineta",img:"./img/testimonials/person2.jpg",text:"Ļoti profesionāla, patīkama, relaksējošā masāža. Oksana ir brīnišķīgs cilvēks ar zeltam rokām. Noteikti iesāku!"},{id:3,name:"Peter",img:"./img/testimonials/person3.jpg",text:"Оксана прекрасный специалист, владеющий разными техниками массажа и обладающий, как отличными практическими навыками, так и глубокими медицинскими знаниями. Оксане, спасибо)"}],y=document.getElementById("person-img"),v=document.getElementById("firstName"),E=document.getElementById("review"),p=document.querySelector(".prev-btn"),L=document.querySelector(".next-btn");let w=0;function f(){const e=g[w];y.src=e.img,v.textContent=e.name,E.textContent=e.text}window.addEventListener("DOMContentLoaded",(function(){f()})),L.addEventListener("click",(function(){w++,w>g.length-1&&(w=0),f()})),p.addEventListener("click",(function(){w--,w<0&&(w=g.length-1),f()}));const k=document.getElementById("topBtn");window.addEventListener("scroll",(()=>{window.scrollY>window.innerHeight?k.classList.add("visible"):k.classList.remove("visible")})),k.addEventListener("click",u)})();