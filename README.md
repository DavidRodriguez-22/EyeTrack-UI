# Comunicación Visual (IA)

Comunicación Visual es una aplicación web desarrollada en React y TypeScript, diseñada para que personas con movilidad reducida que solo pueden mover la cabeza y los ojos puedan comunicarse con sus seres queridos, cuidadores o personal médico sin usar las manos.
A través del seguimiento ocular por cámara web, el usuario controla un cursor en pantalla y selecciona pictogramas organizados por categorías, que la aplicación convierte en voz.

Contribuidores

* Marylin Sophia Valentina Rojas Pardo
* Valentina Rojas Camargo
* Rodríguez González Edgar David

Características
La aplicación está estructurada en los siguientes módulos principales:

1. Seguimiento ocular (Eye Tracking)
Detecta en tiempo real la posición del iris mediante la cámara web y traduce su movimiento en el desplazamiento de un cursor personalizado en pantalla.

2. Clic sin manos (Dwell click)
Si el usuario mantiene la mirada fija en un punto durante un tiempo determinado, la aplicación genera automáticamente un clic sobre el elemento señalado, sin necesidad de manos ni mouse físico.

3. Comunicación por categorías
Pantallas organizadas por tipo de necesidad Necesidades, Actividades, Comodidad, Emociones, Emergencias y Comunicación cada una con pictogramas navegables mediante la mirada.

4. Síntesis de voz
Cada opción seleccionada se convierte en audio mediante la Web Speech API, permitiendo que el usuario "hable" a través de la aplicación.

Cómo funciona el seguimiento ocular
La aplicación usa MediaPipe Face Mesh para detectar en tiempo real los puntos de referencia (landmarks) del rostro a través de la cámara web:

* Calcula la posición del iris en relación con las esquinas del ojo, en el eje horizontal y vertical.
* Traduce esa posición relativa en una dirección y velocidad de movimiento para el cursor personalizado.
* Aplica una "zona muerta" (dead zone) para evitar que pequeños temblores o parpadeos muevan el cursor de forma involuntaria.
* Si el usuario mantiene la mirada fija dentro de esa zona muerta durante 2 segundos, la aplicación interpreta esto como una selección y genera un clic automático.

Estructura del proyecto

```
público/
│
└── src/
    ├── components/
    │   ├── App.tsx                    
    │   ├── EyeControl.tsx             
    │   ├── ImageButton.tsx            
    │   ├── ImageCard.tsx              
    │   └── VozButton.tsx              
    │
    ├── hooks/
    │   ├── useCustomCursor.ts         
    │   └── useMediaPipeEyeTracking.ts 
    │
    ├── pages/
    │   ├── Actividades.tsx
    │   ├── Comodidad.tsx
    │   ├── Comunicacion.tsx
    │   ├── Emergencias.tsx
    │   ├── Emociones.tsx
    │   ├── Home.tsx
    │   └── Necesidades.tsx
    │
    ├── styles/
    ├── App.css
    ├── index.css
    └── main.tsx

.gitignore
eslint.config.js
index.html
package.json
package-lock.json
vite.config.js
```

Tecnologías utilizadas

* React + TypeScript
* Vite
* MediaPipe (Face Mesh, Camera Utils, Tasks Vision)
* TensorFlow.js (face-landmarks-detection, tfjs, backend WebGL)
* React Router DOM
* Framer Motion
* Web Speech API

Instalación
-Paso 1: Clonar el repositorio
https://github.com/DavidRodriguez-22/EyeTrack-UI.git

-Paso 2:
Abre una terminal en la carpeta del proyecto
Ejecuta `npm install` para instalar las dependencias
Ejecuta `npm run dev` para iniciar el servidor de desarrollo

* Rama principal: main

-Paso 3:
Otorga permiso de acceso a la cámara web cuando el navegador lo solicite; es necesario para el seguimiento ocular.

Demo en vivo: (https://interfaz-ia.vercel.app/)
