const jugador1 = "O";
const jugador2 = "X";

let nombreJugador1 = "";
let nombreJugador2 = "";
let pvp = false;
let jugando = true;
let jugadorActual = jugador1;
let turnos = 0;
let fichasJugador1 = 3;
let fichasJugador2 = 3;
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
  } else  {
    tablero.forEach((e, i) => {
    
        document.querySelector(`#casilla${i}`).innerText = e;
        document.querySelector(`#casilla${i}`).classList.add("ocupada");
     
    });
  }
};

// resetear juego

const reset = () => {
  tablero = ["", "", "", "", "", "", "", "", ""];
  turnos = 0;
  fichasJugador1 = 3;
  fichasJugador2 = 3;
  jugadorActual = "O";
  jugando = true;
  document.querySelector("#fichasJugador1").textContent =
  `${fichasJugador1}` + " Fichas";
  document.querySelector("#fichasJugador2").textContent =
  `${fichasJugador2}` + " Fichas";
  document.querySelector('#reinicio').classList.remove("ganar")

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
      if (pvp===true && jugando===true) moverPvp(); 
    } else quitar(i);
  }
  return null;
};

const moverPvp = () => {
  let aux= []
  tablero.forEach((e, i) => {if (e === '') aux.push(i)})
  let ind = aux[Math.floor(Math.random()*aux.length)]
  if (fichasJugador2 === 0) {
    tablero[tablero.indexOf('X')] = ''
    fichasJugador2++
  }   
  tablero[ind] = 'X'

  actualizarTablero()
  comprobarGanador()
  cambiarTurno();

  tablero.forEach((e, i) => {
    document.querySelector(`#casilla${i}`).innerText = e})

  if (fichasJugador1 === 0) { 
    tablero.forEach((e, i) => {
      document.querySelector(`#casilla${i}`).innerText = e;
      document.querySelector(`#casilla${i}`).classList.add("ocupada");
      if (e === 'O') document.querySelector(`#casilla${i}`).classList.remove("ocupada");

  })
      
  }
}

// recolocar ficha

const quitar = (i) => {
  if (turnos === 6 && tablero[i] === jugadorActual) {
    tablero[i] = "";
    actualizarTablero();
    tablero.forEach((e, i) => {
      document.querySelector(`#casilla${i}`).innerText = tablero[i];
      document.querySelector(`#casilla${i}`).classList.remove("ocupada");
      if (e === jugador1 || e === jugador2) {
        document.querySelector(`#casilla${i}`).classList.add("ocupada");
      }
    });
    jugadorActual === jugador1 ? fichasJugador1++ : fichasJugador2++;
    document.querySelector("#fichasJugador1").textContent =`${fichasJugador1}` + " Fichas";
    document.querySelector("#fichasJugador2").textContent =`${fichasJugador2}` + " Fichas";

    turnos--;
    if (pvp === true) turnos--

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
        document.querySelector('#reinicio').classList.add("ganar")
    });
    
    jugando = false;
    const ganador = comprobarTablero()
    if (ganador === "O"){
      document.querySelector("#fichasJugador1").textContent = "¡" + nombreJugador1 + " ha ganado!";
      document.querySelector("#fichasJugador2").textContent = "¡" + nombreJugador2 + " ha perdido!";
    }
    if (ganador === "X"){
      document.querySelector("#fichasJugador1").textContent = "¡" + nombreJugador1 + " ha perdido!";
      document.querySelector("#fichasJugador2").textContent = "¡" + nombreJugador2 + " ha ganado!";
    }
    return jugadorActual
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
  if (jugando===true){
    jugadorActual === jugador1 ? fichasJugador1-- : fichasJugador2--;
    document.querySelector("#fichasJugador1").textContent =
    `${fichasJugador1}` + " Fichas";
    document.querySelector("#fichasJugador2").textContent =
    `${fichasJugador2}` + " Fichas";
    jugadorActual = jugadorActual === jugador1 ? jugador2 : jugador1;
    turnos++;
  }
};

// cambiar vistas
const cambiarVista = (destino) => {
  const vistas = document.querySelectorAll("div.vista");
  for (let i = 0; i < vistas.length; i++) vistas[i].classList.add("oculto");
  if (destino === `empezar`)
    document.querySelector("#vistaJugadores").classList.remove("oculto");
  if (destino === `reglas`)
    document.querySelector("#vistaReglas").classList.remove("oculto");
  if (destino === `victoria`)
    document.querySelector("#vistaVictoria").classList.remove("oculto");
  if (destino === `inicio`)
    document.querySelector("#vistaInicio").classList.remove("oculto");
  if (destino === `juego`)
    document.querySelector(`#vistaJuego`).classList.remove("oculto");
};

const modoDeJuego = () => {
  pvp = document.querySelector("#modoDeJuego").checked;

  if (pvp === true) {
    document.querySelector(`#input2`).classList.add("inactiva");
    return (document.querySelector(`#input2`).value = `Terminator`);
  }
  document.querySelector(`#input2`).classList.remove("inactiva");
  document.querySelector(`#input2`).value = ``;
};

const comprobarJugadores = () => {
  nombreJugador1 = document.querySelector("#input1").value ;
  nombreJugador2 = document.querySelector("#input2").value;
  if (!!nombreJugador1 && !!nombreJugador2) {
    document.querySelector("#nombreJugador1").textContent = nombreJugador1 + " (O)";
    document.querySelector("#nombreJugador2").textContent = nombreJugador2 + " (X)";
    cambiarVista(`juego`);
  }
};

crearTablero()
