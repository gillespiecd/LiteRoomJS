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

export default ImageCanvas;
