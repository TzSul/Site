function renderizarGaleria() {
  const grid = document.getElementById("galeria-grid");
  if (!grid) return;

  if (!Array.isArray(fotosGaleria) || fotosGaleria.length === 0) {
    grid.innerHTML = "<p class='helper'>Nenhuma foto cadastrada no momento.</p>";
    return;
  }

  const html = fotosGaleria
    .map(
      (foto) => `
        <figure class="gallery-item reveal">
          <img src="${foto.src}" alt="${foto.titulo}" loading="lazy" />
          <figcaption>${foto.titulo}</figcaption>
        </figure>
      `
    )
    .join("");

  grid.innerHTML = html;
}

function renderizarAvaliacoes() {
  const track = document.getElementById("avaliacoes-track");
  if (!track) return;

  if (!Array.isArray(avaliacoesClientes) || avaliacoesClientes.length === 0) {
    track.innerHTML = "<p class='helper'>Nenhuma avaliacao cadastrada no momento.</p>";
    return;
  }

  const buildCard = (avaliacao) => {
    const estrelas = "★".repeat(Math.max(1, Math.min(5, Number(avaliacao.estrelas) || 5)));
    return `
      <article class="review-card review-card--marquee">
        <div class="stars">${estrelas}</div>
        <p>"${avaliacao.texto}"</p>
        <strong>${avaliacao.nome}</strong>
      </article>
    `;
  };

  const row = avaliacoesClientes.map(buildCard).join("");
  track.innerHTML = row + row;
}

function iniciarAnimacoesDeEntrada() {
  const elementos = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elementos.forEach((elemento) => observer.observe(elemento));
}

function iniciarMenuMobile() {
  const botao = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-nav");
  if (!botao || !menu) return;

  botao.addEventListener("click", () => {
    const aberto = menu.classList.toggle("is-open");
    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      botao.setAttribute("aria-expanded", "false");
    });
  });
}

function iniciarParallaxHero() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    document.body.style.setProperty("--mx", `${(x * 30).toFixed(2)}px`);
    document.body.style.setProperty("--my", `${(y * 30).toFixed(2)}px`);
  });

  hero.addEventListener("mouseleave", () => {
    document.body.style.setProperty("--mx", "0px");
    document.body.style.setProperty("--my", "0px");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarGaleria();
  renderizarAvaliacoes();
  iniciarAnimacoesDeEntrada();
  iniciarMenuMobile();
  iniciarParallaxHero();
});
