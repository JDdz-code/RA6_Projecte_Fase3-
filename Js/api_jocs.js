const API = 'https://lluisbelmonte-rgb.github.io/botiga-api/api'; // dirección base del profesor
const contenidor = document.querySelector('#jocs');
const totalP = document.querySelector('#total');

function calculaMitjana(opinions) {
  if (opinions.length === 0) {
    return '0.0';
  }
  const suma = opinions.reduce((acumulat, o) => acumulat + o.nota, 0);
  return (suma / opinions.length).toFixed(1);
}

function creaTargeta(joc) {
  const targeta = document.createElement('div');
  targeta.classList.add('targeta');

  const titol = document.createElement('h2');
  titol.textContent = joc.titol;
  targeta.appendChild(titol);

  const dev = document.createElement('p');
  dev.textContent = joc.desenvolupador.nom + ' (' + joc.desenvolupador.pais + ')';
  targeta.appendChild(dev);

  const any = document.createElement('p');
  any.textContent = 'Año: ' + joc.any;
  targeta.appendChild(any);

  const generes = document.createElement('p');
  generes.textContent = 'Géneros: ' + joc.generes.join(', ');
  targeta.appendChild(generes);

  const preu = document.createElement('p');
  preu.textContent = 'Precio: ' + joc.preu.toFixed(2) + ' €';
  targeta.appendChild(preu);

  const nota = document.createElement('p');
  nota.textContent = 'Nota media: ' + calculaMitjana(joc.opinions);
  targeta.appendChild(nota);

  if (joc.disponible === false) {
    const esgotat = document.createElement('p');
    esgotat.classList.add('esgotat');
    esgotat.textContent = 'Agotado';
    targeta.appendChild(esgotat);
  }

  return targeta;
}

async function carregaJocs() {
  try {
    const resposta = await fetch(API + '/jocs.json');

    if (!resposta.ok) {
      throw new Error('Error ' + resposta.status);
    }

    const dades = await resposta.json();

    totalP.dataset.total = dades.total;
    totalP.textContent = 'Mostrando ' + dades.total + ' juegos';

    dades.jocs.forEach((joc) => {
      contenidor.appendChild(creaTargeta(joc));
    });

  } catch (error) {
    contenidor.textContent = 'No se ha podido cargar la API: ' + error.message;
  }
}

async function cercaJoc() {
  const codi = document.querySelector('#codi').value.trim().toUpperCase();
  contenidor.textContent = '';

  if (codi === '') {
    totalP.textContent = '';
    contenidor.textContent = 'Escribe un código';
    return;
  }

  try {
    const resposta = await fetch(API + '/jocs/' + codi + '.json');

    if (!resposta.ok) {
      totalP.textContent = '';
      contenidor.textContent = 'Este juego no existe';
      return;
    }

    const joc = await resposta.json();
    totalP.textContent = 'Mostrando 1 juego de ' + totalP.dataset.total;
    contenidor.appendChild(creaTargeta(joc));

  } catch (error) {
    totalP.textContent = '';
    contenidor.textContent = 'No se ha podido cargar la API: ' + error.message;
  }
}

document.querySelector('#cerca').addEventListener('click', cercaJoc);

carregaJocs();