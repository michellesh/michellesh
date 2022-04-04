---
layout: post
project: tree-of-light
---
50k LEDs is a lot of data and a lot to loop through. My goal here is to run a test program on [the ESP32 models I bought]({% post_url 2022-03-08-choosing-a-microcontroller-that-can-run-50k-leds  %}) to make sure the board can: 1. store that much data, and 2. run any kind of flowy light pattern on some LEDs to verify the update rate isn't too choppy.

So I set up a sketch with [all of the LED arrays](https://github.com/michellesh/tree-of-light/blob/6332b55f43cc431bf97a5d9864c5466d8d9e24d0/arduino/50k-LED-test/globals.h#L25-L43){:target="blank"} I would need, which turned out to be 47,408.

## Step 1: Compiling. "DRAM segment data does not fit" ?

I immediately got a compiler error `DRAM segment data does not fit`, even though the Arduino IDE reported a low enough % of program storage space and dynamic memory (I think they were both <= 50%)

I first tried installing [ESP-IDF](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html){:target="blank"}, which is software allows you to manually configure your ESP32. But [this reddit post](https://www.reddit.com/r/esp32/comments/bz2drf/migrating_from_arduino/){:target="blank"} helped me realize that <span class="highlighted">programming with ESP-IDF would be very different than programming with the Arduino IDE</span>, and not something I feel like I have the capacity to migrate to for this project. Which is sad, because ESP-IDF not only has a rad terminal interface, it would have allowed me to compile and upload my code using the *TERMINAL!* Which would have been AMAZING. I will have to come back to that someday.

Next I tried specifically searching for issues storing large global variables and found [this Arduino forum post](https://forum.arduino.cc/t/where-goes-the-esp32-memory/649117/13){:target="blank"}. I learned here that <span class="highlighted">even though ESP32s have a lot of RAM, it's not necessarily freely usable, and the limit for global variables is somehwere around 100kB</span>. Which was kind of concerning. (Spoiler alert: it was enough space.)

### The magical `new` operator

BUT THEN, I found the answer I needed by searching on the Adafruit discord server for the keyword "DRAM". Thank you to the helpful human that suggested using the `new` operator in the `setup()` function, and explained that <span class="highlighted">the `new` operator handles memory allocation as well as freeing the memory, so you don’t end up with a memory leak</span>. This solved it for me, and I got the code to compile successfully with all 50k LEDs. Structure looks like:

```cpp
CRGB* LED_STRIP_1;

void setup() {
  ...
  LED_STRIP_1 = new CRGB[NUM_LEDS_1];
  ...
}
```
Here is a link to the [full commit](https://github.com/michellesh/tree-of-light/commit/a3bd760a59f3f61b75b8677346d186dbbb472071){:target="blank"}.

## Step 2: Upload code and light up some LEDs!

I probably could have done this test with math alone, by measuring the loop cycle time and comparing some numbers. But that sounds like the way I *should* do it, and not the way I want to do it, which is with my eyeballs. :-D

### Which LED strip looks the best?

Time to compare the [various ESP32 models I bought]({% post_url 2022-03-08-choosing-a-microcontroller-that-can-run-50k-leds  %}). I decided to test with a simple LED pattern called `juggle` from the [FastLED DemoReel100 example](https://github.com/FastLED/FastLED/blob/f57fca35cec6f1b3552ad8e12e0c491a92ea58e0/examples/DemoReel100/DemoReel100.ino#L114){:target="blank"}. I wrote two sketches:

- Control ([code](https://github.com/michellesh/tree-of-light/blob/6332b55f43cc431bf97a5d9864c5466d8d9e24d0/arduino/50k-LED-test-control/50k-LED-test-control.ino){:target="blank"}): runs the `juggle` pattern on 300 LEDs.
- 50k LED test ([code](https://github.com/michellesh/tree-of-light/blob/6332b55f43cc431bf97a5d9864c5466d8d9e24d0/arduino/50k-LED-test/50k-LED-test.ino){:target="blank"}): runs the `juggle` pattern on 47,408 LEDs.

I nicknamed the models [ESP32 Basic](https://www.amazon.com/gp/product/B07QCP2451?&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=073e7098865be5ba77b01e1b9142c43d&camp=1789&creative=9325){:target="blank"}, [WROVER 1](https://www.amazon.com/gp/product/B07QDFP3WC?&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=851359cd8bda9adf5c52b95067622c13&camp=1789&creative=9325){:target="blank"}, and [WROVER 2](https://www.amazon.com/gp/product/B09BC5CNHM?&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=320d7d7045c644f122a064541a8d6147&camp=1789&creative=9325){:target="blank"}. The video compares the Control to each ESP model, and then at the end compares the ESP32 Basic to the WROVER 2. <span class="highlighted">The WROVER 1 was too slow to even be in the running!</span> (I didn't set any configuration differently, but I am probably still doing something wrong there...)

<iframe width="650" height="500" src="https://www.youtube.com/embed/2qbO-BmZtuI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

&nbsp;  
### Interlude: It probably helps to call `FastLED.addLEDs` on a portion of the LEDs

Just for fun, I tried uploading the [control sketch](https://github.com/michellesh/tree-of-light/blob/6332b55f43cc431bf97a5d9864c5466d8d9e24d0/arduino/50k-LED-test-control/50k-LED-test-control.ino){:target="blank"}, (which declares all the LEDs as one LED strip,) with the full amount of LEDs:
```cpp
#define NUM_LEDS  47408

CRGB *leds;

void setup() {
  FastLED.addLeds<.....>(leds, NUM_LEDS);
  ...
}
...
```
... and it was MEGA slow. Not even worth taking a video.

But this is not how I have the 50k-LED-test set up. Since the Tree of Light will have 9 discs (layers) and each disc will need to have it's own board (to save ourselvess from running a ton of wire up the tree), I made a point of only calling `FastLED.addLEDs` for the 16 LED strips that board will control ([code snippet](https://github.com/michellesh/tree-of-light/blob/6332b55f43cc431bf97a5d9864c5466d8d9e24d0/arduino/50k-LED-test/setup.ino#L168-L337){:target="blank"}). I do this by checking the MAC address of the board ([another code snippet](https://github.com/michellesh/tree-of-light/blob/6332b55f43cc431bf97a5d9864c5466d8d9e24d0/arduino/50k-LED-test/setup.ino#L168-L337){:target="blank"}). <span class="highlighted">So even though every board stores all 47408 LEDs, it only calls `FastLED.addLEDs` on a maximum of 8432 (on the largest disc). And it seems like that helps performance a LOT.</span>


### ESP32 Basic vs. WROVER 2! Time to measure loop cycle time

Since the ESP32 Basic and WROVER 2 were too similar to compare with only eyeballs, I measured the loop cycle time (using the "naive" method explained in [this blog post](https://blog.wokwi.com/how-to-measure-the-speed-of-arduino-code/){:target="blank"}):

**Control** (300 LEDs): ~9300 microseconds  
**ESP32 Basic** (50k LEDs): ~43000 microseconds  
**WROVER 1** (50k LEDs): ~148000 microseconds  
**WROVER 2** (50k LEDs): ~47000 microseconds

<span class="highlighted">How strange, that the ESP32 Basic is the fastest, when the WROVERs are the ones with all the extra RAM!</span> At least the basic ones are cheaper?

### Allocating PSRAM on the WROVERs

I wanted to make sure I put a bit more due diligence into making sure I was *using* the PSRAM, since I am not sure if I'm doing any of this right anyway. I found [this article](https://thingpulse.com/esp32-how-to-use-psram/){:target="blank"} explaining how to check how much PSRAM is available and how to use PSRAM. I tried added their code to my 50k LED test, but it had no effect on the loop cycle time. But here are some fun numbers I gathered:

|  | ESP32 Basic | WROVER 1 | WROVER 2 |
| --- | --- | --- | --- |
| `ESP.getHeapSize()` | 353260 | 336996 | 336980 |
| `ESP.getFreeHeap()` | 128628 | 93320 | 112284 |
| `ESP.getPsramSize()` | 0 | 4194252 | 4194252 |
| `ESP.getFreePsram()` | 0 | 4194252 | 4194252 |


&nbsp;  
### What's Next ?!?!

Very Exciting Stuff coming up!! We built a mini Tree of Light and I will be adorning it with LEDs. VERY EXCITING!


-Micky
