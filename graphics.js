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


class Graphic {
  constructor(name, seed) {
    // TODO: if name is invalid (?)
    // TODO: if seed is not number
    // if (seed )

    this.name = name;
    this.originalSeed = seed;

    // Consider only one decimal
    this.seed = round(seed * globalSettings.maxWidthPerGraphic / 6, 1);

    // Extract integer and decimal from seed
    this.seedInteger = Math.abs(Math.trunc(this.seed));
    this.seedDecimal = Math.abs(Math.trunc(this.seed % 1 * 10));

    // Construct the graphic matrix
    this.nRows = (this.seedDecimal > 0) ? this.seedInteger + 1 : this.seedInteger;
    this.matrix = [];
  }

}

module.exports = { Graphic }