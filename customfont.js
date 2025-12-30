/* customfont.js
   Logic only: inject settings UI on Home (via fetching customfont.html),
   control font style and size for <main>, persist to localStorage and sync
   between top and side panels.
*/
(function(){
  const STORAGE_STYLE = 'bcahub_fontStyle';
  const STORAGE_SIZE = 'bcahub_fontSize';
  const DEFAULT_SIZE = 18;
  const MIN_SIZE = 12;
  const MAX_SIZE = 32;

function isHomePage() {
  let path = location.pathname;

  // remove trailing slash
  if (path.endsWith('/')) path = path.slice(0, -1);

  return (
    path === '' ||               // local server: /
    path === '/' ||              // local server
    path === '/index.html' ||    // local index
    path === '/bcahub' ||        // GitHub Pages
    path === '/bcahub/index.html'
  );
}

  function applyToMain(style, size){
    const mains = document.querySelectorAll('main');
    mains.forEach(m => {
      m.style.fontSize = size + 'px';
      if(style === 'vt323') m.style.fontFamily = "'VT323', monospace";
      else if(style === 'monospace') m.style.fontFamily = 'monospace';
      else m.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
      m.style.lineHeight = '1.45';
    });
    // Ensure header/logo/footer/nav stay VT323 as required
    const keepVT = document.querySelectorAll('header, nav, footer, .sidebar, .logo');
    keepVT.forEach(el=>{ if(el) el.style.fontFamily = "'VT323', monospace"; });
  }

  function save(style, size){
    try{ localStorage.setItem(STORAGE_STYLE, style); localStorage.setItem(STORAGE_SIZE, String(size)); }catch(e){}
  }

  function load(){
    let style = localStorage.getItem(STORAGE_STYLE) || 'vt323';
    let size = parseInt(localStorage.getItem(STORAGE_SIZE),10);
    if(isNaN(size)) size = DEFAULT_SIZE;
    return {style,size};
  }

  function updateUIControls(container, state){
    if(!container) return;
    const radios = container.querySelectorAll('input[name="cf-font"]');
    radios.forEach(r=>{
      r.checked = (r.value === state.style);
      if(r.parentElement && r.parentElement.classList){
        r.parentElement.classList.toggle('cf-selected', r.checked);
        r.parentElement.classList.toggle('cf-showdot', r.checked);
      }
    });
    const disp = container.querySelector('#cf-size-display');
    if(disp) disp.textContent = state.size + 'px';
  }

  function bindControls(root, state){
    if(!root) return;
    const inc = root.querySelector('#cf-increase');
    const dec = root.querySelector('#cf-decrease');
    const radios = root.querySelectorAll('input[name="cf-font"]');
    const panel = root.querySelector('.cf-panel');

    if(inc) inc.addEventListener('click', ()=>{
      state.size = Math.min(MAX_SIZE, state.size + 1);
      applyToMain(state.style, state.size);
      save(state.style, state.size);
      broadcast('size', state.size);
    });
    if(dec) dec.addEventListener('click', ()=>{
      state.size = Math.max(MIN_SIZE, state.size - 1);
      applyToMain(state.style, state.size);
      save(state.style, state.size);
      broadcast('size', state.size);
    });
    radios.forEach(r=> r.addEventListener('change', (e)=>{
      if(e.target.checked){
        state.style = e.target.value;
        applyToMain(state.style, state.size);
        save(state.style, state.size);
        broadcast('style', state.style);
      }
    }));

    // ensure label states reflect selected radio immediately
    radios.forEach(r=> r.addEventListener('change', ()=>{
      document.querySelectorAll('#cf-settings-container').forEach(node=> updateUIControls(node, state));
    }));

    // toggle panel
    const toggle = root.querySelector('.cf-settings-toggle');
    if(toggle && panel){
      toggle.addEventListener('click', (ev)=>{
        const isHidden = panel.getAttribute('aria-hidden') !== 'false';
        panel.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
      });
    }
  }

  // broadcast simple sync events to other injected panels
  function broadcast(type, value){
    document.dispatchEvent(new CustomEvent('cf-sync', {detail:{type,value}}));
  }

  function listenSync(){
    document.addEventListener('cf-sync', (e)=>{
      const {type,value} = e.detail||{};
      const state = load();
      if(type === 'style') state.style = value;
      if(type === 'size') state.size = value;
      // update all panels
      document.querySelectorAll('#cf-settings-container').forEach(node=> updateUIControls(node, state));
    });
  }

  function injectSettings(html){
    const isHome = isHomePage();
    // apply saved settings immediately on every page
    const state = load();
    applyToMain(state.style, state.size);

    if(!isHome) return; // settings UI only on home

    // Parse fetched HTML
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    // TOP NAV: append into the right-side nav ul if present
    const nav = document.querySelector('header nav');
    if(nav){
      const uls = nav.querySelectorAll('ul');
      const rightUl = uls.length>1 ? uls[1] : uls[0];
        if(rightUl){
          const li = document.createElement('li');
          li.classList.add('cf-top','hideOnMobile');
        li.appendChild(template.content.cloneNode(true));
        rightUl.appendChild(li);
        bindControls(li, state);
      }
    }

    // SIDE NAV: find sidebar and insert after Help li
    const side = document.querySelector('ul.sidebar');
    if(side){
      // locate Help link index
      const items = Array.from(side.querySelectorAll('li'));
      let helpLi = items.find(li => li.textContent && li.textContent.trim().toLowerCase().includes('help')) || items[items.length-1];
      const sideLi = document.createElement('li');
      sideLi.classList.add('cf-side');
      sideLi.appendChild(template.content.cloneNode(true));
      if(helpLi && helpLi.parentNode){
        helpLi.parentNode.insertBefore(sideLi, helpLi.nextSibling);
      } else {
        side.appendChild(sideLi);
      }
      // ensure panel appears as dropdown in sidebar (use aria to show/hide; avoid inline display overrides)
      const panel = sideLi.querySelector('.cf-panel');
      if(panel) panel.setAttribute('aria-hidden','true');
      bindControls(sideLi, state);
    }

    // set UI initial state on injected panels
    document.querySelectorAll('#cf-settings-container').forEach(node=> updateUIControls(node, state));

    listenSync();
    // react to sync events to mirror changes
    document.addEventListener('cf-sync', ()=>{
      const s = load();
      document.querySelectorAll('#cf-settings-container').forEach(node=> updateUIControls(node, s));
      applyToMain(s.style, s.size);
    });
  }

  // bootstrap
  document.addEventListener('DOMContentLoaded', ()=>{
    // apply saved settings immediately
    const state = load();
    applyToMain(state.style, state.size);

    // fetch and inject markup (only used on Home page)
   try{
  fetch('customfont.html')
      .then(r => { if (!r.ok) throw 0; return r.text(); })
      .then(html => injectSettings(html))
      .catch(() => {});
}catch(e){/* silent */}
});
})();
