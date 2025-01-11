# Pizzería Dashboard

Un dashboard moderno y responsivo para la gestión de una pizzería, permitiendo administrar clientes, sucursales y más.

## Características

- Sistema de autenticación
- Gestión de clientes
- Administración de sucursales
- Diseño responsivo
- Interfaz moderna y minimalista
- Navegación lateral con modo colapsable

## Tecnologías

- **Vue 3**: Framework progresivo para construir interfaces de usuario
  - Composition API
  - Vue Router para navegación
  - Pinia para manejo de estado

- **Vite**: Build tool y servidor de desarrollo ultrarrápido

- **Element Plus**: Biblioteca de componentes UI para Vue 3
  - Componentes pre-estilizados
  - Iconos integrados
  - Sistema de grid
  - Formularios y validaciones

- **Tailwind CSS**: Framework de CSS utilitario
  - Diseño responsivo
  - Personalización sencilla
  - Optimización de producción

## Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## Configuración

El proyecto usa las siguientes dependencias principales:

```json
{
  "vue": "^3.3.11",
  "vue-router": "^4.2.5",
  "pinia": "^2.1.7",
  "element-plus": "^2.4.4",
  "tailwindcss": "^3.4.1"
}
```

## Responsive Design

El dashboard está optimizado para diferentes tamaños de pantalla:
- **Desktop**: Navegación lateral expandida
- **Tablet**: Navegación lateral colapsable
- **Mobile**: Navegación lateral oculta con menú hamburguesa

## Autenticación

Para pruebas, usa las siguientes credenciales:
- **Email**: admin@pizzeria.com
- **Password**: admin123

## Estructura del Proyecto

```
src/
├── assets/         # Recursos estáticos
├── components/     # Componentes reutilizables
├── layouts/        # Layouts de la aplicación
├── router/         # Configuración de rutas
├── stores/         # Estado global con Pinia
└── views/          # Vistas principales
```

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
