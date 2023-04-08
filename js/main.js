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
  pvp.innerText = "Jugar 1 contra Jugador 2";
  crearTablero();
};

// jugar pvp (duda sobre argumentos)

const mover = (i) => {
  if (turnos < 6 && tablero[i] == "") {
    tablero[i] = jugadorActual;

    comprobarGanador(tablero);
    cambiarTurno();
    crearTablero();
  } else quitar(i);
};

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
  let ganador = comprobarTablero()
  if (ganador === jugador1) {
    pvp.innerText = "Gana el jugador 1!"
  }
  else if (ganador === jugador2) pvp.innerText = "Gana el jugador 2!"
};

const comprobarLinea= (a, b, c) => {
  if (tablero[a] && tablero[a]===tablero[b] && tablero[a]===tablero[c])
    return true;
}

const comprobarTablero = () => {
  for (i = 0; i < 9; i += 3) {
    if (comprobarLinea(i, i + 1, i + 2)) {
      document.querySelector(`#casilla${i}`).classList.add("ganar");
      document.querySelector(`#casilla${i + 1}`).classList.add("ganar");
      document.querySelector(`#casilla${i + 2}`).classList.add("ganar");
      return tablero[i];
    }
  }

  for (i = 0; i < 3; i++) {
    if (comprobarLinea(i, i + 3, i + 6)) {
      document.querySelector(`#casilla${i}`).classList.add("ganar");
      document.querySelector(`#casilla${i + 3}`).classList.add("ganar");
      document.querySelector(`#casilla${i + 6}`).classList.add("ganar");
      return tablero[i];
    }
  }

  if (comprobarLinea(0, 4, 8)) {
    document.querySelector(`#casilla${0}`).classList.add("ganar");
    document.querySelector(`#casilla${4}`).classList.add("ganar");
    document.querySelector(`#casilla${8}`).classList.add("ganar");
    return tablero[0];
  }

  if (comprobarLinea(2, 4, 6)) {
    document.querySelector(`#casilla${2}`).classList.add("ganar");
    document.querySelector(`#casilla${4}`).classList.add("ganar");
    document.querySelector(`#casilla${6}`).classList.add("ganar");
    return tablero[2];
  }
};

// cambiar turno
const cambiarTurno = () => {
  jugadorActual = jugadorActual === jugador1 ? jugador2 : jugador1;
  turnos++;
};

crearTablero();
