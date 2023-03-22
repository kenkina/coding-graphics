const { round } = require("./maths.js");

class Graphic {

  #label
  #originalSeed
  #seed
  #seedInteger
  #seedDecimal
  #nRows
  #matrix

  constructor(label, seed, maxColumnsPerGraphic = 10, referenceValue = 6) {
    // TODO: if label is invalid (?)
    // label: max = maxColumnsPerGraphic

    // TODO: if seed is not number

    this.#label = label + " ".repeat(maxColumnsPerGraphic - label.length);
    this.#originalSeed = seed;

    // Consider only one decimal
    this.#seed = round(seed * maxColumnsPerGraphic / referenceValue, 1);

    // Extract integer and decimal from seed
    this.#seedInteger = Math.abs(Math.trunc(this.#seed));
    this.#seedDecimal = Math.abs(Math.trunc(this.#seed % 1 * 10));

    // Construct the graphic matrix
    this.#nRows = (this.#seedDecimal > 0) ? this.#seedInteger + 1 : this.#seedInteger;
    this.#matrix = [];
  }

  getLabel() { return this.#label; }
  getSeed() { return this.#seed; }
  getSeedInteger() { return this.#seedInteger; }
  getSeedDecimal() { return this.#seedDecimal; }
  getNRows() { return this.#nRows; }
  getMatrix() { return this.#matrix; }

  setMatrix(rows, columns, symbol = "") {
    this.#matrix = Array(rows).fill(null).map(() => Array(columns).fill(symbol));
  }

  setMatrixValue(row, column, value) {
    this.#matrix[row][column] = value;
  }

  reverseMatrix() {
    this.#matrix = this.#matrix.reverse();
  }


}

Graphic.prototype.toString = function () {
  return 'Hello! i am ';
}

module.exports = { Graphic }