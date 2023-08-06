---
title: Bonsai Tree
main-image-url: /assets/images/bonsai-tree/thumbnail.png
excerpt: A miniature 3D printed bonsai tree embedded with LEDs under a canopy of pom-poms.
images:
  base-box-without-components: /assets/images/bonsai-tree/base-box-without-components.jpg
  blender-screenshot-extrude-vertices: /assets/images/bonsai-tree/blender-screenshot-extrude-vertices.png
  blender-screenshot-lattice-supports: /assets/images/bonsai-tree/blender-screenshot-lattice-supports.png
  blender-screenshot-thingiverse: /assets/images/bonsai-tree/blender-screenshot-thingiverse.png
  blender-screenshot-tree: /assets/images/bonsai-tree/blender-screenshot-tree.png
  blender-screenshot-vertices-selected: /assets/images/bonsai-tree/blender-screenshot-vertices-selected.png
  blender-screenshot-wood-cnc: /assets/images/bonsai-tree/blender-screenshot-wood-cnc.png
  cura-screenshot-bonsai-w-lattice: /assets/images/bonsai-tree/cura-screenshot-bonsai-w-lattice.png
  cura-screenshot-hollow-walls: /assets/images/bonsai-tree/cura-screenshot-hollow-walls.png
  easel-screenshot: /assets/images/bonsai-tree/easel-screenshot.png
  fill-tree-with-leds: /assets/images/bonsai-tree/fill-tree-with-leds.jpg
  light-test-no-spray-paint: /assets/images/bonsai-tree/light-test-no-spray-paint.jpg
  light-test-spray-paint: /assets/images/bonsai-tree/light-test-spray-paint.jpg
  pompom-step-1: /assets/images/bonsai-tree/pompom-step-1.jpg
  pompom-step-2: /assets/images/bonsai-tree/pompom-step-2.jpg
  pompom-step-3: /assets/images/bonsai-tree/pompom-step-3.jpg
  pompom-step-4: /assets/images/bonsai-tree/pompom-step-4.jpg
  printed-tree-w-lattice: /assets/images/bonsai-tree/printed-tree-w-lattice.jpg
  schematic: /assets/images/bonsai-tree/schematic.jpg
  spray-painted-tree-1: /assets/images/bonsai-tree/spray-painted-tree-1.jpg
  spray-painted-tree-2: /assets/images/bonsai-tree/spray-painted-tree-2.jpg
  tree-portrait-gold-white: /assets/images/bonsai-tree/tree-portrait-gold-white.jpg
  tree-portrait-red: /assets/images/bonsai-tree/tree-portrait-red.jpg
  tree-portrait-teal: /assets/images/bonsai-tree/tree-portrait-teal.jpg
  tree-portrait-yellow: /assets/images/bonsai-tree/tree-portrait-yellow.jpg
  wiring: /assets/images/bonsai-tree/wiring.jpg
  wood-bases: /assets/images/bonsai-tree/wood-bases.jpg
  twinkle-giphy-capture-low: /assets/images/bonsai-tree/twinkle-giphy-capture-low.gif
---

{% include image.html url=page.images.twinkle-giphy-capture-low %}

A miniature 3D printed bonsai tree embedded with LEDs under a canopy of pom-poms. Inspired by Dr. Seuss.


## Materials & Tools

#### Tree
- [**Clear PETG 3D printing filament**](https://amzn.to/44Obj3q){:target="blank"}
- [**Addressable WS2812B fairy lights**](https://amzn.to/3DCCum6){:target="blank"}
- **Yarn** for pompoms

#### Electronics
- [**ESP8266 D1 mini**](https://amzn.to/3YcUQU2){:target="blank"}
- [**2-pin momentary button**](https://amzn.to/3NY1wAT){:target="blank"}
- [**USB cable**](https://amzn.to/3YbYeP6){:target="blank"} (I didn't notice these cords were power-only. Oops.)

#### Base
- [**M3 nut and bolt**](https://amzn.to/3KlBPZI){:target="blank"} to close the base box. (This was before I started designing boxes with an hinges & latches...)
- **Piece of wood**
- **Router** (I used a CNC router, but regular works too)
- **Wood stain** (if you want. I used pine, and stained with [Minwax Dark Walnut](https://www.lowes.com/pd/Minwax-Wood-Finish-Satin-Dark-Walnut-Oil-based-Interior-Stain-Actual-Net-Contents-8-fl-oz/999914533){:target="blank"})
- **Orbital sander**. Or just sandpaper.


## Process

- [Bonsai tree 3D model from Thingiverse](#bonsai-tree-3d-model-from-thingiverse)
- [Remix 3D model](#remix-3d-model)
- [Design custom supports in Blender](#design-custom-supports-in-blender)
- [Slice & 3D print](#slice--3d-print)
- [Spray paint](#spray-paint)
- [Fill tree with LEDs](#fill-tree-with-leds)
- [Router wood base](#router-wood-base)
- [3D print box with lid for components](#3d-print-box-with-lid-for-components)
- [Solder](#solder)
  - [Schematic](#schematic)
- [Make pompoms](#make-pompoms)
- [Code](#code)


### Bonsai tree 3D model from Thingiverse

I started out with [this lovely 3D model I found on Thingiverse](https://www.thingiverse.com/thing:4745213):

{% include image.html url=page.images.blender-screenshot-thingiverse %}


### Remix 3D model

I used Blender to make some changes to the 3D model:

{% include image.html url=page.images.blender-screenshot-tree %}

1. **Applied a remesh** to reduce the geometry complexity. The results of this were:
  - Made Blender run faster on my outdated Macbook.
  - Lost the pointier branches, but those will be hidden by pompoms anyway.
  - Lost the bark texture, but this tree doesn't need to look real.
2. **Slightly inflated the bottom** of the trunk to get less of a steep angle for 3D printing.
3. **Made the trunk hollow** with 2mm thick walls. Then in the 3D printer slicer software (Cura) I set the infill to 0% so that the inner and outer walls of the trunk would print separately with empty space between, (as shown in the screnshot below). I did this to better diffuse the LEDs.
4. **Added loops to branches** to tie pompoms to.


### Design custom supports in Blender

The 3D printing slicer software (Cura) will auto-generate supports, but it looked like too many supports to me... (it also tripled the amount of filament compared to the tree alone!) Designing my own sounded way more fun anyway. I designed them in Blender using the Wireframe modifier. They worked beautifully. I think you can also do stuff like this with Meshmixer, which doesn't seem available for Mac users.

[You can get the STLs here](https://github.com/michellesh/bonsai-tree/tree/main/stl){:target="blank"}

{% include image.html url=page.images.blender-screenshot-lattice-supports %}

How I made these custom lattice supports in Blender:

<div class="column-container">
  <div class="p column">
    <ul>
      <li>In edit mode, select the vertices you want supported (Image 1)</li>
      <li>Duplicate those vertices, place them down -0.4mm (<code>shift-d z -0.4</code>)</li>
      <li>Pop the duplicated vertices to a separate object (<code>p</code>)</li>
      <li>Extrude them down to align with the bottom of tree (<code>e</code>)</li>
      <li>Select the bottom vertices, make them all flat at z=0 (<code>s z 0</code>)</li>
      <li>Now you have a column (Image 2). Loop cut the column 20x (<code>ctrl-r 20</code>)</li>
      <li>Edit mode the column, move vertices that intersect the tree out of the way of the tree</li>
      <li>Apply <b>Wireframe</b> modifier, thickness 1mm / offset -1</li>
      <li>Make a skirt for the lattice to increase build plate adhesion</li>
    </ul>
  </div>
  <div class="p column">
    <div>
      {% include image.html url=page.images.blender-screenshot-vertices-selected %}
    </div>
    <div>
      {% include image.html url=page.images.blender-screenshot-extrude-vertices %}
    </div>
  </div>
</div>


### Slice & 3D print

This print used 28g filament ($0.56) and took 9hr 24min to print.

{% include image.html url=page.images.cura-screenshot-bonsai-w-lattice %}

{% include image.html url=page.images.cura-screenshot-hollow-walls %}

{% include image.html url=page.images.printed-tree-w-lattice %}


### Spray paint

I bought a custom clear and gold blended spray paint from an automotive paint supplier. It's super shiny and sparkly but since it's clear it needs an opaque base coat to really stand out. For the base coat I used an opaque gold.

<div class="column-container">
  <div class="p column">
    {% include image.html url=page.images.spray-painted-tree-1 %}
    Base coat: <a href="https://www.lowes.com/pd/Krylon-FUSION-ALL-IN-ONE-Gloss-Gold-Metallic-Spray-Paint-and-Primer-In-One-Actual-Net-Contents-12-oz/1000460263" target="_blank">Standard gold spray paint</a>. (A little shiny, but not shiny enough.)
  </div>
  <div class="p column">
    {% include image.html url=page.images.spray-painted-tree-2 %}
    2nd Coat: Custom clear & gold blend I got at an automotive paint supplier. (So shiny!)
  </div>
</div>

A thin coat of spray paint does not block light from passing through the clear PETG filament, although it is a bit less bright, and is a bit blotchy if you look closely.

<div class="column-container">
  <div class="p column">
    {% include image.html url=page.images.light-test-no-spray-paint %}
    No spray paint, just clear PETG
  </div>
  <div class="p column">
    {% include image.html url=page.images.light-test-spray-paint %}
    Gold spray paint over clear PETG
  </div>
</div>


### Fill tree with LEDs

{% include image.html url=page.images.fill-tree-with-leds %}


### Router wood base

I used a CNC router for this, but a regular router works too.

{% include image.html url=page.images.blender-screenshot-wood-cnc %}

{% include image.html url=page.images.easel-screenshot %}

{% include image.html url=page.images.wood-bases %}


### 3D print box with lid for components

For this design, I printed a base box and lid separately. This was before I knew how to design and 3d print boxes with hinges and latches. The way this box stays closed is with two grabby tabs on one side and an M3 nut and bolt on the other. In the photo below you can see a small nut glued into a "nut pocket" with Elmer's glue. And then the lid has a recessed hole for the bolt to nestle in.

{% include image.html url=page.images.base-box-without-components %}

I designed this box and lid so that it can be printed without supports. [You can get the STLs here](https://github.com/michellesh/bonsai-tree/tree/main/stl){:target="blank"}.


### Solder

Before soldering, don't forget to:
- Label the power and ground wires coming out of the tree. Once the tree is glued down, you won't be able to see the ground indicator on the LED. (I forgot so many times. Luckily, you can measure the resistance between each of the three wires with a multimeter and figure out which is which.)
- Sand the wire insulation. Because these are fairy lights, the wires have a thin coating of insulation, and it's a drag to sand it off and always takes longer than I want.

{% include image.html url=page.images.wiring %}


#### Schematic

{% include image.html url=page.images.schematic %}


### Make pompoms

I learned how to make mini pompoms out of yarn using a fork [from this YouTube video](https://www.youtube.com/watch?v=GLhgdstE_ic&ab_channel=CrochetJewel){:target="blank"}.

<div class="column-container">
  <div class="p column">
    {% include image.html url=page.images.pompom-step-1 %}
    1. Wrap around fork. Tie around middle slot.
  </div>
  <div class="p column">
    {% include image.html url=page.images.pompom-step-2 %}
    2. Cut loops along circumference.
  </div>
</div>

<p></p>

<div class="column-container">
  <div class="p column">
    {% include image.html url=page.images.pompom-step-3 %}
    3. Trim uneven ends into round shape.
  </div>
  <div class="p column">
    {% include image.html url=page.images.pompom-step-4 %}
    4. A pompom!
  </div>
</div>


### Code

[Github repository](https://github.com/michellesh/bonsai-tree){:target="blank"}




<div class="column-container">
  <div class="p column">
    {% include image.html url=page.images.tree-portrait-red %}
  </div>
  <div class="p column">
    {% include image.html url=page.images.tree-portrait-gold-white %}
  </div>
</div>

<div class="column-container">
  <div class="p column">
    {% include image.html url=page.images.tree-portrait-yellow %}
  </div>
  <div class="p column">
    {% include image.html url=page.images.tree-portrait-teal %}
  </div>
</div>

{% include image.html url=page.images.twinkle-giphy-capture-low %}


Thanks for reading!
