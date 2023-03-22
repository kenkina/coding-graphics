const { Graphic } = require('./graphic.js');
const { Dashboard } = require('./dashboard.js');



const globalSettings = {
  maxWidthPerGraphic: 10,
  spaceBetweenGraphics: 5,
  isVertical: true,
  symbol: "*",
}


const dashboard = new Dashboard();
dashboard.build();
dashboard.draw();
