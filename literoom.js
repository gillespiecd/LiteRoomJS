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




class LiteRoom {
  constructor( ) {
    this.image = document.getElementById('default-image');
    this.canvas = new __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */](this.image);
    this.filters = new __WEBPACK_IMPORTED_MODULE_1__filters__["a" /* default */](this.canvas);
    this.uploadPhoto();
  }

  uploadPhoto() {
    const imageUpload = document.getElementById('image-upload');
    imageUpload.addEventListener('change', this.handleImage.bind(this), false);
  }


  handleImage(e) {
    const self = this;
    console.log(self);
    const reader = new FileReader();
    reader.onload = function(event) {
      self.image.src = event.target.result;
      self.canvas = new __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */](self.image);
      self.filters = new __WEBPACK_IMPORTED_MODULE_1__filters__["a" /* default */](self.canvas);
    };
    reader.readAsDataURL(e.target.files[0]);
  }


}

const literoom = new LiteRoom();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ImageCanvas {
  constructor(image) {
    this.image = image;
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.filters = {};
    this.drawCanvas();
    this.downloadImage();
    this.resetCanvas();
    this.undoAction();
  }

  resetCanvas() {
    const resetButton = document.getElementById('reset-btn');
    const self = this;
    resetButton.onclick = function() {
      self.filters = {};
      self.resetSliders();
      self.drawCanvas();
    };
  }

  undoAction() {
    const undoButton = document.getElementById('undo-btn');
    const self = this;
    undoButton.onclick = function() {
      self.ctx.restore();
    };
  }

  resetSliders() {
    let ranges = document.querySelectorAll('input[type="range"]');
    for (let i = 0; i < ranges.length; i++) {
      ranges[i].value = "50";
    }
  }

  drawCanvas(filter = "") {
    const imageObj = new Image();
    var self = this;
    imageObj.onload = function() {
      self.canvas.width  = imageObj.width;
      self.canvas.height = imageObj.height;
      self.applyFilter(imageObj, filter);
      self.ctx.save();
    };
    imageObj.crossOrigin = 'anonymous';
    imageObj.src = this.image.src;
  }

  updateFilters(filter) {
    const filterName = filter.match(/\w+/)[0];
    const filterValue = filter.match(/\d+/)[0];
    this.filters[filterName] = filterValue;
    let filterString = "";
    for (var key in this.filters) {
      filterString += ` ${key}(${this.filters[key]}%)`;
    }
    this.ctx.filter = filterString;
  }

  applyFilter(img, filter) {
    if (filter) {
      this.updateFilters(filter);
    }
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
    this.contrastSlider();
    this.brightnessSlider();
    this.grayscaleSlider();
    this.sepiaSlider();
    this.saturationSlider();
    this.opacitySlider();
    this.invertSlider();
  }

  applySlider(filter) {
    const self = this;
    const filterSlider = document.getElementById(filter);
      filterSlider.onchange = function(e) {
      self.canvas.drawCanvas(`${filter}(${e.target.value}%)`);
    };
  }

  grayscaleSlider() {
    this.applySlider('grayscale');
  }

  sepiaSlider() {
    this.applySlider('sepia');
  }

  contrastSlider() {
    this.applySlider('contrast');
  }

  brightnessSlider() {
    this.applySlider('brightness');
  }

  saturationSlider() {
    this.applySlider('saturation');
  }

  opacitySlider() {
    this.applySlider('opacity');
  }

  invertSlider() {
    this.applySlider('invert');
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Filters);


/***/ })
/******/ ]);
//# sourceMappingURL=literoom.js.map