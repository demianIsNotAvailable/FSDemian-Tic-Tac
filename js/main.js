const jugador = "O";
const computer = "X";

let tableroLleno = false;
let tablero = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".juego");

// funciones

// crear tablero

const crearTablero = () => {
  board_container.innerHTML = "";
  tablero.forEach((e, i) => {
    board_container.innerHTML += `<div id="casilla${i}" class="casilla" onclick="addjugadorMove(${i})">${tablero[i]}</div>`;
    if (e == jugador || e == computer) {
      document.querySelector(`#casilla${i}`).classList.add("ocupada");
    }
  });
};

// resetear tablero

const resetearTablero = () => {
  tablero = ["", "", "", "", "", "", "", "", ""];
  tableroLleno = false;
  ganador.classList.remove("jugadorGana");
  ganador.classList.remove("iaGana");
  ganador.innerText = "";
  crearTablero();
};

crearTablero();
