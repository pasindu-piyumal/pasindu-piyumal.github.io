// ===== YEAR =====
    document.getElementById('year').textContent = new Date().getFullYear();

    // ===== MOBILE NAV =====
    const burger = document.getElementById('burger');
    const nav = document.querySelector('.nav');
    const links = document.querySelector('.nav-links');
    burger?.addEventListener('click',()=>{
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.gap = '18px';
      links.style.position = 'absolute';
      links.style.top = '72px';
      links.style.right = '12px';
      links.style.flexDirection = 'column';
      links.style.background = '#121318';
      links.style.padding = '14px';
      links.style.border = '1px solid rgba(255,255,255,.08)';
      links.style.borderRadius = '14px';
      links.style.boxShadow = 'var(--shadow)';
    });

    // ===== TYPEWRITER =====
    const tw = document.getElementById('typewriter');
    const phrases = [
      'Designing beautiful, accessible interfaces.',
      'Turning data into useful insights',
      'Turning ideas into production‑ready code.',
      'Exploring ML for real‑world insights.',
      'Developing web applications'
    ];
    let i=0, j=0, del=false;
    function tick(){
      const word = phrases[i];
      tw.textContent = word.slice(0, j) + (j%2===0?'▍':'');
      if(!del && j <= word.length){ j++; }
      else if(del && j>0){ j--; }
      if(j===word.length+1){ del = true; setTimeout(tick, 900); return; }
      if(del && j===0){ del=false; i=(i+1)%phrases.length; }
      setTimeout(tick, del?60:85);
    } tick();

    // ===== PARTICLES (simple, light) =====
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let W=0,H=0, parts=[];
    function size(){ W=canvas.width=canvas.offsetWidth; H=canvas.height=canvas.offsetHeight; }
    function make(){
      parts = Array.from({length: 60}, ()=>({
        x: Math.random()*W,
        y: Math.random()*H,
        vx: (Math.random()-.5)*.3,
        vy: (Math.random()-.5)*.3,
        r: Math.random()*2+0.6
      }));
    }
    function step(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle = 'rgba(0,245,255,.8)';
      const linkDist = 120;
      for(const p of parts){
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      }
      ctx.strokeStyle = 'rgba(255,45,117,.25)';
      for(let a=0;a<parts.length;a++){
        for(let b=a+1;b<parts.length;b++){
          const dx=parts[a].x-parts[b].x, dy=parts[a].y-parts[b].y, d=Math.hypot(dx,dy);
          if(d<linkDist){ ctx.globalAlpha = 1 - d/linkDist; ctx.beginPath(); ctx.moveTo(parts[a].x,parts[a].y); ctx.lineTo(parts[b].x,parts[b].y); ctx.stroke(); }
        }
      }
      ctx.globalAlpha=1;
      requestAnimationFrame(step);
    }
    const ro = new ResizeObserver(()=>{ size(); make(); }); ro.observe(canvas);
    size(); make(); step();

    // ===== REVEAL ON SCROLL =====
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); } });
    },{threshold:.2});
    reveals.forEach(el=>io.observe(el));

    // ===== SKILL BARS =====
    const fills = document.querySelectorAll('.fill');
    const barIO = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const val = e.target.getAttribute('data-fill');
          e.target.style.width = val+'%';
          barIO.unobserve(e.target);
        }
      })
    },{threshold:.4});
    fills.forEach(f=>barIO.observe(f));

    // ===== PROJECT FILTERS =====
    const chips = document.querySelectorAll('.filters .chip');
    const cards = document.querySelectorAll('.project');
    chips.forEach(c=>c.addEventListener('click',()=>{
      const key = c.getAttribute('data-filter');
      chips.forEach(x=>x.style.borderColor='rgba(255,255,255,.12)');
      c.style.borderColor='var(--primary)';
      cards.forEach(card=>{
        const show = key==='all' || card.dataset.tags.includes(key);
        card.style.display = show? 'block' : 'none';
      })
    }))

    // ===== PROJECT MODAL =====
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const closeModal = document.getElementById('closeModal');
    document.querySelectorAll('[data-open]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        modalTitle.textContent = btn.getAttribute('data-open');
        modal.classList.add('open');
        document.body.style.overflow='hidden';
      })
    })
    closeModal.addEventListener('click',()=>{ modal.classList.remove('open'); document.body.style.overflow=''; })
    modal.addEventListener('click',(e)=>{ if(e.target===modal){ closeModal.click(); } })

    // ===== CONTACT FORM (demo) =====
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      alert(`Thanks, ${data.name}! I\'ll reply to ${data.email} soon.\n\nMessage preview:\n${data.message}`);
      form.reset();
    });

    // ===== BACK TO TOP =====
    const back = document.getElementById('backTop');
    window.addEventListener('scroll',()=>{
      back.classList.toggle('show', window.scrollY>400);
    });
    back.addEventListener('click',()=>{ window.scrollTo({top:0, behavior:'smooth'}); });

    // ===== DOWNLOAD CV (placeholder) =====
    document.getElementById('dlCV').addEventListener('click', (e)=>{
      if(!document.getElementById('resume')){
        e.preventDefault();
        alert('Add your CV (PDF) and link it here!');
      }
    })