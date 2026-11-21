/* ETAPAS DEL PROCESO
   estado: "por-definir" | "en-desarrollo" | "completado" */

DATA.etapas = [
  {
    id: "investigacion",
    t: "Investigación y referencias",
    txt: "Referencias visuales y culturales sobre talleres artesanales y máscaras de Parachico.",
    estado: "completado",
    imgs: [ 
      S("Referencia o moodboard", "assets/referencias/Mascara.jpg", "4/3"), 
      S("Referencia o moodboard", "assets/referencias/Mesa.jpg", "4/3"),
      S("Referencia o moodboard", "assets/referencias/Silla y mueble.jpg", "4/3") 
    ]
  },
  {
    id: "bocetos",
    t: "Conceptualización y bocetos",
    txt: "Primeras ideas del taller, su distribución y su atmósfera.",
    estado: "completado",
    imgs: [ 
      S("Boceto del taller", "assets/bocetos/Idea mueble.jpeg", "4/3"), 
      S("Boceto del taller", "assets/bocetos/Idea mascara.jpeg", "4/3"),
    ]
  },
  {
    id: "ortograficas",
    t: "Boceto principal de vistas ortográficas",
    txt: "Vistas de frente, lateral y superior para guiar el modelado.",
    estado: "completado",
    imgs: [ 
      S("Vistas ortográficas de la máscara", "assets/ortograficas/Taller vistas.png", "4/3") 
    ]
  },
  {
    id: "modelado",
    t: "Modelado de assets en 3D",
    txt: "Máscara, mobiliario, herramientas y elementos decorativos.",
    estado: "en-desarrollo",
    imgs: [ 
      S("Boceto del taller", "assets/bocetos/Taller.jpeg", "4/3"), 
      S("Boceto del taller", "assets/bocetos/Mueble3.jpeg", "4/3"),
      S("Boceto del taller", "assets/bocetos/Mueble2.jpeg", "4/3") 
    ]
  },
  {
    id: "texturas",
    t: "Materiales y texturizado",
    txt: "Materiales y texturas de cada pieza.",
    estado: "completado",
    imgs: [ 
      S("Captura de texturas", "assets/texturas/forrest_ground_01_diff_4k.jpg", "4/3"),
      S("Captura de texturas", "assets/texturas/red_brick_pavers_diff_4k.jpg", "4/3"),
      S("Captura de texturas", "assets/texturas/yellow_stone_wall_diff_4k.jpg", "4/3") 
      ]
  },
  {
    id: "entorno",
    t: "Construcción del entorno",
    txt: "Interior de cuatro paredes y patio exterior.",
    estado: "en-desarrollo",
    imgs: [ S("Avance del entorno", "assets/unity/UNIITY1.png", "4/3") ]
  },
  {
    id: "unity",
    t: "Integración en Unity",
    txt: "Importación de assets, iluminación y armado de la escena.",
    estado: "en-desarrollo",
    imgs: [ S("Captura de la escena en Unity", "assets/unity/UNITY", "4/3") ]
  },
  {
    id: "pruebas",
    t: "Implementación y pruebas",
    txt: "Interacción, recolección de materiales, ensamblaje de la máscara y pruebas.",
    estado: "en-desarrollo",
    imgs: [ S("Video de pruebas", "assets/videos/Demo Pal Chito.mp4", "16/9") ]
  }
];
