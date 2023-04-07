const jugador1 = "O";
const jugador2 = "X";

let jugadorActual = jugador1



let tableroLleno = false;
let tablero = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".juego");

// funciones

// crear tablero

const crearTablero = () => {
  board_container.innerHTML = "";
  tablero.forEach((e, i) => {
    board_container.innerHTML += `<div id="casilla${i}" class="casilla" onclick="mover(${i})">${tablero[i]}</div>`;
    if (e == jugador1 || e == jugador2) {
      document.querySelector(`#casilla${i}`).classList.add("ocupada");
    }
  });
};

// resetear tablero

const reset = () => {
  tablero = ["", "", "", "", "", "", "", "", ""];
  tableroLleno = false;
  ganador.classList.remove("jugadorGana");
  ganador.classList.remove("iaGana");
  ganador.innerText = "";
  crearTablero();
};

// jugar pvp

const mover = (i) => {
  if (tablero[i] == "") {
    tablero[i] = jugadorActual;
    crearTablero();
    comprobarGanador();
    cambiarTurno();
  }
};

// cambiar turno
const cambiarTurno = () => {
  jugadorActual = jugadorActual === jugador1 ? jugador2 : jugador1
}

crearTablero();
