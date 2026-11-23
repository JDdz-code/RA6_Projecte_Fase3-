# Proyecto Fase 3 (RA6): Guardar y consultar el catálogo

## Contextualización

Este enunciado continúa el tercer bloque del proyecto del módulo 0373: a lo largo de todo el curso se trabaja con un único catálogo —el de una tienda ficticia de videojuegos que cada persona elige y personaliza—, que va evolucionando RA a RA hasta cubrir siete perspectivas diferentes (XML, validación, web, interactividad, transformación, almacenamiento y gestión comercial).

Hasta ahora, el catálogo se ha definido en XML (RA1 y RA4), se ha publicado como página web (RA2 y RA3) y se ha convertido a JSON y mostrado en HTML (RA5).

En este bloque hay que guardar y consultar el catálogo: se amplía el JSON con datos anidados, se consulta una API publicada, se guarda en una base de datos SQL y se diseña cómo quedaría en una base de datos que almacena JSON.

Esta fase se evalúa con una rúbrica propia y parte del archivo `cataleg.json` que entregasteis en la fase anterior (RA5).

**RA6:** Gestiona la información en formatos de intercambio de datos analizando y utilizando tecnologías de almacenamiento y lenguajes de consulta.

## Objetivo

Guardar y consultar los mismos datos de tres maneras:

- En un JSON anidado, que es lo que reciben las aplicaciones de las API.
- En una base de datos relacional SQLite, que se consulta con SQL y se exporta a JSON.
- En una base de datos documental, que guarda el JSON tal cual.

Comparándolas, se entiende qué aporta cada tecnología y cuándo conviene elegir una u otra.

## Enunciado

Se trabaja individualmente y sobre el `cataleg.json` de la fase anterior: no es necesario empezar desde cero ni añadir juegos nuevos.

Los datos de los juegos deben ser exactamente los mismos que los de vuestro JSON; solo se añaden datos nuevos cuando el apartado lo pide (la dirección de la tienda, las opiniones y un juego de prueba).

Lo único que hay que programar es la llamada a la API de la Parte B, reutilizando lo que ya sabéis de las fases anteriores; el resto se trabaja con un editor de texto, el navegador y DB Browser for SQLite.

## ¿Qué tenéis que hacer?

### Parte A - JSON anidado (`cataleg_niat.json`)

Punto de partida: el `cataleg.json` de la fase anterior, copiado en un archivo nuevo llamado `cataleg_niat.json`. El archivo original `cataleg.json` no se modifica.

**1. Objeto dentro de objeto:** en el objeto `botiga` (tienda) añadís un dato `adreca` (dirección) que sea, a su vez, un objeto con calle, ciudad y código postal, inventado pero coherente con vuestra tienda.

**2. Lista de objetos:** a cada juego le añadís una lista `opinions` (opiniones), donde cada opinión es un objeto con un usuario (texto) y una nota (número). Cada juego debe tener al menos dos opiniones y algún juego debe tener tres o más.

**3. Tipos coherentes:** los usuarios son nombres inventados, sin datos personales reales, y todas las notas son números entre 0 y 10: no se puede mezclar `"nota": 9` con `"nota": "nueve"`.

**4. Rutas:** en `README.md` escribid la ruta y el valor de cuatro datos de vuestro archivo, separando los niveles con puntos y contando las posiciones de las listas a partir de 0 (por ejemplo, `jocs[0].opinions[1].nota`). Como mínimo, una debe estar dentro de `adreca` y otra dentro de `opinions`.

**5. Validación:** el archivo debe pasar JSONLint sin errores. Si os perdéis entre tantos niveles, en Visual Studio Code podéis plegar y desplegar cada bloque.

### Parte B - Una API publicada: la API de la tienda (`api_jocs.html`)

**1. Qué es:** el profesor ha publicado una API con el catálogo de una tienda de referencia, Pixel Retro. Es de solo lectura: cada dirección (endpoint) devuelve JSON para programas, no una página para personas. La dirección base os la facilita el profesor en Classroom; en los ejemplos es:

`https://lluisbelmonte-rgb.github.io/botiga-api`

**2. Explorarla con Firefox:** abrid estas tres direcciones y recorred las pestañas JSON, Datos en bruto y Cabeceras, probando también el filtro:

- `/api/botiga.json`: los datos de la tienda, con la dirección como objeto anidado.
- `/api/jocs.json`: el catálogo completo, con el total y la lista `jocs`.
- `/api/jocs/JOC-001.json`: un solo juego, identificado por su código.

**3. Identificar los datos:** en `README.md` indicad, de la respuesta de `jocs.json`, un ejemplo de cada tipo: un número, un texto, una lista, un objeto dentro de otro objeto y una lista de objetos, con la ruta de cada uno.

**4. Llamarla desde JavaScript:** cread la página `api_jocs.html`, con `js/api_jocs.js` enlazado con `defer` y el `css/estils.css` del resto de la web.

Al abrirla, solicita `/api/jocs.json` mediante `fetch` y muestra, con el DOM, una tarjeta por juego con:

- El título.
- El desarrollador (nombre y país).
- El año.
- Los géneros.
- El precio con dos decimales.
- La nota media de las opiniones con un decimal.
- El texto «Agotado» si `disponible` es `false`.

Encima debe aparecer «Mostrando X juegos», con el total que proporciona la API.

**5. Buscar por código:** la página tiene un campo de texto y un botón. Al pulsarlo, solicita `/api/jocs/CODIGO.json` y muestra ese juego.

Si el código no existe, la respuesta no es correcta (`respuesta.ok` es `false`) y la página lo indica con el mensaje «Este juego no existe».

**6. Errores:** si la llamada falla (sin conexión o con la dirección equivocada), se captura mediante `try/catch` y se muestra un mensaje dentro de la página, creado con el DOM, sin utilizar `alert()`.

**7. Pensar en vuestra tienda:** la API tiene una dirección para el catálogo completo y otra para cada juego. En `README.md` explicad qué diferencia hay entre las dos respuestas (objeto o lista) y qué dos direcciones tendría la API de vuestra tienda.

**Pista: realizar una llamada a la API.**

La página funciona abriéndola directamente en el navegador, sin servidor: lo que está en un servidor es la API. Abrir una dirección en Firefox y hacer un `fetch` es la misma petición.

Este es el esqueleto que carga el catálogo y muestra sus títulos; debéis convertirlo en las tarjetas completas y añadir la búsqueda por código:

```javascript
// js/api_jocs.js
const API = 'https://USUARIO.github.io/botiga-api/api'; // dirección base del profesor
const contenidor = document.querySelector('#jocs');

async function carregaJocs() {
  try {
    const resposta = await fetch(API + '/jocs.json');

    if (!resposta.ok) {
      throw new Error('Error ' + resposta.status);
    }

    const dades = await resposta.json();

    dades.jocs.forEach((joc) => {
      const p = document.createElement('p');
      p.textContent = joc.titol + ' (' + joc.desenvolupador.nom + ')';
      contenidor.appendChild(p);
    });

  } catch (error) {
    contenidor.textContent = 'No se ha podido cargar la API: ' + error.message;
  }
}

carregaJocs();
```

**Para reflexionar:** `async` y `await` hacen que el código espere la respuesta del servidor antes de continuar.

Para solicitar un solo juego solo cambia la dirección:

```javascript
fetch(API + '/jocs/' + codi + '.json')
```

Si la respuesta no es correcta (por ejemplo, un 404), no tiene sentido leer su JSON: comprobad antes `resposta.ok`.

Para calcular la nota media, sumad las notas de `joc.opinions` con `reduce` y divididlas por el número de opiniones; y con `toFixed(1)` fijáis los decimales.

También podéis hacer una llamada desde el terminal con `curl` y la dirección de la API.

### Parte C - Base de datos SQLite (`cataleg.sql` y `cataleg.db`)

**1. Tabla:** con DB Browser for SQLite, cread la base de datos `cataleg.db` con una tabla `jocs` que tenga una columna para cada dato simple de los juegos (código, título, precio, stock y los demás que tenga vuestro catálogo), con el tipo adecuado: `TEXT`, `INTEGER` o `REAL`.

El booleano `disponible` no tiene un tipo propio en SQLite: se guarda como `INTEGER` (1 para `true` y 0 para `false`).

**2. Qué no cabe:** las listas (géneros, plataformas, opiniones) no se pueden guardar en una sola celda, así que no las pongáis en la tabla `jocs`.

En `README.md` explicad cómo se guardarían en una base de datos relacional; solo la idea, sin implementarla.

**3. Datos:** todos los juegos de `cataleg_niat.json` se añaden con sentencias `INSERT INTO` escritas por vosotros, sin importarlos desde ningún archivo y con los mismos datos que en el JSON.

**4. Script:** la sentencia `CREATE TABLE` y todos los `INSERT` se guardan en un único archivo `cataleg.sql` desde la pestaña Execute SQL.

Los cambios deben guardarse en la base de datos con Write Changes (Ctrl+S).

**5. Comprobación:** en Browse Data debe haber tantos juegos como en el JSON, con todos los campos correctamente rellenados.

### Parte D - Consultas SQL (`consultes.sql`)

**1. Archivo:** `consultes.sql` contiene las siguientes consultas, cada una con un comentario previo (`--`) que explique en una frase qué hace y qué devuelve:

- Todos los juegos, con todas las columnas (`SELECT *`).
- Solo el título y el precio de los juegos que cuestan menos de un importe que elijáis vosotros (`WHERE`).
- Los juegos que cuestan menos de un importe y que, al mismo tiempo, tienen stock (`AND`).
- Los juegos con un título que contenga una palabra que elijáis (`LIKE`).
- El título y el precio ordenados de más caro a más barato y, en otra consulta, de más barato a más caro (`ORDER BY`).
- Cuántos juegos hay, el precio medio y el precio máximo (`COUNT`, `AVG`, `MAX`).
- Los juegos agotados, es decir, con stock igual a 0 (`=`).

**2. Juego de prueba:** añadid mediante `INSERT` un juego de prueba con el código `JOC-999`; mostradlo con un `SELECT ... WHERE codi = 'JOC-999'`; cambiad su stock con un `UPDATE` con el mismo `WHERE`; y eliminadlo con un `DELETE` con el mismo `WHERE`.

Terminad con un `COUNT` que demuestre que la tabla vuelve a tener únicamente los juegos originales.

**3. Precaución:** `UPDATE` y `DELETE` siempre deben llevar `WHERE` y, antes de modificar o eliminar, se realiza un `SELECT` con el mismo `WHERE` para ver qué filas cambiarán.

**4. Ejecución:** todas las consultas deben ejecutarse en Execute SQL sin errores.

**Pista: una consulta combinada.**

Una misma sentencia puede filtrar, seleccionar columnas y ordenar al mismo tiempo. Adaptadla a vuestro catálogo y a los importes que elijáis:

```sql
-- Juegos de menos de 15 euros con stock, del más caro al más barato
SELECT titol, preu
FROM jocs
WHERE preu < 15 AND estoc > 0
ORDER BY preu DESC;
```

### Parte E - Exportar a JSON (`jocs_bd.json`)

**1. Exportación:** desde DB Browser, exportad la tabla `jocs` a JSON (File → Export → Table(s) to JSON...) y guardadla, sin modificarla, como `jocs_bd.json`.

**2. Prueba en la página:** cargad `jocs_bd.json` en `cataleg_json.html` de la fase anterior, sin modificarla, y observad qué ocurre. En `README.md` explicad qué habéis visto y por qué.

**3. Comparación:** comparad `jocs_bd.json` con `cataleg_niat.json` e indicad en `README.md` tres diferencias:

- La estructura general.
- Lo que falta.
- Qué ocurre con los tipos de los datos.

## Explicación del proceso

Un archivo `README.md` de 12 a 16 líneas que indique:

- Las cuatro rutas de la Parte A, con sus valores.
- De la API (Parte B): un ejemplo de cada tipo de dato con su ruta, la diferencia entre la respuesta de `jocs.json` y la de un solo juego, y las dos direcciones que tendría vuestra tienda.
- El tipo SQLite que habéis elegido para cada columna y cómo se guardarían las listas que no caben (Parte C).
- Qué ocurre al cargar `jocs_bd.json` en la página y tres diferencias con el JSON anidado (Parte E).

## Pistas

Recursos que os pueden ser útiles:

- `json.org` y JSONLint para la sintaxis.
- El visor JSON de Firefox, con su filtro, para explorar la API.
- La guía «Using the Fetch API» de MDN (`developer.mozilla.org`) para realizar llamadas.
- DB Browser for SQLite (`sqlitebrowser.org`), con las pestañas Database Structure, Browse Data y Execute SQL.
- El tutorial de SQL de `w3schools.com/sql`.
- La documentación de MongoDB sobre cómo consultar documentos (`mongodb.com/docs/manual/tutorial/query-documents`).

Recordad que en SQL los textos van entre comillas simples (`'Celeste'`) y en JSON entre comillas dobles (`"Celeste"`), y que cada sentencia SQL termina con punto y coma.

## Restricciones

**1.** Los datos de los juegos son los de `cataleg.json`: solo se crean datos nuevos para la dirección, las opiniones y el juego de prueba `JOC-999`.

**2.** En la Parte B solo se utiliza JavaScript puro y se mantienen las restricciones de las fases anteriores: código externo enlazado con `defer`, `const` por defecto y `let` solo si es necesario, comparaciones con `===` y `!==`, ningún `alert()` ni estilos en línea.

Los datos se solicitan a la API con `fetch`: no se copian dentro del JavaScript ni del HTML.

**3.** Todos los archivos `.json` son JSON estándar (RFC 8259), pasan JSONLint sin errores, están en UTF-8 y tienen una indentación de dos espacios.

**4.** Todo se hace a mano: no se importan datos a la base de datos desde ningún CSV ni JSON, ni se utiliza ningún programa para generar los archivos. La única exportación permitida es la de la Parte E.

**5.** En SQL, las palabras clave van en mayúsculas, las sentencias terminan con punto y coma, los textos van entre comillas simples y `UPDATE` y `DELETE` siempre llevan `WHERE`.

**6.** Los nombres de los archivos y de las columnas van en minúsculas, sin espacios ni acentos.

**7.** Debéis ser capaces de explicar qué hace cada consulta y por qué cada dato es un objeto, una lista, un texto o un número.

## ¿Qué tenéis que entregar?

`RA6_Projecte_Fase_3_botiga_nom_cognom.zip`: una carpeta con:

- `cataleg_niat.json`
- La página `api_jocs.html` con las carpetas `css/` y `js/`.
- `cataleg.sql`
- `cataleg.db`
- `consultes.sql`
- `jocs_bd.json`
- El archivo `README.md`.

La base de datos `cataleg.db` debe contener la tabla `jocs` únicamente con los juegos originales, los archivos `.json` deben pasar el validador sin errores, la página `api_jocs.html` debe funcionar abriéndola en el navegador con la dirección de la API del profesor y las consultas deben ejecutarse sin errores en DB Browser.