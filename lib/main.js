const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const defaultImg = document.getElementById('default-image');

var imageObj = new Image();
imageObj.onload = function() {
  console.log(defaultImg);
  const width = defaultImg.naturalHeight;
  const height = defaultImg.naturalWidth;
  // ctx.canvas.width  = width;
  // ctx.canvas.height = height;
  ctx.drawImage(imageObj, 0, 0);
};

// const calcSize = () => {
//
// }

imageObj.src = 'http://res.cloudinary.com/dn1agy1ea/image/upload/v1496105546/71t-ACpwDjL_trsogh.jpg';
