export function renderNavbar(container) {
  container.innerHTML = `
    <nav class="navbar">
      <a href="#/" class="navbar-brand">DevShelf</a>
      <div class="navbar-links">
        <a href="#/" class="nav-link">Inicio</a>
        <a href="#/recursos" class="nav-link">Mis recursos</a>
        <a href="#/nuevo" class="nav-link">Nuevo recurso</a>
      </div>
    </nav>
  `;
}

export function setActiveLink(hash) {
  const currentHash = (!hash || hash === '#') ? '#/' : hash;
  const links = document.querySelectorAll('.navbar a');

  links.forEach((link) => {
    if (link.classList.contains('navbar-brand')) {
      return;
    }
    const isActive = link.getAttribute('href') === currentHash;
    link.classList.toggle('active', isActive);
  });
}
