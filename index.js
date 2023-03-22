const { Graphic } = require('./graphic.js');
const { Dashboard } = require('./dashboard.js');


process.env.NODE_ENV = "prod"

const config = {
  maxColumnsPerGraphic: 10,
  referenceValue: 6,
  spaceBetweenGraphics: 5,
  isVertical: true,
  symbol: {
    D: "D", // Decimal,
    I: "I", // Integer,
    E: "-", // Empty,
    X: "X", // Empty by Decimal,
    N: "N", // Empty Negative,
    P: "P", // Empty Positive,
    SL: "", // Space between symbols,
    SC: " | ", // Space between columns,
  }
}


if (process.env.NODE_ENV === "prod") {
  /* console.warn = () => { };
  console.log = () => { };
  console.info = () => { }; */

  config.symbol = {
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

try {
  const graphics = [
    //new Graphic("Label 0", 0),
    new Graphic("Label 1", 6),
    //new Graphic("Label 2", 2.98),
    new Graphic("Label 3", 3.85),
    //new Graphic("Label 4", 1),
    //new Graphic("Label -1", -6),
    //new Graphic("Label -2", -2.98),
    //new Graphic("Label -3", -3.85),
    new Graphic("Label -4", -1),
  ]

  const dashboard = new Dashboard(graphics, config);
  dashboard.build();
  dashboard.draw();


} catch (e) {
  console.error(e);
  process.exit(1);
}
