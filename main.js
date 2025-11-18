// This file contains the main JavaScript functionality for the website, including event listeners for the menu and countdown timer initialization.

document.addEventListener('DOMContentLoaded', function() {
    
    // Add event listener for menu link
    const menuLink = document.getElementById('menu-link');
    if (menuLink) {
        menuLink.addEventListener('click', function() {
            window.open('../public/menu.pdf', '_blank');
        });
    }
});

(function(){
  const el = document.getElementById('countdown');

  function getNextThursdayTargetUTC(){
    const now = new Date();
    // Bahrain = UTC+3 → 11:25 BHR = 08:25 UTC
    const targetHourUTC = 8;
    const targetMin = 25;

    const nowUTCyear = now.getUTCFullYear();
    const nowUTCmonth = now.getUTCMonth();
    const nowUTCdate = now.getUTCDate();
    const nowUTCDay = now.getUTCDay(); // 0=Sun ... 4=Thu

    let daysUntil = (4 - nowUTCDay + 7) % 7;
    const candidate = new Date(Date.UTC(nowUTCyear, nowUTCmonth, nowUTCdate + daysUntil, targetHourUTC, targetMin, 0));

    if (candidate.getTime() <= Date.now()){
      candidate.setUTCDate(candidate.getUTCDate() + 7);
    }
    return candidate;
  }

  function formatRemaining(ms){
    if(ms <= 0) return '00:00:00';
    const totalSeconds = Math.floor(ms/1000);
    const days = Math.floor(totalSeconds/86400);
    const hours = Math.floor((totalSeconds % 86400)/3600);
    const minutes = Math.floor((totalSeconds % 3600)/60);
    const seconds = totalSeconds % 60;
    const parts = [];
    if(days) parts.push(days + (days===1 ? ' day' : ' days'));
    parts.push(String(hours).padStart(2,'0') + ':' + String(minutes).padStart(2,'0') + ':' + String(seconds).padStart(2,'0'));
    return parts.join(' ');
  }

  let target = getNextThursdayTargetUTC();

  function update(){
    const now = new Date();
    const remaining = target.getTime() - now.getTime();

    let targetStr;
    try{
      targetStr = new Intl.DateTimeFormat('en-GB',{
        timeZone: 'Asia/Bahrain',
        weekday:'long', day:'numeric', month:'short',
        hour:'numeric', minute:'2-digit', hour12:true
      }).format(target);
    }catch(e){
      targetStr = 'Thursday 11:25 AM (Bahrain)';
    }

    if(el) el.textContent = `${targetStr} — ${formatRemaining(remaining)}`;

    if(remaining <= 0){
      target = getNextThursdayTargetUTC();
    }
  }

  update();
  setInterval(update,1000);
})();

document.addEventListener('DOMContentLoaded', function(){ /* no-op */ });



// Additional JavaScript functionality can be added here in the future.
// ...existing code...
// Background YouTube audio player (video: E6L70340Hvw)
(function(){
  const VIDEO_ID = 'E6L70340Hvw';
  const toggle = document.getElementById('audio-toggle');
  let player;

  // load YouTube IFrame API
  function loadYouTubeAPI(cb){
    if(window.YT && window.YT.Player){ cb(); return; }
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = cb;
  }

  function createPlayer(){
    player = new YT.Player('yt-player', {
      height: '1',
      width: '1',
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 1,
        controls: 0,
        loop: 1,
        playlist: VIDEO_ID,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3
      },
      events: {
        onReady: (e) => {
          // start muted (more likely to autoplay)
          try { e.target.mute(); e.target.playVideo(); } catch(e){}
          // update toggle aria
          if(toggle) toggle.setAttribute('aria-pressed', 'false');
        }
      }
    });
  }

  function toggleAudio(){
    if(!player) return;
    const isMuted = player.isMuted();
    if(isMuted){
      player.unMute();
      toggle.textContent = '🔊';
      toggle.setAttribute('aria-pressed','true');
    }else{
      player.mute();
      toggle.textContent = '🔈';
      toggle.setAttribute('aria-pressed','false');
    }
  }

  // init
  if(toggle){
    toggle.addEventListener('click', function(){
      // ensure player exists (user interaction will allow unmuted playback)
      if(!player){
        loadYouTubeAPI(createPlayer);
        // slight delay to allow API ready -> player created, then unmute
        setTimeout(()=>{ if(player){ player.unMute(); toggle.textContent='🔊'; toggle.setAttribute('aria-pressed','true'); } }, 600);
      }else{
        toggleAudio();
      }
    });
  }

  // try to load API and create muted autoplay player on page load
  loadYouTubeAPI(createPlayer);
})();


// ...existing code...
// Background YouTube audio player (video: E6L70340Hvw)
(function(){
  const VIDEO_ID = 'E6L70340Hvw';
  const toggle = document.getElementById('audio-toggle');
  let player;

  // load YouTube IFrame API
  function loadYouTubeAPI(cb){
    if(window.YT && window.YT.Player){ cb(); return; }
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = cb;
  }

  function createPlayer(){
    player = new YT.Player('yt-player', {
      height: '1',
      width: '1',
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 1,
        controls: 0,
        loop: 1,
        playlist: VIDEO_ID,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3
      },
      events: {
        onReady: (e) => {
          // start muted (more likely to autoplay)
          try { e.target.mute(); e.target.playVideo(); } catch(e){}
          // update toggle aria
          if(toggle) toggle.setAttribute('aria-pressed', 'false');
        }
      }
    });
  }

  function toggleAudio(){
    if(!player) return;
    const isMuted = player.isMuted();
    if(isMuted){
      player.unMute();
      toggle.textContent = '🔊';
      toggle.setAttribute('aria-pressed','true');
    }else{
      player.mute();
      toggle.textContent = '🔈';
      toggle.setAttribute('aria-pressed','false');
    }
  }

  // init
  if(toggle){
    toggle.addEventListener('click', function(){
      // ensure player exists (user interaction will allow unmuted playback)
      if(!player){
        loadYouTubeAPI(createPlayer);
        // slight delay to allow API ready -> player created, then unmute
        setTimeout(()=>{ if(player){ player.unMute(); toggle.textContent='🔊'; toggle.setAttribute('aria-pressed','true'); } }, 600);
      }else{
        toggleAudio();
      }
    });
  }

  // try to load API and create muted autoplay player on page load
  loadYouTubeAPI(createPlayer);
})();

// ...existing code...
(function(){
  const VIDEO_ID = 'E6L70340Hvw';
  const toggle = document.getElementById('audio-toggle');
  let player = null;
  let playerReady = false;
  let pendingUnmute = false;

  function loadYouTubeAPI(cb){
    if(window.YT && window.YT.Player){ cb(); return; }
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = cb;
  }

  function createPlayer(){
    if(player) return;
    player = new YT.Player('yt-player', {
      height: '1',
      width: '1',
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 1,
        controls: 0,
        loop: 1,
        playlist: VIDEO_ID,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3
      },
      events: {
        onReady: (e) => {
          playerReady = true;
          try { e.target.mute(); e.target.playVideo(); } catch(e){}
          updateToggleUI();
          if (pendingUnmute) {
            // user clicked before player ready -> unmute now
            try { player.unMute(); player.playVideo(); } catch(e){}
            pendingUnmute = false;
            updateToggleUI();
          }
        }
      }
    });
  }

  function updateToggleUI(){
    if(!toggle) return;
    const muted = player && typeof player.isMuted === 'function' ? player.isMuted() : true;
    toggle.textContent = muted ? '🔈' : '🔊';
    toggle.setAttribute('aria-pressed', String(!muted));
  }

  function handleToggleClick(){
    // Clicking is a user gesture — use it to create/unmute player.
    if(!player){
      pendingUnmute = true;
      loadYouTubeAPI(createPlayer);
      return;
    }
    if(!playerReady){
      // player exists but not ready yet — remember intent
      pendingUnmute = true;
      return;
    }
    try{
      if(player.isMuted()){
        player.unMute();
        player.playVideo();
      } else {
        player.mute();
      }
    }catch(e){}
    updateToggleUI();
  }

  if(toggle) toggle.addEventListener('click', handleToggleClick);

  // try to initialize muted autoplay player on load (keeps autoplay behavior)
  loadYouTubeAPI(createPlayer);
})();

// ...existing code...

document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  if (!body.classList.contains('fade-in')) body.classList.add('fade-in');

  // remove fade-in class after all animations complete (last stagger ~520ms + 700ms = 1220ms)
  // use a slightly larger timeout to be safe
  setTimeout(() => {
    body.classList.remove('fade-in');
  }, 1500);
});


// ...existing code...

