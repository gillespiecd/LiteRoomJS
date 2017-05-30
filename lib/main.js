import ImageCanvas from './canvas';
import Filters from './filters';


class LiteRoom {
  constructor( ) {
    this.image = document.getElementById('default-image');
    this.canvas = new ImageCanvas(this.image);
    this.filters = new Filters(this.canvas);
    this.uploadPhoto();
  }

  uploadPhoto() {
    const imageUpload = document.getElementById('image-upload');
    imageUpload.addEventListener('change', this.handleImage.bind(this), false);
  }


  handleImage(e) {
    const self = this;
    console.log(self);
    const reader = new FileReader();
    reader.onload = function(event) {
      self.image.src = event.target.result;
      self.canvas = new ImageCanvas(self.image);
      self.filters = new Filters(self.canvas);
    };
    reader.readAsDataURL(e.target.files[0]);
  }


}

const literoom = new LiteRoom();
