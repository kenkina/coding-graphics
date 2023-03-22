const { Graphic } = require('./graphic.js');

class Dashboard {

  #graphics
  #config

  constructor(graphics, config) {
    this.#graphics = graphics;
    this.#config = config;

    /* this.#graphics.forEach(graphic => {
      console.info(graphic.toString());
    }); */
  }


  getMaxSeed() {
    const seedGraphic = this.#graphics.reduce((accumulator, current) => {
      return accumulator.getSeed() > current.getSeed() ? accumulator : current;
    });

    let seed = seedGraphic.getSeed();

    if (seed < 0) {
      //console.info('seed < 0:', seed);
      return 0;
    }

    if (seed % 1 !== 0) {
      //console.info('seed has decimals', seed, ++seed);
    }

    return Math.ceil(seed);
  }

  getMinSeed() {
    const seedGraphic = this.#graphics.reduce((accumulator, current) => {
      return accumulator.getSeed() < current.getSeed() ? accumulator : current;
    });

    let seed = seedGraphic.getSeed();

    if (seed > 0) {
      //console.info('seed > 0:', seed);
      return 0;
    }

    // Does seed have decimals?
    if (seed % 1 !== 0) {
      //console.info('seed has decimals', seed, --seed);
    }

    return Math.ceil(seed);
  }

  build() {
    let maxRow = this.getMaxSeed();
    let minRow = this.getMinSeed();

    if (maxRow === 0 && maxRow < Math.abs(minRow)) {
      maxRow = Math.abs(minRow);
    }

    this.#graphics.forEach(graphic => {
      // const rows = maxRow != 0 ? maxRow : Math.abs(minRow);
      graphic.setMatrix(maxRow, this.#config.maxColumnsPerGraphic, this.#config.symbol.E);

      const rInit = graphic.getNRows() === maxRow ? 0 : maxRow - graphic.getNRows();
      for (let rIndex = rInit; rIndex < maxRow; rIndex++) {

        for (let cIndex = 0; cIndex < this.#config.maxColumnsPerGraphic; cIndex++) {

          if (rIndex === maxRow - graphic.getNRows() && graphic.getSeedDecimal() > 0) {
            for (; cIndex < graphic.getSeedDecimal(); cIndex++) {
              graphic.setMatrixValue(rIndex, cIndex, this.#config.symbol.D);
            }
            for (; cIndex < this.#config.maxColumnsPerGraphic; cIndex++) {
              graphic.setMatrixValue(rIndex, cIndex, this.#config.symbol.X);
            }
          } else {
            for (; cIndex < this.#config.maxColumnsPerGraphic; cIndex++) {
              graphic.setMatrixValue(rIndex, cIndex, this.#config.symbol.I);
            }
          }
        }
      }

      if (graphic.getSeed() < 0) {
        graphic.reverseMatrix();
      }

    });

    /* this.#graphics.forEach(graphic => {
      console.table(graphic.getMatrix());
    }) */
  }


  draw() {

    const maxRow = this.getMaxSeed();
    const minRow = this.getMinSeed();

    // console.info("maxRow: ", maxRow, "minRow", minRow);


    for (let dRowIndex = 0; dRowIndex < maxRow; dRowIndex++) {
      let dRow = "";
      this.#graphics.forEach(graphic => {
        dRow += this.#config.symbol.SC;
        if (graphic.getSeed() > 0) {
          dRow += graphic.getMatrix()[dRowIndex].join(this.#config.symbol.SL);
        } else {
          dRow += this.#config.symbol.N.repeat(this.#config.maxColumnsPerGraphic);
        }
      });
      dRow += this.#config.symbol.SC;

      //console.info(dRowIndex, "dRow", dRow);
      console.info(dRow);
    }

    let dRow = "";
    this.#graphics.forEach(graphic => {
      dRow += this.#config.symbol.SC;
      dRow += graphic.getLabel();
    });
    dRow += this.#config.symbol.SC;
    console.info(dRow);

    for (let dRowIndex = 0; dRowIndex < -minRow; dRowIndex++) {
      let dRow = "";
      this.#graphics.forEach(graphic => {
        dRow += this.#config.symbol.SC;
        if (graphic.getSeed() < 0) {
          dRow += graphic.getMatrix()[dRowIndex].join(this.#config.symbol.SL);
        } else {
          dRow += this.#config.symbol.P.repeat(this.#config.maxColumnsPerGraphic);
        }
      });
      dRow += this.#config.symbol.SC;

      //console.info(dRowIndex, "dRow", dRow);
      console.info(dRow);
    }
  }

}

module.exports = { Dashboard }