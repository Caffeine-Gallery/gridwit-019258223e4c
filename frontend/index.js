import { backend } from 'declarations/backend';

let currentPuzzle;

async function initCrossword() {
    currentPuzzle = await backend.getRandomPuzzle();
    renderGrid(currentPuzzle.grid);
    renderClues(currentPuzzle.acrossClues, 'across-clues');
    renderClues(currentPuzzle.downClues, 'down-clues');
}

function renderGrid(grid) {
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    grid.forEach((row, i) => {
        row.forEach((cell, j) => {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.dataset.row = i;
            input.dataset.col = j;
            if (cell === null) {
                input.disabled = true;
                input.classList.add('blocked');
            }
            gridElement.appendChild(input);
        });
    });
}

function renderClues(clues, elementId) {
    const cluesList = document.getElementById(elementId);
    cluesList.innerHTML = '';
    clues.forEach(([number, clue]) => {
        const li = document.createElement('li');
        li.textContent = `${number}. ${clue}`;
        cluesList.appendChild(li);
    });
}

function getSolution() {
    const grid = document.getElementById('grid');
    const inputs = grid.querySelectorAll('input:not(.blocked)');
    const solution = Array(currentPuzzle.grid.length).fill().map(() => Array(currentPuzzle.grid[0].length).fill(null));
    
    inputs.forEach(input => {
        const i = parseInt(input.dataset.row);
        const j = parseInt(input.dataset.col);
        solution[i][j] = input.value.toUpperCase() || null;
    });
    
    return solution;
}

document.getElementById('submit-btn').addEventListener('click', async () => {
    const solution = getSolution();
    const isCorrect = await backend.checkSolution(solution);
    const resultElement = document.getElementById('result');
    resultElement.textContent = isCorrect ? 'Correct!' : 'Try again!';
});

initCrossword();
