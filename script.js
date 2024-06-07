document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const statusText = document.getElementById('status');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `Player ${currentPlayer} has won!`;
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            statusText.textContent = 'Game is a draw!';
            isGameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `It's ${currentPlayer}'s turn`;
    };

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

        if (board[clickedCellIndex] !== '' || !isGameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        handleResultValidation();
    };

    const handleReset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        currentPlayer = 'X';
        statusText.textContent = `It's ${currentPlayer}'s turn`;

        cells.forEach(cell => {
            cell.textContent = '';
        });
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleReset);
});
