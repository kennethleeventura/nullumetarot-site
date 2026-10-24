(function(){
var b=document.querySelector('.nl-menu'),d=document.querySelector('.nl-drawer');
if(b&&d){b.addEventListener('click',function(){var o=d.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});}
function fit(){document.querySelectorAll('[data-fit]').forEach(function(e){var w=+e.getAttribute('data-fit'),p=e.parentElement.clientWidth;e.style.zoom=p&&p<w?(p/w):'';});}
fit();window.addEventListener('resize',fit);
function css(el,o){for(var k in o)el.style.setProperty(k,o[k]);}
document.querySelectorAll('[data-choice]').forEach(function(g){var c=JSON.parse(g.getAttribute('data-choice'));var bs=[].slice.call(g.children).filter(function(x){return x.tagName==='BUTTON'});
 bs.forEach(function(b){b.addEventListener('click',function(){bs.forEach(function(o){css(o,o===b?c.on:c.off);o.setAttribute('aria-pressed',o===b?'true':'false');});
  var f=g.getAttribute('data-filter');if(f){var lab=b.textContent.trim();document.querySelectorAll('[data-filter-item]').forEach(function(it){var show=/^All/.test(lab)||it.getAttribute('data-filter-item').indexOf(lab)>-1;it.style.display=show?'':'none';});}
  g.dispatchEvent(new CustomEvent('choice',{detail:b}));});});});
var toast;function say(h){if(!toast){toast=document.createElement('div');toast.setAttribute('role','status');toast.style.cssText='position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:50;max-width:calc(100% - 32px);background:#1A1411;color:#EFE6D8;padding:14px 20px;border-radius:12px;font:500 15px Hanken Grotesk,system-ui,sans-serif;box-shadow:0 12px 32px rgba(0,0,0,.25)';document.body.appendChild(toast);}toast.innerHTML=h;toast.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(function(){toast.style.display='none'},5000);}
document.querySelectorAll('button[aria-label^="Play"],button[aria-label^="Preview"],button[aria-label^="Listen"]').forEach(function(b){b.addEventListener('click',function(){say('Voice samples arrive at launch. <a href="/waitlist/" style="color:#D9A23A">Join the waitlist</a> to hear them first.');});});
var ok=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
document.querySelectorAll('form[data-waitlist]').forEach(function(f){
 var i=f.querySelector('input[type=email]'),m=f.querySelector('.wl-msg'),btn=f.querySelector('button');
 f.addEventListener('submit',function(e){e.preventDefault();m.className='wl-msg';m.textContent='';
  if(f.querySelector('[name=website]').value)return;var v=(i.value||'').trim();
  if(!ok.test(v)){m.textContent='Enter a full email address, like name@example.com.';m.classList.add('err');i.focus();return;}
  btn.disabled=true;var t=btn.textContent;btn.textContent='Joining…';
  fetch('https://formsubmit.co/ajax/09c78d7afd891b7b541cf817b120b463',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
   body:JSON.stringify({email:v,source:location.pathname,_subject:'NULLUME waitlist signup',_template:'table',_captcha:'false'})})
  .then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok||String(j.success)==='false')throw 0;});})
  .then(function(){m.textContent="You're on the list. We'll email you when the table opens.";m.classList.add('ok');i.value='';})
  .catch(function(){m.textContent="That didn't go through. Try again in a moment, or email kennethleeventura@gmail.com.";m.classList.add('err');})
  .then(function(){btn.disabled=false;btn.textContent=t;});});});
})();