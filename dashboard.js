const { Graphic } = require('./graphics.js')

function round(value, precision) {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}


const globalSettings = {
  maxWidthPerGraphic: 10,
  spaceBetweenGraphics: 5,
  isVertical: true,
  symbol: "*",
}


class Dashboard {
  constructor() {
    this.graphics =
      [
        new Graphic("Label 1 ", 6),
        new Graphic("Label 2 ", 2.98),
        new Graphic("Label 3 ", 3.85),
        //new Graphic("Label 4 ", -1),
        //new Graphic("Label 5 ", -6),
        //new Graphic("Label 6 ", -3.85),
      ]

    this.graphics.forEach(graphic => {
      console.table(graphic);
    })
  }


  getMaxSeed(graphics) {
    const seedGraphic = graphics.reduce((accumulator, current) => {
      return accumulator.seed > current.seed ? accumulator : current;
    });

    let seed = seedGraphic.seed;

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
      return accumulator.seed < current.seed ? accumulator : current;
    });

    let seed = seedGraphic.seed;

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
    const maxHeight = this.getMaxSeed(this.graphics);
    const minHeight = this.getMinSeed(this.graphics);

    this.graphics.forEach(graphic => {
      graphic.matrix = Array(maxHeight).fill(null).map(() => Array(globalSettings.maxWidthPerGraphic).fill("-"));

      for (let rIndex = 0; rIndex < graphic.nRows; rIndex++) {

        let cIndex = 0 
        if (rIndex === 0 && graphic.seedDecimal > 0) {
          for (; cIndex < graphic.seedDecimal; cIndex++) {
            graphic.matrix[rIndex][cIndex] = "D";
          }
          for (; cIndex < globalSettings.maxWidthPerGraphic; cIndex++) {
            graphic.matrix[rIndex][cIndex] = "X";
          }
        } else {
          for (; cIndex < globalSettings.maxWidthPerGraphic; cIndex++) {
            graphic.matrix[rIndex][cIndex] = "I";
          }
        }
      }
    });

    this.graphics.forEach(graphic => {
      console.table(graphic.matrix);
    })
  }


  draw() {

    const maxHeight = this.getMaxSeed(this.graphics);
    const minHeight = this.getMinSeed(this.graphics);


    for (let dashboardRowIndex = maxHeight; dashboardRowIndex >= minHeight; dashboardRowIndex--) {

      let dashboardRow = "";




      /* graphics.forEach(graphic => {
        if (dashboardRowIndex > 0) {
          if (graphic.seed < 0) {
            dashboardRow += "-".repeat(globalSettings.maxWidthPerGraphic) + " / ";
          } else {
            if (graphic.nRows < dashboardRowIndex) {
              dashboardRow += "0".repeat(globalSettings.maxWidthPerGraphic) + " / ";
            } else {
              if (graphic.seedDecimal > 0 && graphic.nRows === dashboardRowIndex) {
                dashboardRow += "D".repeat(graphic.seedDecimal);
                dashboardRow += "0".repeat(globalSettings.maxWidthPerGraphic - graphic.seedDecimal) + " / ";
              } else {
                dashboardRow += "P".repeat(globalSettings.maxWidthPerGraphic) + " / ";
              }
            }
          }
        } else if (dashboardRowIndex < 0) {
          if (graphic.seed >= 0) {
            dashboardRow += "-".repeat(globalSettings.maxWidthPerGraphic) + " / ";
          } else {
            //console.log(graphic.seedDecimal, graphic.nRows, dashboardRowIndex, -1 * (dashboardRowIndex))
            if (graphic.nRows < -1 * (dashboardRowIndex + 1)) {
              dashboardRow += "0".repeat(globalSettings.maxWidthPerGraphic) + " / ";
            } else {
              if (graphic.seedDecimal > 0 && graphic.nRows === -1 * (dashboardRowIndex + 1)) {
                dashboardRow += "D".repeat(graphic.seedDecimal);
                dashboardRow += "0".repeat(globalSettings.maxWidthPerGraphic - graphic.seedDecimal) + " / ";
              } else {
                dashboardRow += "N".repeat(globalSettings.maxWidthPerGraphic) + " / ";
              }
            }
          }
    
    
        } else { // dashboardRowIndex === 0
          dashboardRow += graphic.name + " / "
        }
    
      }) */

      console.log(dashboardRowIndex, "dRow: ", dashboardRow)
    }
  }



}

module.exports = { Dashboard }