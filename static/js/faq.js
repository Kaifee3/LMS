// Accessible FAQ accordion behavior
(function(){
  const triggers = document.querySelectorAll('.faq-trigger');
  if(!triggers.length) return;

  function closeAll(except){
    triggers.forEach(btn => {
      if(btn === except) return;
      const panelId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if(panel && !panel.hasAttribute('hidden')){
        panel.setAttribute('hidden','');
      }
      btn.setAttribute('aria-expanded','false');
    });
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const panelId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if(!panel) return;
      if(expanded){
        panel.setAttribute('hidden','');
        btn.setAttribute('aria-expanded','false');
      } else {
        closeAll(btn);
        panel.removeAttribute('hidden');
        btn.setAttribute('aria-expanded','true');
      }
    });

    // Optional: allow up/down arrow navigation
    btn.addEventListener('keydown', (e) => {
      if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key)) return;
      e.preventDefault();
      const btns = Array.from(triggers);
      const idx = btns.indexOf(btn);
      let targetIdx = idx;
      switch(e.key){
        case 'ArrowDown': targetIdx = (idx + 1) % btns.length; break;
        case 'ArrowUp': targetIdx = (idx - 1 + btns.length) % btns.length; break;
        case 'Home': targetIdx = 0; break;
        case 'End': targetIdx = btns.length - 1; break;
      }
      btns[targetIdx].focus();
    });
  });
})();
