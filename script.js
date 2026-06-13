// ── ENVELOPE SCREEN ANIMATIONS (run immediately) ──

function createCoverFlower() {
  const env = document.getElementById("envelope-screen");
  if (!env || env.style.display === "none") return;
  const el = document.createElement("div");
  el.classList.add("cover-flower");
  el.innerHTML = ["🌸","🌹","🌺","🌷"][Math.floor(Math.random()*4)];
  el.style.left              = Math.random()*100 + "vw";
  el.style.fontSize          = (18+Math.random()*28) + "px";
  el.style.animationDuration = (5+Math.random()*5) + "s";
  env.appendChild(el);
  setTimeout(() => el.remove(), 11000);
}
setInterval(createCoverFlower, 350);

function createCoverHeart() {
  const env = document.getElementById("envelope-screen");
  if (!env || env.style.display === "none") return;
  const el = document.createElement("div");
  el.classList.add("cover-heart");
  el.innerHTML = ["❤️","💕","💖","🩷"][Math.floor(Math.random()*4)];
  el.style.left     = Math.random()*100 + "vw";
  el.style.fontSize = (14+Math.random()*22) + "px";
  env.appendChild(el);
  setTimeout(() => el.remove(), 7000);
}
setInterval(createCoverHeart, 500);

function createSparkle() {
  const container = document.getElementById("sparkleContainer");
  if (!container) return;
  const el = document.createElement("div");
  el.classList.add("sparkle");
  el.innerHTML = ["✨","⭐","💫","🌟"][Math.floor(Math.random()*4)];
  el.style.left              = Math.random()*100 + "vw";
  el.style.top               = Math.random()*100 + "vh";
  el.style.animationDuration = (3+Math.random()*3) + "s";
  el.style.animationDelay    = Math.random()*2 + "s";
  container.appendChild(el);
  setTimeout(() => el.remove(), 6000);
}
setInterval(createSparkle, 400);

// ── ENVELOPE OPEN BUTTON ──
const music      = document.getElementById("bgMusic");
const openBtn    = document.getElementById("openLetter");
const envScreen  = document.getElementById("envelope-screen");
const mainContent = document.getElementById("mainContent");

openBtn.addEventListener("click", () => {
  // fade in music
  music.volume = 0;
  music.play().catch(() => {});
  const vol = setInterval(() => {
    if (music.volume < 0.95) music.volume = Math.min(music.volume + 0.05, 1);
    else clearInterval(vol);
  }, 150);

  // fade out envelope
  envScreen.style.transition = "opacity 1.5s ease";
  envScreen.style.opacity    = "0";

  setTimeout(() => {
    envScreen.style.display    = "none";
    mainContent.style.display  = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });

    // ── init everything that needs mainContent visible ──
    initMain();
  }, 1500);
});

// ── EVERYTHING INSIDE MAIN CONTENT ──
function initMain() {

  // MUSIC BUTTON
  const musicBtn = document.getElementById("musicBtn");
  musicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      musicBtn.innerHTML = '<span class="music-icon">⏸</span><span class="music-label">pause</span>';
    } else {
      music.pause();
      musicBtn.innerHTML = '<span class="music-icon">🎵</span><span class="music-label">lagu lovey dovey</span>';
    }
  });

  // COUNTDOWN
  const startDate = new Date("2023-07-01");
  function updateCounter() {
    const diff    = Date.now() - startDate;
    const days    = Math.floor(diff / 86400000);
    const years   = (days / 365).toFixed(1);
    const hours   = Math.floor(diff / 3600000);
    const minutes = Math.floor(diff / 60000);
    document.getElementById("years").innerText   = years;
    document.getElementById("days").innerText    = days;
    document.getElementById("hours").innerText   = hours;
    document.getElementById("minutes").innerText = minutes;
  }
  setInterval(updateCounter, 1000);
  updateCounter();

  // TYPEWRITER
  const letterText = `My Dearest Hanan Syatirah,

Happy 3rd Anniversary, sayang. 🌹

Thank you for loving me through my best and worst moments.

I know I am not perfect, and I am truly sorry for every time I hurt you.

You are my comfort, my happiness, and my favorite person.

I love you today, tomorrow, and forever.

Love,
Danial ❤️`;

  let charIndex = 0;
  const typeEl  = document.getElementById("typewriter");
  function typeWriter() {
    if (charIndex < letterText.length) {
      const ch = letterText.charAt(charIndex);
      typeEl.innerHTML += ch === "\n" ? "<br>" : ch;
      charIndex++;
      setTimeout(typeWriter, 45);
    }
  }
  typeWriter();

  // FLOATING HEARTS
  function createHeart() {
    const el = document.createElement("div");
    el.classList.add("heart");
    el.innerHTML = ["❤️","💕","💖","💗","🩷"][Math.floor(Math.random()*5)];
    el.style.left              = Math.random()*100 + "vw";
    el.style.bottom            = "0";
    el.style.fontSize          = (Math.random()*22+14) + "px";
    el.style.animationDuration = (5+Math.random()*3) + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 8000);
  }
  setInterval(createHeart, 600);

  // FLOATING FLOWERS
  function createFlower() {
    const el = document.createElement("div");
    el.classList.add("flower");
    el.innerHTML = ["🌸","🌹","🌺","🌷"][Math.floor(Math.random()*4)];
    el.style.left              = Math.random()*100 + "vw";
    el.style.animationDuration = (8+Math.random()*5) + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 13000);
  }
  setInterval(createFlower, 800);

  // LOVE BUTTON
  const loveMessages = [
    "I Love You ❤️",
    "I Love You More 💕",
    "Infinity Love 💖",
    "You Are My Everything 🌹",
    "Forever & Always Us 💗"
  ];
  let clickCount = 0;
  document.getElementById("loveBtn").addEventListener("click", () => {
    document.getElementById("loveMessage").innerText = loveMessages[clickCount % loveMessages.length];
    clickCount++;
    for (let i = 0; i < 25; i++) setTimeout(createHeart, i * 60);
  });

  // SLIDER
  const slides   = document.querySelectorAll(".slide");
  const dotsWrap = document.getElementById("sliderDots");
  let current    = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add("slider-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove("active");
    dotsWrap.children[current].classList.remove("active");
    current = index;
    slides[current].classList.add("active");
    dotsWrap.children[current].classList.add("active");
  }
  setInterval(() => goTo((current + 1) % slides.length), 12000);

  // SECRET POPUP
  document.getElementById("secretFlower").addEventListener("click", () => {
    document.getElementById("secretPopup").style.display = "flex";
  });
  document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("secretPopup").style.display = "none";
  });
  document.getElementById("secretPopup").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) e.currentTarget.style.display = "none";
  });
}