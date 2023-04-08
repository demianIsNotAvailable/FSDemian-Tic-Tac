const jugador1 = "O";
const jugador2 = "X";

let jugadorActual = jugador1;
let turnos = 0;

let tablero = ["", "", "", "", "", "", "", "", ""];

const mesa = document.querySelector(".juego");

// funciones

// crear tablero

const crearTablero = () => {
  mesa.innerHTML = "";
  tablero.forEach((e, i) => {
    mesa.innerHTML += `<div id="casilla${i}" class="casilla" onclick="mover(${i})">${tablero[i]}</div>`;
    if (turnos < 6 && (e == jugador1 || e == jugador2)) {
      document.querySelector(`#casilla${i}`).classList.add("ocupada");
    } else if (turnos == 6 && e !== jugadorActual)
      document.querySelector(`#casilla${i}`).classList.add("ocupada");
  });
};

// resetear tablero

const reset = () => {
  tablero = ["", "", "", "", "", "", "", "", ""];
  turnos = 0;
  ganador.classList.remove("jugadorGana");
  ganador.innerText = "";
  crearTablero();
};

// jugar pvp (duda sobre argumentos)

const mover = (i) => {
  if (turnos < 6 && tablero[i] == "") {
    tablero[i] = jugadorActual;

    comprobarGanador();
    cambiarTurno();
    crearTablero();
  } else if (turnos===6) quitar(i)
};

const quitar = (i) => {
  if (tablero[i] === jugadorActual) {
    tablero[i] = "";
    turnos--;
    crearTablero()
    return null
  }
};

// comprobar si hay un ganador

const comprobarGanador = () => {};

// cambiar turno
const cambiarTurno = () => {
  jugadorActual = jugadorActual === jugador1 ? jugador2 : jugador1;
  turnos++;
};

crearTablero();
