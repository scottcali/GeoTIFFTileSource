import { JSDOM } from "jsdom";

// Create a basic DOM structure
const dom = new JSDOM("<!DOCTYPE html><html><head></head><body></body></html>", {
  url: "http://localhost",
  pretendToBeVisual: true,
});

// Make all DOM properties available globally
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.HTMLCanvasElement = dom.window.HTMLCanvasElement;
global.Image = dom.window.Image;

// Mock some Canvas APIs that OpenSeadragon might need
global.HTMLCanvasElement.prototype.getContext = function () {
  return {
    fillRect: function () {},
    clearRect: function () {},
    putImageData: function () {},
    getImageData: function () {
      return {
        data: new Array(4 * this.width * this.height).fill(0),
      };
    },
    createImageData: function () {
      return [];
    },
    setTransform: function () {},
    drawImage: function () {},
    save: function () {},
    fillText: function () {},
    restore: function () {},
    translate: function () {},
    scale: function () {},
    rotate: function () {},
    createLinearGradient: function () {
      return {
        addColorStop: function () {},
      };
    },
  };
};

// Mock requestAnimationFrame
global.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0);
};

// Mock cancelAnimationFrame
global.cancelAnimationFrame = function () {};
