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







let dashboard = "";
const graphics =
  [
    new Graphic("Label 1 ", 6),
    new Graphic("Label 2 ", 2.98),
    new Graphic("Label 3 ", 3.85),
    new Graphic("Label 4 ", -1),
    new Graphic("Label 5 ", -6),
  ]

console.log("graphics", graphics);


const maxHeight = getMaxSeed(graphics);
const minHeight = getMinSeed(graphics);

console.log("maxHeight", maxHeight);
console.log("minHeight", minHeight);


var text = "";
for (i = maxHeight; i >= minHeight; i--) {

  text += i + " ";

  graphics.forEach(graphic => {
    if (graphic.seed < 0) {
      
    }
  })

  if (i < 0) {

  }


}

console.log(text);
console.log(dashboard)


/*
var matrix = []
matrix[0] = [1,1,1,0,0]
matrix[1] = [1,1,1,1,1]
matrix[2] = [1,1,1,1,1]

//console.log(matrix);

for (i = 0; i < matrix.length; i ++) {
  console.log(matrix[i]);
}

console.log("----");

const transpose = matrix => matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));

var matrix2 = transpose(matrix)
for (i = 0; i < matrix2.length; i ++) {
  console.log(matrix2[i]);
}

*/