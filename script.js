
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  // Smooth internal navigation.
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:"smooth", block:"start"});
      }
    });
  });

  // Front-end contact form: opens the visitor's email client with a complete message.
  const form = document.querySelector("#contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get("name") || "";
      const email = data.get("email") || "";
      const company = data.get("company") || "";
      const service = data.get("service") || "";
      const message = data.get("message") || "";

      const subject = encodeURIComponent(`Confidential Conversation Request — ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCompany / Portfolio: ${company}\nArea of Interest: ${service}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:monique@moniqueowens.co?subject=${subject}&body=${body}`;

      const notice = document.querySelector(".notice");
      if (notice) {
        notice.classList.add("show");
        notice.textContent = "Your email application should open with your message prepared. If it does not, email monique@moniqueowens.co directly.";
      }
    });
  }
});
