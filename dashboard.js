const { Graphic } = require('./graphic.js')

function round(value, precision) {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}


const config = {
  maxWidthPerGraphic: 10,
  spaceBetweenGraphics: 5,
  isVertical: true,
  symbol: {
    D: "*", // Decimal,
    I: "*", // Integer,
    E: "-", // Empty,
    X: "-", // Empty by Decimal,
    N: "-", // Empty Negative,
    P: "-", // Empty Positive,
    SL: "", // Space between symbols,
    SC: " | ", // Space between columns,
  }
}

/* 
    D: "D", // Decimal,
    I: "I", // Integer,
    E: "-", // Empty,
    X: "X", // Empty by Decimal,
    N: "N", // Empty Negative,
    P: "P", // Empty Positive,
    SL: "", // Space between symbols,
    SC: " | ", // Space between columns,

    D: "*", // Decimal,
    I: "*", // Integer,
    E: "-", // Empty,
    X: "-", // Empty by Decimal,
    N: "-", // Empty Negative,
    P: "-", // Empty Positive,
    SL: "", // Space between symbols,
    SC: " | ", // Space between columns,

    D: "*", // Decimal,
    I: "*", // Integer,
    E: " ", // Empty,
    X: " ", // Empty by Decimal,
    N: " ", // Empty Negative,
    P: " ", // Empty Positive,
    SL: "", // Space between symbols,
    SC: " | ", // Space between columns,
*/



class Dashboard {
  constructor() {
    this.graphics =
      [
        new Graphic("Label 1 ", 6),
        //new Graphic("Label 2 ", 2.98),
        new Graphic("Label 3 ", 3.85),
        //new Graphic("Label 4 ", 1),
        //new Graphic("Label 5 ", -6),
        new Graphic("Label 6 ", -3.85),
        //new Graphic("Label 0 ", 0),
      ]

    console.log("- -- -- graphics !!!");
    this.graphics.forEach(graphic => {
      console.log(graphic);
    })
  }


  getMaxSeed(graphics) {
    const seedGraphic = graphics.reduce((accumulator, current) => {
      return accumulator.getSeed() > current.getSeed() ? accumulator : current;
    });

    let seed = seedGraphic.getSeed();

    if (seed < 0) {
      console.warn('seed < 0:', seed);
      return 0;
    }

    if (seed % 1 !== 0) {
      console.warn('seed has decimals', seed, ++seed);
    }

    return Math.ceil(seed);
  }

  getMinSeed(graphics) {
    const seedGraphic = graphics.reduce((accumulator, current) => {
      return accumulator.getSeed() < current.getSeed() ? accumulator : current;
    });

    let seed = seedGraphic.getSeed();

    if (seed > 0) {
      console.warn('seed > 0:', seed);
      return 0;
    }

    // Does seed have decimals?
    if (seed % 1 !== 0) {
      console.warn('seed has decimals', seed, --seed);
    }

    return Math.ceil(seed);
  }

  build() {
    const maxRow = this.getMaxSeed(this.graphics);
    const minRow = this.getMinSeed(this.graphics);

    this.graphics.forEach(graphic => {
      graphic.matrix = Array(maxRow).fill(null).map(() => Array(config.maxWidthPerGraphic).fill(config.symbol.E));

      const rInit = graphic.getNRows() === maxRow ? 0 : maxRow - graphic.getNRows();

      for (let rIndex = rInit; rIndex < maxRow; rIndex++) {

        for (let cIndex = 0; cIndex < config.maxWidthPerGraphic; cIndex++) {

          if (rIndex === maxRow - graphic.getNRows() && graphic.getSeedDecimal() > 0) {
            for (; cIndex < graphic.getSeedDecimal(); cIndex++) {
              graphic.matrix[rIndex][cIndex] = config.symbol.D;
            }
            for (; cIndex < config.maxWidthPerGraphic; cIndex++) {
              graphic.matrix[rIndex][cIndex] = config.symbol.X;
            }
          } else {
            for (; cIndex < config.maxWidthPerGraphic; cIndex++) {
              graphic.matrix[rIndex][cIndex] = config.symbol.I;
            }
          }
        }
      }

      if (graphic.getSeed() < 0) {
        graphic.matrix = graphic.matrix.reverse();
      }

    });

    this.graphics.forEach(graphic => {
      console.table(graphic.matrix);
    })
  }


  draw() {

    const maxRow = this.getMaxSeed(this.graphics);
    const minRow = this.getMinSeed(this.graphics);

    console.log("maxRow: ", maxRow, "minRow", minRow);


    for (let dRowIndex = 0; dRowIndex < maxRow; dRowIndex++) {
      let dRow = "";
      this.graphics.forEach(graphic => {
        if (graphic.getSeed() > 0) {
          dRow += graphic.matrix[dRowIndex].join(config.symbol.SL) + config.symbol.SC;
        } else {
          dRow += config.symbol.N.repeat(config.maxWidthPerGraphic) + config.symbol.SC;
        }
      });
      console.log(dRowIndex, "dRow: ", dRow);
    }

    let dRow = "";
    this.graphics.forEach(graphic => {
      dRow += graphic.getLabel() + config.symbol.SC;
    });
    console.log("dRow: ", dRow);

    for (let dRowIndex = 0; dRowIndex < -minRow; dRowIndex++) {
      let dRow = "";
      this.graphics.forEach(graphic => {
        if (graphic.getSeed() < 0) {
          dRow += graphic.matrix[dRowIndex].join(config.symbol.SL) + config.symbol.SC;
        } else {
          dRow += config.symbol.P.repeat(config.maxWidthPerGraphic) + config.symbol.SC;
        }
      });
      console.log(dRowIndex, "dRow: ", dRow);
    }
  }

}

module.exports = { Dashboard }