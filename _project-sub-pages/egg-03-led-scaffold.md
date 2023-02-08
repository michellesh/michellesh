---
title: LED scaffold
summary: This part shows how I used python to calculate evenly spaced positions of LEDs around the egg, then used those positions to 3D print a flexible scaffold to mount the LEDs to.
project: egg
permalink: /projects/egg/led-scaffold
image-url: /assets/images/egg/blender-scaffold.png
images:
  blender-simple-square: /assets/images/egg/blender-simple-square.png
  blender-vertical-spacing: /assets/images/egg/blender-vertical-spacing.png
  printed-assembled-scaffold: /assets/images/egg/printed-assembled-scaffold.jpg
  blender-radius-z-index: /assets/images/egg/blender-radius-z-index.png
  blender-circumference-spacing: /assets/images/egg/blender-circumference-spacing.png
  rotate-rings: /assets/images/egg/rotate-rings.gif
  horizontal-notches: /assets/images/egg/horizontal-notches.png
  vertical-notches: /assets/images/egg/vertical-notches.png
---

![3D printed assembled scaffold]({{ page.images.printed-assembled-scaffold | relative_url }}){:class="fit-image"}


## Generating vertices, edges, and faces Blender

[This YouTube video](https://www.youtube.com/watch?v=mN3n9b98HMk&t=544s&ab_channel=CGPython){:target="blank"} taught me how to generate mesh objects in Blender. Here's a template to get started. It generates a 2D square. (In Blender, go to the "Scripts" tab, paste this code, and click the "Play" button!)

```python
import bpy


def create_mesh_obj(verts, edges, faces, name="mesh"):
    '''
    creates a new mesh object and adds it to Blender
    '''
    mesh_data = bpy.data.meshes.new(name + "_data")
    mesh_data.from_pydata(verts, edges, faces)
    mesh_obj = bpy.data.objects.new(name, mesh_data)
    bpy.context.collection.objects.link(mesh_obj)
    return mesh_obj


verts = [(0, 0, 0), (0, 1, 0), (1, 1, 0), (1, 0, 0)] # vertices of a square
edges = []
faces = [(0, 1, 2, 3)] # connect the vertices (by index) to make a face

create_mesh_obj(verts, edges, faces, name="square")
```

A square!

![Blender simple square]({{ page.images.blender-simple-square | relative_url }}){:class="fit-image"}


## Space out LEDs evenly across the surface of the egg

How I made every LED ~17 millimeters apart vertically, horizontally, and staggered evenly.


### Space out LEDs vertically

<div class='column-container'>
  <div class="column">
    <img
      class="fit-image"
      alt="Blender vertical spacing"
      src="{{ page.images.blender-vertical-spacing | relative_url }}"
    />
  </div>
  <div class="column">
    <img
      class="fit-image"
      alt="Blender radius and z index"
      src="{{ page.images.blender-radius-z-index | relative_url }}"
    />
  </div>
</div>

Add vertices one at a time along the edge of the egg, keeping the distance from the last vertex around 17 millimeters. Then use each of those vertices to measure the height and radius for each ring. I measured all these values in Blender and hard-coded them into the code.


### Space out LEDs horizontally

A bird's eye view of the egg:

![Blender circumference spacing]({{ page.images.blender-circumference-spacing | relative_url }}){:class="fit-image"}

I have a handy function that finds the (x, y) coordinates of a point along the circumference of a circle. ([I post all my math and geometry utility functions here!](/posts/math-utils)) My point on circumference (`poc`) function:

```python
def poc(radius, origin, d):
    '''
    get a point on the circumference of a circle
      d : degrees along the circumference of the circle
      radius : radius of the circle
      origin : (x, y, z) center coordinates of the circle
    '''
    degrees = d + 270 if d - 90 < 0 else d - 90
    radians = (degrees * math.pi) / 180
    x = origin[0] + radius * math.cos(radians)
    y = origin[1] + radius * math.sin(radians)
    return (x, y, origin[2])
```


### Stagger rotation of LEDs

Rotate every other ring to make everything evenly staggered.

![Rotate rings diff]({{ page.images.rotate-rings | relative_url }}){:class="fit-image"}


## Make each ring a square that faces outward

Make each ring to have a flat face pointing directly outward, perpendiculuar to the egg shell. In order to make it easier to mount the LEDs against the egg shell.

Important step: use Blender's 3D Print add-on feature "Make Manifold" for every object generated. For some reason my python generated objects weren't manifold, (maybe because I only added vertices and faces and skipped edges...)


## Add notches to rings for easier assembly

<div class='column-container'>
  <div class="column">
    <img
      class="fit-image"
      alt="Vertical notches"
      src="{{ page.images.vertical-notches | relative_url }}"
    />
  </div>
  <div class="column">
    <img
      class="fit-image"
      alt="Horizontal notches"
      src="{{ page.images.horizontal-notches | relative_url }}"
    />
  </div>
</div>


Thanks for reading!
