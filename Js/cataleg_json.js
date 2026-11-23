let juegos = [];

const inputArchivo = document.querySelector("#archivo-json");
const tituloTienda = document.querySelector("#titulo-tienda");
const mensajeJson = document.querySelector("#mensaje-json");
const contenedor = document.querySelector("#Catalogo");
const buscador = document.querySelector("#buscador");
const filtroPlataforma = document.querySelector("#filtro-plataforma");
const contador = document.querySelector("#contador");

const TIPO_IVA = 21;

function calculaPreuAmbIva(precio) {
  return precio + (precio * TIPO_IVA / 100);
}

function mostrarMensaje(texto, esError) {
  mensajeJson.textContent = texto;
  mensajeJson.classList.toggle("mensaje-error", esError);
}

function validarDatos(datos) {
  if (
    !datos ||
    typeof datos !== "object" ||
    !datos.tienda ||
    typeof datos.tienda.nombre !== "string" ||
    !Array.isArray(datos.juegos)
  ) {
    return 'El JSON es válido, pero su estructura no es compatible: se esperan "tienda" y "juegos".';
  }

  for (let indice = 0; indice < datos.juegos.length; indice++) {
    const juego = datos.juegos[indice];
    const esJuegoValido =
      juego &&
      typeof juego.id === "string" &&
      typeof juego.titulo === "string" &&
      Array.isArray(juego.generos) &&
      juego.generos.every((genero) => typeof genero === "string") &&
      Array.isArray(juego.plataformas) &&
      juego.plataformas.every((plataforma) => typeof plataforma === "string") &&
      typeof juego.precio === "number" &&
      Number.isFinite(juego.precio) &&
      typeof juego.valoracion === "number" &&
      Number.isFinite(juego.valoracion) &&
      typeof juego.stock === "number" &&
      Number.isFinite(juego.stock) &&
      typeof juego.disponible === "boolean";

    if (!esJuegoValido) {
      return `El JSON es válido, pero el juego ${indice + 1} no tiene las claves o los tipos esperados.`;
    }

    if (
      (juego.descripcion !== undefined && typeof juego.descripcion !== "string") ||
      (juego.imagen !== undefined && typeof juego.imagen !== "string")
    ) {
      return `El JSON es válido, pero la descripción o imagen del juego ${indice + 1} no es válida.`;
    }
  }

  return "";
}

function crearTarjeta(juego) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("card_juegos");

  const codigo = document.createElement("h5");
  codigo.textContent = `Código: ${juego.id}`;

  const titulo = document.createElement("p");
  titulo.textContent = juego.titulo;
  titulo.classList.add("titulo_caja_catalogo");

  tarjeta.appendChild(codigo);
  tarjeta.appendChild(titulo);

  if (juego.imagen) {
    const imagen = document.createElement("img");
    imagen.src = juego.imagen;
    imagen.alt = `Imagen de ${juego.titulo}`;
    tarjeta.appendChild(imagen);
  }

  const genero = document.createElement("h5");
  genero.textContent = `Géneros: ${juego.generos.join(" | ")}`;

  const plataforma = document.createElement("h5");
  plataforma.classList.add("plataforma");
  plataforma.textContent = `Plataformas: ${juego.plataformas.join(", ")}`;

  const precio = document.createElement("h5");
  precio.classList.add("precio");
  precio.textContent = `${calculaPreuAmbIva(juego.precio).toFixed(2)}€`;

  const valoracion = document.createElement("h5");
  valoracion.classList.add("valoracion");
  valoracion.textContent = `Nota: ${juego.valoracion}`;

  const stock = document.createElement("h5");
  stock.classList.add("stock");

  if (juego.stock < 5) {
    tarjeta.classList.add("stock-bajo");
  }

  if (juego.disponible === false) {
    tarjeta.classList.add("agotado");
    stock.textContent = "Agotado";
  } else {
    stock.textContent = `Stock: ${juego.stock}`;
  }

  const descripcion = document.createElement("p");
  descripcion.classList.add("descripcion");
  descripcion.textContent = juego.descripcion || "Sin descripción";

  tarjeta.appendChild(genero);
  tarjeta.appendChild(plataforma);
  tarjeta.appendChild(precio);
  tarjeta.appendChild(valoracion);
  tarjeta.appendChild(stock);
  tarjeta.appendChild(descripcion);

  return tarjeta;
}

function mostrarJuegos(lista) {
  contenedor.textContent = "";
  contador.textContent = `Mostrando ${lista.length} de ${juegos.length} juegos`;

  if (lista.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "No se ha encontrado ningún juego.";
    contenedor.appendChild(mensaje);
    return;
  }

  for (const juego of lista) {
    contenedor.appendChild(crearTarjeta(juego));
  }
}

function filtrarJuegos() {
  if (juegos.length === 0) return;

  const texto = buscador.value.trim().toLowerCase();
  const plataformaElegida = filtroPlataforma.value;
  const resultado = juegos.filter((juego) => {
    const coincideTitulo = juego.titulo.toLowerCase().includes(texto);
    const coincidePlataforma =
      plataformaElegida === "Todas" || juego.plataformas.includes(plataformaElegida);
    return coincideTitulo && coincidePlataforma;
  });

  mostrarJuegos(resultado);
}

inputArchivo.addEventListener("change", () => {
  const archivo = inputArchivo.files[0];
  if (!archivo) return;

  juegos = [];
  contenedor.textContent = "";
  contador.textContent = "";
  tituloTienda.textContent = "";
  buscador.value = "";
  filtroPlataforma.value = "Todas";
  mostrarMensaje("Leyendo el archivo...", false);

  const lector = new FileReader();

  lector.addEventListener("load", () => {
    let datos;

    try {
      if (typeof lector.result !== "string") {
        throw new Error("No se pudo leer el contenido como texto.");
      }
      datos = JSON.parse(lector.result);
    } catch (error) {
      mostrarMensaje(`El archivo no contiene JSON válido: ${error.message}`, true);
      return;
    }

    const errorDeEstructura = validarDatos(datos);
    if (errorDeEstructura) {
      mostrarMensaje(errorDeEstructura, true);
      return;
    }

    juegos = datos.juegos;
    const ciudad = datos.tienda.ciudad || "Ciudad no indicada";
    tituloTienda.textContent = `${datos.tienda.nombre} - ${ciudad}`;
    mostrarMensaje("", false);
    mostrarJuegos(juegos);
  });

  lector.addEventListener("error", () => {
    mostrarMensaje("No se pudo leer el archivo seleccionado.", true);
  });

  lector.readAsText(archivo);
});

buscador.addEventListener("input", filtrarJuegos);
filtroPlataforma.addEventListener("change", filtrarJuegos);

mostrarMensaje("Selecciona un archivo JSON para cargar el catálogo.", false);
