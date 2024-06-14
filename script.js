const gameContent = document.querySelector("#gameContent");
const startContent = document.querySelector("#startContent");
const startGame = document.querySelector("#startGame");
const versus = document.querySelector("#versus");
const playerContent = document.querySelector("#playerContent");
const info1 = document.querySelector("#info1");
const info2 = document.querySelector("#info2");

// Joueur 1
const player1 = 1;
let player1Pv = 100;

//Joueur 2
const player2 = 2;
let player2Pv = 100;

// Choix aléatoire du joueur
const startingPlayer = () => {
    return Math.random() < 0.5 ? player1 : player2;
};
let currentPlayer;
console.log(currentPlayer);

// Dmg aléatoire des attaques

const randomAttack = () => {
    const min = 30;
    const max = 51;
    return Math.floor(Math.random() * (max - min)) + min;
};

// Commencer la Game

startGame.addEventListener("click", () => {
    startContent.style.display = "none";

    info1.textContent = `${player1Pv} PV`;
    info2.textContent = `${player2Pv} PV`;

    currentPlayer = startingPlayer();

    if (currentPlayer === player1) {
        versus.textContent = "Vous commencez !";
    } else {
        versus.textContent = "Le Gobelin commence !";
    }

    setTimeout(() => {
        versus.style.display = "none";
    }, 2000);

    playGame();
});

// Game logique

const playGame = () => {
   
    if (currentPlayer === player1) {
        playerAction();
    } else {
        setTimeout(() => {
            computerAction();
        }, 2500);
    }
};

// Action Joueur

const playerAction = () => {
    const attackBtn = document.createElement("button");
    attackBtn.textContent = "Attaquer";
    attackBtn.className =
        "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded";
    gameContent.appendChild(attackBtn);

    attackBtn.addEventListener("click", () => {
        let dmg = randomAttack();

        let playerDmg = document.createElement("p");
        playerDmg.textContent = `Votre attaque inflige ${dmg} dégâts`;
        playerDmg.className = "font-bold text-xl p-4";
        gameContent.appendChild(playerDmg);

        setTimeout(() => {
            playerDmg.style.display = "none";
        }, 2000);

        player2Pv -= dmg;
        info2.textContent = `${player2Pv} PV`;
        attackBtn.style.display = "none";

        if (checkEnd()) {
            return;
        }

        setTimeout(() => {
            currentPlayer = player2;
            playGame();
        }, 2000);
    });
};

// Action ordinateur

const computerAction = () => {
    let dmg = randomAttack();

    let computerDmg = document.createElement("p");
    computerDmg.textContent = `Le Gobelin vous inflige ${dmg} dégâts`;
    computerDmg.className = "font-bold text-xl p-4";
    gameContent.appendChild(computerDmg);

    setTimeout(() => {
        computerDmg.style.display = "none";
    }, 2000);

    player1Pv -= dmg;
    info1.textContent = `${player1Pv} PV`;

    if (checkEnd()) {
        return;
    }

    setTimeout(() => {
        currentPlayer = player1;
        playGame();
    }, 2000);
};

// Condition victoire

const checkEnd = () => {
    if (player1Pv <= 0) {
        setTimeout(() => {
            const playerLose = document.createElement("p");
            playerLose.textContent = "Le Gobelin vous à massacré !";
            playerLose.className = "font-bold text-xl p-4";
            gameContent.appendChild(playerLose);
        }, 2000);
        setTimeout(() => {
            replay();
        }, 4000);
        return true;
    } else if (player2Pv <= 0) {
        setTimeout(() => {
            const playerWin = document.createElement("p");
            playerWin.textContent = "Victoire !";
            playerWin.className = "font-bold text-xl p-4";
            gameContent.appendChild(playerWin);
        }, 2000);
        setTimeout(() => {
            replay();
        }, 4000);
        return true;
    }
    return false;
};

// Btn rejouer

const replay = () => {
    const replayBtn = document.createElement("button");
    replayBtn.textContent = "Rejouer";
    replayBtn.className =
        "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded";
    gameContent.insertBefore(replayBtn, gameContent.firstChild);

    replayBtn.addEventListener("click", () => {
        location.reload();
    });
};
