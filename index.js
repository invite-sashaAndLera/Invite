document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll('.fade-in');

  const options = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // Убираем наблюдение после появления
      }
    });
  }, options);

  fadeElements.forEach(el => {
    observer.observe(el);
  });
});

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentSlide = 0;

function goToSlide(index) {
  currentSlide = index;
  slider.style.transform = `translateX(-${index * 100}%)`;
}

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  goToSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
});

const updateCountdown = () => {
  const endDate = new Date("2025-10-04T00:01:00");
  const now = new Date();
  const diff = endDate - now;

  if (diff <= 0) {
    document.querySelector(".countdown-wrapper").innerHTML = "🎉 Торжество началось!";
    return;
  }

  const pad = (n) => String(n).padStart(2, '0');

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
};

updateCountdown();
setInterval(updateCountdown, 1000);

function openMap() {
  const url = 'https://yandex.ru/maps/?text=Гостиница%20Версаль%20Краснодар%20ул.%20Крупской%208%2F5';
  window.open(url, '_blank');
}

// function openEnvelope() {
//   const flap = document.querySelector('.flap');
//   const envelope = document.getElementById('envelope');
//   const invitation = document.getElementById('invitation');
//   const wrapper = document.querySelector('.wrapper');

//   // Анимация крышки
//   flap.style.transform = 'rotateX(-180deg)';

//   // Через 1.2 сек – скрываем конверт, показываем письмо
//   setTimeout(() => {
//     envelope.style.display = 'none';
//     invitation.classList.remove('hidden');

//     // Через 6 сек – скрываем письмо, показываем основной контент
//     setTimeout(() => {
//       invitation.style.display = 'none';
//       wrapper.style.display = 'block';
//     }, 4000);

//   }, 1200);
// }
function openEnvelope() {
  const letter = document.getElementById('letter');
  const button = document.querySelector('.open-btn');
  const envelope = document.getElementById('envelope');
  const invitation = document.getElementById('invitation');
  const wrapper = document.querySelector('.wrapper');

  // Скрыть кнопку
  gsap.to(button, {
    duration: 0.5,
    opacity: 0,
    y: -20,
    onComplete: () => button.style.display = 'none'
  });

  // Показать и выдвинуть письмо (флап теперь – письмо)
  gsap.to(letter, {
    delay: 0.3,
    opacity: 1,
    y: -100,
    duration: 1,
    ease: "power2.out"
  });

  // Показ финального письма через 1.5 сек
  setTimeout(() => {
    gsap.to(envelope, {
      duration: 0.6,
      scale: 0.8,
      opacity: 0,
      onComplete: () => {
        envelope.style.display = 'none';

        invitation.classList.remove('hidden');
        gsap.fromTo(invitation, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });

        // Салют
        gsap.fromTo('.firework', { scale: 0, opacity: 0 }, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)"
        });

        // Скроем через 4 сек
        setTimeout(() => {
          gsap.to(invitation, {
            duration: 0.6,
            opacity: 0,
            onComplete: () => {
              invitation.style.display = 'none';
              wrapper.style.display = 'flex';
              gsap.fromTo(wrapper, { opacity: 0 }, { opacity: 1, duration: 1 });
            }
          });
        }, 2500);
      }
    });
  }, 1500);
}

  window.addEventListener('scroll', () => {
    const airplane = document.querySelector('.airplane');
    const wrapper = document.querySelector('.wrapper-airplane');
    const rect = wrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Если блок ещё не попал в зону видимости — не двигаем самолёт
    if (rect.top >= windowHeight || rect.bottom <= 0) return;

    // Высота зоны, в которой анимация будет происходить
    const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
    const wrapperHeight = rect.height;

    // Насколько элемент виден от 0 до 1
    const visibleProgress = Math.min(1, Math.max(0, 1 - (rect.top / windowHeight)));

    const wrapperWidth = wrapper.offsetWidth;
    const airplaneWidth = airplane.offsetWidth;
    const maxTranslateX = wrapperWidth - airplaneWidth;

    const translateX = visibleProgress * maxTranslateX;

    airplane.style.transform = `translateX(${translateX}px)`;
  });