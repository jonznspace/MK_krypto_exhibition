// Minimal base behaviors for station pages
document.addEventListener('DOMContentLoaded',()=>{
  const moduleTabs = [
    ['tabModuleA', 'moduleA'],
    ['tabModuleB', 'moduleB']
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