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
    this.rotate();
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
    imageObj.crossOrigin = 'anonymous';
    imageObj.src = self.canvas ? self.canvas.toDataURL() : this.image.src;
    imageObj.onload = () => {
      this.calculateCanvas();
      this.applyFilter(imageObj, filter);
      this.ctx.drawImage(imageObj, 0, 0, this.canvas.width, this.canvas.height);
    };
  }

  // create copy of existing image and redraw with new dimensions
  rotate() {
    const rotateButton = document.getElementById("rotate-image");
    const self = this;
    let newImage;
    rotateButton.onclick = function() {
      self.rotation = (self.rotation + 1) % 4;
      newImage = new Image();
      newImage.src = self.canvas.toDataURL();
      const scpe = self;
      newImage.onload = function() {
        const oldWidth = scpe.canvas.width;
        scpe.canvas.width = scpe.canvas.height;
        scpe.canvas.height = oldWidth;
        scpe.ctx.translate(scpe.canvas.width, scpe.canvas.height / scpe.canvas.width);
        scpe.ctx.rotate(Math.PI / 2);
        scpe.ctx.drawImage(newImage, 0, 0);
      };
    };
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
