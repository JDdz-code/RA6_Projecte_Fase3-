# RA6 - Proyecto Fase 3: SpawnCamp

## Parte A - JSON anidado (cataleg_niat.json)
Rutas de cuatro datos (niveles separados por puntos, listas contadas desde 0). En las capturas aparece `d.` porque es el nombre de la variable de la consola donde cargué el JSON; no existe en el archivo.
- `tienda.direccion.ciudad` → `"Barcelona"`
  <img width="1002" height="293" alt="ruta ciudad" src="https://github.com/user-attachments/assets/00610e62-9a15-45a5-ae00-070d491a886b" />
- `juegos[0].opiniones[1].nota` → `9.5`
  <img width="1002" height="293" alt="ruta nota" src="https://github.com/user-attachments/assets/0e3127cf-69e6-49de-9ed4-ef9376242760" />
- `juegos[7].opiniones[3].usuario` → `"Adrián"`
  <img width="1002" height="293" alt="ruta usuario" src="https://github.com/user-attachments/assets/609b2ded-a1c8-4655-b7db-bf59a45edd3b" />
- `juegos[1].plataformas[1]` → `"Saturn"`
  <img width="1002" height="293" alt="ruta plataforma" src="https://github.com/user-attachments/assets/a10aea84-6601-4b8b-83b5-8598e8fb5497" />

## Parte B - API
Ejemplos de `jocs.json`: número `jocs[0].preu` = `14.99`; texto `jocs[0].titol` = `"Hollow Knight"`; lista `jocs[0].generes` = `["Metroidvania", "Acció"]`; objeto dentro de objeto `jocs[0].desenvolupador.nom` = `"Team Cherry"`; lista de objetos `jocs[0].opinions`, cuyo primer elemento `jocs[0].opinions[0]` = `{"usuari": "marta_23", "nota": 9}`.
Diferencia: `jocs.json` devuelve un objeto con `total` y la lista `jocs` con todos los juegos; `JOC-001.json` devuelve directamente un único objeto, el propio juego.
Direcciones de mi tienda: `/api/juegos.json` (catálogo completo) y `/api/juegos/RET-001.json` (un juego por su código).

## Parte C - SQLite
Tipos: `id`, `titulo`, `fecha`, `imagen`, `descripcion`, `comentario` → TEXT; `precio`, `valoracion` → REAL; `stock`, `disponible` → INTEGER (1 = true, 0 = false).
Las listas (`generos`, `plataformas`, `opiniones`) irían en tablas aparte, con una fila por elemento y una columna `id_juego` que apunta al juego; en plataformas, una tabla intermedia, porque un juego está en varias plataformas y una plataforma en muchos juegos.

<img width="1002" height="419" alt="captura 1 parte C" src="https://github.com/user-attachments/assets/f658d168-826a-48b6-a1b7-2869fbec61b7" />
<img width="488" height="78" alt="captura 2 parte C" src="https://github.com/user-attachments/assets/53dccac9-6451-413d-9748-a6ac9877bd6e" />
<img width="1038" height="661" alt="captura 3 parte C" src="https://github.com/user-attachments/assets/0e5e7226-7347-4ef7-9481-989e5420b23d" />
<img width="1357" height="258" alt="captura 4 parte C" src="https://github.com/user-attachments/assets/d9705ac6-1323-4572-84a7-82c145e3e882" />

## Parte E - Exportación
Al cargar `jocs_bd.json` en la página sale «El JSON es válido, pero su estructura no es compatible: se esperan "tienda" y "juegos"», porque el código busca un objeto con esas dos claves y el archivo exportado es solo una lista de juegos.
Diferencias con `cataleg_niat.json`:
- Estructura: una lista `[...]` de objetos planos, sin el objeto principal con `tienda` y `juegos`.
- Lo que falta: los datos de la tienda (nombre, dirección) y las listas `generos`, `plataformas` y `opiniones`, que no caben en la tabla.
- Tipos: `disponible` pasa de `true`/`false` a `1`/`0`, y los datos que no existen aparecen como `null`.
