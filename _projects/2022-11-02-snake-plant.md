---
layout: post
title: Snake Plant
main-image-url: /assets/images/snake-plant/thumbnail.png
excerpt: A potted snake plant with twinkling leaves of yarn.
images:
  board-enclosure: /assets/images/snake-plant/board-enclosure.jpg
  ddp-green-colors-landscape: /assets/images/snake-plant/ddp-green-colors-landscape.jpg
  design-diagram-run-leds: /assets/images/snake-plant/design-diagram-run-leds.jpg
  design-diagram-wrap-yarn: /assets/images/snake-plant/design-diagram-wrap-yarn.jpg
  diffuse-test-blue: /assets/images/snake-plant/diffuse-test-blue.jpg
  diffuse-test-green: /assets/images/snake-plant/diffuse-test-green.jpg
  drill-hole-in-rock-gif: /assets/images/snake-plant/drill-hole-in-rock-gif.gif
  leaves-stuck-in-foam: /assets/images/snake-plant/leaves-stuck-in-foam.jpg
  rock-switch-close-up: /assets/images/snake-plant/rock-switch-close-up.jpg
  rocks-flower-pot: /assets/images/snake-plant/rocks-flower-pot.jpg
  schematic: /assets/images/snake-plant/schematic.jpg
  welded-leaf-with-leds: /assets/images/snake-plant/welded-leaf-with-leds.jpg
  welding-close-up-2: /assets/images/snake-plant/welding-close-up-2.jpg
  welding-close-up: /assets/images/snake-plant/welding-close-up.jpg
  welding-process: /assets/images/snake-plant/welding-process.jpg
  wrap-leaf-close-up-knot: /assets/images/snake-plant/wrap-leaf-close-up-knot.jpg
  wrap-leaf-close-up-needle: /assets/images/snake-plant/wrap-leaf-close-up-needle.jpg
  wrap-leaf-done: /assets/images/snake-plant/wrap-leaf-done.jpg
  wrap-leaf-half-done: /assets/images/snake-plant/wrap-leaf-half-done.jpg
---

![Plant in desert living room]({{ page.images.ddp-green-colors-landscape | relative_url }}){:class="fit-image"}

A potted snake plant with twinkling leaves of yarn. This plant doesn't even need to be watered!

This piece is inspired by buying a house. I want to equip every room with LEDs, both practical and decorative. I decided to start with a house plant.


## Materials & Tools

#### Leaves
- [**1/8" threaded rod**](https://www.homedepot.com/p/Everbilt-10-24-x-36-in-Zinc-Plated-Threaded-Rod-802207/204274027){:target="blank"} I bought 15x 36" rods (3 rods per leaf)
- [**5V 300 pixel LED strip**](https://www.amazon.com/dp/B09MCXMQL2?ref=ppx_yo2ov_dt_b_product_details&amp;th=1&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=7b6ef82c60cb381fa802bc3620e7e9b3&camp=1789&creative=9325){:target="blank"}
- **Yarn**
- [**10" round foam block**](https://www.michaels.com/floracraft-craftfom-round-cake-form-white/M10219979.html?dwvar_M10219979_size=4%22%20x%207.8%22&dwvar_M10219979_color=White){:target="blank"} for holding the leaves in place

#### Electronics
- [**ESP32 development board**](https://www.amazon.com/dp/B07Q576VWZ?ref=ppx_yo2ov_dt_b_product_details&amp;th=1&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=9e4a70cf7b4bbf0c998b1df4f3103ac0&camp=1789&creative=9325){:target="blank"}
- [**Rocker switch**](https://www.amazon.com/dp/B07S1MV462?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=55c0269e030979feaec916b07c9705d5&camp=1789&creative=9325){:target="blank"}
- [**3 pin wire connectors**](https://www.amazon.com/gp/product/B071H5XCN5/ref=ppx_yo_dt_b_search_asin_image?ie=UTF8&amp;psc=1&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=b7bc61288532a34e0135b410f7237471&camp=1789&creative=9325){:target="blank"}
- [**Mount screw terminal block connectors**](https://www.amazon.com/dp/B07WQV2PDD?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=b6d1d9d39bc56d76cba06b40f6fcdabc&camp=1789&creative=9325){:target="blank"} - These are amazing
- [**3A output USB adapter**](https://www.amazon.com/dp/B0728HB18G?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=d220ca04cd54cf40f366c7a6cfd058d3&camp=1789&creative=9325){:target="blank"}
- Any **3' USB cable** with standard USB-3 on one end.

#### Tools
- **Welder**
- [**3/4" diamond hole saw bit**](https://www.homedepot.com/p/Milwaukee-3-4-in-Diamond-Max-Hole-Saw-49-56-0515/204999981){:target="blank"} for drilling a hole in a rock!
- **Soldering iron**
- [**Solder**](https://www.amazon.com/gp/product/B003X3VUK0/ref=ppx_yo_dt_b_search_asin_image?ie=UTF8&amp;psc=1&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=ec8919dd72aa269fe325fdf9fcae0e6a&camp=1789&creative=9325){:target="blank"}

## Process

- [Design](#design)
- [Test diffusing the LEDs](#test-diffusing-the-leds)
- [Weld rods into wonky leaf shapes](#weld-rods-into-wonky-leaf-shapes)
- [Wrap yarn around both sides of each leaf](#wrap-yarn-around-both-sides-of-each-leaf)
- [Arrange leaves in flower pot](#arrange-leaves-in-flower-pot)
- [Collect rocks from the front yard](#collect-rocks-from-the-front-yard)
- [Drill a hole in a rock!](#drill-a-hole-in-a-rock)
- [Wiring and board enclosure](#wiring-and-board-enclosure)
  - [Schematic](#schematic)
- [Code](#code)
- [Video](#video)


### Design

Each leaf is made of 1/8" steel rod, welded together into wonky leaf shapes, with LED strips running along the inside edges and yarn wrapped around each side. Here are some sketches I made before I started building.

<div class="column-container">
  <div class="p column">
    <img alt="Design diagram run LEDs" class="fit-image" src="{{ page.images.design-diagram-run-leds | relative_url }}" />
  </div>
  <div class="p column">
    <img alt="Design diagram wrap yarn" class="fit-image" src="{{ page.images.design-diagram-wrap-yarn | relative_url }}" />
  </div>
</div>


### Test diffusing the LEDs

I've been wanting to try using string as a method of diffusing LEDs for a while. I originally wanted to use something clear/translucent like fishing line, but I realized I'd have to buy that, and I have so much yarn lying around. So I set up this test with some kitchen skewers to make sure the yarn would have the right effect of capturing the light and making the whole leaf look lit.

<div class="column-container">
  <div class="p column">
    <img alt="Diffuse test green" class="fit-image" src="{{ page.images.diffuse-test-green | relative_url }}" />
  </div>
  <div class="p column">
    <img alt="Diffuse test blue" class="fit-image" src="{{ page.images.diffuse-test-blue | relative_url }}" />
  </div>
</div>


### Weld rods into wonky leaf shapes

After bending the rods into wonky leaf shapes, (using photos of snake plants as reference,) I welded them together with little segments of rod. This was my first time welding, and it felt like the perfect level of difficulty for a first-time welder.

![Welding process]({{ page.images.welding-process | relative_url }}){:class="fit-image"}
<div class="column-container">
  <div class="p column">
    <img alt="Welding close up" class="fit-image" src="{{ page.images.welding-close-up | relative_url }}" />
  </div>
  <div class="p column">
    <img alt="Welding close up" class="fit-image" src="{{ page.images.welding-close-up-2 | relative_url }}" />
  </div>
</div>

![Welded leaf with LEDs]({{ page.images.welded-leaf-with-leds | relative_url }}){:class="fit-image"}


### Wrap yarn around both sides of each leaf

Just wrapped it round and round! It took about 4 hours per leaf. Every time I switched colors, I wrapped the yarn once around the LED strip to hold it tight to the outer rod, and also to hide the knot inside the leaf (shown in first photo).

<div class="column-container">
  <div class="p column">
    <img alt="Wrap leaf close up knot" class="fit-image" src="{{ page.images.wrap-leaf-close-up-knot | relative_url }}" />
  </div>
  <div class="p column">
    <img alt="Wrap leaaf close up needle" class="fit-image" src="{{ page.images.wrap-leaf-close-up-needle | relative_url }}" />
  </div>
</div>
<div class="column-container">
  <div class="p column">
    <img alt="Wrap leaf half done" class="fit-image" src="{{ page.images.wrap-leaf-half-done | relative_url }}" />
  </div>
  <div class="p column">
    <img alt="Wrap leaf done" class="fit-image" src="{{ page.images.wrap-leaf-done | relative_url }}" />
  </div>
</div>


### Arrange leaves in flower pot

I was planning to hold each leaf in position with only rocks, but it was harder than I expected to find the perfect positioning. So I bought this 10" diameter cylinder of craft foam to hold the leaves in place. It also helped balance the weight of the whole piece. Rocks are heavy...

![Leaves stuck in foam]({{ page.images.leaves-stuck-in-foam | relative_url }}){:class="fit-image"}


### Collect rocks from the front yard

Really taking advantage of the benefits of homeownership.

![Rocks in flower pot]({{ page.images.rocks-flower-pot | relative_url }}){:class="fit-image"}


### Drill a hole in a rock!

I invested a whole $32 in this special drill bit just to drill a hole in this rock. It was definitely worth it. I drilled the hole with the rock submerged under water so that I wouldn't fill the garage (and our lungs) with rock dust.

![Drill a hole in a rock gif]({{ page.images.drill-hole-in-rock-gif | relative_url }}){:class="fit-image"}

![On off switch in rock close up]({{ page.images.rock-switch-close-up | relative_url }}){:class="fit-image"}


### Wiring and board enclosure

I made this little enclosure out of a plastic case I had lying around to protect the board from getting squished under the rocks. I used a dremel to cut out slots for the LED connectors and power.

![Board wiring enclosure]({{ page.images.board-enclosure | relative_url }}){:class="fit-image"}


#### Schematic

I think this schematic looks more complicated than it actually is. There's just a lot of wires, and I got carried away with the lines and right angles.

![Schematic]({{ page.images.schematic | relative_url }}){:class="fit-image"}

**Note:** I had to disconnect the VIN pin while uploading code to the board. When the board is powered by microUSB, the VIN pin outputs 5V, and since the VIN pin is wired to the same bundle as the LED power input, my computer kept disabling the USB port because it was "using too much power" to power all 300 LEDs! But this is what's so beautiful about these [**mount screw terminal block connectors**](https://www.amazon.com/dp/B07WQV2PDD?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=b6d1d9d39bc56d76cba06b40f6fcdabc&camp=1789&creative=9325){:target="blank"}! You just unscrew the pin instead of having to un-solder and re-solder.


### Code

I mostly reused existing code for this project. It's just [FastLED's TwinkleFox](https://github.com/FastLED/FastLED/blob/master/examples/TwinkleFox/TwinkleFox.ino){:target="blank"} algorithm cycling through four leafy color palettes.

I enjoyed using the same strategy for the LED array that I did with the [Tree of Light Prototype](/projects/tree-of-light-prototype) as a way to manage multiple arrays of different lengths. (The Tree had 9 discs with different LED counts, and Snakey here has 5 leaves with different LED counts.) I wrote about it there too, but here it is again just for fun:

Here's how I allocate multiple LED strips with different lengths to a single array:
```cpp
CRGB *leds;

// number of LEDs on each side of each leaf
int NUM_LEDS[] = {21, 25, 30, 35, 40};
int NUM_LEDS_TOTAL = 2 * sum(NUM_LEDS, NUM_LEAVES);

void setup() {

  leds = new CRGB[NUM_LEDS_TOTAL];

  int offset = 0;

  // add LEDs leaf 1 side 1
  FastLED.addLeds<NEOPIXEL, PIN_1A>(leds, offset, NUM_LEDS[0]);
  offset += NUM_LEDS[0];

  // add LEDs leaf 1 side 2
  FastLED.addLeds<NEOPIXEL, PIN_1B>(leds, offset, NUM_LEDS[0]);
  offset += NUM_LEDS[0];

  // leaf 2, 3, etc...
}
```

Each leaf has pointers marking the beginning of its left and right side:
```cpp
struct Leaf {
  int leafIndex;
  int numLEDs;
  CRGB *ledsLeft;
  CRGB *ledsRight;

  void setLED(int index, CRGB color) {
    ledsLeft[index] = color;
    ledsRight[index] = color;
  }
};
```

Looping over all the leaves looks like this:
```cpp
for (int l = 0; l < NUM_LEAVES; l++) {
  for (int i = 0; i < leaves[l].numLEDs; i++) {
    leaves[l].setLED(i, CRGB::Green);
  }
}
```

[See full code on GitHub](https://github.com/michellesh/snake-plant){:target="blank"}


### Video

<iframe class="fit-image" src="https://www.youtube.com/embed/TMovQlcTmhs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<div class="column-container">
  <div class="p column">
    <img alt="" class="fit-image" src="{{ page.images.xxx | relative_url }}" />
  </div>
  <div class="p column">
    <img alt="" class="fit-image" src="{{ page.images.xxx | relative_url }}" />
  </div>
</div>

Thanks for reading!
