document.addEventListener("DOMContentLoaded", (e) => {
  const nextBtn = document.querySelector("#next-button");
  const playBtn = document.querySelector("#play-button");
  const playAgainBtn = document.querySelector("#playAgainBtn");

  let players = JSON.parse(localStorage.getItem("players")) || [];

  class Player {
    constructor(name, choice) {
      this.name = name;
      this.choice = choice;
    }
  }

  // Funciones
  const getPlayerData = (playerId) => {
    const name = document.getElementById(`player${playerId}-name`).value.trim();
    const radioSelected = document.querySelector(
      `input[name="player${playerId}-choice"]:checked`
    );
    const choice = radioSelected ? radioSelected.value : null;
    
    const nameAlert = document.querySelector(`.player${playerId} .alertName`);
    const choiceAlert = document.querySelector(`.player${playerId} .alertChoice`);

    nameAlert.textContent = "";
    choiceAlert.textContent = "";

    if (!name) {
      nameAlert.textContent = "Por favor, ingrese un nombre.";
    }

    if (!choice) {
      choiceAlert.textContent = "Por favor, elija una opción.";
    }

    if (name && choice) {
      const player = new Player(name, choice);
      players.push(player);
      console.log(player);
      return true;
    } else {
      console.log(`Falta información para el jugador ${playerId}`);
      return false;
    }
  };

  const getWinner = () => {
    const player1 = players[0];
    const player2 = players[1];

    if (!player1.choice || !player2.choice) {
      return "Ambos jugadores deben elegir una opción.";
    }

    if (player1.choice === player2.choice) {
      return "Empate";
    }

    switch (player1.choice) {
      case "Piedra":
        return player2.choice === "Tijera"
          ? `${player1.name}`
          : `${player2.name}`;
      case "Papel":
        return player2.choice === "Piedra"
          ? `${player1.name}`
          : `${player2.name}`;
      case "Tijera":
        return player2.choice === "Papel"
          ? `${player1.name}`
          : `${player2.name}`;
      default:
        return "Opción no válida";
    }
  };

  // Eventos
  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (getPlayerData(1)) {
      document.querySelector(".player1").style.display = "none";
      document.querySelector(".player2").style.display = "flex";
    }
  });

  playBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (getPlayerData(2)) {
      const winner = getWinner();

      document.getElementById("player1-choice-display").textContent = `${
        players[0].name
      } eligió: ${players[0]?.choice || "N/A"}`;
      document.getElementById("player2-choice-display").textContent = `${
        players[1].name
      } eligió: ${players[1]?.choice || "N/A"}`;

      if (winner === "Empate") {
        document.getElementById(
          "winner-display"
        ).textContent = `Es un ${winner}`;
      } else {
        document.getElementById(
          "winner-display"
        ).textContent = `Ganador: ${winner}`;
      }

      document.querySelector(".player2").style.display = "none";
      document.querySelector(".results").style.display = "flex";
    }
  });

  playAgainBtn.addEventListener("click", (e) => {
    e.preventDefault();

    document.location.href = "./";
  });
});
