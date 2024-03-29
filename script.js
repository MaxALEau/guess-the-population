let commune;
let population;
let tries = 0;
let maxTries = 15;

function startGame() {
    fetch('https://geo.api.gouv.fr/communes?fields=nom,population,departement&format=json')
        .then(response => response.json())
        .then(data => {
            commune = data[Math.floor(Math.random() * data.length)];
            population = commune.population;
            document.getElementById('commune').textContent = `Devinez la population de la commune ${commune.nom} dans le département ${commune.departement.nom}. Vous avez ${maxTries} essais.`;
        });
    tries = 0;
}

function makeGuess() {
    const guessInput = document.getElementById('guess');
    const guess = guessInput.value;
    if (guess === '') {
        return;
    }
    tries++;
    if (guess == population) {
        document.getElementById('result').textContent = `Correct ! Il y a ${population} habitants à ${commune.nom}.`;
        startGame();
    } else if (tries >= maxTries) {
        document.getElementById('result').textContent = `Désolé, vous n'avez pas deviné la population en ${maxTries} essais. Il y a ${population} habitants à ${commune.nom}.`;
        startGame();
    } else if (guess < population) {
        document.getElementById('result').textContent = `C'est plus. Il vous reste ${maxTries - tries} essais.`;
    } else {
        document.getElementById('result').textContent = `C'est moins. Il vous reste ${maxTries - tries} essais.`;
    }
    guessInput.value = '';
}

startGame();

document.getElementById('guess').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        makeGuess();
    }
});

document.getElementById('guess').addEventListener('keypress', function(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
    }
});