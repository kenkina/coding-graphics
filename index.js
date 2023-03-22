const { Graphic } = require('./graphics.js')



const globalSettings = {
  maxWidthPerGraphic: 10,
  spaceBetweenGraphics: 5,
  isVertical: true,
  symbol: "*",
}

function getMaxSeed(graphics) {
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

function getMinSeed(graphics) {
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



const graphics =
  [
    new Graphic("Label 1 ", 6),
    //new Graphic("Label 2 ", 2.98),
    new Graphic("Label 3 ", 3.85),
    //new Graphic("Label 4 ", -1),
    new Graphic("Label 5 ", -6),
    new Graphic("Label 6 ", -3.85),
  ]

/* graphics.forEach(graphic => {
  console.info(graphic);
}) */


const maxHeight = getMaxSeed(graphics);
const minHeight = getMinSeed(graphics);

console.log("maxHeight", maxHeight);
console.log("minHeight", minHeight);


for (let dashboardRowIndex = maxHeight; dashboardRowIndex >= minHeight; dashboardRowIndex--) {

  let dashboardRow = "";

  graphics.forEach(graphic => {
    if (dashboardRowIndex > 0) {
      if (graphic.seed < 0) {
        dashboardRow += "-".repeat(globalSettings.maxWidthPerGraphic) + " / ";
      } else {
        if (graphic.rows < dashboardRowIndex) {
          dashboardRow += "0".repeat(globalSettings.maxWidthPerGraphic) + " / ";
        } else {
          if (graphic.seedDecimal > 0 && graphic.rows === dashboardRowIndex) {
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
        //console.log(graphic.seedDecimal, graphic.rows, dashboardRowIndex, -1 * (dashboardRowIndex))
        if (graphic.rows < -1 * (dashboardRowIndex + 1)) {
          dashboardRow += "0".repeat(globalSettings.maxWidthPerGraphic) + " / ";
        } else {
          if (graphic.seedDecimal > 0 && graphic.rows === -1 * (dashboardRowIndex + 1)) {
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

  })

  console.log(dashboardRowIndex, "dRow: ", dashboardRow)
}
