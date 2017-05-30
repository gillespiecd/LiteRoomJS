import ImageCanvas from './canvas';
import Filters from './filters';

const defaultImg = document.getElementById('default-image');
const canvas = new ImageCanvas(defaultImg);
const filters = new Filters(canvas);

const downloadButton = document.getElementById('download');
downloadButton.onclick = function() {
  canvas.downloadImage();
};
