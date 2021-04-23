let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias del HTML
const btnDetener = document.querySelector("#btnDetener");
const btnPedir = document.querySelector("#btnPedir");
const btnNuevo = document.querySelector("#btnNuevo");

const cartaComputadora = document.querySelector("#computadora-cartas");
const cartaJugador = document.querySelector("#jugador-cartas");

const puntosHTML = document.querySelectorAll("small");

console.log(cartaJugador);

//función que crea un nuevo deck
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }

  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

//Mandar llamar al deck
crearDeck();

//Esta función me permite pedir una carta

const pedirCarta = () => {
  if (deck.length <= 0) {
    throw " No hay más cartas el el deck.";
  }

  const carta = deck.shift();

  console.log(deck);
  console.log(carta);
  return carta;
};

//pedirCarta();

// for (let i = 0 ; i <= 100 ; i ++){
//     pedirCarta();
// }

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// Turno de la computadora

const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.alt = `${carta}`;
    imgCarta.className = "carta";
    cartaComputadora.append(imgCarta);

    if (puntosComputadora > 21) {
      console.warn("Ganaste.");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
    } else if (puntosComputadora === 21) {
      console.log("La casa gana");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
    }
    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Nadie gana :(' ");
    } else if (puntosMinimos > 21) {
      alert("La computadora gana!");
    } else if (puntosComputadora > 21) {
      alert("Haz ganado!");
    } else {
      alert("La computadora gana!");
    }
  }, 500);
};

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

//Eventos Jugador
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);

  puntosHTML[0].innerText = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.alt = `${carta}`;
  imgCarta.className = "carta";
  cartaJugador.append(imgCarta);

  if (puntosJugador > 21) {
    console.warn("Lo siento mucho, perdiste.");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.log("Ganaste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnNuevo.addEventListener("click", () => {
  console.clear();
  deck = [];
  deck = crearDeck();

  puntosComputadora = 0;
  puntosJugador = 0;

  puntosHTML[0].innerText = 0;
  puntosHTML[1].innerText = 0;

  cartaJugador.innerHTML = "";
  cartaComputadora.innerHTML = "";

  btnPedir.disabled = false;
  btnDetener.disabled = false;
});
