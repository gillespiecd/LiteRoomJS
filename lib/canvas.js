class ImageCanvas {
  constructor(image) {
    this.image = image;
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.filters = {};
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

export default ImageCanvas;
