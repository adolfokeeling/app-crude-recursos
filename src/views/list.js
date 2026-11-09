import { TIPOS, TEMAS, NIVELES } from '../data/options.js';
import { getAll } from '../services/storage.js';

// Convierte un valor al label correspondiente usando una lista de opciones
function getLabel(lista, value) {
  const item = lista.find((opt) => opt.value === value);
  return item ? item.label : value;
}

// Renderiza la vista de listado de recursos guardados
export function renderList(app) {
  const recursos = getAll();
  const sortedRecursos = [...recursos].sort((a, b) => {
    return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
  });

  app.innerHTML = `
    <div class="container">
      <div class="resources-header">
        <h1>Mis recursos</h1>
        <a href="#/nuevo" class="btn btn-primary">+ Nuevo recurso</a>
      </div>

      ${
        sortedRecursos.length === 0
          ? `
        <div class="card empty-state">
          <p>Aún no tienes recursos</p>
          <a href="#/nuevo" class="btn btn-primary">Agregar el primero</a>
        </div>
      `
          : `
        <div class="resources-grid">
          ${sortedRecursos
            .map((recurso) => {
              let hostname = '';
              try {
                hostname = new URL(recurso.url).hostname;
              } catch {
                hostname = recurso.url || '';
              }

              const tipoLabel = getLabel(TIPOS, recurso.tipo);
              const temaLabel = getLabel(TEMAS, recurso.tema);
              const nivelLabel = getLabel(NIVELES, recurso.nivel);
              const fechaFormateada = recurso.fechaCreacion
                ? new Date(recurso.fechaCreacion).toLocaleDateString('es-SV')
                : '';

              return `
                <div class="card resource-card">
                  <div class="resource-card-header">
                    <span class="badge badge--${recurso.tipo}">${tipoLabel}</span>
                    ${recurso.favorito ? '<span class="resource-star" aria-label="Favorito">★</span>' : ''}
                  </div>

                  <h3 class="resource-title">
                    <a href="${recurso.url}" target="_blank" rel="noopener">${recurso.titulo}</a>
                  </h3>

                  <span class="resource-domain">${hostname}</span>

                  <div class="resource-meta">
                    <span class="resource-meta-tag">${temaLabel}</span>
                    <span class="resource-meta-tag">${nivelLabel}</span>
                  </div>

                  <div class="resource-footer">
                    <span class="resource-date">${fechaFormateada}</span>
                    <a href="#/editar/${recurso.id}" class="btn btn-secondary">Editar</a>
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>
      `
      }
    </div>
  `;
}
