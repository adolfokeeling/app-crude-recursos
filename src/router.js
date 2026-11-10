import { renderHome } from './views/home.js';
import { renderForm } from './views/form.js';
import { renderList } from './views/list.js';
import { setActiveLink } from './components/navbar.js';
import { getById } from './services/storage.js';
import { showToast } from './components/toast.js';

export const routes = {
  '#/': renderHome,
  '#/recursos': renderList,
  '#/nuevo': renderForm,
};

export function initRouter(app) {
  function handleRoute() {
    const hash = window.location.hash;

    const editMatch = hash.match(/^#\/editar\/(.+)$/);
    if (editMatch) {
      const resource = getById(editMatch[1]);
      if (resource) {
        renderForm(app, resource);
        setActiveLink('#/recursos');
      } else {
        showToast('Recurso no encontrado', 'error');
        window.location.hash = '#/recursos';
      }
      return;
    }

    const activeRoute = routes[hash] ? hash : '#/';
    const renderView = routes[activeRoute];

    renderView(app);
    setActiveLink(activeRoute);
  }

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('load', handleRoute);

  handleRoute();
}
