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

    comprobarGanador(tablero);
    cambiarTurno();
    crearTablero();
  } else quitar(i)
};

const quitar = (i) => {
  if (turnos === 6 && tablero[i] === jugadorActual) {
    tablero[i] = "";
    turnos--;
    crearTablero()
    return null
  }
};

// comprobar si hay un ganador

const comprobarGanador = (tablero) => {
  for (let i=0; i<3; i++) {
    if ((tablero[i]===jugadorActual) && (tablero[i]===tablero[i+3]) && (tablero[i]===tablero[i+6])) { // comprobar columnas
      console.log("columna")
      return true;
    }
  }
  for (let i=0; i<8; i+=3) {
    if ((tablero[i]===jugadorActual) && (tablero[i]===tablero[i+1]) && (tablero [i]===tablero[i+2])) { // comprobar filas
      console.log("fila")
      return true;
    }
  }
  if ((tablero[0]===jugadorActual) && (tablero[0]===tablero[4]) && (tablero[0]===tablero[8])) {
    console.log("diagonal principal")
    return true;
  }
  if ((tablero[2]===jugadorActual) && (tablero[2]===tablero[4]) && (tablero[2]===tablero[6])) {
    console.log("diagonal secundaria")
    return true;
  }  
};

// cambiar turno
const cambiarTurno = () => {
  jugadorActual = jugadorActual === jugador1 ? jugador2 : jugador1;
  turnos++;
};

crearTablero();
