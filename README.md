# Contador UNO - Aplicación de Conteo de Puntos

Una aplicación moderna y responsive para llevar el conteo de puntos en partidas de UNO, desarrollada con React, TypeScript y Tailwind CSS.

## 🌐 Demo en vivo
**[https://nataperalta.github.io/contador-uno/](https://nataperalta.github.io/contador-uno/)**

## 🚀 Características

- **Conteo de puntos por cartas**: Sistema completo para calcular puntos basado en las cartas de UNO
- **Gestión de jugadores**: Agregar, eliminar y renombrar jugadores dinámicamente
- **Historial de rondas**: Visualización completa del historial de puntos por ronda
- **Edición de rondas**: Capacidad de editar puntos de rondas anteriores
- **Configuraciones avanzadas**: 
  - Puntos objetivo personalizables
  - Resta de puntos al ganador (valor fijo o porcentaje)
  - Puntaje inicial para nuevos jugadores
- **Modo oscuro/claro**: Interfaz adaptable con toggle de tema
- **Responsive design**: Optimizada para móviles y desktop
- **Modo desarrollador**: Funciones de desarrollo activadas con `?devMode=true`
- **Colores oficiales UNO**: Interfaz auténtica con los colores del juego (#0000FF, #008000, #FF0000, #FFFF00)

## 🏗️ Arquitectura del Proyecto

### Estructura de Componentes

```
src/
├── components/
│   ├── index.ts                 # Exportaciones centralizadas
│   ├── Header.tsx              # Barra superior con título y controles
│   ├── GameControls.tsx        # Controles principales del juego
│   ├── PlayerManager.tsx       # Gestión de jugadores y puntos pendientes
│   ├── PlayerGrid.tsx          # Grid de visualización de jugadores
│   ├── PlayerCard.tsx          # Card individual de jugador
│   ├── LoadingSpinner.tsx      # Componente de carga
│   ├── Modal.tsx               # Modal base reutilizable
│   ├── CardsModal.tsx          # Modal de selección de cartas
│   ├── PlayerSelectionModal.tsx # Modal de selección de jugador
│   └── SettingsModal.tsx       # Modal de configuración
├── hooks/
│   ├── index.ts                # Exportaciones centralizadas
│   ├── useGameState.ts         # Estado global del juego
│   ├── useTheme.ts             # Gestión del tema
│   ├── useGameLogic.ts         # Lógica principal del juego
│   └── useDevMode.ts           # Funciones del modo desarrollador
├── types/
│   └── index.ts                # Definiciones de tipos TypeScript
├── data/
│   └── unoCards.ts             # Datos de las cartas de UNO
└── App.tsx                     # Componente principal (simplificado)
```

### Separación de Responsabilidades

#### Componentes UI
- **Header**: Maneja la barra superior, toggle de tema y configuración
- **GameControls**: Controles principales (agregar ronda, deshacer, nuevo juego)
- **PlayerManager**: Gestión de jugadores y visualización de puntos pendientes
- **PlayerGrid**: Layout de las cards de jugadores con header indicativo
- **PlayerCard**: Card individual con historial de puntos y estadísticas

#### Hooks Personalizados
- **useGameState**: Estado global persistente con localStorage
- **useTheme**: Gestión del tema (claro/oscuro) con persistencia
- **useGameLogic**: Lógica compleja del juego separada del UI
- **useDevMode**: Funciones de desarrollo y debugging

#### Modales Especializados
- **CardsModal**: Selección de cartas con cálculo automático de puntos
- **PlayerSelectionModal**: Selección de jugador ganador
- **SettingsModal**: Configuraciones avanzadas del juego

## 🎯 Beneficios de la Refactorización

### Antes (App.tsx de 623 líneas)
- ❌ Un solo archivo masivo con múltiples responsabilidades
- ❌ Lógica de UI mezclada con lógica de negocio
- ❌ Difícil mantenimiento y testing
- ❌ Reutilización limitada de componentes

### Después (App.tsx de ~150 líneas)
- ✅ Componentes pequeños y enfocados
- ✅ Separación clara de responsabilidades
- ✅ Hooks personalizados para lógica reutilizable
- ✅ Fácil testing y mantenimiento
- ✅ Mejor organización del código

## 🛠️ Tecnologías Utilizadas

- **React 18** con TypeScript
- **Tailwind CSS** para estilos
- **Vite** como bundler
- **LocalStorage** para persistencia
- **Hooks personalizados** para lógica reutilizable
- **GitHub Actions** para CI/CD

## 📱 Características Móviles

- Diseño responsive optimizado para pantallas pequeñas
- Controles táctiles intuitivos
- Scroll horizontal en el grid de jugadores
- Modales adaptados para móviles

## 🎨 Temas

- **Modo claro**: Interfaz limpia con colores claros
- **Modo oscuro**: Interfaz moderna con colores oscuros
- **Persistencia**: El tema se guarda automáticamente

## 🔧 Configuración

### Instalación
```bash
git clone https://github.com/NataPeralta/contador-uno.git
cd contador-uno
npm install
```

### Desarrollo
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Versionado
```bash
# Para cambios menores (bug fixes)
npm run version:patch

# Para nuevas características (features)
npm run version:minor

# Para cambios importantes (breaking changes)
npm run version:major

# Para hacer un release completo (build + version patch)
npm run release
```

### Modo Desarrollador
Accede a `http://localhost:5173?devMode=true` para activar funciones de desarrollo:
- Botón "Cargar Ejemplo" para datos de prueba
- Botón "Resetear" para limpiar el estado

## 📊 Funcionalidades Principales

### Gestión de Jugadores
- Agregar jugadores con nombres personalizados
- Eliminar jugadores (mínimo 2)
- Renombrar jugadores existentes
- Puntaje inicial configurable

### Sistema de Puntos
- Cálculo automático basado en cartas de UNO
- Puntos directos adicionales
- Puntos pendientes antes de confirmar
- Edición de rondas anteriores

### Configuraciones
- Puntos objetivo personalizables
- Resta de puntos al ganador
- Tema de interfaz
- Puntaje inicial de nuevos jugadores

## 🏷️ Versionado

Este proyecto usa [Semantic Versioning](https://semver.org/). Para ver los cambios de cada versión, consulta el [CHANGELOG.md](CHANGELOG.md).

### Releases Automáticos
- Cada vez que se hace push de un tag `v*`, se ejecuta automáticamente:
  - Build de producción
  - Deploy a GitHub Pages
  - Creación de release en GitHub

## 🔄 Build Automático

Este proyecto incluye un sistema de build automático que actualiza la carpeta `dist` en GitHub cada vez que se hace un push a la rama principal.

### Workflows Configurados

1. **Update Dist Folder** (`.github/workflows/update-dist.yml`)
   - Se ejecuta en cada push a `main`
   - Construye el proyecto con `npm run build`
   - Actualiza automáticamente la carpeta `dist` en el repositorio
   - Evita bucles infinitos ignorando cambios en `dist/**`

2. **Build and Deploy** (`.github/workflows/deploy.yml`)
   - Se ejecuta en pushes y pull requests a `main`
   - Construye el proyecto y despliega a GitHub Pages
   - Utiliza la rama `gh-pages` para el deploy

### Configuración

Para que el build automático funcione correctamente:

1. **Permisos de GitHub Actions**: Asegúrate de que GitHub Actions tenga permisos de escritura en tu repositorio
2. **Token de Acceso**: El workflow usa `GITHUB_TOKEN` automáticamente
3. **Carpeta dist**: La carpeta `dist` ya no está en `.gitignore` para permitir su actualización

### Uso

Simplemente haz push a la rama `main` y el build se ejecutará automáticamente:

```bash
git add .
git commit -m "feat: Nueva funcionalidad"
git push origin main
```

El workflow se ejecutará en segundo plano y actualizará la carpeta `dist` con el build más reciente.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones de Commits
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Documentación
- `style:` Cambios de estilo
- `refactor:` Refactorización de código
- `test:` Tests
- `chore:` Tareas de mantenimiento

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🔗 Enlaces

- **Demo**: [https://nataperalta.github.io/contador-uno/](https://nataperalta.github.io/contador-uno/)
- **Repositorio**: [https://github.com/NataPeralta/contador-uno](https://github.com/NataPeralta/contador-uno)
- **Issues**: [https://github.com/NataPeralta/contador-uno/issues](https://github.com/NataPeralta/contador-uno/issues)
