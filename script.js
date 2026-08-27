/* ============================================================================
   EDIT YOUR SIBLINGS HERE
   Add one entry per sister. Keys are internal ids; "name" is what's displayed.
   Image paths are relative — put files in an "images" folder next to this
   HTML file. Missing images automatically fall back to a placeholder.
   ============================================================================ */
const SIBLINGS = {
  archana: {
    name: "Archana",
    nickname: "Achu",           
    letter: "Oye ladki, Happy Rakshabandhan. Mere se 15 minute choti ho aur rahogi. So apne bade bhai ki baat mano aur kush raho. Ye he mera gift tumko, so enjoy. 😁😁😁",
    archive: [
      { then: "images/archana-then-1.jpg", now: "images/archana-now-1.jpg", label: "Archana Then/Now" },
      { then: "images/archana-then-2.jpg", now: "images/archana-now-2.jpg", label: "School" },
      { then: "images/archana-then-3.jpg", now: "images/archana-now-2.jpg", label: "Coat Time" },
      { then: "images/archana-then-4.jpg", now: "images/archana-now-4.jpg", label: "Birthday, some year" }
    ],
    embarrassing: [
      "images/archana-embarrassing-1.jpg",
      "images/archana-embarrassing-2.jpg",
      "images/archana-embarrassing-3.jpg",
      "images/archana-embarrassing-4.jpg"
    ],
    arguments: [
      { title: "Who left the water bottles empty in the fridge", 
        mine: " I didn't leave it empty. You always leave it empty.", 
        hers: "It's not me. I always fill it up." },
      { title: "The TV remote incident", mine: "I had it first, you snatched it when I just went away.", hers: "Ye tumhare property nahi, jo tumse le liya ho." },
      { title: "Stealing my clothes", 
        mine: "It's my clothes. Tum hamesha mera kapda le leti ho", 
        hers: "Tumhare liye yeh chota ho gaya tha. Aur tum pehente bhi nahi ho." }
    ],
  },
  aparna: {
    name: "Aparna",
    nickname: "Ammu",
    letter: "Happy Rakshabandhan, badi hokar koi bada kaam nahi kiya, lekin mere behen nikle so ye lo mera gift. 😂😂",
    archive: [
      { then: "images/aparna-then-1.jpg", now: "images/aparna-now-1.jpg", label: "Aparna Then/Now" },
      { then: "images/aparna-then-2.jpg", now: "images/aparna-now-2.jpg", label: "Birthday" },
      { then: "images/aparna-then-3.jpg", now: "images/aparna-now-3.jpg", label: "Saree Time" },
      { then: "images/aparna-then-4.jpg", now: "images/aparna-now-4.jpg", label: "Last Rakhi" }
    ],
    embarrassing: [
      "images/aparna-embarrassing-1.jpg",
      "images/aparna-embarrassing-2.jpg",
      "images/aparna-embarrassing-3.jpg",
      "images/aparna-embarrassing-4.jpg"
    ],
    arguments: [
    { 
        title: "Weaponizing words during normal fights", 
        mine: "I ask her to clean the room, and suddenly I'm 'bossy', being 'toxic', and violating her 'safe space'.", 
        hers: "He comes in with such aggressive tone. Just yelling for no reason. Oru samadhanam illa evide." 
      },
      { 
        title: "Taking my stuff and playing the victim", 
        mine: "I just wanted to see. Tum toh bas ladne ka karan dekhti ho. Chumma choodavathe!", 
        hers: "I bought those with my own money. Tumhe chahiye toh kudh khareed lo." 
      },
      {
        title: "Using the perfume without asking",
        mine: "I used like, one tiny spray. Barely two drops! You're acting like I drank the bottle.",
        hers: "This bottle was gifted to me and it's not meant for you."
      }
    ],
  }
};

/* ============================================================================
   Runtime — you shouldn't need to edit anything below this line.
   ============================================================================ */
(function(){
  let current = null;

  // ---- Build the name gate ----
  const nameButtonsEl = document.getElementById('name-buttons');
  Object.entries(SIBLINGS).forEach(([key, data]) => {
    const btn = document.createElement('button');
    btn.className = 'name-btn';
    btn.textContent = data.name;
    btn.addEventListener('click', () => selectSibling(key));
    nameButtonsEl.appendChild(btn);
  });

  function selectSibling(key){
    current = SIBLINGS[key];
    document.getElementById('hero-name').textContent = current.name;
    document.getElementById('hero-name-2').textContent = current.name;
    buildArchive(current);
    buildDuel(current);
    document.getElementById('letter-body').textContent = current.letter;
    document.getElementById('gate').classList.add('hidden');
    document.body.style.overflow = 'auto';

    // Reveal the easter-egg trigger button now that a sibling is chosen
    const eggTrigger = document.getElementById('egg-trigger');
    eggTrigger.classList.add('show');
    // Briefly draw attention to it so it doesn't go unnoticed
    setTimeout(() => {
      eggTrigger.classList.add('pulse-tip');
      setTimeout(() => eggTrigger.classList.remove('pulse-tip'), 3000);
    }, 600);
  }

  // Lock scroll until a name is chosen
  document.body.style.overflow = 'hidden';

  // ---- Image w/ fallback helper ----
  function imgWithFallback(src, altLabel, extraClass){
    const wrap = document.createElement('div');
    wrap.style.position = 'absolute';
    wrap.style.inset = '0';
    const img = document.createElement('img');
    img.src = src;
    img.alt = altLabel || '';
    if(extraClass) img.className = extraClass;
    img.addEventListener('error', () => {
      img.remove();
      const ph = document.createElement('div');
      ph.className = 'placeholder';
      ph.textContent = altLabel || '✦';
      wrap.appendChild(ph);
    });
    wrap.appendChild(img);
    return wrap;
  }

  // ---- Archives (then/now hover) ----
  function buildArchive(data){
    const grid = document.getElementById('archive-grid');
    grid.innerHTML = '';
    data.archive.forEach(item => {
      const card = document.createElement('div');
      card.className = 'archive-card';
      card.tabIndex = 0;

      const thenImg = document.createElement('img');
      thenImg.className = 'then-img';
      thenImg.src = item.then;
      thenImg.alt = item.label + ' — then';
      thenImg.addEventListener('error', () => {
        thenImg.style.display = 'none';
        const ph = document.createElement('div');
        ph.className = 'placeholder then-img';
        ph.textContent = item.label + ' (then)';
        card.appendChild(ph);
      });

      const nowImg = document.createElement('img');
      nowImg.className = 'now-img';
      nowImg.src = item.now;
      nowImg.alt = item.label + ' — now';
      nowImg.addEventListener('error', () => {
        nowImg.style.display = 'none';
        const ph = document.createElement('div');
        ph.className = 'placeholder now-img';
        ph.textContent = item.label + ' (now)';
        card.appendChild(ph);
      });

      const tag = document.createElement('div');
      tag.className = 'tag';
      tag.textContent = item.label;

      card.appendChild(thenImg);
      card.appendChild(nowImg);
      card.appendChild(tag);
      grid.appendChild(card);
    });
  }

  // ---- Tug of war duels ----
  function buildDuel(data){
    const wrap = document.getElementById('duel-container');
    wrap.innerHTML = '';
    data.arguments.forEach((arg, i) => {
      const story = document.createElement('div');
      story.className = 'duel-story reveal';

      const h3 = document.createElement('h3');
      h3.textContent = arg.title;
      story.appendChild(h3);

      const sliderWrap = document.createElement('div');
      sliderWrap.className = 'duel-slider-wrap';

      const mine = document.createElement('div');
      mine.className = 'duel-side mine';
      mine.textContent = arg.mine;

      const hers = document.createElement('div');
      hers.className = 'duel-side hers';
      hers.textContent = arg.hers;

      const leftLabel = document.createElement('div');
      leftLabel.className = 'duel-label left-label';
      leftLabel.textContent = 'His version';

      const rightLabel = document.createElement('div');
      rightLabel.className = 'duel-label right-label';
      rightLabel.textContent = 'Her version';

      const handle = document.createElement('div');
      handle.className = 'duel-handle';

      const range = document.createElement('input');
      range.type = 'range';
      range.className = 'duel-range';
      range.min = 0; range.max = 100; range.value = 50;
      range.setAttribute('aria-label', 'Slide to compare ' + arg.title);

      range.addEventListener('input', () => {
        const v = range.value;
        hers.style.clipPath = `inset(0 0 0 ${v}%)`;
        handle.style.left = v + '%';
      });

      sliderWrap.appendChild(mine);
      sliderWrap.appendChild(hers);
      sliderWrap.appendChild(leftLabel);
      sliderWrap.appendChild(rightLabel);
      sliderWrap.appendChild(handle);
      sliderWrap.appendChild(range);

      story.appendChild(sliderWrap);
      wrap.appendChild(story);
    });
    observeReveals(wrap);
  }

  // ---- Scroll-driven "tying the rakhi" animation ----
  const loopLeft   = document.getElementById('thread-loop-left');
  const loopRight  = document.getElementById('thread-loop-right');
  const tailLeft   = document.getElementById('thread-tail-left');
  const tailRight  = document.getElementById('thread-tail-right');
  const knot       = document.getElementById('thread-knot');
  const knotGem    = document.getElementById('thread-knot-gem');
  const threadLabel = document.getElementById('thread-label');

  // pathLength="100" on every shape above means each one's total length
  // is simply 100 — so dash math is just plain percentages.
  [loopLeft, loopRight, tailLeft, tailRight].forEach(el => {
    el.style.strokeDasharray = '100';
    el.style.strokeDashoffset = '100';
  });

  // Map a value from one range into another, clamped to [0,1] first.
  function stage(pct, start, end){
    if (end <= start) return pct >= end ? 1 : 0;
    return Math.max(0, Math.min(1, (pct - start) / (end - start)));
  }

  function updateThread(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;

    // Stage 1 (0–35%): loop the left side of the thread over.
    const leftAmt  = stage(pct, 0, 35);
    // Stage 2 (30–65%): loop the right side over, crossing the first.
    const rightAmt = stage(pct, 30, 65);
    // Stage 3 (55–85%): let both tails fall loose below the loops.
    const tailAmt  = stage(pct, 55, 85);
    // Stage 4 (78–100%): cinch the knot and set the gem, fully tied.
    const knotAmt  = stage(pct, 78, 100);

    loopLeft.style.strokeDashoffset  = String(100 - leftAmt * 100);
    loopRight.style.strokeDashoffset = String(100 - rightAmt * 100);
    tailLeft.style.strokeDashoffset  = String(100 - tailAmt * 100);
    tailRight.style.strokeDashoffset = String(100 - tailAmt * 100);

    knot.style.opacity = String(knotAmt);
    knot.style.transform = `scale(${0.4 + knotAmt * 0.6})`;
    knotGem.style.opacity = String(knotAmt);
    knotGem.style.transform = `scale(${0.4 + knotAmt * 0.6})`;

    if (threadLabel){
      if (knotAmt >= 1) threadLabel.textContent = 'tied ✦';
      else if (tailAmt > 0) threadLabel.textContent = 'tying the knot…';
      else if (rightAmt > 0) threadLabel.textContent = 'looping it round…';
      else threadLabel.textContent = 'pulling the thread…';
    }
  }
  updateThread();
  window.addEventListener('scroll', updateThread, { passive: true });

  // ---- Reveal on scroll ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.2 });
  function observeReveals(root){
    (root || document).querySelectorAll('.reveal').forEach(el => io.observe(el));
  }
  observeReveals();

  // ---- Accept / finale ----
  document.getElementById('accept-btn').addEventListener('click', () => {
    document.getElementById('letter-wrap').classList.add('open');
    document.getElementById('accept-btn').style.display = 'none';
  });

  document.getElementById('knot-back-btn').addEventListener('click', () => {
    try{
      localStorage.setItem('golden-thread-knot-' + (current ? current.name : 'guest'), new Date().toISOString());
    }catch(e){ /* storage unavailable — not critical */ }
    document.getElementById('knot-back-btn').style.display = 'none';
    document.getElementById('knot-confirmed').style.display = 'block';
  });

  // ---- Hidden nickname easter egg ----
  let typedBuffer = '';
  window.addEventListener('keydown', (e) => {
    if(!current) return;
    if(e.key.length !== 1) return;
    typedBuffer = (typedBuffer + e.key).toLowerCase().slice(-40);
    if(typedBuffer.includes(current.nickname.toLowerCase())){
      openEasterEgg();
      typedBuffer = '';
    }
  });

  function openEasterEgg(){
    const overlay = document.getElementById('egg-overlay');
    const grid = document.getElementById('egg-grid');
    grid.innerHTML = '';
    current.embarrassing.forEach((src, i) => {
      const cell = document.createElement('div');
      cell.className = 'egg-photo';
      cell.style.setProperty('--r', (Math.random() * 16 - 8) + 'deg');
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'embarrassing photo ' + (i+1);
      img.addEventListener('error', () => {
        img.remove();
        cell.textContent = '📸 missing pic';
      });
      cell.appendChild(img);
      grid.appendChild(cell);
    });
    overlay.classList.add('show');
  }
  document.getElementById('egg-close').addEventListener('click', () => {
    document.getElementById('egg-overlay').classList.remove('show');
  });

  document.getElementById('egg-trigger').addEventListener('click', () => {
    if(!current) return;
    openEasterEgg();
  });
})();