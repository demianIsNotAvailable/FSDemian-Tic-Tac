const jugador1 = "O";
const jugador2 = "X";


let jugando = true;
let jugadorActual = jugador1;
let turnos = 0;
let tablero = ["", "", "", "", "", "", "", "", ""];

const mesa = document.querySelector(".juego");

// funciones

// (re)crear tablero

const crearTablero = () => {
  mesa.innerHTML = "";
  tablero.forEach((e, i) => {
    mesa.innerHTML += `<div id="casilla${i}" class="casilla" onclick="mover(${i})">${tablero[i]}</div>`;
  });
};

const actualizarTablero = () => {
  if (turnos < 6) {
    tablero.forEach((e, i) => {
      if (e === jugador1 || e === jugador2) {
        document.querySelector(`#casilla${i}`).classList.add("ocupada");
        document.querySelector(`#casilla${i}`).innerText = tablero[i];
      }
    });
  } else if (turnos == 6) {
    tablero.forEach((e, i) => {
      if (e !== jugadorActual) {
        document.querySelector(`#casilla${i}`).classList.add("ocupada");
        document.querySelector(`#casilla${i}`).innerText = tablero[i];
      } else {
        document.querySelector(`#casilla${i}`).classList.remove("ocupada");
        document.querySelector(`#casilla${i}`).innerText = tablero[i];
      }
    });
  }
};

// resetear juego

const reset = () => {
  tablero = ["", "", "", "", "", "", "", "", ""];
  turnos = 0;
  jugadorActual = "O";
  jugando = true;

  crearTablero();
};

// 2 jugadores

const mover = (i) => {
  if (jugando === true) {
    if (turnos < 6 && tablero[i] == "") {
      tablero[i] = jugadorActual;

      comprobarGanador();
      cambiarTurno();
      actualizarTablero();
    } else quitar(i);
  }
  return null;
};

// recolocar ficha

const quitar = (i) => {
  if (turnos === 6 && tablero[i] === jugadorActual) {
    tablero[i] = "";
    turnos--;
    crearTablero();
    return null;
  }
};

// comprobar si hay un ganador

const comprobarGanador = () => {
  let ganador = comprobarTablero();
  if (ganador === jugadorActual) {
    tablero.forEach((e, i) => {
      if (e === jugadorActual)
        document.querySelector(`#casilla${i}`).classList.add("ganar");
        document.querySelector(`#casilla${i}`).classList.add("inactiva");
    });
    jugando = false;
  }
};

// comprobar si una línea es ganadora

const comprobarLinea = (a, b, c) => {
  if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c])
    return true;
};

// recorrer el tablero por:
// - filas
// - columnas
// - diagonales
const comprobarTablero = () => {
  for (i = 0; i < 9; i += 3) {
    if (comprobarLinea(i, i + 1, i + 2)) {
      return tablero[i];
    }
  }

  for (i = 0; i < 3; i++) {
    if (comprobarLinea(i, i + 3, i + 6)) {
      return tablero[i];
    }
  }

  if (comprobarLinea(0, 4, 8)) {
    return tablero[0];
  }

  if (comprobarLinea(2, 4, 6)) {
    return tablero[2];
  }
};

// cambiar turno
const cambiarTurno = () => {
  jugadorActual = jugadorActual === jugador1 ? jugador2 : jugador1;
  turnos++;
};


// cambiar vistas 
const cambiarVista = (destino) => {
  const vistas = document.querySelectorAll("div.vista")
  for (let i=0; i<vistas.length; i++)  vistas[i].classList.add("oculto")
    if (destino === `empezar`) document.querySelector("#vistaJugadores").classList.remove("oculto")
    if (destino === `reglas`) document.querySelector("#vistaReglas").classList.remove("oculto")
    if (destino === `juego`) document.querySelector("#vistaJuego").classList.remove("oculto")
    if (destino === `victoria`) document.querySelector("#vistaVictoria").classList.remove("oculto")
    if (destino === `inicio`) document.querySelector("#vistaInicio").classList.remove("oculto")


}

crearTablero()