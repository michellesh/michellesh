---
title: LED scaffold
summary: Generating 3D models in Blender with python
project: egg
permalink: /projects/egg/led-scaffold
image-url: /assets/images/egg/blender-scaffold.png
images:
  blender-simple-square: /assets/images/egg/blender-simple-square.png
  blender-vertical-spacing: /assets/images/egg/blender-vertical-spacing.png
  printed-assembled-scaffold: /assets/images/egg/printed-assembled-scaffold.jpg
  blender-radius-z-index: /assets/images/egg/blender-radius-z-index.png
---

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

![Blender simple square]({{ page.images.blender-simple-square | relative_url }}){:class="fit-image"}

## Space out LEDs evenly across the surface of the egg

### Space out LEDs vertically

Add vertices one at a time along the edge of the egg, keeping the distances around 17 millimeters. Use those vertices to get hard coded values for the z-index and the radius of each ring.

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


### Space out LEDs horizontally

I have a handy function that finds the x,y,z coordinates of a point along the circumference of a circle.

My point on circumference function:

```python
def poc(radius, origin, d):
    '''poc=point on circumference
    get a point on the circumference of a circle
    d : degrees along the circumference of the cricle
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

words


## Make each ring a square that faces outward

I wanted each ring to have a flat face pointing directly outward, perpendiculuar to the egg shell. In order to make it easier to mount the LEDs against the egg shell.


## Add notches to rings for easier assembly

words


## 3D print and assemble

![3D printed assembled scaffold]({{ page.images.printed-assembled-scaffold | relative_url }}){:class="fit-image"}


More words coming soon :)
