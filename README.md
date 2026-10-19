# EyeTrack-UI

Comunicación Visual es una aplicación web desarrollada en React y TypeScript, diseñada para que personas con movilidad reducida que solo pueden mover la cabeza y los ojos puedan comunicarse con sus seres queridos, cuidadores o personal médico sin usar las manos. A través del seguimiento ocular por cámara web, el usuario controla un cursor en pantalla y selecciona pictogramas organizados por categorías, que la aplicación convierte en voz.

### Pagina Web
¡No necesitas instalar nada! Prueba la aplicación directamente en tu navegador:
👉 **[https://interfaz-ia.vercel.app/](https://interfaz-ia.vercel.app/)**

---

### Mini Manual de Uso

Para tener la mejor experiencia, asegúrate de estar en un lugar con buena iluminación y mantén el zoom de tu navegador al 100%.

1. **Permisos de Cámara:** Al ingresar a la página, el navegador te pedirá permiso para usar la cámara web. Haz clic en "Permitir".
2. **Calibración Inicial:** Aparecerá una pantalla de calibración. Acomódate frente a la cámara, mira fijamente el punto rojo en pantalla y pídele a tu cuidador o acompañante que haga clic en el botón "Capturar Punto". Esto se repetirá 9 veces para mapear tus ojos a la pantalla.
3. **Navegación:** Una vez calibrado, verás un cursor azul. Al mirar hacia cualquier pictograma (ej. "Necesidades"), el sistema actuará como un imán y centrará el cursor automáticamente en la tarjeta.
4. **Hacer Clic (Dwell Click):** Para seleccionar una opción, simplemente mantén la mirada fija en la tarjeta. Verás que un anillo verde comienza a llenarse. Si lo mantienes por 1.5 segundos, la aplicación hará clic por ti y leerá la opción en voz alta.
5. **Descansar los Ojos:** Si quieres leer o mirar a otro lado sin presionar botones por accidente, mira el botón azul de "Descansar Ojos" (abajo a la izquierda) para pausar el cursor.
6. **Recalibrar:** Si cambiaste de postura y el cursor pierde precisión, un cuidador puede hacer clic en "Recalibrar" (abajo a la derecha) usando el mouse físico para reiniciar el proceso.

---

### Contribuidores
- Marylin Sophia Valentina Rojas Pardo
- Valentina Rojas Camargo
- Rodríguez González Edgar David

### Características
La aplicación está estructurada en los siguientes módulos principales:

1. **Seguimiento ocular (Eye Tracking):** Detecta en tiempo real la posición del iris mediante la cámara web y traduce su movimiento en el desplazamiento de un cursor personalizado en pantalla.
2. **Clic sin manos (Dwell click):** Si el usuario mantiene la mirada fija en un punto durante un tiempo determinado (1.5 segundos), la aplicación genera automáticamente un clic sobre el elemento señalado, sin necesidad de manos ni mouse físico.
3. **Comunicación por categorías:** Pantallas organizadas por tipo de necesidad: Necesidades, Actividades, Comodidad, Emociones, Emergencias y Comunicación, cada una con pictogramas navegables mediante la mirada.
4. **Síntesis de voz:** Cada opción seleccionada se convierte en audio mediante la Web Speech API, permitiendo que el usuario "hable" a través de la aplicación.

### Cómo funciona el seguimiento ocular
La aplicación usa MediaPipe para detectar en tiempo real los puntos de referencia (landmarks) del rostro a través de la cámara web:

- **Calibración Geométrica:** Utiliza un modelo de regresión matemática (mínimos cuadrados) para mapear las coordenadas relativas del iris directamente a las coordenadas absolutas de la pantalla tras una calibración de 9 puntos.
- **Imán Magnético y Anti-Temblor (Histéresis):** Aplica un algoritmo que "engancha" la mirada al centro geométrico de los botones cercanos. Esto crea un área de gracia que absorbe los pequeños temblores o parpadeos involuntarios del ojo, evitando que el cursor se salga del botón.
- Si el usuario mantiene la mirada fijada en ese imán durante 1.5 segundos (indicado por un anillo verde), la aplicación interpreta esto como una selección y genera un clic automático.

### Tecnologías utilizadas
- React + TypeScript
- Vite
- MediaPipe (Face Mesh, Camera Utils, Tasks Vision)
- TensorFlow.js (face-landmarks-detection, tfjs, backend WebGL)
- React Router DOM
- Framer Motion
- Web Speech API

---

### 💻 Para Desarrolladores (Instalación Local)

Si deseas contribuir al código fuente o probar el proyecto de manera local:

1. Clona el repositorio: `https://github.com/DavidRodriguez-22/EyeTrack-UI.git`
2. Abre una terminal en la carpeta del proyecto.
3. Ejecuta `npm install` para instalar las dependencias.
4. Ejecuta `npm run dev` para iniciar el servidor de desarrollo.

*(Rama principal: `main`)*

### Estructura del proyecto

```text
public/
├── images/
└── sonidos/
src/
├── components/
│   ├── App.tsx
│   ├── CalibrationModal.tsx
│   ├── EyeControl.tsx
│   ├── ImageButton.tsx
│   ├── ImageCard.tsx
│   └── VozButton.tsx
├── hooks/
│   ├── useCustomCursor.ts
│   └── useMediaPipeEyeTracking.ts
├── pages/
│   ├── Actividades.tsx
│   ├── Comodidad.tsx
│   ├── Comunicacion.tsx
│   ├── Emergencias.tsx
│   ├── Emociones.tsx
│   ├── Home.tsx
│   └── Necesidades.tsx
├── styles/
│   ├── comunicacion.css
│   ├── Emergencia.css
│   ├── global.css
│   ├── Home.css
│   ├── ImageButton.css
│   ├── ImageCard.css
│   └── VozButton.css
├── utils/
│   └── gazeRegression.ts
├── App.css
├── index.css
├── main.tsx
└── vite-end.d.ts

.gitignore
eslint.config.js
index.html
package-lock.json
