class ImageCanvas {
  constructor(image) {
    this.image = image;
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.drawCanvas();
  }

  drawCanvas(filter = "") {
    const imageObj = new Image();
    var self = this;
    imageObj.onload = function() {
      const width = self.image.naturalHeight;
      const height = self.image.naturalWidth;
      self.ctx.canvas.width  = width / 2;
      self.ctx.canvas.height = height / 2;
      self.ctx.filter = filter;
      self.ctx.drawImage(imageObj, 0, 0);
    };
    imageObj.src = this.image.src;
  }

  downloadImage() {
    const link = this.canvas.toDataURL('image/jpeg');
    this.href = link;
  }

}

export default ImageCanvas;
