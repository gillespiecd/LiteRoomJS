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

export default Filters;
