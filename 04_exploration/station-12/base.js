// Minimal base behaviors for station pages
document.addEventListener('DOMContentLoaded',()=>{
  // Simple content binding helpers for the template
  const bind = (id, value)=>{ const el=document.getElementById(id); if(!el) return; if(el.tagName==='IMG') el.src=value; else el.textContent=value }
  // Default demo content (override in station-specific script)
  bind('startEyebrow','STATION 08');
  bind('startTitle','Titel der Station 08');
  const intro=document.getElementById('startIntro'); if(intro) intro.innerHTML='<p>Ein einführender Text für Station 08. Ersetze diesen Inhalt mit station-spezifischem JS.</p>';
  // CTA label
  bind('tryLabel','Ausprobieren');
  // basic UI: toggle screens
  const btnTry=document.getElementById('btnTry'); const screenStart=document.getElementById('screenStart'); const screenAction=document.getElementById('screenAction'); const btnClose=document.getElementById('btnClose');
  if(btnTry && screenStart && screenAction){btnTry.addEventListener('click',()=>{screenStart.classList.add('hidden');screenAction.classList.remove('hidden')})}
  if(btnClose && screenStart && screenAction){btnClose.addEventListener('click',()=>{screenAction.classList.add('hidden');screenStart.classList.remove('hidden')})}

  const moduleTabs = [
    ['tabModuleA', 'moduleA'],
    ['tabModuleB', 'moduleB'],
    ['tabModuleC', 'moduleC']
  ];
  moduleTabs.forEach(([tabId, panelId])=>{
    const tab = document.getElementById(tabId);
    if(!tab) return;
    tab.addEventListener('click',()=>{
      moduleTabs.forEach(([otherTabId, otherPanelId])=>{
        const otherTab = document.getElementById(otherTabId);
        const otherPanel = document.getElementById(otherPanelId);
        const active = otherTabId === tabId;
        otherTab.classList.toggle('active', active);
        otherTab.setAttribute('aria-selected', String(active));
        otherPanel.classList.toggle('hidden', !active);
      });
    });
  });
});