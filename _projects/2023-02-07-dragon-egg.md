---
title: Dragon Egg
main-image-url: /assets/images/egg/final-egg-on-stand-edited.jpg
excerpt: An LED dragon's egg with a 3D-printed shell exterior and a flexible scaffold interior to mount addressable fairy light LEDs.
images:
  prototype-egg: /assets/images/egg/prototype-egg.jpg
  blender-simple-square: /assets/images/egg/blender-simple-square.png
  blender-vertical-spacing: /assets/images/egg/blender-vertical-spacing.png
  printed-assembled-scaffold: /assets/images/egg/printed-assembled-scaffold.jpg
  blender-radius-z-index: /assets/images/egg/blender-radius-z-index.png
  blender-circumference-spacing: /assets/images/egg/blender-circumference-spacing.png
  rotate-rings: /assets/images/egg/rotate-rings.gif
  horizontal-notches: /assets/images/egg/horizontal-notches.png
  vertical-notches: /assets/images/egg/vertical-notches.png
  dragon-egg: /assets/images/egg/dragon-egg.gif
  bare-leds-on-scaffold: /assets/images/egg/bare-leds-on-scaffold.jpg
---

<style>
p {
  margin-top: 0;
}
h4 {
  margin-top: 0;
  margin-bottom: 1em;
}
</style>

{{ page.excerpt }}


![Dragon egg spiral]({{ page.images.dragon-egg | relative_url }}){:class="fit-image"}


## Process


### Flexible LED Scaffold

I 3D printed a "scaffold" to mount the LEDs to using TPU filament so the structure would be flexible and easier to insert into the rigid exterior shell. To model the scaffold, I used Blender python scripts to calculate evenly spaced positions around a simple egg shape, then use those positions to generate rings with flat faces for each LED and notches for fastening the rings together.



![3D printed assembled scaffold]({{ page.images.printed-assembled-scaffold | relative_url }}){:class="fit-image"}


#### Generating vertices, edges, and faces Blender

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


#### Space out LEDs evenly across the surface of the egg

Every LED is spaced ~17 millimeters apart vertically, horizontally, and staggered evenly.


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

<br/>

To space vertically, I added vertices one at a time along the edge of the egg, keeping the distance from the last vertex around 17 millimeters. Then use each of those vertices to measure the height and radius for each ring. I measured all these values in Blender and hard-coded them into the python script.


A bird's eye view of the egg:

![Blender circumference spacing]({{ page.images.blender-circumference-spacing | relative_url }}){:class="fit-image"}

To space horizontally, I use a handy function that finds the (x, y) coordinates of a point along the circumference of a circle. ([I post all my math and geometry utility functions here!](/posts/math-utils)) My point on circumference (`poc`) function:

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
<br/>

Rotate every other ring to make everything evenly staggered.

![Rotate rings diff]({{ page.images.rotate-rings | relative_url }}){:class="fit-image"}


Add notches to rings for easier assembly

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


### Install LEDs

After gluing each ring together to complete the scaffold, fairy light LEDs are glued to each flat face of the scaffold rings with super glue. 

![Bare LEDs on scaffold]({{ page.images.bare-leds-on-scaffold | relative_url }}){:class="fit-image"}


### Code

Much of the code is adapted from my [Tree of Light](/projects/tree-of-light-prototype) project, with new patterns added, including a lava lamp effect. Read all the code on [GitHub](https://github.com/michellesh/egg2){:target="blank"}!



Thanks for reading!
