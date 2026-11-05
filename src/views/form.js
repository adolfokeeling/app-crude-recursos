import { TIPOS, TEMAS, NIVELES } from '../data/options.js';
import { create } from '../services/storage.js';
import { showToast } from '../components/toast.js';

// Renderiza el formulario de creación de recursos
export function renderForm(app, resource = null) {
  // El segundo parámetro resource queda preparado para futura edición

  app.innerHTML = `
    <div class="container form-container">
      <h1 class="form-title">Nuevo recurso</h1>
      <div class="card">
        <form id="resource-form" novalidate>
          <div class="form-group">
            <label for="titulo" class="form-label">Título</label>
            <input type="text" id="titulo" name="titulo" class="input" placeholder="Título del recurso" />
            <span class="form-error" id="error-titulo"></span>
          </div>

          <div class="form-group">
            <label for="url" class="form-label">URL</label>
            <input type="url" id="url" name="url" class="input" placeholder="https://ejemplo.com" />
            <span class="form-error" id="error-url"></span>
          </div>

          <div class="form-group">
            <label for="tipo" class="form-label">Tipo</label>
            <select id="tipo" name="tipo" class="select">
              <option value="">Selecciona...</option>
              ${TIPOS.map((item) => `<option value="${item.value}">${item.label}</option>`).join('')}
            </select>
            <span class="form-error" id="error-tipo"></span>
          </div>

          <div class="form-group">
            <label for="tema" class="form-label">Tema</label>
            <select id="tema" name="tema" class="select">
              <option value="">Selecciona...</option>
              ${TEMAS.map((item) => `<option value="${item.value}">${item.label}</option>`).join('')}
            </select>
            <span class="form-error" id="error-tema"></span>
          </div>

          <div class="form-group">
            <span class="form-label">Nivel</span>
            <div class="radio-group">
              ${NIVELES.map(
                (item) => `
                <label class="radio-label">
                  <input type="radio" name="nivel" value="${item.value}" ${item.value === 'basico' ? 'checked' : ''} />
                  ${item.label}
                </label>
              `
              ).join('')}
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" name="favorito" value="true" />
              Favorito
            </label>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Guardar</button>
            <a href="#/" class="btn btn-secondary">Cancelar</a>
          </div>
        </form>
      </div>
    </div>
  `;

  const form = app.querySelector('#resource-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Limpiar errores previos
    form.querySelectorAll('.is-error').forEach((el) => {
      el.classList.remove('is-error');
      el.removeAttribute('aria-invalid');
    });
    form.querySelectorAll('.form-error').forEach((el) => {
      el.textContent = '';
    });

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Convertir favorito a booleano
    data.favorito = Boolean(formData.get('favorito'));

    let hasErrors = false;

    const setFieldError = (fieldName, message) => {
      hasErrors = true;
      const field = form.elements[fieldName];
      if (field) {
        field.classList.add('is-error');
        field.setAttribute('aria-invalid', 'true');
      }
      const errorMsg = form.querySelector(`#error-${fieldName}`);
      if (errorMsg) {
        errorMsg.textContent = message;
      }
    };

    // Validar título (obligatorio, mínimo 3 caracteres)
    const titulo = typeof data.titulo === 'string' ? data.titulo.trim() : '';
    if (!titulo || titulo.length < 3) {
      setFieldError('titulo', 'El título es obligatorio y debe tener al menos 3 caracteres.');
    } else {
      data.titulo = titulo;
    }

    // Validar URL (obligatoria y formato válido)
    const rawUrl = typeof data.url === 'string' ? data.url.trim() : '';
    if (!rawUrl) {
      setFieldError('url', 'La URL es obligatoria.');
    } else {
      try {
        new URL(rawUrl);
        data.url = rawUrl;
      } catch {
        setFieldError('url', 'Debes ingresar una URL válida (ej. https://ejemplo.com).');
      }
    }

    // Validar tipo obligatorio
    if (!data.tipo) {
      setFieldError('tipo', 'Debes seleccionar un tipo.');
    }

    // Validar tema obligatorio
    if (!data.tema) {
      setFieldError('tema', 'Debes seleccionar un tema.');
    }

    if (hasErrors) {
      return;
    }

    create(data);
    showToast('Recurso guardado');
    form.reset();
    window.location.hash = '#/';
  });
}
