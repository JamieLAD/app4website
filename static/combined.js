(()=>{"use strict";var e=document.querySelector("#site-header"),s=document.querySelector("#scrolling-menu");window.addEventListener("scroll",(function(){var t=e.offsetHeight,c=["scale-1"],n=["scale-0"];window.pageYOffset>=t?(s.classList.remove(n),s.classList.add(c)):(s.classList.remove(c),s.classList.add(n))}));var t=document.querySelectorAll(".has-dropdown"),c=document.querySelector("#overlay"),n="invisible";t.forEach((function(e){e.addEventListener("mouseover",(function(){c.classList.remove(n)})),e.addEventListener("mouseout",(function(){c.classList.add(n)}))}));var o=document.querySelectorAll(".dropdown-parent");document.querySelectorAll(".dropdown-arrows"),o.forEach((function(e){e.addEventListener("click",(function(e){e.stopPropagation(),e.preventDefault();var s="active",t="max-h-fit",c="max-h-0",n=e.target.parentNode,o=n.children,r=Array.from(o).find((function(e){return e.classList.contains("dropdown")}));r.classList.contains(t)?(r.classList.remove(t),r.classList.add(c)):(r.classList.remove(c),r.classList.add(t)),n.classList.contains(s)?n.classList.remove(s):n.classList.add(s)}))}));var r=document.querySelectorAll(".menu-open"),a=document.querySelector(".menu-close"),i=document.querySelector("#offscreen-nav"),l="right-0",d="-right-full";r.forEach((function(e){e.addEventListener("click",(function(e){e.preventDefault(),i.classList.contains(l)||(i.classList.remove(d),i.classList.add(l),c.classList.remove(n))}))})),a.addEventListener("click",(function(e){e.preventDefault(),i.classList.contains(l)&&(i.classList.remove(l),i.classList.add(d),c.classList.add(n))})),document.querySelectorAll(".cursor")})();