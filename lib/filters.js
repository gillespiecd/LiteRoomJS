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
    this.saturateSlider();
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

  saturateSlider() {
    this.applySlider('saturate');
  }

  opacitySlider() {
    this.applySlider('opacity');
  }

  invertSlider() {
    this.applySlider('invert');
  }

}

export default Filters;
