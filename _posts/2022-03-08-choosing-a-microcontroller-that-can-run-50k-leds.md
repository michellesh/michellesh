---
layout: post
tags: [Tree of Light, ESP32, ESP8266]
---
I am building a big LED structure with a friend. It's going to have 50,000 LEDs. I've never worked with that many. It's terrifying. And awesome!!! So, we had to choose the right microcontroller that can support that much data. 

### Need more memory!
I know I need more memory. I used ESP8266s for the [Dance Floor project](/projects/dance-floor), which had 4800 LEDs, and the final code used 81% of available RAM and 26% of Flash (according to the Arduino IDE). But I still need WiFi capability, so the ESP32 seems like a good upgrade. Plus I've been super excited to tinker with ESP32s ever since falling in love with [this YouTube video](https://www.youtube.com/watch?v=Mgh2WblO5_c&ab_channel=ScottMarley) of a delightful music visualizer that uses an ESP32.

It would have been so fun to use Raspberry Pi for this project, because they are so cool. But they're out of stock everywhere at the moment.

### Comparison of stats for ESP32 / ESP8266
So here's a just a quick sanity check that ESP32 is the way to go. I know that these numbers can vary, but here's what I found after some quick research. Also shoutout to the Adafruit discord, I posted there asking for suggestions for boards to handle that much data, and got some tips that helped point me in the right direction.

|  | RAM | Flash Memory | Processor | Output Pins | $ each |
| --- | --- | --- | --- | --- | --- |
| ESP8266 | 82 kB | 4 MB | 80MHz | 9 | $6 |
| ESP32 | 512 kB SRAM | 4 MB | 240MHz | 19 | $8 |
| ESP32-WROVER | 8 MB PSRAM | 4-16 MB | 240MHz | 19 | $15-20 |

Output pin count is based on these pinout references: [ESP32](https://randomnerdtutorials.com/esp32-pinout-reference-gpios/) / [ESP8266](https://randomnerdtutorials.com/esp8266-pinout-reference-gpios/). I'm pretty excited about having extra output pins too, because I'll need 16 per board, and while shift registers are super fun, they do take a bit more time.

Do I even need that extra PSRAM on the WROVER? I also found [this cool project](https://www.tjoe.org/pub/pqcm7nyw/release/3) running **80k** (!!) LEDs on a microcontroller running at 252MHz, with 2MB of flash memory, and 512KB of SRAM. If they can run 80k leds with that much RAM then maybe the basic ESP32 would be enough for our 50k?

### I bought a few options for testing. FOR SCIENCE!
Definitely for science. (BUT ALSO FOR FUN.)

![ESP32 three options](/assets/images/esp32-three-options.jpg)
From left to right:
- A basic [ESP32 with 512kB SRAM](https://www.amazon.com/gp/product/B07QCP2451){:target="blank"}
- Also a [ESP32-WROVER with 16MB Flash/8MB PSRAM](https://www.amazon.com/gp/product/B07QDFP3WC){:target="blank"}
- Another [ESP32-WROVER with 4MB Flash/8MB PSRAM](https://www.amazon.com/gp/product/B09BC5CNHM){:target="blank"}

How will all of these work with my 50k LED test? We'll find out! STAY TOOOOONED!

-L.O.L.
