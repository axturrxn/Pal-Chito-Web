/* =====================================================================
   APP.JS · Lógica de la página Pal' Chito: Casa Taller
   =====================================================================
   Este archivo NO guarda contenido: solo lee los datos de DATA
   (js/content.js + js/contenido/*.js) y arma las páginas.

   ÍNDICE
   1. Atajos y configuración
   2. Ayudantes de texto
   3. Piezas de imagen y video
   4. Piezas de estructura (secciones, botones, etc.)
   5. Páginas (una por cada sección del menú)
   6. Menú, marca y pie de página
   7. Navegación (cambio de página)
   8. Imágenes que no cargan
   9. Visor de imágenes y menú móvil
   10. Arranque
   ===================================================================== */


/* ---------------------------------------------------------------------
   1. ATAJOS Y CONFIGURACIÓN
   --------------------------------------------------------------------- */

// Busca un elemento en la página: $("#app")
const $ = (selector, raiz = document) => raiz.querySelector(selector);

// Todos los datos del sitio
const D = DATA;

// Extensiones de imagen que se prueban, en este orden
const EXT = ["jpg", "png", "webp", "svg"];

// Menú principal: [clave de la página, texto que se muestra]
const NAV = [
  ["inicio",      "Inicio"],
  ["proyecto",    "Proyecto"],
  ["proceso",     "Proceso creativo"],
  ["taller",      "El taller"],
  ["experiencia", "Experiencia"],
  ["cultura",     "Cultura"],
  ["creditos",    "Créditos"]
];


/* ---------------------------------------------------------------------
   2. AYUDANTES DE TEXTO
   --------------------------------------------------------------------- */

// Evita que caracteres como < o " rompan el HTML
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
}[c]));

// ¿La ruta ya trae extensión? (por ejemplo "foto.png")
const tieneExt = s => /\.\w{2,4}$/.test(s);

// Enlace de una página: inicio es "#/", las demás "#/proyecto", etc.
const href = clave => clave == "inicio" ? "#/" : "#/" + clave;


/* ---------------------------------------------------------------------
   3. PIEZAS DE IMAGEN Y VIDEO
   --------------------------------------------------------------------- */

// Recuadro gris que aparece cuando todavía falta la imagen
const placeholder = m => `
  <div class="ph" style="--ar:${m.ar || "16/9"}" role="img" aria-label="Recurso pendiente: ${esc(m.label)}">
    <b>Falta: ${esc(m.label)}</b>
    <small>${esc(m.src)}.jpg / .png / .webp</small>
  </div>`;

// ¿La ruta es un video?
const esVideo = s => /\.(mp4|webm|ogg)$/i.test(s || "");

// Imagen o video (según lo que reciba)
const media = m => {
  // Video (por la marca video:1 o porque la ruta termina en .mp4/.webm/.ogg)
  if (m.video || esVideo(m.src)) {
    const contenido = m.src
      ? `<video controls preload="metadata" playsinline
                style="width:100%; aspect-ratio:${esc(m.ar || "16/9")}; object-fit:cover"
                src="${esc(encodeURI(m.src))}"></video>`
      : placeholder(m);
    const pie = m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : "";
    return `<figure class="media">${contenido}${pie}</figure>`;
  }
  // Sin ruta: se muestra el recuadro de "falta"
  if (!m.src) return `<figure class="media">${placeholder(m)}</figure>`;

  // Imagen (si no trae extensión, se empieza probando .jpg)
  const url = tieneExt(m.src) ? m.src : m.src + "." + EXT[0];
  const pie = m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : "";

  return `
    <figure class="media">
      <img src="${esc(url)}" alt="${esc(m.alt)}" loading="lazy" data-zoom
           data-b="${esc(m.src)}" data-i="0" data-m="${esc(JSON.stringify(m))}">
      ${pie}
    </figure>`;
};

// Cuadrícula de varias imágenes
const galeria = lista => `<div class="gal">${lista.map(media).join("")}</div>`;


/* ---------------------------------------------------------------------
   4. PIEZAS DE ESTRUCTURA
   --------------------------------------------------------------------- */

// Etiqueta de estado de una etapa
const insignia = estado =>
  `<span class="badge ${estado}">${ESTADOS[estado] || ESTADOS["por-definir"]}</span>`;

// Sección con título (clase extra opcional, por ejemplo "alt")
const seccion = (titulo, cuerpo, clase = "") => `
  <section class="sec ${clase}">
    <div class="wrap">
      <h2>${titulo}</h2>
      ${cuerpo}
    </div>
  </section>`;

// Encabezado grande de cada página
const encabezado = (titulo, texto) => `
  <header class="phead">
    <div class="wrap">
      <h1 tabindex="-1">${titulo}</h1>
      <p>${texto}</p>
    </div>
  </header>`;

// Botón-enlace
const boton = (enlace, texto, clase = "") =>
  `<a class="btn ${clase}" href="${enlace}">${texto}</a>`;

// Mensaje de "falta agregar" cuando una lista está vacía
const pendiente = (lista, mensaje) =>
  lista.length ? "" : `<p class="pend">${mensaje}</p>`;

// Tarjeta de una persona del equipo (foto sobre color de fondo + inicial si falla la foto)
const miembro = p => `
  <article class="miembro">
    <div class="foto" style="--ar:${esc(p.ratio || "4/3")}; --fondo:${esc(p.fondo || "var(--madera)")}">
      <span class="inicial" aria-hidden="true">${esc((p.nombre || "?").trim().charAt(0).toUpperCase())}</span>
      <img src="${esc(p.foto)}" alt="Foto de ${esc(p.nombre)}" loading="lazy" onerror="this.remove()">
    </div>
    <div class="info">
      <h3>${esc(p.nombre)}</h3>
      <p>${esc(p.rol)}</p>
    </div>
  </article>`;


/* ---------------------------------------------------------------------
   5. PÁGINAS
   Cada una devuelve el HTML de una sección del menú.
   --------------------------------------------------------------------- */
const PAGINAS = {

  /* ----- INICIO ----- */
  inicio: () => {
    const portada = `
      <section class="hero">
        <div class="wrap">
          <div>
            <h1>Un taller donde la <em>tradición</em> se vuelve diseño y tecnología</h1>
            <p>Pal’ Chito: Casa Taller es una experiencia 3D en Unity inspirada en los talleres de máscaras de Parachico de Chiapa de Corzo. El proyecto sigue en desarrollo y aquí documentamos cada avance.</p>
            <div class="btns">
              ${boton("#/proyecto", "Explorar el proyecto")}
              ${boton("#/proceso", "Conocer el proceso", "sec2")}
            </div>
          </div>
          ${media(D.hero)}
        </div>
      </section>`;

    const tradicion = seccion("Una tradición que inspira un taller", `
      <p>${esc(D.cultura.tradicion)}</p>
      <p>El taller 3D busca acercar ese universo artesanal con una mirada propia de diseño digital.</p>
      ${boton("#/cultura", "Ver contexto cultural")}`);

    const etapas = seccion("Etapas de desarrollo", `
      <ul class="chips">
        ${D.etapas.map(e => `<li><a href="#/proceso">${e.t} ${insignia(e.estado)}</a></li>`).join("")}
      </ul>
      ${boton("#/proceso", "Ver el proceso completo")}`, "alt");

    const destacada = seccion("Galería destacada", `
      ${galeria(D.destacadas)}
      <p style="margin-top:1.5rem">${boton("#/taller", "Ver todo el taller")}</p>`);

    const unity = seccion("La experiencia en Unity", `
      <p>${esc(D.exp.desc)}</p>
      <p>${esc(D.exp.objetivo)}</p>
      ${boton("#/experiencia", "Conocer la experiencia")}`, "alt");

    const creditos = seccion("Créditos y enlaces", `
      <p>Conoce al equipo, las herramientas y las fuentes del proyecto.</p>
      ${boton("#/creditos", "Ver créditos")}`);

    return portada + tradicion + etapas + destacada + unity + creditos;
  },


  /* ----- PROYECTO ----- */
  proyecto: () =>
    encabezado("Proyecto", "Qué es Pal’ Chito y qué busca lograr.") +
    seccion("Sobre el proyecto", `
      <div class="cols">
        ${D.proyecto.map(b => `
          <div>
            <h3>${b.t}</h3>
            <p class="${b.pend ? "pend" : ""}">${b.txt}</p>
          </div>`).join("")}
      </div>`),


  /* ----- PROCESO CREATIVO ----- */
  proceso: () =>
    encabezado("Proceso creativo", "Un recorrido por las ideas, el diseño y el trabajo detrás de Pal’ Chito, donde la riqueza artesanal de Chiapa de Corzo cobra vida en un espacio digital interactivo.") +
    seccion("Etapas", `
      <ol class="tl">
        ${D.etapas.map((e, i) => `
          <li id="${e.id}">
            <span class="n" aria-hidden="true">${i + 1}</span>
            <h3>${e.t} ${insignia(e.estado)}</h3>
            <p>${e.txt}</p>
            ${galeria(e.imgs)}
          </li>`).join("")}
      </ol>`),


  /* ----- EL TALLER ----- */
  taller: () =>
    encabezado("El taller", "El entorno 3D: interior, patio y cada asset.") +
    D.taller.map((s, i) =>
      seccion(s.t, `<p>${s.txt}</p>${galeria(s.imgs)}`, i % 2 ? "alt" : "")
    ).join(""),


  /* ----- EXPERIENCIA ----- */
  experiencia: () => {
    const x = D.exp;

    const sobre = seccion("Sobre la experiencia", `
      <div class="cols">
        <div><h3>Descripción</h3><p>${x.desc}</p></div>
        <div><h3>Objetivo de la persona jugadora</h3><p>${x.objetivo}</p></div>
        <div><h3>Exploración y recolección</h3><p>${x.mecanica}</p></div>
        <div><h3>Ensamblaje de la máscara</h3><p>${x.ensamblaje}</p></div>
      </div>`);

    const capturas = seccion("Capturas", galeria(x.capturas), "alt");

    // Demostración: aviso (si aún no hay nada) + video + botón de demo
    const hayDemo = x.video.src || x.demoUrl;
    const aviso = hayDemo
      ? ""
      : `<p class="aviso">Todavía no hay una versión jugable publicada. Esta sección está en desarrollo.</p><br>`;
    const botonDemo = x.demoUrl
      ? `<p><br>${boton(x.demoUrl, "Abrir demostración")}</p>`
      : "";
    const demo = seccion("Demostración", aviso + media({ ...x.video, video: 1 }) + botonDemo);

    return encabezado("Experiencia interactiva", "El proyecto en Unity.") + sobre + capturas + demo;
  },


  /* ----- CULTURA ----- */
  cultura: () => {
    const c = D.cultura;

    const tradicion = seccion("La tradición de los Parachicos", `
      <p>${c.tradicion}</p>
      <p class="aviso">Texto base: valídalo y amplíalo con tus fuentes antes de publicarlo.</p>`);

    const decisiones = seccion("Tradición y decisiones creativas", `
      <p>La tradición documentada vive en las fuentes de esta página. El taller 3D es una representación estilizada, con decisiones creativas propias; no es una reproducción exacta de las prácticas artesanales.</p>`, "alt");

    const referencias = seccion("Referencias visuales", galeria(c.referencias));

    const fuentes = seccion("Fuentes consultadas",
      pendiente(c.fuentes, "Agrega tus fuentes bibliográficas y audiovisuales en js/contenido/cultura.js.") + `
      <ul>
        ${c.fuentes.map(f => `
          <li>${f.url ? `<a href="${esc(f.url)}">${f.t}</a>` : f.t}${f.autor ? `, ${f.autor}` : ""}</li>`).join("")}
      </ul>`, "alt");

    return encabezado("Cultura e investigación", "El contexto que inspira el proyecto.") +
           tradicion + decisiones + referencias + fuentes;
  },


 
  /* ----- CRÉDITOS ----- */
  creditos: () => {

    const c = D.creditos;

    // Presentación del equipo
    const equipo = seccion("Nuestro equipo", `
      <p class="creditos-intro">
        Un equipo multidisciplinario que reunió habilidades de
        modelado 3D, fotografía, ilustración y desarrollo web
        para dar vida a Pal’ Chito.
      </p>

      ${pendiente(
        c.equipo,
        "Agrega integrantes y responsabilidades en js/contenido/creditos.js."
      )}

      <div class="equipo equipo-creditos">
        ${c.equipo.map(miembro).join("")}
      </div>
    `);

    // Herramientas
    const descripciones = {
      "Unity": "Motor de desarrollo interactivo",
      "Autodesk Maya": "Modelado y creación 3D",
      "Blender": "Modelado y recursos 3D",
      "Visual Studio Code": "Editor de código",
      "GitHub": "Repositorio de código y control de versiones"
    };

    const herramientas = seccion("Herramientas y tecnologías", `
      <p class="creditos-intro">
        Software utilizado durante el desarrollo de la experiencia.
      </p>

      <div class="herramientas-grid">
        ${c.herramientas.map(h => `
          <article class="herramienta-card">
            <span class="herramienta-simbolo" aria-hidden="true">
              ${esc(h === "Autodesk Maya" ? "M" : h === "Blender" ? "B" : h === "Visual Studio Code" ? "VS" : h === "GitHub" ? "G" : "U")}
            </span>
            <div>
              <h3>${esc(h)}</h3>
              <p>${esc(descripciones[h] || "Herramienta de desarrollo")}</p>
            </div>
          </article>
        `).join("")}
      </div>
    `, "alt");

    // Fuentes y recursos
    const recursos = seccion("Fuentes y recursos", `
      <p class="creditos-intro">
        Referencias y materiales utilizados como apoyo para
        la investigación y el desarrollo del proyecto.
      </p>

      ${pendiente(
        c.recursos,
        "Indica el origen de las imágenes y recursos externos."
      )}

      <ul class="recursos-lista">
        ${c.recursos.map(r => `<li>${esc(r)}</li>`).join("")}
      </ul>
    `);

    // Instituciones
    const logos = seccion("Instituciones participantes", `
      <p class="creditos-intro">
        Instituciones relacionadas con el desarrollo del proyecto.
      </p>

      <div class="instituciones-grid">
        ${D.logosInst.map(media).join("")}
      </div>
    `, "alt");

  return encabezado(
      "Créditos y equipo",
      "Detrás de Pal’ Chito hay un equipo, muchas ideas y un proceso creativo que une tecnología y tradición."
    ) + equipo + herramientas + recursos + logos;
  }

};

/* ---------------------------------------------------------------------
   6. MENÚ, MARCA Y PIE DE PÁGINA
   --------------------------------------------------------------------- */

// Logo y nombre de la cabecera (el logo se busca como .svg primero)
function dibujarMarca() {
  const logo = D.sitio.logo;
  $("#marca").innerHTML = `
    <img src="${esc(logo.src)}.svg" alt="" data-b="${esc(logo.src)}" data-i="3" data-m="{}" data-logo>
    <span>${D.sitio.nombre} <small>${D.sitio.sub}</small></span>`;
}

// Menú principal (marca con aria-current la página activa)
function dibujarMenu(paginaActual) {
  $("#nav").innerHTML = NAV.map(n =>
    `<a href="${href(n[0])}"${n[0] == paginaActual ? ' aria-current="page"' : ""}>${n[1]}</a>`
  ).join("");
}


/* Pie de página global */

function dibujarPie() {
  const redes = (D.sitio.redes || []).filter(r =>
    r.url && /^https?:\/\//i.test(r.url)
  );

  const enlacesRedes = redes.length
    ? redes.map(r => `
        <li>
          <a href="${esc(r.url)}"
             target="_blank"
             rel="noopener noreferrer">
            ${esc(r.nombre)}
          </a>
        </li>
      `).join("")
    : `<li class="pie-proximamente">Próximamente</li>`;

  const navegacion = NAV.map(n => `
    <li>
      <a href="${href(n[0])}">${esc(n[1])}</a>
    </li>
  `).join("");

  $("#pie").innerHTML = `
    <div class="wrap pie-contenido">

      <div class="pie-superior">

        <div class="pie-identidad">
          <a class="pie-marca" href="#/">
            ${esc(D.sitio.nombre)}
            <span>${esc(D.sitio.sub)}</span>
          </a>

          <p>
            Una experiencia digital para descubrir,
            aprender y preservar nuestras tradiciones.
          </p>
        </div>

        <div class="pie-columna">
          <h3>Conecta con nosotros</h3>
          <ul>
            ${enlacesRedes}
          </ul>
        </div>

      </div>

      <div class="pie-instituciones">
        <span>Instituciones participantes</span>
        <div class="pie-logos">
          ${D.logosInst.map(media).join("")}
        </div>
      </div>

      <div class="pie-inferior">
        <p>
          © ${new Date().getFullYear()}
          ${esc(D.sitio.nombre)}: ${esc(D.sitio.sub)}.
          Proyecto integrador.
        </p>
        <a href="#/creditos">Conoce al equipo</a>
      </div>

    </div>
  `;
}



/* ---------------------------------------------------------------------
   7. NAVEGACIÓN (cambio de página según la dirección #/...)
   --------------------------------------------------------------------- */
function mostrarPagina() {
  // "#/proyecto" → "proyecto". Si no existe esa página, se muestra inicio.
  const clave  = location.hash.replace(/^#\/?/, "") || "inicio";
  const pagina = PAGINAS[clave] ? clave : "inicio";

  // Dibujar contenido y menú
  $("#app").innerHTML = PAGINAS[pagina]();
  dibujarMenu(pagina);

  // Título de la pestaña del navegador
  const nombreMenu = NAV.find(n => n[0] == pagina)[1];
  document.title = (pagina == "inicio" ? "" : nombreMenu + " · ") + "Pal’ Chito: Casa Taller";

  // Cerrar menú móvil, subir al inicio y enfocar el título (accesibilidad)
  $("#nav").classList.remove("abierto");
  $(".burger").setAttribute("aria-expanded", "false");
  scrollTo(0, 0);
  const titulo = $("h1");
  if (titulo) titulo.focus({ preventScroll: true });
}


/* ---------------------------------------------------------------------
   8. IMÁGENES QUE NO CARGAN
   Si una imagen falla, se prueba con la siguiente extensión
   (.jpg → .png → .webp → .svg). Si ninguna existe, aparece el recuadro
   "Falta: ...". El logo prueba en orden inverso y se quita si no existe.
   --------------------------------------------------------------------- */
addEventListener("error", e => {
  const img = e.target;
  if (img.tagName !== "IMG" || !img.dataset.b) return;

  // Logo: .svg → .webp → .png → .jpg → se elimina
  if (img.hasAttribute("data-logo")) {
    const n = +img.dataset.i - 1;
    if (n >= 0) {
      img.dataset.i = n;
      img.src = img.dataset.b + "." + EXT[n];
    } else {
      img.remove();
    }
    return;
  }

  // Resto de imágenes: se prueba la siguiente extensión
  const n = +img.dataset.i + 1;
  if (!tieneExt(img.dataset.b) && n < EXT.length) {
    img.dataset.i = n;
    img.src = img.dataset.b + "." + EXT[n];
  } else {
    img.outerHTML = placeholder(JSON.parse(img.dataset.m));
  }
}, true);


/* ---------------------------------------------------------------------
   9. VISOR DE IMÁGENES Y MENÚ MÓVIL
   --------------------------------------------------------------------- */

// Clic en una imagen: se abre ampliada. Clic en "Cerrar" o fuera: se cierra.
document.addEventListener("click", e => {
  const el = e.target;

  if (el.matches("img[data-zoom]")) {
    const visor = $("#visor");
    $("img", visor).src = el.currentSrc || el.src;
    $("img", visor).alt = el.alt;
    visor.showModal();
  } else if (el.matches(".cerrar") || el.id == "visor") {
    $("#visor").close();
  }
});

// Botón "Menú" en pantallas pequeñas
$(".burger").onclick = e => {
  const abierto = $("#nav").classList.toggle("abierto");
  e.target.setAttribute("aria-expanded", abierto);
};


/* ---------------------------------------------------------------------
   10. ARRANQUE
   --------------------------------------------------------------------- */
addEventListener("hashchange", mostrarPagina);  // al cambiar de página
dibujarMarca();
dibujarPie();
mostrarPagina();    