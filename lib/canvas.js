class ImageCanvas {
  constructor(image) {
    this.image = image;
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.filters = {};
    this.rotation = 0;
    this.imageRatio = null;
    this.drawCanvas();
    this.downloadImage();
    this.resetCanvas();
    this.undoAction();
    this.rotateRight();
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

  rotateRight() {
    const rotateRightButton = document.getElementById('rotate-right');
    const self = this;
    rotateRightButton.onclick = function() {
      self.rotation += 90;
      self.ctx.translate(self.canvas.width/2,self.canvas.height/2);
      self.ctx.rotate(self.rotation*Math.PI/180);
      self.ctx.drawImage(self.image, -self.image.width / 2, -self.image.height / 2);
      self.ctx.translate(-self.canvas.width/2,-self.canvas.height/2);
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

  // 1. calculate image ratio
  // 2. resize image canvas based on ratio
  calculateCanvas() {
    if (!this.imageRatio) {
      this.imageRatio = Math.ceil(this.image.height / this.canvas.height);
    }
    if (this.image.height > this.canvas.height) {
      this.canvas.width  = this.image.width / this.imageRatio;
      this.canvas.height = this.image.height / this.imageRatio;
    } else {
      this.canvas.width = this.image.width;
      this.canvas.height = this.image.height;
    }
  }

  drawCanvas(filter = "") {
    const imageObj = new Image();
    const self = this;
    imageObj.onload = function() {
      self.calculateCanvas();
      self.applyFilter(imageObj, filter);
      self.ctx.drawImage(imageObj, 0, 0, self.canvas.width, self.canvas.height);
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
    if (filter) { this.updateFilters(filter); }
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
