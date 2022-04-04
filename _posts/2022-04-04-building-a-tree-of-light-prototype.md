---
layout: post
project: tree-of-light
title: Building a "Tree of Light" Prototype
excerpt: We built a 4-foot tall prototype for a larger LED structure we're building this year that we're calling the "Tree of Light". This post is about my process of adding LEDs to it!
images:
  prototype-without-leds: /assets/images/building-a-tree-of-light-prototype/prototype-without-leds.jpg
  disc-measurements: /assets/images/building-a-tree-of-light-prototype/disc-measurements.jpg
  lines-drawn-on-disc: /assets/images/building-a-tree-of-light-prototype/lines-drawn-on-disc.jpg
  disc-plan-petal-group: /assets/images/building-a-tree-of-light-prototype/disc-plan-petal-group.png
  disc-plan-strip: /assets/images/building-a-tree-of-light-prototype/disc-plan-strip.jpg
  ws2812b-full-white: /assets/images/building-a-tree-of-light-prototype/ws2812b-full-white.jpg
  groups-of-200-leds: /assets/images/building-a-tree-of-light-prototype/groups-of-200-leds.jpg
  soldering-glueing-1: /assets/images/building-a-tree-of-light-prototype/soldering-glueing-1.jpg
  soldering-glueing-2: /assets/images/building-a-tree-of-light-prototype/soldering-glueing-2.jpg
  prototype-lit-up-2: /assets/images/building-a-tree-of-light-prototype/prototype-lit-up-2.jpg
  prototype-lit-up-1: /assets/images/building-a-tree-of-light-prototype/prototype-lit-up-1.jpg
---

## What's it for?

This 4-foot tall structure is a prototype for a larger LED structure we're building this year that we're calling the "Tree of Light" (that name is just a placeholder until we come up with a better one....) The actual final structure will be somewhere around 35-40 ft tall, but since it will take time to build, we decided to build a smaller prototype, so that I can start writing code and figuring out the algorithms for the light patterns. We made it out of plexiglass and wood. This post is about my process of adding LEDs to it!

![Photo of prototype without LEDs]({{ page.images.prototype-without-leds | relative_url }} "It looks kind of like one of those cartoon alien blaster guns, doesn't it? Pew pew!"){:class="fit-image"}

## Parts

- [LED strips! WS2812B 60 LEDs/meter](https://www.amazon.com/gp/product/B018X04ES2/ref=ppx_yo_dt_b_asin_title_o04_s01?&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=23e319bbd49599188c4137762638d17d&camp=1789&creative=9325){:target="blank"}
- [5V 300A Power Supply](https://www.amazon.com/gp/product/B06XK3X3PW/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&amp;psc=1&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=4ff7263f0b15b412e35aed1e6374c07f&camp=1789&creative=9325){:target="blank"}
- [ESP32-WROVER Board](https://www.amazon.com/gp/product/B09BC5CNHM/ref=ppx_yo_dt_b_search_asin_image?ie=UTF8&amp;psc=1&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=6df64a7198ceb657e08de859cb4cb5f9&camp=1789&creative=9325){:target="blank"}
- [ESP32 Terminal Block](https://www.amazon.com/gp/product/B092H9FM3R/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&amp;psc=1&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=8a2e8555e7551e244918e6f5e5cdfb3a&camp=1789&creative=9325){:target="blank"}
- 22 gauge wire. I had this leftover from a past project, and I lost the link!
- [3 pin wire connectors](https://www.amazon.com/gp/product/B071H5XCN5/ref=ppx_yo_dt_b_search_asin_image?ie=UTF8&amp;psc=1&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=b7bc61288532a34e0135b410f7237471&camp=1789&creative=9325){:target="blank"}

## First measure all the things

We want the LEDs to be arranged in this flowery shape on each disc. The first step is to gather some measurements based on the radius of each disc. There are two important lengths here which I'm calling `p1` (length of the "inner petal" edge) and `p2` (length of the "outer petal" edge)

![Disc measurements]({{ page.images.disc-measurements | relative_url }}){:class="fit-image"}

| Variables | | Equation |
| --: |
| `r` | radius of the disc |
| `p1` | length of edge of inner petal | `r / 2 / sin(60°)` *&#42;* |
| `p2` | length of edge of outer petal | `0.65 * p1` *&#42;&#42;* |

*&#42; I won't pretend I figured this out without looking it up... [thank you stackexchange](https://math.stackexchange.com/questions/483931/length-of-hypotenuse-using-one-side-length-and-angle){:target="blank"}*  
*&#42;&#42; I figured out this `0.65` in a silly way. Instead of working out the geometry, [I coded the above diagram](https://github.com/michellesh/tree-of-light/blob/master/tree-of-light/src/models/Discs.js){:target="blank"} with JavaScript in an HTML canvas, and logged out ratio of `p2` relative to `p1`*

With all these measurements, I drew the pattern onto each disc, and cut pieces of LED strip to fit along these lines. As I did that, I recorded the number of LEDs in `p1` and `p2` for each disc in a spreadsheet, and when I was done I had cut a total of 1284 LEDs.

![Lines draw on first disc]({{ page.images.lines-drawn-on-disc | relative_url }}){:class="fit-image"}

## How to route the LEDs along these "petals"

I needed to figure out how to send the wires from the ESP32 board and how to route all the segments of LED strip around each petal. The ESP32 board (which will live at the top center of the model) has 19 output pins. My goals here were to stay within &le;19 pins, minimize the amount of wire used, and also hide the wires to keep it nice-looking.

![Disc plan per petal group]({{ page.images.disc-plan-petal-group | relative_url }}){:class="fit-image"}

Here's what that strip looks like all spread out:

![Disc plan per strip]({{ page.images.disc-plan-strip | relative_url }}){:class="fit-image"}

Starting at the center of the disc, the LED strip will trace one inner and one outer petal, and then the pattern will repeat starting with the next inner petal.
At first I planned to bend the LED strips on the 120 and 90 degree turns, but the LED strip felt too fragile, and wouldn't sit flat enough. So I soldered short little jumper wires between each straight segment. I really enjoy soldering, so I didn't mind the extra soldering time. :)

## Where to inject power? Dividing LEDs into groups

1284 LEDs is obviously too many LEDs to string together in one strand. To figure out how often I would need to inject power, I unrolled one of the LED strips I bought and set the whole thing to white on full brightness. It looked obviously yellow around 2/3rds of the way down the strip, after ~200 LEDs. So I injected power every 200 LEDs.

![WS2812B full white]({{ page.images.ws2812b-full-white | relative_url }}){:class="fit-image"}

<div class="column-container">
  <div class="p column">
    <img alt="Groups of 200 LEDs" class="fit-image" src="{{ page.images.groups-of-200-leds | relative_url }}" />
  </div>
  <div class="p column">
    This diagram shows how all 1284 LEDs are split up into groups of ~200. I routed wires to each group to inject power. Each group also has a single data pin on the ESP32. Some groups have less than 200 because I wanted to start each new group of 200 at the beginning of the petal right near the center rod. It worked out to be 7 groups of LEDs:

    <br />
    <br />

    <div style="color: #5D8475; font-weight: bold">ESP32 Pin 1: 200 LEDs</div>
    <div style="color: #A2AF79; font-weight: bold">ESP32 Pin 2: 184 LEDs</div>
    <div style="color: #ECCC7F; font-weight: bold">ESP32 Pin 3: 196 LEDs</div>
    <div style="color: #F2AD70; font-weight: bold">ESP32 Pin 4: 202 LEDs</div>
    <div style="color: #EC966A; font-weight: bold">ESP32 Pin 5: 198 LEDs</div>
    <div style="color: #DE6F5C; font-weight: bold">ESP32 Pin 6: 190 LEDs</div>
    <div style="color: #833F40; font-weight: bold">ESP32 Pin 7: 114 LEDs</div>
    <br />
    Total: 1284 LEDs
  </div>
</div>

## How big does the power supply need to be?

I happened to have this [5V power supply](https://www.amazon.com/gp/product/B06XK3X3PW/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&amp;psc=1&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=4ff7263f0b15b412e35aed1e6374c07f&camp=1789&creative=9325){:target="blank"} lying around. Here's how I calculated whether it would be big enough, using `P = V * A`.

|  | | Watts `P` | Volts `V` | Amps `A` |
| --: | --- | --- | --- | --- |
| Power Supply | | <span class="green">**300W**</span> | 5V | <span class="green">**60A**</span> |
| 1 meter LEDs (60 LEDs/m) | | 12W | 5V | 2.4A |
| per LED | | 0.2W | 5V | 0.04A |
| all LEDs (1284 LEDs) | | 256.8W x 10%*&#42;* =<br/><span class="green">**282.48W**</span> | 5V | 51.36A<br /><span class="green">**56.5A**</span>

*&#42; [This YouTube video](https://www.youtube.com/watch?v=fWYSF-t_tic){:target="blank"} recommended getting a power supply that has a capacity at least 10% higher than the max needed.*

## Soldering and Glueing

The soldering and glueing went smoothly for the most part! The trickiest part was that I had to glue the LED strips on in a specific order, to make sure that the wires got glued down underneath the LED strips.

![Glue LEDs onto disc progress]({{ page.images.soldering-glueing-1 | relative_url }}){:class="fit-image"}
![Glue LEDs on to disc done]({{ page.images.soldering-glueing-2 | relative_url }}){:class="fit-image"}

## Code!

I ended up making one big long array of the LEDs for each disc chained together. Then I created a simple `struct` for each disc that stored a pointer to that disc's LEDs, so I can access them per-disc.

Defining the FastLED array. Just a big list of all LEDs chained together:

```cpp
CRGB *leds;

void setup() {

  leds = new CRGB[NUM_LEDS_TOTAL];

  uint16_t startIndex = 0;
  FastLED.addLeds<NEOPIXEL, PIN_1>(leds, startIndex, NUM_LEDS_PIN_1);
  startIndex += NUM_LEDS_PIN_1;
  FastLED.addLeds<NEOPIXEL, PIN_2>(leds, startIndex, NUM_LEDS_PIN_2);
  startIndex += NUM_LEDS_PIN_2;
  FastLED.addLeds<NEOPIXEL, PIN_3>(leds, startIndex, NUM_LEDS_PIN_3);
  startIndex += NUM_LEDS_PIN_3;
  FastLED.addLeds<NEOPIXEL, PIN_4>(leds, startIndex, NUM_LEDS_PIN_4);
  startIndex += NUM_LEDS_PIN_4;
  FastLED.addLeds<NEOPIXEL, PIN_5>(leds, startIndex, NUM_LEDS_PIN_5);
  startIndex += NUM_LEDS_PIN_5;
  FastLED.addLeds<NEOPIXEL, PIN_6>(leds, startIndex, NUM_LEDS_PIN_6);
  startIndex += NUM_LEDS_PIN_6;
  FastLED.addLeds<NEOPIXEL, PIN_7>(leds, startIndex, NUM_LEDS_PIN_7);

  // ...
}
```

Defining a simple data structure for the disc info:

```cpp
struct Disc {
  uint8_t discIndex;
  uint8_t numLEDs; // number of LEDs in this disc
  uint16_t offset; // number of LEDs in tree before this disc
  CRGB *leds; // the LEDs for this disc
};
```

Creating the instances of each `Disc`, while accumulating an `offset` to track the disc's position in the whole tree: [This forum thread](https://forum.arduino.cc/t/rearrange-sections-in-a-multi-pin-single-array-fastled-setup/640457/9){:target="blank"} helped me figure out this nice simple way to keep a pointer for each disc's LEDs (the `&leds[offset]` part below).

```cpp
void setup() {
  // ...

  uint16_t offset = 0;
  for (uint8_t d = 0; d < NUM_DISCS; d++) {
    Disc disc = {d, NUM_LEDS_DISC[d], offset, &leds[offset]};
    discs[d] = disc;
    offset += disc.numLEDs;
  }
}
```

And then I can just set each disc to a different color of the rainbow!

```cpp
void loop() {
  for (uint8_t d = 0; d < NUM_DISCS; d++) {
    for (uint8_t p = 0; p < discs[d].numLEDs; p++) {
      discs[d].leds[p] = rainbow[d];
    }
  }
  FastLED.show();
}
```

[Here's the full code!](https://github.com/michellesh/tree-of-light/tree/12435c3f4a6b6e9c90575d55cbcebe9c2bb72a37/arduino/prototype){:target="blank"}

![Photo of prototype lit up]({{ page.images.prototype-lit-up-2 | relative_url }}){:class="fit-image"}
![Photo of prototype lit up]({{ page.images.prototype-lit-up-1 | relative_url }}){:class="fit-image"}

## Okay but does it do anything yet??

This post is meant to be about the build, not the light patterns. I will be developing a lot more light patterns for this thing! But if you read this far down this post, then I love you. And you probably want to see this thing do something cool! So here's a nice simple one.

<iframe width="650" height="500" src="https://www.youtube.com/embed/u098ZPlu1q8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## What's next?

More light patterns for this thing! More code! Stay tuned!

-Micky
