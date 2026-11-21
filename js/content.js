/* CONTENT.JS · BASE (no necesitas editarlo)
   Crea los ayudantes y el contenedor DATA.
   Cada archivo de js/contenido/ agrega su parte a DATA.

   CÓMO CREAR UNA IMAGEN:  S("etiqueta", "ruta", "proporción", "pie de foto")
     - etiqueta    → texto que se muestra si la imagen aún no existe
     - ruta        → SIN extensión (acepta .jpg, .png, .webp o .svg)
     - proporción  → "16/9", "4/3", "3/1" o "1/1"
     - pie de foto → opcional
*/

const S = (label, src, ar = "16/9", caption = "") => ({
  label, src, ar, caption, alt: label
});

// Estados posibles de una etapa (úsalos solo si son reales)
const ESTADOS = {
  "por-definir":   "Por definir",
  "en-desarrollo": "En desarrollo",
  "completado":    "Completado"
};

// Contenedor vacío: se llena con los archivos de js/contenido/
const DATA = {};
redes: [
  {
    nombre: "Instagram",
    url: ""
  },
  {
    nombre: "YouTube",
    url: ""
  },
  {
    nombre: "GitHub",
    url: ""
  }
]