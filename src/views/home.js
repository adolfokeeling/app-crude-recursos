import { getStats } from '../services/storage.js';

// Renderiza la vista de bienvenida con hero, estadísticas y funcionalidades
export function renderHome(app) {
  const stats = getStats();

  app.innerHTML = `
    <div class="container">
      <section class="hero">
        <h1>Tu biblioteca de recursos para aprender a programar</h1>
        <p class="hero-subtitle">Guarda, organiza y accede a tus recursos favoritos en un solo lugar.</p>
        <a href="#/nuevo" class="btn btn-primary">Empezar</a>
      </section>

      <section class="cards-grid">
        <div class="card stat-card">
          <span class="stat-number">${stats.total}</span>
          <span class="stat-label">Recursos guardados</span>
        </div>
        <div class="card stat-card">
          <span class="stat-number">${stats.favoritos}</span>
          <span class="stat-label">Favoritos</span>
        </div>
        <div class="card stat-card">
          <span class="stat-number">${stats.temas}</span>
          <span class="stat-label">Temas</span>
        </div>
      </section>

      <section class="cards-grid">
        <div class="card feature-card">
          <h3>Guardar</h3>
          <p>Almacena enlaces a videos, artículos, cursos y documentación útil.</p>
        </div>
        <div class="card feature-card">
          <h3>Organizar</h3>
          <p>Categoriza tus recursos por tipo, tema tecnológico y nivel de dificultad.</p>
        </div>
        <div class="card feature-card">
          <h3>Encontrar</h3>
          <p>Accede rápidamente a tus materiales de estudio y ten a mano tus favoritos.</p>
        </div>
      </section>
    </div>
  `;
}
