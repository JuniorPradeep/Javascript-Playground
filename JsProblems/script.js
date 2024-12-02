const checkboxes = document.querySelectorAll('.checkbox');
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', (e) => {
        resetBoard();
        const [startRow, startCol] = getRowColFromIndex(e.target.id);
        rookPathTracker(startRow, startCol)
    });

}
function getIndexFromRowColumn(row, col) {
    const index = (row - 1) * 8 + col;
    return index;
}
function rookPathTracker(startRow, startCol) {
    directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    directions.forEach(([rowDelta, colDelta]) => {
        let row = startRow;
        let col = startCol;

        while (row > 0 && row <= 8 && col > 0 && col <= 8) {
            const idx = getIndexFromRowColumn(row, col);
            const cell = document.getElementById(idx);
            if (cell) {
                cell.style.backgroundColor = 'red';
            }
            row = row + rowDelta;
            col = col + colDelta;
        }

    });
}
function getRowColFromIndex(index) {
    const row = Math.floor((index - 1) / 8) + 1;
    const col = Math.floor((index - 1) % 8) + 1;
    return [row, col];
}

function resetBoard() {
    for (let i = 0; i < checkboxes.length; i++) {
        const index = checkboxes[i].id;
        const [row, col] = getRowColFromIndex(index);
        if (row % 2 !== 0) {
            if (col % 2 === 0) {
                checkboxes[i].style.backgroundColor = 'white';
            } else {
                checkboxes[i].style.backgroundColor = 'black';
            }

        } else {
            if (col % 2 === 0) {
                checkboxes[i].style.backgroundColor = 'black';
            } else {
                checkboxes[i].style.backgroundColor = 'white';
            }
        }

    }

}

