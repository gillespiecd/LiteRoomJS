/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__filters__ = __webpack_require__(2);



const defaultImg = document.getElementById('default-image');
const canvas = new __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */](defaultImg);
const filters = new __WEBPACK_IMPORTED_MODULE_1__filters__["a" /* default */](canvas);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ImageCanvas {
  constructor(image) {
    this.image = image;
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.filters = "";
    this.drawCanvas();
    this.downloadImage();
    this.resetCanvas();
  }

  resetCanvas() {
    const resetButton = document.getElementById('reset-btn');
    const self = this;
    resetButton.onclick = function() {
      self.filters = "";
      self.drawCanvas();
    };
  }

  drawCanvas(filter = "") {
    const imageObj = new Image();
    var self = this;
    imageObj.onload = function() {
      const width = self.image.naturalHeight;
      const height = self.image.naturalWidth;
      self.ctx.canvas.width  = width / 2;
      self.ctx.canvas.height = height / 2;
      // apply filters
      self.applyFilter(imageObj, filter);
      self.ctx.save();
    };
    imageObj.crossOrigin = 'anonymous';
    imageObj.src = this.image.src;
  }

  applyFilter(img, filter) {
    this.filters += ` ${filter}`;
    this.ctx.filter = this.filters;
    console.log(this.filters);
    this.ctx.drawImage(img, 0, 0);
  }

  downloadImage() {
    const downloadLink = document.getElementById('download-link');
    const self = this;

    downloadLink.onclick = function() {
      const dataURL = self.canvas.toDataURL('image/png');
      downloadLink.href = dataURL;
    };

  }

}

/* harmony default export */ __webpack_exports__["a"] = (ImageCanvas);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Filters {
  constructor(canvas) {
    this.canvas = canvas;
    this.addListeners();
  }

  addListeners() {
    this.blackWhiteButton();
    this.sepiaButton();
    this.contrastSlider();
    this.brightnessSlider();
  }

  blackWhiteButton() {
    const self = this;
    const blackWhiteButton = document.getElementById('black-white');
    blackWhiteButton.onclick = function() {
      self.canvas.drawCanvas('grayscale(1.0)');
    };
  }

  sepiaButton() {
    const self = this;
    const sepiaButton = document.getElementById('sepia');
    sepiaButton.onclick = function() {
      self.canvas.drawCanvas('sepia(0.8)');
    };
  }

  contrastSlider() {
    const self = this;
    const contrastSlider = document.getElementById('contrast');
    contrastSlider.onchange = function(e) {
      console.log(e.target.value);
      self.canvas.drawCanvas(`contrast(${e.target.value}%)`);
    };
  }

  brightnessSlider() {
    const self = this;
    const brightnessSlider = document.getElementById('brightness');
    brightnessSlider.onchange = function(e) {
      console.log(e.target.value);
      self.canvas.drawCanvas(`brightness(${e.target.value}%)`);
    };
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Filters);


/***/ })
/******/ ]);
//# sourceMappingURL=literoom.js.map