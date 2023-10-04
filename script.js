//  Obrázky ke hře z codecademy
let botDoorPath =
  "https://content.codecademy.com/projects/chore-door/images/robot.svg";
let beachDoorPath =
  "https://content.codecademy.com/projects/chore-door/images/beach.svg";
let spaceDoorPath =
  "https://content.codecademy.com/projects/chore-door/images/space.svg";
let closedDoorPath =
  "https://content.codecademy.com/projects/chore-door/images/closed_door.svg";


let doors = []; // dynamické pole dveří

// Získání elementu div uvnitř elementu s id select__number
let selectedNumberDiv = document.querySelector('#select__number');

// počet dveří
let numOfDoors = selectedNumberDiv.value;
let numClosedDoors = numOfDoors;

selectedNumberDiv.addEventListener("change", (e) => {
  numOfDoors = e.target.value; // Získání hodnoty ze selectu
numClosedDoors = numOfDoors; // Nastavení počtu zavřených dveří na počet dveří
createDoors(); // Zavolám funkci na vytvoření nových dveří
startRound(); // Restartuje hru s novým počtem dveří
});


let openDoors; // dynamické pole otevřených dveří
let currentlyPlaying = true;
let startButton = document.querySelector("#start");
let doorRow = document.querySelector(".door-row"); // element s třídou door-row


const createDoors = () => {
  // vymazání obsahu elementu s třídou door-row
  doors = [];
  doorRow.innerHTML = "";
// vytvoření elementů img podle počtu dveří a přiřazení do pole doors
for (let i = 0; i < numOfDoors; i++) {
  let newDoor = document.createElement("img");
  newDoor.src = closedDoorPath;
  // newDoor.id = "door" + i;
  newDoor.className = "door-frame";
  doorRow.appendChild(newDoor);
  doors.push(newDoor);
}
};
createDoors();

// Definuj herní logiku pro kontrolu dveří, progress ve hře, ukončení hry a výběr náhodných dveří

// kontrola, jestli jsou dveře zavřené
const isClicked = (door) => door.src === closedDoorPath;
// kontrola, jestli je za dveřmi bot
const isBot = (door) =>door.src === botDoorPath;


// kontrola statusu hry a její konec - jestil hráč vyhrál nebo prohrál
const gameOver = (status) => {
  if (status === "win") {
    startButton.textContent = "You win! Play again?";
  } else {
    startButton.textContent = "Game over! Play again?";
  }
  currentlyPlaying = false;
};

// kontrola, kolik dveří je zavřených a zda je za nimi bot
const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver("win");
  } else if (isBot(door)) {
    gameOver();
  }
};

// random generátor dveří
const randomChoreDoorGenerator = () => {
  // pole s obrázkem dveří s botem
  openDoors = [botDoorPath];
  // pole s obrázky dveří bez robota - pláž a vesmír
  let goodOpenDoors = [beachDoorPath, spaceDoorPath];

// pokud je délka pole doorImages menší než počet dveří, tak se pole zkopíruje do počtu dveří
 while (openDoors.length < doors.length) {
    openDoors = openDoors.concat(goodOpenDoors);
  }

  // potom se pole ořízne na počet dveří
  openDoors = openDoors.slice(0, doors.length);

// náhodně se zamíchají obrázky - pole odzadu dopředu a v každém kroku vymění aktuální obrázek s náhodně vybraným obrázkem z těch, které jsou před ním
  for (let i = doors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [openDoors[i], openDoors[j]] = [openDoors[j], openDoors[i]];
  }
  // výsledné pole s náhodně vybranými obrázky se přiřadí do pole openDoors
  // openDoors = doorImages;
};

doorRow.onclick = (e) => {
  // Pokud je hra stále aktivní a na dveře dosud nebylo kliknuto, tak se otevřou dveře, obrázek dveří se změní na obrázek, který je na [i] indexu v poli openDoors
  let door = e.target;
  let doorIndex = doors.indexOf(door);
    if (currentlyPlaying && isClicked(door)) {
      door.src = openDoors[doorIndex];
      playDoor(door);
    }
};

startButton.onclick = () => {
  if (!currentlyPlaying) {
    startRound();
  }
};

// Start nové hry
const startRound = () => {
  // každé dveře se nastaví na zavřené
  doors.forEach((door) => {
    door.src = closedDoorPath;
  });
  // počet zavřených dveří se nastaví na počet dveří
  numClosedDoors = numOfDoors;
  currentlyPlaying = true;
  startButton.textContent = "Good Luck!";
  randomChoreDoorGenerator();
};
startRound();
