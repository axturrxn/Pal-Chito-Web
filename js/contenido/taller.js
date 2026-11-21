/* TALLER 3D · galería por secciones */

DATA.taller = [
  {
    t: "Vista general",
    txt: "Panorama completo del taller.",
    imgs: [ S("Vista general del taller", "assets/unity/Vista general.png", "16/9") ]
  },
  {
    t: "Interior: las cuatro paredes",
    txt: "Distribución de cada pared.",
    // Genera automáticamente interior-pared-01 … interior-pared-04
    imgs: [
      S("Pared del interior", "assets/unity/Pared1.png", "4/3"),
      S("Pared del interior", "assets/unity/Pared2.png", "4/3"),
      S("Pared del interior", "assets/unity/Pared3.png", "4/3"),
      S("Pared del interior", "assets/unity/Pared4.png", "4/3")
    ]

  },
  {
    t: "Patio exterior",
    txt: "El espacio abierto del taller.",
    imgs: [ S("Patio exterior", "assets/unity/Patio toma.png", "4/3") ]
  },
  {
    t: "Mobiliario y herramientas",
    txt: "Mesas, estantes y herramientas de trabajo.",
    imgs: [
      S("Mobiliario",   "assets/unity/Mesa arte.png",   "4/3"),
      S("Herramientas", "assets/unity/Mesa.png", "4/3")
    ]
  },
  {
    t: "Máscara y objetos principales",
    txt: "La máscara de Parachico y los objetos que la rodean.",
    imgs: [ S("Máscara de Parachico", "assets/unity/Mascara Parachico.png", "4/3") ]
  },
  {
    t: "Galería de assets",
    txt: "Cada asset por separado.",
    imgs: [
      S("Asset 1", "assets/unity/Agave1.png", "1/1"),
      S("Asset 2", "assets/unity/Arbol columnar.png", "1/1"),
      S("Asset 3", "assets/unity/Arbol low poly.png", "1/1"),
      S("Asset 4", "assets/unity/Bugambilias.png", "1/1"),
      S("Asset 5", "assets/unity/Cedro rojo.png", "1/1"),
      S("Asset 6", "assets/unity/Cordyles.png", "1/1"),
      S("Asset 7", "assets/unity/Helecho.png", "1/1"),
      S("Asset 8", "assets/unity/Ixora.png", "1/1"),
      S("Asset 9", "assets/unity/Mesa arte1.png", "1/1"),
      S("Asset 10", "assets/unity/Mesa.png", "1/1"),
      S("Asset 11", "assets/unity/Pabellon.png", "1/1"),
      S("Asset 12", "assets/unity/Palma.png", "1/1"),
      S("Asset 13", "assets/unity/Puerta.png", "1/1"),
      S("Asset 14", "assets/unity/Suculenta.png", "1/1"),
      S("Asset 15", "assets/unity/Unity.png", "1/1"),
    ]
  },
  {
    t: "Bocetos y vistas ortográficas",
    txt: "Del dibujo al modelo.",
    imgs: [
      S("Boceto",            "assets/unity/Helecho1.png","4/3"),
      S("Vista ortográfica", "assets/ortograficas/Helecho low poly.png", "4/3")
    ]
  },
  {
    t: "Referencia, modelo y resultado",
    txt: "Comparaciones lado a lado.",
    imgs: [
      S("Referencia",      "assets/ortograficas/Pabellon Hoctagonal.png", "4/3"),
      S("Modelo",          "assets/referencias/Pabellon SS.PNG","4/3"),
      S("Resultado final", "assets/unity/Pabellon.png","4/3")
    ]
  }
];
