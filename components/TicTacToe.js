export const TicTacToe = {
  el: null,
  isGameEnd: false,
  isXTurn: true,
  matrix: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  wonCombinations: [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ],

  init({ el, onMove }) {
    this.el = el;
    this.onMove = onMove;
    this.boxes = el.querySelectorAll('.tic-tac-toe__ceil');
    return this;
  },

  initListeners() {
    this.boxes.forEach((box) => {
      box.addEventListener('click', (event) => {
        if (this.isGameEnd || !this.isBlockEmpty(event.target)) {
          return;
        }

        this.setBlockValue(event.target);
        this.setBlockDom(event.target);

        if (this.checkForWin()) {
          this.setGameEndStatus();
          setTimeout(() => {
            alert(`Победил ${this.getCurrentTurnValue()}`);
          });
          return;
        }

        if (!this.checkHasEmptyBlocks()) {
          this.setGameEndStatus();
          setTimeout(() => {
            alert('Конец игры. Ничья');
          });
          return;
        }

        this.changeTurnValue();
        if (this.onMove) {
          this.onMove(this.isXTurn);
        }
      });
    });
  },

  checkHasEmptyBlocks() {
    return this.matrix.some((row) => row.includes(null));
  },

  startGame() {
    this.initListeners();
    this.onMove(this.isXTurn);
  },

  restartGame() {
    this.isGameEnd = false;
    this.isXTurn = true;
    this.matrix = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.boxes.forEach((box) => {
      box.textContent = '';
    });
    this.onMove(this.isXTurn);
  },

  isBlockEmpty(target) {
    const [row, col] = this.getBlockPosition(target);
    return !this.matrix[row][col];
  },

  getBlockPosition(target) {
    const { row, col } = target.dataset;
    return [Number(row) - 1, Number(col) - 1];
  },

  setBlockValue(target, clear = false) {
    const [row, col] = this.getBlockPosition(target);
    this.matrix[row][col] = clear ? null : this.getCurrentTurnValue();
  },

  setBlockDom(target, clear = false) {
    target.textContent = clear ? '' : this.getCurrentTurnValue();
  },

  getCurrentTurnValue() {
    return this.isXTurn ? 'X' : 'O';
  },

  changeTurnValue() {
    this.isXTurn = !this.isXTurn;
  },

  checkForWin() {
    return this.wonCombinations.some((combination) => {
      const [a, b, c] = combination;
      const value = this.matrix[a[0]][a[1]];
      return (
        value &&
        value === this.matrix[b[0]][b[1]] &&
        value === this.matrix[c[0]][c[1]]
      );
    });
  },

  setGameEndStatus() {
    this.isGameEnd = true;
  },
};
