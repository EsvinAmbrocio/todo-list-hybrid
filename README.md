# Todo List Hybrid (Ionic + Angular)

## Prototipo / Wireframe (pantallas y UX)

1) **Pantalla Home (lista y resumen)**
- Encabezado con título y acción rápida de agregar.
- Tarjetas de resumen (Pendientes, Completadas, Total) apiladas.
- Segmento de filtro: Pendientes (default), Todas, Completadas.
- Lista de tarjetas de tareas:
	- Ícono y badge de tipo (trabajo, casa, negocios).
	- Estado “Completada” como chip flotante cuando aplique.
	- Título, descripción y acciones: Completar (solo si está pendiente) y Eliminar.
	- Tap abre detalle.
- Vacío: mensaje y botón para agregar tarea.

2) **Modal “Nueva Tarea”**
- Formulario: nombre (obligatorio), descripción (opcional), tipo (trabajo, casa, negocios).
- Botón Guardar; botón Cerrar.

3) **Detalle de Tarea**
- Header con back.
- Nombre, descripción, tipo (badge), estado.
- Fecha de creación.
- Acciones: Marcar como completada (si procede), Eliminar.
- Estado se refleja con chip y estilos.

## Procedimiento / Instrucciones para probar la aplicación

### Requisitos
- Node.js y npm.
- Android Studio o Xcode (para probar en dispositivo/emulador con Capacitor).

### Ejecutar en web (desarrollo)
```bash
npm install
npx ionic serve
```

### Build web (producción)
```bash
npm run build
```

### Capacitor: preparar y sincronizar
```bash
npx cap sync
```

### Abrir proyecto nativo
```bash
npx cap open android   # abre en Android Studio
npx cap open ios       # abre en Xcode
```

### Probar en dispositivo/emulador
- Android: desde Android Studio, seleccionar emulador o dispositivo USB y ejecutar.
- iOS: desde Xcode, seleccionar simulador o dispositivo y ejecutar (se necesita team de desarrollo configurado).

### Flujo de usuario
1. Abrir la app → se muestran las tarjetas de resumen y el filtro en “Pendientes”.
2. Agregar tarea con el botón “Agregar”: completar nombre, descripción (opcional) y tipo.
3. Ver la lista filtrada por Pendientes; cambiar a “Todas” o “Completadas” con el segmento.
4. Completar o eliminar tareas desde las acciones de cada tarjeta.
5. Tocar una tarjeta para ver detalles, marcar como completada o eliminar.

