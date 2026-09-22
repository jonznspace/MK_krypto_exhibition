// Station-08 specific behavior. Keep changes here to avoid duplicating logic.
document.addEventListener('DOMContentLoaded',()=>{
  // override base content with station-specific values
  const set = (id, value)=>{ const el=document.getElementById(id); if(!el) return; if(el.tagName==='IMG') el.src=value; else el.textContent=value }
  set('startEyebrow','Station 08');
  set('startTitle','Vorlage Station 08');
  const intro=document.getElementById('startIntro'); if(intro) intro.innerHTML='<p>Willkommen bei Station 08 — hier können wir Inhalte und Interaktionen aufbauen.</p>';
  const img=document.getElementById('startImage'); if(img) img.src='../station-04/img/eknigma02.png';
});