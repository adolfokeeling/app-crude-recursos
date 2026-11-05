import { TIPOS, TEMAS, NIVELES } from '../data/options.js';
import { getAll } from '../services/storage.js';

// Obtiene la etiqueta correspondiente a un valor en una lista de opciones
function getLabel(lista, value) {
  const item = lista.find((opt) => opt.value === value);
  return item ? item.label : value;
}

// Renderiza la vista del listado de recursos guardados
export function renderList(app) {
  const recursos = getAll();
  const sorted = [...recursos].sort(
    (a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
  );

  const content =
    sorted.length === 0
      ? `
      <div class="card empty-state">
        <p>Aún no tienes recursos</p>
        <a href="#/nuevo" class="btn btn-primary">Agregar el primero</a>
      </div>
    `
      : `
      <div class="resources-grid">
        ${sorted
          .map((recurso) => {
            let domain = '';
            try {
              domain = new URL(recurso.url).hostname;
            } catch {
              domain = recurso.url;
            }

            const tipoLabel = getLabel(TIPOS, recurso.tipo);
            const temaLabel = getLabel(TEMAS, recurso.tema);
            const nivelLabel = getLabel(NIVELES, recurso.nivel);
            const fechaFormateada = recurso.fechaCreacion
              ? new Date(recurso.fechaCreacion).toLocaleDateString('es-SV')
              : '';

            return `
            <div class="card resource-card">
              <div class="resource-card__header">
                <span class="badge badge--${recurso.tipo}">${tipoLabel}</span>
                ${recurso.favorito ? '<span class="resource-card__favorite" aria-label="Favorito">★</span>' : ''}
              </div>
              <a href="${recurso.url}" target="_blank" rel="noopener" class="resource-card__title">
                ${recurso.titulo}
              </a>
              <span class="resource-card__domain">${domain}</span>
              <div class="resource-card__meta">
                <span>${temaLabel}</span>
                <span>•</span>
                <span>${nivelLabel}</span>
              </div>
              <div class="resource-card__footer">
                <span class="resource-card__date">${fechaFormateada}</span>
                <a href="#/editar/${recurso.id}" class="btn btn-secondary">Editar</a>
              </div>
            </div>
          `;
          })
          .join('')}
      </div>
    `;

  app.innerHTML = `
    <div class="container list-container">
      <div class="resources-header">
        <h1>Mis recursos</h1>
        <a href="#/nuevo" class="btn btn-primary">+ Nuevo recurso</a>
      </div>
      ${content}
    </div>
  `;
}
