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
    this.resized = false;
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

  calculateCanvasSize(img) {
    const ratio = Math.ceil(img.height / this.canvas.height);
    if ((img.height > this.canvas.height) && !this.resized) {
      this.resized = true;
      this.canvas.width  = img.width / ratio;
      this.canvas.height = img.height / ratio;
    }
  }

  drawCanvas(filter = "") {
    const imageObj = new Image();
    var self = this;
    imageObj.onload = function() {
      self.calculateCanvasSize(imageObj);
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
    this.ctx.drawImage(img, 0, 0, img.width, img.height,
                      0, 0, this.canvas.width, this.canvas.height);
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

export default ImageCanvas;
