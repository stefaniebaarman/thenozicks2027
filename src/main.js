const WEDDING_DATE = new Date("2027-09-25T16:00:00-04:00");

function updateCountdown() {
  const el = document.querySelector("[data-countdown]");
  if (!el) return;

  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    el.textContent = "Today’s the day. We can’t wait to celebrate with you.";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  el.textContent = `${days.toLocaleString()} day${days === 1 ? "" : "s"} to go`;
}

function setupHeader() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!header || !toggle || !nav) return;

  const onScroll = () => {
    header.classList.toggle("is-solid", window.scrollY > 40);
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

updateCountdown();
setupHeader();
setupReveal();
setInterval(updateCountdown, 60_000);
