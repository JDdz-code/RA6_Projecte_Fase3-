# RA6 - Proyecto Fase 3: SpawnCamp

## Parte A - JSON anidado (cataleg_niat.json)
En las capturas aparece d. porque es la variable de la consola donde cargué el JSON. <br>
Rutas (niveles separados por puntos, listas contadas desde 0):


- `tienda.direccion.ciudad` → `"Barcelona"`
  <img width="1002" height="293" alt="ruta ciudad" src="https://github.com/user-attachments/assets/00610e62-9a15-45a5-ae00-070d491a886b" />
- `juegos[0].opiniones[1].nota` → `9.5`
  <img width="1002" height="293" alt="ruta nota" src="https://github.com/user-attachments/assets/0e3127cf-69e6-49de-9ed4-ef9376242760" />
- `juegos[7].opiniones[3].usuario` → `"Adrián"`
  <img width="1002" height="293" alt="ruta usuario" src="https://github.com/user-attachments/assets/609b2ded-a1c8-4655-b7db-bf59a45edd3b" />
- `juegos[1].plataformas[1]` → `"Saturn"`
  <img width="1002" height="293" alt="ruta plataforma" src="https://github.com/user-attachments/assets/a10aea84-6601-4b8b-83b5-8598e8fb5497"/>

## Parte B - API

Datos de jocs.json:
- Número: jocs[0].preu = 14.99
- Texto: jocs[0].titol = "Hollow Knight"
- Lista: jocs[0].generes = ["Metroidvania", "Acció"]
- Objeto dentro de objeto: jocs[0].desenvolupador.nom = "Team Cherry"
- Lista de objetos: jocs[0].opinions
## Parte C - SQLite
(tipo elegido para cada columna y cómo se guardarían las listas)<br>
<img width="1002" height="419" alt="image" src="https://github.com/user-attachments/assets/f658d168-826a-48b6-a1b7-2869fbec61b7" />
<img width="488" height="78" alt="image" src="https://github.com/user-attachments/assets/53dccac9-6451-413d-9748-a6ac9877bd6e" />

<img width="1038" height="661" alt="image" src="https://github.com/user-attachments/assets/0e5e7226-7347-4ef7-9481-989e5420b23d" />

<img width="1357" height="258" alt="image" src="https://github.com/user-attachments/assets/d9705ac6-1323-4572-84a7-82c145e3e882" />

## Parte E - Exportación
(qué pasa al cargar jocs_bd.json en la página y tres diferencias con el JSON anidado)




