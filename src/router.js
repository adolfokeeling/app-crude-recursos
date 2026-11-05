import { renderHome } from './views/home.js';
import { renderForm } from './views/form.js';
import { renderList } from './views/list.js';
import { setActiveLink } from './components/navbar.js';

export const routes = {
  '#/': renderHome,
  '#/recursos': renderList,
  '#/nuevo': renderForm,
};

export function initRouter(app) {
  function handleRoute() {
    const hash = window.location.hash;
    const activeRoute = routes[hash] ? hash : '#/';
    const renderView = routes[activeRoute];

    renderView(app);
    setActiveLink(activeRoute);
  }

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('load', handleRoute);

  handleRoute();
}
