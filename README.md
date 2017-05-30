# LiteRoomJS

## Background

LiteRoomJS is a lightweight photo editor that enables web-based editing
of photographs, all without having to use a desktop application such as Adobe Lightroom.

### Functionality & MVP  

MVP functionality includes common use cases such as:

- [ ] Sliders to control brightness, contrast, saturation, etc.
- [ ] Color filters for grayscale, sepia, etc. Reset filter button.
- [ ] Import/export canvas image
- [ ] Toggle orientation between landscape and portrait

### Wireframes

[Wireframe](/images/wireframe.jpg)

### Architecture and Technologies

LiteRoomJS plans to implement core image edit functionality using:

- Vanilla JavaScript and `jquery` for slider, button, and filter logic
- `HTML5 Canvas` to manipulate image color, orientation, and aesthetic.
- `HTML5 Canvas` as image CRUD source.
- Webpack to bundle and serve up JS files.

In addition to the webpack entry file, there will be four .JS files:

`image.js`: initialize core logic of the image canvas, including export/import functions

`filters.js`: logic to update image properties via [HTML5 canvas filters](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter)

`action_buttons.js`: handle button functions, e.g. orientation and cropping

### Implementation Timeline

**Day 1**:
- Set up project skeleton with webpack, canvas, and node.js.
- Create front end HTML components (sliders, buttons, canvas)
- CSS styling of sliders, buttons, and default image canvas

**Day 2**:
- Import image to canvas functionality
- Implement filter logic for grayscale, sepia, contrast, etc.

**Day 3**:
- Button logic for orientation / image rotation

**Day 4**:
- Download functionality
- Bonus features, if time

### Bonus features

- [ ] User ad-hoc cropping, aspect ratio cropping
- [ ] Dodging and burning
- [ ] Rule of thirds and golden spiral overlay
