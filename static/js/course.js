(function(){
  const accessLink = document.querySelector('a[href="#start-learning"]');
  if(accessLink){
    accessLink.addEventListener('click', (e)=>{
      // Let default anchor work but we can add a subtle focus on section
      setTimeout(()=>{
        const target = document.getElementById('start-learning');
        if(target){
          target.scrollIntoView({behavior:'smooth', block:'start'});
          target.setAttribute('tabindex','-1');
          target.focus({preventScroll:true});
          setTimeout(()=>target.removeAttribute('tabindex'), 1000);
        }
      }, 10);
    });
  }
  // Add class when sticky panels are stuck for subtle shadow accent
  const stickies = document.querySelectorAll('.course-media-card, .instructor-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.boundingClientRect.top < 0){
        entry.target.classList.add('is-stuck');
      } else {
        entry.target.classList.remove('is-stuck');
      }
    });
  }, {threshold:[1]});
  stickies.forEach(el=> observer.observe(el));
})();