class Filters {
  constructor(canvas) {
    this.canvas = canvas;
    this.addListeners();
  }

  addListeners() {
    this.blackWhiteButton();
    this.sepiaButton();
  }

  blackWhiteButton() {
    const self = this;
    const blackWhiteButton = document.getElementById('black-white');
    blackWhiteButton.onclick = function() {
      self.canvas.drawCanvas("grayscale(1.0)");
    };
  }

  sepiaButton() {
    const self = this;
    const sepiaButton = document.getElementById('sepia');
    sepiaButton.onclick = function() {
      self.canvas.drawCanvas("sepia(0.8)");
    };
  }
}

export default Filters;
