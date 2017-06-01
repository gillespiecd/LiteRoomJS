# LiteRoomJS

LiteRoomJS is a lightweight canvas photo editor for web-based editing
of photographs.

Users can upload an image, edit it, and then export an edited version.

![](/assets/images/ss_main.png)

## Features
Upload image from computer
![](/assets/images/original.png)

Modify image with filters (grayscale, saturation, contrast, etc.)
![](/assets/images/edited.png)

Download edited image locally
![](/assets/images/downloaded.png)

Image rotation
![](/assets/images/rotated.png)

## Technology

- HTML5 canvas to handle image state, filters, and display
  1. `ctx.filter` handles filtering logic
  2. `ctx.rotate` and `ctx.translate` to re-arrange canvas when rotating

- Vanilla JS classes
  1. `main.js` - initializes program with image (default or uploaded)
  2. `canvas.js` - holds state of canvas, stores filter values, draws image
  3. `filter.js` - callback functions to update image with new filter


## Code Examples

#### Sliders

```JavaScript
applySlider(filter) {
  const self = this;
  const filterSlider = document.getElementById(filter);
    filterSlider.onchange = function(e) {
    self.canvas.drawCanvas(`${filter}(${e.target.value}%)`);
  };
}

grayscaleSlider() {
  this.applySlider('grayscale');
}

sepiaSlider() {
  this.applySlider('sepia');
}

```

#### Rotation
```JavaScript
rotate() {
  const rotateButton = document.getElementById("rotate-image");
  let newImage;
  rotateButton.onclick = () => {
    newImage = new Image();
    newImage.src = this.canvas.toDataURL();
    newImage.onload = () => {
      const oldWidth = this.canvas.width;
      this.canvas.width = this.canvas.height;
      this.canvas.height = oldWidth;
      this.ctx.translate(this.canvas.width, this.canvas.height / this.canvas.width);
      this.ctx.rotate(Math.PI / 2);
      this.ctx.drawImage(newImage, 0, 0);
    };
  };
}
```

#### Filters
Stored as hashmap -- updated with each draw method
```JavaScript
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
```
