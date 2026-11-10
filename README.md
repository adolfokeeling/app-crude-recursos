# DevShelf

DevShelf es una biblioteca personal para guardar y organizar recursos de aprendizaje de programación.
Permite clasificar y gestionar videos, artículos, documentación, cursos y herramientas de forma sencilla.

## Funcionalidades

- Página de bienvenida con estadísticas (total de recursos, favoritos y temas).
- Registro de recursos con validación de formulario.
- Listado de recursos en tarjetas con badges por tipo.
- Edición de recursos.
- Persistencia en localStorage.

## Tecnologías

- **Vite** (^8.3.5)
- **JavaScript vanilla** (módulos ES)
- **CSS** estructurado con variables
- **uuid**

## Requisitos

- Node.js
- pnpm

## Estructura del proyecto

```text
src/
├── components/          # Piezas reutilizables (navbar, toast)
├── data/
│   └── options.js       # Opciones de tipo, tema y nivel
├── services/
│   └── storage.js       # Acceso a localStorage
├── views/               # Una vista por página
├── main.js              # Punto de entrada
├── router.js            # Router por hash
└── style.css            # Solo importa los archivos de src/styles/
```

## Modelo de datos

Estructura de recurso: `{ id, titulo, url, tipo, tema, nivel, favorito, fechaCreacion }`.

```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "titulo": "Documentación oficial de JavaScript en MDN",
  "url": "https://developer.mozilla.org/es/docs/Web/JavaScript",
  "tipo": "docs",
  "tema": "javascript",
  "nivel": "intermedio",
  "favorito": true,
  "fechaCreacion": "2026-11-09T18:42:00.000Z"
}
```

## Autor

- [Tu nombre]
- Proyecto del bootcamp [Nombre del bootcamp]
