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
    // this.calculateCanvasSize();
    this.resized = false;
  }

  resetCanvas() {
    const resetButton = document.getElementById('reset-btn');
    const self = this;
    resetButton.onclick = function() {
      self.filters = {};
      self.ctx.filters = "";
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

  // calculateCanvasSize(img) {
  //   const ratio = Math.ceil(img.height / this.canvas.height);
  //   if (img.height > this.canvas.height) {
  //     this.canvas.width  = img.width / ratio;
  //     this.canvas.height = img.height / ratio;
  //   } else {
  //     this.canvas.width = img.width;
  //     this.canvas.height = img.height;
  //   }
  //   this.resized = true;
  // }

  drawCanvas(filter = "") {
    const imageObj = new Image();
    const self = this;
    imageObj.onload = function() {
      if (imageObj.height > self.canvas.height) {
        self.canvas.width  = imageObj.width / 2;
        self.canvas.height = imageObj.height / 2;
      } else {
        self.canvas.width = imageObj.width;
        self.canvas.height = imageObj.height;
      }
      self.applyFilter(imageObj, filter);
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
    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
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
