import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'devshelf:recursos';

// Obtiene la lista completa de recursos desde localStorage
export function getAll() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Crea y almacena un nuevo recurso asignándole un id y fecha de creación
export function create(data) {
  const items = getAll();
  const newResource = {
    ...data,
    id: uuidv4(),
    fechaCreacion: new Date().toISOString()
  };
  items.push(newResource);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return newResource;
}

// Calcula estadísticas sobre el total, favoritos y temas únicos
export function getStats() {
  const items = getAll();
  const total = items.length;
  const favoritos = items.filter((item) => Boolean(item.favorito)).length;
  const temas = new Set(items.map((item) => item.tema).filter(Boolean)).size;

  return { total, favoritos, temas };
}
