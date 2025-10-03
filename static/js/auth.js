// Basic enhancements for auth forms: password visibility toggle & filled state
(function(){
  const toggleButtons = document.querySelectorAll('[data-toggle-password]');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-toggle-password');
      const input = document.getElementById(id);
      if(!input) return;
      const showing = input.getAttribute('type') === 'text';
      input.setAttribute('type', showing ? 'password' : 'text');
      btn.textContent = showing ? 'SHOW' : 'HIDE';
      btn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
    });
  });

  // Filled-state styling / remove icon dimming when content present
  const inputs = document.querySelectorAll('.auth-form input[type="text"], .auth-form input[type="email"], .auth-form input[type="password"]');
  inputs.forEach(inp => {
    const update = () => {
      if(inp.value.trim()) {
        inp.classList.add('is-filled');
      } else {
        inp.classList.remove('is-filled');
      }
    };
    inp.addEventListener('input', update);
    update();
  });

  // Password strength meter (for signup page if present)
  const pwd1 = document.querySelector('#id_password1');
  if(pwd1){
    // Inject meter container if not present
    let meter = document.querySelector('.password-strength');
    if(!meter){
      meter = document.createElement('div');
      meter.className = 'password-strength';
      meter.innerHTML = '<div class="strength-bar" aria-hidden="true"><span></span></div><div class="strength-label" id="pw-strength-label" aria-live="polite"></div>';
      pwd1.closest('.form-row')?.appendChild(meter);
      pwd1.setAttribute('aria-describedby', 'pw-strength-label');
    }
    const span = meter.querySelector('.strength-bar span');
    const label = meter.querySelector('.strength-label');
    const evaluate = (val)=>{
      let score = 0;
      if(!val) return 0;
      const tests = [
        /[a-z]/.test(val),
        /[A-Z]/.test(val),
        /\d/.test(val),
        /[^A-Za-z0-9]/.test(val),
        val.length >= 8,
        val.length >= 12
      ];
      score = tests.filter(Boolean).length;
      return Math.min(score,6);
    };
    const descriptors = ['Too weak','Very weak','Weak','Fair','Good','Strong','Excellent'];
    const colors = ['#dc2626','#f87171','#fb923c','#fbbf24','#10b981','#059669','#2563eb'];
    const updateStrength = () => {
      const val = pwd1.value.trim();
      const score = evaluate(val);
      const pct = (score/6)*100;
      span.style.width = pct + '%';
      span.style.background = colors[score];
      label.textContent = val ? descriptors[score] : '';
      meter.className = 'password-strength level-' + score;
    };
    pwd1.addEventListener('input', updateStrength);
    updateStrength();
  }
})();
