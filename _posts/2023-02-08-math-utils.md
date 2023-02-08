---
title: Math and geometry utility functions
last-updated: 2023-02-08
---

A collection of math and geometry functions that I use all the time when coding 2D prototypes in HTML canvas, 3D models in Blender, or LEDs in C for Arduino. I will always post the sources that helped me figure out the math, but some of these functions I wrote a long time ago and I've lost the sources. These functions might not be perfect or work in every use case, but they work great for what I need them for!


### Table of contents

- [Point on circumference](#point-on-circumference)
- [Point on ellipse perimeter](#point-on-ellipse-perimeter)


### Point on circumference

Find the xy coordinates of a point along the circumference of a circle at a given angle (in degrees)

```javascript
const pointOnCircumference = (radius, origin, degrees) => {
  const d = degrees - 90 < 0 ? degrees + 270 : degrees - 90;
  const radians = (d * Math.PI) / 180;
  return {
    x: origin.x + radius * Math.cos(radians),
    y: origin.y + radius * Math.sin(radians)
  };
};
```

Example usage:
```javascript
const circleRadius = 20;
const circleOrigin = { x: 4, y: 16 };
const degrees = 60;

pointOnCircumference(circleRadius, circleOrigin, degrees);

// Output: {x: 21.320508075688767, y: 5.999999999999991}
```


### Point on ellipse perimeter

Find the xy coordinates of a point along the perimeter of an ellipse at a given angle (in degrees) and given an angle of rotation. If the ellipse is not rotated, you can pass `0` for this value.

```javascript
const pointOnEllipse = (ellipse, degrees) => {
  const d = degrees - 90 < 0 ? degrees + 270 : degrees - 90;
  const angleRadians = (d * Math.PI) / 180;
  return {
    x:
      ellipse.x +
      ellipse.rx * Math.cos(angleRadians) * Math.cos(ellipse.rotation) -
      ellipse.ry * Math.sin(angleRadians) * Math.sin(ellipse.rotation),
    y:
      ellipse.y +
      ellipse.rx * Math.cos(angleRadians) * Math.sin(ellipse.rotation) +
      ellipse.ry * Math.sin(angleRadians) * Math.cos(ellipse.rotation)
  };
};
```

Example usage:
```javascript
const ellipse = {
  rotation: 17,
  rx: 8,
  ry: 3,
  x: 4,
  y: 16,
};
const degrees = 127;

pointOnEllipse(ellipse, degrees);

// Output: {x: 3.9777086588522277, y: 9.360758297736306}
```
