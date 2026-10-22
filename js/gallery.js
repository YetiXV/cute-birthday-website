/* ================================================================
   INTERACTIVE PHOTO SLIDESHOW — gallery.html only
   -----------------------------------------------------------
   EDIT DI SINI: ganti "src" dan "caption" tiap foto di array
   `photos` di bawah ini.
================================================================= */

const photos = [
  {
    src: "photos/photo1.jpg",
    caption: "Gracias por llegar a mi vida, mi amor. Cada momento contigo se ha convertido en un recuerdo que guardo con muchísimo cariño."
  },
  {
    src: "photos/photo2.jpg",
    caption: "No importa dónde estemos ni lo que hagamos. Estar contigo siempre consigue hacerme feliz, mi Moi hermosa."
  },
  {
    src: "photos/photo3.jpg",
    caption: "Quiero seguir llenando nuestra historia de besitos, abrazos, risas y muchísimos momentos que recordaremos toda la vida."
  },
  {
    src: "photos/photo4.jpg",
    caption: "Ojalá estas fotografías sean solamente el comienzo de todos los recuerdos bonitos que todavía nos faltan por crear. Te amo con toda mi alma. ❤️"
  }
];


const photoEl    = document.getElementById('currentPhoto');
const captionEl  = document.getElementById('currentCaption');
const counterEl  = document.getElementById('counter');
const polaroidEl = document.getElementById('polaroid');
const dotsWrap   = document.getElementById('dots');
const prevBtn    = document.getElementById('prevBtn');
const nextBtn    = document.getElementById('nextBtn');
const photoStage = document.getElementById('photoStage');

let currentIndex = 0;
let isAnimating  = false;

const tilts = ['-3deg', '2deg', '-1.5deg', '3deg'];

function renderSlide(newIndex){
  if (isAnimating || newIndex === currentIndex) return;
  isAnimating = true;

  photoEl.classList.add('is-transitioning');
  captionEl.classList.add('is-transitioning');

  setTimeout(() => {
    currentIndex = newIndex;
    const data = photos[currentIndex];

    photoEl.src = data.src;
    photoEl.alt = "memory " + (currentIndex + 1);
    captionEl.textContent = data.caption;
    counterEl.textContent = `photo ${currentIndex + 1} of ${photos.length}`;
    polaroidEl.style.setProperty('--tilt', tilts[currentIndex % tilts.length]);

    dotsWrap.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    requestAnimationFrame(() => {
      photoEl.classList.remove('is-transitioning');
      captionEl.classList.remove('is-transitioning');
      isAnimating = false;
    });
  }, 400);
}

function goNext(){
  renderSlide((currentIndex + 1) % photos.length);
}

function goPrev(){
  renderSlide((currentIndex - 1 + photos.length) % photos.length);
}

nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrev);

dotsWrap.querySelectorAll('.dot').forEach((dot) => {
  dot.addEventListener('click', () => {
    renderSlide(parseInt(dot.dataset.index, 10));
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') goNext();
  if (e.key === 'ArrowLeft')  goPrev();
});

let touchStartX = 0;
photoStage.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

photoStage.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].screenX;
  const delta = touchEndX - touchStartX;
  if (Math.abs(delta) > 40){
    if (delta < 0) goNext();
    else goPrev();
  }
}, { passive: true });

polaroidEl.addEventListener('click', (e) => {
  const rect = polaroidEl.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const heart = document.createElement('span');
  heart.className = 'mini-heart';
  heart.textContent = ['💖','💕','✨','🩷'][Math.floor(Math.random() * 4)];
  heart.style.left = x + 'px';
  heart.style.top  = y + 'px';
  polaroidEl.appendChild(heart);

  setTimeout(() => heart.remove(), 1000);
});

polaroidEl.style.setProperty('--tilt', tilts[0]);
