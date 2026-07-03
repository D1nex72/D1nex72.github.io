// Год в футере
document.getElementById("year").textContent = new Date().getFullYear();

// Фолбэк для ещё не добавленных фото:
// пока файла в images/ нет, показываем аккуратный плейсхолдер
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    const box = document.createElement("div");
    box.className = "img-fallback";
    box.textContent = img.alt || "Фото";
    box.style.cssText =
      img.getAttribute("style") || "";
    img.replaceWith(box);
  });
});

// Мобильное меню
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  burger.classList.toggle("is-open");
  nav.classList.toggle("is-open");
});

nav.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("is-open");
    nav.classList.remove("is-open");
  });
});

// Плавная прокрутка по якорям с учётом высоты фиксированной шапки
const header = document.getElementById("header");
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (id === "#" || id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = header ? header.offsetHeight + 12 : 0;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// Плавное появление блоков при скролле
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}

// Анимация счётчиков при появлении
const counters = document.querySelectorAll(".stat__num");
let countersDone = false;

function animateCounters() {
  counters.forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  });
}

const heroStats = document.querySelector(".hero__stats");
if (heroStats) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersDone) {
          countersDone = true;
          animateCounters();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(heroStats);
}

// Обработка формы заявки (демо, без реальной отправки)
const form = document.getElementById("orderForm");
const success = document.getElementById("orderSuccess");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();

  if (!name || !phone) {
    alert("Пожалуйста, укажите имя и телефон.");
    return;
  }

  // Здесь подключается реальная отправка (fetch на бэкенд / почта / CRM)
  form.reset();
  success.hidden = false;
  setTimeout(() => {
    success.hidden = true;
  }, 6000);
});