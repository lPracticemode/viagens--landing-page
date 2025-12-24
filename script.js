// DOM - Botão voltar ao topo
const backToTopButton = document.getElementById("backToTop");

// Altura da navbar fixa
const navbarHeight = 70;

// Mostrar e esconder botão voltar ao topo
window.addEventListener("scroll", () => {
  backToTopButton.classList.toggle("visible", window.scrollY > 300);
  setActiveMenuLink();
});

// Rolagem suave e com animação até a seção
function smoothScroll(target, duration = 600) {
  const targetPosition = target.getBoundingClientRect().top - navbarHeight;
  const startPosition = window.scrollY;
  const distance = targetPosition;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    smoothScroll(target);

    const subjectSelect = document.querySelector("select[name='subject']");
    if (link.classList.contains("btn-dark")) {
      subjectSelect.value = "";
    } else {
      subjectSelect.value = "Reservas";
    }
  });
});

// Voltar ao topo
backToTopButton.addEventListener("click", (e) => {
  e.preventDefault();
  smoothScroll(document.body);
});

// Entre em Contato
const contactForm = document.querySelector("form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = contactForm.querySelector("input[name='name']").value;
    const email = contactForm.querySelector("input[name='email']").value;
    const subject = contactForm.querySelector("select[name='subject']").value;
    const message = contactForm.querySelector("textarea[name='message']").value;
    alert(
      `Obrigado, ${name}! Sua mensagem foi enviada com sucesso.\n\nAssunto: ${subject}\nMensagem: ${message}`
    );
    contactForm.reset();
  });
}

// Manter o link do menu ativo
const sections = document.querySelectorAll("section[id]");
const menuLinks = document.querySelectorAll("nav ul a");

function setActiveMenuLink() {
  const scrollPosition = window.scrollY + navbarHeight + 5;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    const id = section.getAttribute("id");
    const menuLink = document.querySelector(`nav ul a[href="#${id}"]`);

    if (scrollPosition >= top && scrollPosition < bottom) {
      menuLinks.forEach((link) => link.classList.remove("active"));
      if (menuLink) menuLink.classList.add("active");
    }
  });
}

// Inicializa o link ativo ao carregar a página
setActiveMenuLink();
